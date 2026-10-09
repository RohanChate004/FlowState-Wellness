import json
from datetime import datetime

from django.conf import settings
from django.utils import timezone

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from groq import Groq

from meditation.models import MeditationSession
from yoga.models import Asana, YogaSession
from users.models import DailyWellness
import logging

logger = logging.getLogger(__name__)


# ---------------------------------------------------------
# TRUSTED EXTERNAL SOURCES
# ---------------------------------------------------------

TRUSTED_SOURCES = {
    "nccih": {
        "label": "Explore Trusted Health Information",
        "url": "https://www.nccih.nih.gov/",
    },
    "pubmed": {
        "label": "Explore Scientific Research",
        "url": "https://pubmed.ncbi.nlm.nih.gov/",
    },
    "who": {
        "label": "Explore WHO Information",
        "url": "https://www.who.int/",
    },
}


# ---------------------------------------------------------
# ALLOWED INTERNAL ROUTES
# ---------------------------------------------------------

ALLOWED_INTERNAL_ROUTES = {
    "/yoga": "Explore Yoga",
    "/meditation": "Start Meditation",
    "/deep-dive": "Enter Deep Dive",
    "/knowledge-hub": "Open Knowledge Hub",
}


# ---------------------------------------------------------
# SAFE ACTION BUILDER
# ---------------------------------------------------------


def build_action(ai_data):
    """
    Validate AI-generated actions.
    Django controls allowed routes, database asanas,
    and trusted external resources.
    """
    from django.core.exceptions import ValidationError
    from django.core.validators import URLValidator

    intent = ai_data.get("intent", "practice")
    action_data = ai_data.get("action") or {}

    if not isinstance(action_data, dict):
        return None

    action_type = action_data.get("type")

    # INTERNAL ACTIONS
    if action_type == "internal":
        route = action_data.get("route", "")

        # Verify actual active asana records.
        if isinstance(route, str) and route.startswith("/asanas/"):
            asana_id = route.removeprefix("/asanas/").strip("/")

            if not asana_id.isdigit():
                return None

            asana = Asana.objects.filter(
                id=int(asana_id),
                is_active=True,
            ).first()

            if not asana:
                return None

            return {
                "type": "internal",
                "label": asana.name,
                "route": f"/asanas/{asana.id}",
            }

        # Preserve existing allowed routes.
        if route in ALLOWED_INTERNAL_ROUTES:
            return {
                "type": "internal",
                "label": action_data.get(
                    "label",
                    ALLOWED_INTERNAL_ROUTES[route],
                ),
                "route": route,
            }

        # Preserve Knowledge Hub article routes.
        if isinstance(route, str) and route.startswith(
            "/knowledge-hub/article/"
        ):
            slug = route.replace(
                "/knowledge-hub/article/",
                "",
                1,
            ).strip("/")

            if slug and "/" not in slug:
                return {
                    "type": "internal",
                    "label": action_data.get(
                        "label",
                        "Learn in Knowledge Hub",
                    ),
                    "route": f"/knowledge-hub/article/{slug}",
                }

        return None

    # EXTERNAL ACTIONS
    if action_type == "external":
        source_key = action_data.get("source_key")
        source = TRUSTED_SOURCES.get(source_key)

        if source:
            return {
                "type": "external",
                "label": source["label"],
                "url": source["url"],
            }

        return None

    return None



def get_relevant_asanas(message, mood="", limit=5):
    """
    Return relevant active asanas ranked by relevance.
    Avoid returning the same first database records every time.
    """
    import re
    from django.db.models import Q

    message = (message or "").lower()
    mood = (mood or "").lower()
    text = f"{message} {mood}"

    keyword_groups = {
        "tired": ["fatigue", "low energy", "energy"],
        "exhausted": ["fatigue", "low energy", "energy"],
        "low-energy": ["fatigue", "tired", "energy"],
        "anxious": ["anxiety", "stress", "calm", "relaxation"],
        "anxiety": ["anxious", "stress", "calm", "relaxation"],
        "stressed": ["stress", "anxiety", "calm", "relaxation"],
        "stress": ["anxiety", "calm", "relaxation"],
        "sleep": ["insomnia", "relaxation", "calm"],
        "insomnia": ["sleep", "relaxation", "calm"],
        "back": ["back pain", "spine", "lower back"],
        "sore": ["recovery", "muscle tension", "stretching"],
        "pain": ["discomfort", "recovery", "relief"],
        "cramping": ["menstrual", "period", "pelvic"],
        "sad": ["low mood", "calm", "relaxation"],
        "focus": ["concentration", "mindfulness"],
        "stiff": ["flexibility", "mobility", "stretching"],
        "energy": ["energizing", "fatigue", "vitality"],
    }

    stop_words = {
        "i", "im", "i'm", "me", "my", "the", "a", "an",
        "is", "am", "are", "was", "and", "or", "to", "for",
        "of", "in", "on", "with", "it", "this", "that",
        "feel", "feeling", "feelings", "want", "need",
        "please", "can", "you", "suggest", "recommend",
        "give", "help", "some", "what", "how", "today",
        "yoga", "pose", "poses", "asana", "practice",
        "gentle", "me", "i'm",
    }

    words = set(re.findall(r"[a-z]+(?:-[a-z]+)?", text))
    terms = {
        word for word in words
        if len(word) >= 3 and word not in stop_words
    }

    expanded_terms = set(terms)

    for word in terms:
        expanded_terms.update(keyword_groups.get(word, []))

    # Search positive relevance fields only.
    searchable_fields = [
        "name",
        "sanskrit_name",
        "short_description",
        "category",
        "benefits",
        "focus_area",
        "energy_level",
    ]

    query = Q()

    for term in expanded_terms:
        for field in searchable_fields:
            query |= Q(**{f"{field}__icontains": term})

    if not query:
        return []

    candidates = Asana.objects.filter(
        is_active=True
    ).filter(query).distinct()

    ranked = []

    for asana in candidates:
        score = 0

        field_weights = {
            "name": 5,
            "sanskrit_name": 2,
            "short_description": 3,
            "category": 3,
            "benefits": 4,
            "focus_area": 5,
            "energy_level": 2,
        }

        for field, weight in field_weights.items():
            value = str(getattr(asana, field, "") or "").lower()

            for term in terms:
                if term in value:
                    score += weight

            for term in expanded_terms - terms:
                if term in value:
                    score += weight

        if score > 0:
            ranked.append((score, asana))

    # Highest relevance first; use the name for stable tie-breaking.
    ranked.sort(key=lambda item: (-item[0], item[1].name.lower()))

    results = [asana for _, asana in ranked[:limit]]

    return [
        {
            "id": asana.id,
            "name": asana.name,
            "sanskrit_name": asana.sanskrit_name,
            "description": asana.short_description,
            "category": asana.category,
            "difficulty": asana.difficulty,
            "benefits": asana.benefits,
            "instructions": asana.instructions,
            "duration_seconds": asana.duration_seconds,
            "focus_area": asana.focus_area,
            "energy_level": asana.energy_level,
            "contraindications": asana.contraindications,
            "modifications": asana.modifications,
            "precautions": asana.precautions,
            "url": f"/asanas/{asana.id}",
        }
        for asana in results
    ]


# ---------------------------------------------------------
# AI WELLNESS CHAT
# ---------------------------------------------------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_wellness_chat(request):

    message = str(request.data.get("message", "")).strip()
    mood = str(request.data.get("mood", "")).strip()

    if not message and not mood:
        return Response(
            {"error": "Please provide a message or mood."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    api_key = getattr(settings, "GROQ_API_KEY", None)

    if not api_key:
        return Response(
            {"error": "GROQ API key is not configured."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    try:
        # Get the user's recent meditation history.
        recent_sessions = (
            MeditationSession.objects
            .filter(user=request.user)
            .order_by("-completed_at")[:5]
        )

        recent_history = []

        for session in recent_sessions:
            recent_history.append({
                "session_type": (
                    session.get_session_type_display()
                ),
                "duration_minutes": session.duration_minutes,
                "completed_at": (
                    session.completed_at.isoformat()
                    if session.completed_at
                    else None
                ),
            })


        # Fetch relevant yoga poses from the actual FlowState database.
        relevant_asanas = get_relevant_asanas(
            message=message,
            mood=mood,
            limit=5,
        )

        asanas_context = json.dumps(
            relevant_asanas,
            indent=2,
            ensure_ascii=False,
        )


        prompt = f"""
You are FlowState AI, a supportive wellness assistant.

Help the user with general mental wellness, stress management,
relaxation, meditation, yoga, recovery, and healthy habits.

USER MESSAGE:
{message or "The user selected a mood but did not write a message."}

SELECTED MOOD:
{mood or "Not provided"}

RECENT MEDITATION HISTORY:
{json.dumps(recent_history, indent=2)}


AVAILABLE YOGA ASANAS FROM THE FLOWSTATE DATABASE:
{asanas_context}

ASANA RECOMMENDATION RULES:
- Recommend only poses included in the database data above.
- Never invent an asana name, database ID, benefit, instruction, or safety detail.
- Use the real database ID when linking to an asana.
- Internal asana links must use the format /asanas/REAL_DATABASE_ID.
- Consider contraindications and precautions before recommending a pose.
- If no relevant asanas are available, do not invent yoga poses.
- If no suitable internal content exists, you may suggest a trustworthy external resource.
- If the database contains no suitable poses, provide safe general wellness guidance instead.


FLOWSTATE FEATURES:
- /yoga — yoga practices
- /meditation — guided meditation
- /deep-dive — focused wellness sessions
- /knowledge-hub — educational wellness articles

GUIDELINES:
- Be warm, empathetic, clear, and practical.
- Personalize suggestions using the supplied history when relevant.
- Never invent user activity or claim to have accessed unavailable records.
- Do not diagnose medical conditions or prescribe treatment.
- For serious or immediate danger, encourage contacting local emergency
  services or a trusted person.
- Suggest an internal FlowState feature only when it is relevant.
- Keep the reply concise and useful.
- Use an external source only when genuinely helpful.



Return ONLY valid JSON with this structure:
{{
    "reply": "A friendly conversational response.",
    "intent": "practice",
    "recommendation": {{
        "title": "A title based on the available database content",
        "description": "A short explanation using database information",
        "asana_ids": [12]
    }},
    "action": {{
        "type": "internal",
        "label": "View recommended pose",
        "route": "/asanas/12"
    }}
}}


Rules:
- recommendation must be null if no suitable database asana exists.
- asana_ids must contain only IDs from the supplied database data.
- Include at most three recommended asana IDs.
- Never invent asana IDs, pose names, benefits, or instructions.
- Only recommend poses suitable for the user's stated needs.
- If no suitable database pose exists, offer general wellness guidance.
- Use an asana-specific action only when its ID is in asana_ids.
- Otherwise use a relevant existing FlowState route or null.
- External actions must use an allowed trusted source key.
- Return JSON only, without Markdown fences.
"""

        client = Groq(api_key=api_key)

        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            max_completion_tokens=1000,
        )

        raw_output = (
            completion.choices[0].message.content or ""
        ).strip()

        # Remove optional Markdown code fences.
        if raw_output.startswith("```json"):
            raw_output = raw_output[7:].strip()
        elif raw_output.startswith("```"):
            raw_output = raw_output[3:].strip()

        if raw_output.endswith("```"):
            raw_output = raw_output[:-3].strip()

        ai_data = json.loads(raw_output)

        reply = str(
            ai_data.get(
                "reply",
                "I'm here to help you with your wellness journey.",
            )
        )

       
        # Validate the AI recommendation against real database records.
        raw_recommendation = ai_data.get("recommendation")
        recommendation = None
        action = build_action(ai_data)

        if isinstance(raw_recommendation, dict) and relevant_asanas:
            allowed_asanas = {
                item["id"]: item for item in relevant_asanas
            }

            requested_ids = raw_recommendation.get("asana_ids", [])

            if isinstance(requested_ids, list):
                verified_ids = []

                for asana_id in requested_ids[:3]:
                    if (
                        isinstance(asana_id, int)
                        and not isinstance(asana_id, bool)
                        and asana_id in allowed_asanas
                    ):
                        if asana_id not in verified_ids:
                            verified_ids.append(asana_id)

                if verified_ids:
                    first_asana = allowed_asanas[verified_ids[0]]

                    recommendation = {
                        "title": first_asana["name"],
                        "description": first_asana["description"],
                        "type": first_asana["category"],
                        "duration": max(
                            1,
                            round(first_asana["duration_seconds"] / 60),
                        ) if first_asana["duration_seconds"] else None,
                        "asana_ids": verified_ids,
                        "asanas": [
                            allowed_asanas[asana_id]
                            for asana_id in verified_ids
                        ],
                    }

                    # Build the action using a verified database ID.
                    action = {
                        "type": "internal",
                        "label": first_asana["name"],
                        "route": first_asana["url"],
                    }

        return Response(
            {
                "reply": reply,
                "intent": ai_data.get("intent", "practice"),
                "recommendation": recommendation,
                "action": action,
            },
            status=status.HTTP_200_OK,
        )
    except Exception:
        logger.exception("AI wellness chat request failed")
        return Response(
            {"error": "Unable to process your wellness request right now."},
            status=status.HTTP_502_BAD_GATEWAY,
        )

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def daily_routine(request):

    # =========================================================
    # 0. START
    # =========================================================

    print("🔥 DAILY ROUTINE VIEW REACHED")

    user = request.user

    # =========================================================
    # 1. GET AVAILABLE TIME
    # =========================================================

    try:

        available_minutes = int(
            request.data.get(
                "available_minutes",
                30
            )
        )

    except (TypeError, ValueError):

        return Response(
            {
                "error": (
                    "Please select a valid amount "
                    "of available time."
                )
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    allowed_minutes = [
        10,
        20,
        30,
        45,
        60
    ]

    if available_minutes not in allowed_minutes:

        return Response(
            {
                "error": (
                    "Available time must be "
                    "10, 20, 30, 45 or 60 minutes."
                )
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    print(
        "🔥 AVAILABLE TIME:",
        available_minutes,
        "minutes"
    )

    # =========================================================
    # 2. GROQ API KEY
    # =========================================================

    api_key = getattr(
        settings,
        "GROQ_API_KEY",
        None
    )

    if not api_key:

        return Response(
            {
                "error": (
                    "GROQ API key is not configured."
                )
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    # =========================================================
    # 3. TODAY WELLNESS
    # =========================================================

    try:

        today = timezone.localdate()

        wellness = (
            DailyWellness.objects
            .filter(
                user=user,
                date=today
            )
            .first()
        )

        if wellness:

            sleep_hours = float(
                wellness.sleep_hours or 0
            )

            water_cups = int(
                wellness.water_cups or 0
            )

            streak_days = int(
                wellness.streak_days or 0
            )

            wellness_score = int(
                wellness.wellness_score or 0
            )

            today_sessions = int(
                wellness.sessions or 0
            )

        else:

            sleep_hours = 0
            water_cups = 0
            streak_days = 0
            wellness_score = 0
            today_sessions = 0

        print(
            "🔥 WELLNESS DATA READY"
        )

    except Exception as error:

        print(
            "❌ WELLNESS DATA ERROR:",
            repr(error)
        )

        return Response(
            {
                "error":
                    "Unable to read wellness data."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    # =========================================================
    # 4. RECENT YOGA
    # =========================================================

    try:

        recent_yoga = (
            YogaSession.objects
            .filter(user=user)
            .order_by("-completed_at")[:10]
        )

        yoga_history = []

        for session in recent_yoga:

            yoga_history.append(
                {
                    "session_type": (
                        session.get_session_type_display()
                        if hasattr(
                            session,
                            "get_session_type_display"
                        )
                        else str(session)
                    ),

                    "duration_minutes":
                        getattr(
                            session,
                            "duration_minutes",
                            None
                        ),

                    "completed_at": (
                        session.completed_at.isoformat()
                        if getattr(
                            session,
                            "completed_at",
                            None
                        )
                        else None
                    ),
                }
            )

    except Exception as error:

        print(
            "❌ YOGA DATA ERROR:",
            repr(error)
        )

        yoga_history = []

    # =========================================================
    # 5. RECENT MEDITATION
    # =========================================================

    try:

        recent_meditation = (
            MeditationSession.objects
            .filter(user=user)
            .order_by("-completed_at")[:10]
        )

        meditation_history = []

        for session in recent_meditation:

            meditation_history.append(
                {
                    "session_type":
                        session.get_session_type_display(),

                    "duration_minutes":
                        session.duration_minutes,

                    "completed_at": (
                        session.completed_at.isoformat()
                        if session.completed_at
                        else None
                    ),
                }
            )

    except Exception as error:

        print(
            "❌ MEDITATION DATA ERROR:",
            repr(error)
        )

        meditation_history = []

    # =========================================================
    # 6. MEDITATION STATISTICS
    # =========================================================

    try:

        all_meditation = (
            MeditationSession.objects
            .filter(user=user)
        )

        total_meditation_sessions = (
            all_meditation.count()
        )

        total_meditation_minutes = 0

        for session in all_meditation:

            if session.duration_minutes:

                total_meditation_minutes += int(
                    session.duration_minutes
                )

    except Exception as error:

        print(
            "❌ MEDITATION STATISTICS ERROR:",
            repr(error)
        )

        total_meditation_sessions = 0
        total_meditation_minutes = 0

    # =========================================================
    # 7. BUILD USER DATA
    # =========================================================

    user_data = {

        "today":
            today.isoformat(),

        "available_minutes":
            available_minutes,

        "today_wellness": {

            "sleep_hours":
                sleep_hours,

            "water_cups":
                water_cups,

            "streak_days":
                streak_days,

            "wellness_score":
                wellness_score,

            "today_sessions":
                today_sessions,
        },

        "meditation": {

            "total_sessions":
                total_meditation_sessions,

            "total_minutes":
                total_meditation_minutes,

            "recent_sessions":
                meditation_history,
        },

        "recent_yoga":
            yoga_history,
    }

    print(
        "🔥 USER DATA:"
    )

    print(
        json.dumps(
            user_data,
            indent=2
        )
    )

    # =========================================================
    # 8. GROQ CLIENT
    # =========================================================

    try:

        client = Groq(
            api_key=api_key
        )

        # =====================================================
        # 9. PROMPT
        # =====================================================

        prompt = f"""
You are FlowState AI, a personalized daily wellness planner.

Create a wellness routine using the user's real FlowState data.

The user has exactly {available_minutes} minutes available
for wellness today.

IMPORTANT:

The total duration of every activity combined MUST be exactly
{available_minutes} minutes.

Do not exceed the available time.

Do not create less than the available time.

USER DATA:

{json.dumps(user_data, indent=2)}

=========================================================
PERSONALIZATION
=========================================================

Consider:

- sleep hours
- water intake
- wellness score
- current streak
- today's sessions
- recent yoga activity
- recent meditation activity
- total meditation experience
- available time

The routine must feel personalized.

Do not give every user the same routine.

=========================================================
WELLNESS RULES
=========================================================

If sleep is low:

- prefer gentle activities
- avoid intense exercise
- consider breathing or relaxation

If wellness score is low:

- keep the routine simple
- avoid overwhelming the user

If recent activity is low:

- include beginner-friendly movement

If the user is consistently active:

- maintain their routine consistency

If the user has many meditation sessions:

- do not make the entire routine meditation
- balance meditation with movement or recovery

=========================================================
ACTIVITIES
=========================================================

Possible activities:

- Breathing
- Meditation
- Gentle Yoga
- Yoga Flow
- Mindful Break
- Stretching
- Relaxation
- Walking
- Sleep Preparation

=========================================================
IMPORTANT DISPLAY RULE
=========================================================

DO NOT create exact clock times.

Do NOT use:

- 3:15 AM
- 5:00 PM
- 9:30 PM
- 7:30 AM

The user does NOT want a scheduled timetable.

Only provide:

Activity
Duration
Reason

=========================================================
DURATION
=========================================================

The total duration must equal exactly:

{available_minutes} minutes.

Examples:

10 minutes:
5 + 5

20 minutes:
5 + 5 + 10

30 minutes:
5 + 10 + 15

45 minutes:
5 + 10 + 15 + 15

60 minutes:
10 + 10 + 15 + 15 + 10

These are only examples.

Choose the best distribution according to
the user's wellness data.

=========================================================
NUMBER OF ACTIVITIES
=========================================================

Use 2 to 5 activities.

Keep the routine realistic.

=========================================================
SAFETY
=========================================================

Do not diagnose medical conditions.

Do not prescribe medical treatment.

Give general wellness guidance only.

=========================================================
RESPONSE
=========================================================

Return ONLY valid JSON.

No markdown.

No code fences.

No explanation outside JSON.

Use exactly:

{{
    "summary": "Short personalized explanation.",
    "routine": [
        {{
            "activity": "Breathing",
            "duration": 5,
            "reason": "Helps reduce tension and improve focus."
        }}
    ]
}}

Rules:

- activity must be simple
- duration must be an integer
- duration must be in minutes
- reason must be short
- no time field
- total duration MUST equal {available_minutes}
"""

        print(
            "🔥 SENDING ROUTINE REQUEST TO GROQ"
        )

        # =====================================================
        # 10. GROQ REQUEST
        # =====================================================

        completion = (
            client.chat.completions.create(
                model="openai/gpt-oss-120b",

                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],

                max_completion_tokens=1200,
            )
        )

        print(
            "🔥 GROQ RESPONSE RECEIVED"
        )

        raw_output = (
            completion
            .choices[0]
            .message
            .content
            .strip()
        )

        print(
            "🔥 RAW OUTPUT:",
            raw_output
        )

        # =====================================================
        # 11. CLEAN JSON
        # =====================================================

        if raw_output.startswith(
            "```json"
        ):

            raw_output = raw_output[7:]

        if raw_output.startswith(
            "```"
        ):

            raw_output = raw_output[3:]

        if raw_output.endswith(
            "```"
        ):

            raw_output = raw_output[:-3]

        raw_output = raw_output.strip()

        # =====================================================
        # 12. PARSE
        # =====================================================

        ai_data = json.loads(
            raw_output
        )

        routine = ai_data.get(
            "routine",
            []
        )

        if not isinstance(
            routine,
            list
        ):

            routine = []

        # =====================================================
        # 13. CLEAN ROUTINE
        # =====================================================

        cleaned_routine = []

        for item in routine:

            if not isinstance(
                item,
                dict
            ):
                continue

            try:

                duration = int(
                    item.get(
                        "duration",
                        0
                    )
                )

            except (
                TypeError,
                ValueError
            ):

                continue

            if duration <= 0:
                continue

            cleaned_routine.append(
                {
                    "activity":
                        str(
                            item.get(
                                "activity",
                                "Wellness Practice"
                            )
                        ),

                    "duration":
                        duration,

                    "reason":
                        str(
                            item.get(
                                "reason",
                                "Supports your daily wellness."
                            )
                        ),
                }
            )

        # =====================================================
        # 14. CALCULATE TOTAL
        # =====================================================

        total_duration = sum(
            item["duration"]
            for item in cleaned_routine
        )

        print(
            "🔥 TOTAL ROUTINE DURATION:",
            total_duration
        )

        # =====================================================
        # 15. STRICT TIME VALIDATION
        # =====================================================

        if total_duration != available_minutes:

            print(
                "❌ ROUTINE DURATION MISMATCH"
            )

            print(
                "Expected:",
                available_minutes
            )

            print(
                "Received:",
                total_duration
            )

            return Response(
                {
                    "error": (
                        "The AI generated a routine that "
                        "did not match your selected time. "
                        "Please generate it again."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # =====================================================
        # 16. SUCCESS
        # =====================================================

        print(
            "✅ ROUTINE VALIDATED"
        )

        return Response(
            {
                "summary": ai_data.get(
                    "summary",
                    "Here is a personalized wellness routine based on your FlowState activity."
                ),

                "available_minutes":
                    available_minutes,

                "total_duration":
                    total_duration,

                "routine":
                    cleaned_routine,
            },
            status=status.HTTP_200_OK
        )

    # =========================================================
    # 17. INVALID JSON
    # =========================================================

    except json.JSONDecodeError as error:

        print(
            "❌ INVALID GROQ JSON:",
            repr(error)
        )

        return Response(
            {
                "error": (
                    "FlowState AI returned an invalid "
                    "routine format. Please try again."
                )
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    # =========================================================
    # 18. OTHER ERROR
    # =========================================================

    except Exception as error:

        print(
            "❌ DAILY ROUTINE ERROR:",
            repr(error)
        )

        error_message = str(
            error
        ).lower()

        # -----------------------------------------------------
        # RATE LIMIT
        # -----------------------------------------------------

        if (
            "429" in error_message
            or "too_many_requests" in error_message
            or "quota" in error_message
            or "rate limit" in error_message
        ):

            return Response(
                {
                    "error": (
                        "FlowState AI is temporarily unavailable "
                        "because the GROQ API quota has been reached. "
                        "Please try again later."
                    )
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        # -----------------------------------------------------
        # AUTH ERROR
        # -----------------------------------------------------

        if (
            "api key" in error_message
            or "api_key" in error_message
            or "authentication" in error_message
            or "unauthorized" in error_message
        ):

            return Response(
                {
                    "error": (
                        "The GROQ API authentication "
                        "configuration needs attention."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # -----------------------------------------------------
        # GENERAL ERROR
        # -----------------------------------------------------

        return Response(
            {
                "error": (
                    "FlowState AI is temporarily unavailable. "
                    "Please try again."
                )
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
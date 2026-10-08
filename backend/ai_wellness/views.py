import json
from datetime import datetime

from django.conf import settings

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from google import genai

from meditation.models import MeditationSession


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
    Validate the action returned by Gemini.

    Gemini should decide the user's intent,
    but Django controls which routes and external
    websites are actually allowed.
    """

    intent = ai_data.get("intent", "practice")
    action_data = ai_data.get("action", {})

    action_type = action_data.get("type")

    # -----------------------------------------------------
    # INTERNAL ACTION
    # -----------------------------------------------------

    if action_type == "internal":

        route = action_data.get("route", "")

        # Exact allowed route
        if route in ALLOWED_INTERNAL_ROUTES:

            return {
                "type": "internal",
                "label": action_data.get(
                    "label",
                    ALLOWED_INTERNAL_ROUTES[route],
                ),
                "route": route,
            }

        # Knowledge Hub article routes
        if route.startswith("/knowledge-hub/article/"):

            slug = route.replace(
                "/knowledge-hub/article/",
                "",
                1,
            ).strip("/")

            # Prevent empty or suspicious routes
            if slug and "/" not in slug:

                return {
                    "type": "internal",
                    "label": action_data.get(
                        "label",
                        "Learn in Knowledge Hub",
                    ),
                    "route": f"/knowledge-hub/article/{slug}",
                }

        # Invalid route
        return None

    # -----------------------------------------------------
    # EXTERNAL ACTION
    # -----------------------------------------------------

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

    # -----------------------------------------------------
    # NO ACTION
    # -----------------------------------------------------

    return None


# ---------------------------------------------------------
# AI WELLNESS CHAT
# ---------------------------------------------------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_wellness_chat(request):

    # ---------------------------------------------------------
    # 1. GET USER INPUT
    # ---------------------------------------------------------

    message = request.data.get("message", "").strip()
    mood = request.data.get("mood", "").strip()

    if not message and not mood:
        return Response(
            {
                "error": "Please provide a message or mood."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    # ---------------------------------------------------------
    # 2. CHECK GEMINI API KEY
    # ---------------------------------------------------------

    api_key = getattr(
        settings,
        "GEMINI_API_KEY",
        None,
    )

    if not api_key:
        return Response(
            {
                "error": "Gemini API key is not configured."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    # ---------------------------------------------------------
    # 3. GET USER'S MEDITATION HISTORY
    # ---------------------------------------------------------

    recent_sessions = (
        MeditationSession.objects
        .filter(user=request.user)
        .order_by("-completed_at")[:5]
    )

    recent_history = []

    for session in recent_sessions:

        recent_history.append(
            {
                "session_type":
                    session.get_session_type_display(),

                "duration_minutes":
                    session.duration_minutes,

                "completed_at":
                    session.completed_at.isoformat(),
            }
        )

    # ---------------------------------------------------------
    # 4. GET OVERALL MEDITATION STATISTICS
    # ---------------------------------------------------------

    all_sessions = MeditationSession.objects.filter(
        user=request.user
    )

    total_sessions = all_sessions.count()

    total_minutes = sum(
        session.duration_minutes
        for session in all_sessions
    )

    # ---------------------------------------------------------
    # 5. GET CURRENT TIME CONTEXT
    # ---------------------------------------------------------

    current_time = datetime.now()

    current_hour = current_time.hour

    if current_hour < 12:
        time_of_day = "morning"

    elif current_hour < 17:
        time_of_day = "afternoon"

    elif current_hour < 21:
        time_of_day = "evening"

    else:
        time_of_day = "night"

    # ---------------------------------------------------------
    # 6. BUILD USER INPUT
    # ---------------------------------------------------------

    user_input = ""

    if mood:
        user_input += (
            f"Current mood: {mood}\n"
        )

    if message:
        user_input += (
            f"User says: {message}"
        )

    # ---------------------------------------------------------
    # 7. CALL GEMINI
    # ---------------------------------------------------------

    try:

        client = genai.Client(
            api_key=api_key
        )

        prompt = f"""
You are FlowState AI.

You are the wellness assistant inside the
FlowState yoga, meditation and mental-wellness
platform.

Your job is to understand the user's natural language
and provide useful wellness guidance.

The user may type:

- one word
- a short sentence
- incorrect grammar
- spelling mistakes
- casual language
- incomplete sentences
- mixed language

Understand the intended meaning naturally.

Examples:

"stress"

"i am stresed"

"cant sleep"

"mala khup tension ahe"

"what yoga good for back pain"

"meditation mhnje kay"

"i feel tired"

Do NOT criticize grammar or spelling.

---------------------------------------------------------
FLOWSTATE SCOPE
---------------------------------------------------------

FlowState focuses mainly on:

- yoga
- meditation
- breathing
- relaxation
- stress management
- general wellness
- gentle movement
- physical recovery
- sleep and relaxation
- yoga philosophy
- yoga knowledge
- mindfulness

Stay within this scope.

Do not behave like a general-purpose chatbot.

If the question is unrelated to FlowState's purpose,
politely explain that FlowState focuses on wellness,
yoga and meditation.

For useful topics outside FlowState's own content,
you may provide a trusted external source.

---------------------------------------------------------
INTENT
---------------------------------------------------------

Choose exactly ONE intent:

practice
knowledge
external
unsupported

Use:

practice
when the user needs an action or wellness practice.

knowledge
when the user is asking about yoga, meditation,
breathing, philosophy or wellness information.

external
when useful information is outside FlowState's
covered content but a trusted external source
would help.

unsupported
when the request is clearly unrelated to
FlowState's purpose.

---------------------------------------------------------
PRACTICE
---------------------------------------------------------

If intent is "practice", choose exactly ONE:

meditation
breathing
yoga
deep_dive

Do not give multiple practice recommendations.

---------------------------------------------------------
KNOWLEDGE HUB
---------------------------------------------------------

When intent is "knowledge", prefer the FlowState
Knowledge Hub when the topic matches one of these
available articles:

what-is-yoga

understanding-pranayama

yoga-sutras

bhagavad-gita

upanishadic-wisdom

Examples:

If the user asks:
"What is yoga?"

use:

/knowledge-hub/article/what-is-yoga

If the user asks:
"What is pranayama?"

use:

/knowledge-hub/article/understanding-pranayama

If the user asks:
"Tell me about Yoga Sutras"

use:

/knowledge-hub/article/yoga-sutras

If the question is about yoga knowledge but does not
clearly match one of these articles, use:

/knowledge-hub

Do not invent article slugs.

---------------------------------------------------------
EXTERNAL SOURCES
---------------------------------------------------------

For intent "external", choose exactly ONE source_key:

nccih
pubmed
who

Use the source that is most appropriate.

Do NOT create URLs yourself.

Only return the source_key.

The backend will convert the source_key
into the actual trusted URL.

---------------------------------------------------------
ACTION
---------------------------------------------------------

For practice:

meditation → /meditation

breathing → /meditation

yoga → /yoga

deep_dive → /deep-dive

For knowledge:

use the appropriate Knowledge Hub article route.

For unsupported:

there may be no action.

For external:

return source_key only.

---------------------------------------------------------
SAFETY
---------------------------------------------------------

Do not diagnose medical or mental-health conditions.

Do not claim to be a doctor or therapist.

Do not prescribe medication.

If the user describes immediate danger,
serious emergency or self-harm risk,
encourage them to contact appropriate emergency
or professional support.

---------------------------------------------------------
USER CURRENT SITUATION
---------------------------------------------------------

{user_input}

---------------------------------------------------------
USER MEDITATION HISTORY
---------------------------------------------------------

{recent_history}

Total meditation sessions:
{total_sessions}

Total meditation minutes:
{total_minutes}

---------------------------------------------------------
TIME CONTEXT
---------------------------------------------------------

Current time:
{current_time.strftime("%I:%M %p")}

Time of day:
{time_of_day}

---------------------------------------------------------
PERSONALIZATION
---------------------------------------------------------

Use the user's current message and mood first.

Use meditation history as supporting context.

Consider time of day as supporting context.

Do not assume the user needs meditation simply
because they have meditation history.

Do not mention database details.

Do not expose private technical information.

---------------------------------------------------------
RESPONSE FORMAT
---------------------------------------------------------

Return ONLY valid JSON.

Use exactly this structure:

{{
    "reply": "Short helpful response",
    "intent": "practice",
    "recommendation": {{
        "type": "meditation",
        "title": "5-Minute Calm Reset",
        "duration": 5
    }},
    "action": {{
        "type": "internal",
        "label": "Start Meditation",
        "route": "/meditation"
    }}
}}

For knowledge:

{{
    "reply": "Short explanation",
    "intent": "knowledge",
    "recommendation": null,
    "action": {{
        "type": "internal",
        "label": "Learn in Knowledge Hub",
        "route": "/knowledge-hub/article/understanding-pranayama"
    }}
}}

For external:

{{
    "reply": "Short helpful explanation",
    "intent": "external",
    "recommendation": null,
    "action": {{
        "type": "external",
        "label": "Explore Trusted Information",
        "source_key": "nccih"
    }}
}}

For unsupported:

{{
    "reply": "FlowState focuses on yoga, meditation and wellness.",
    "intent": "unsupported",
    "recommendation": null,
    "action": null
}}

Rules:

- Return valid JSON only.
- No markdown.
- No code fences.
- Do not include text outside JSON.
- Do not provide multiple recommendations.
- duration must be a number.
- Use only the allowed internal routes.
- Do not invent Knowledge Hub article slugs.
- For external sources use only:
  nccih, pubmed, who.
"""

        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=prompt,
        )

        # -----------------------------------------------------
        # 8. GET GEMINI RESPONSE
        # -----------------------------------------------------

        raw_output = interaction.output_text.strip()

        # -----------------------------------------------------
        # 9. REMOVE CODE FENCES IF GEMINI ADDS THEM
        # -----------------------------------------------------

        if raw_output.startswith("```json"):
            raw_output = raw_output[7:]

        if raw_output.startswith("```"):
            raw_output = raw_output[3:]

        if raw_output.endswith("```"):
            raw_output = raw_output[:-3]

        raw_output = raw_output.strip()

        # -----------------------------------------------------
        # 10. PARSE JSON
        # -----------------------------------------------------

        ai_data = json.loads(raw_output)

        # -----------------------------------------------------
        # 11. GET DATA
        # -----------------------------------------------------

        reply = ai_data.get(
            "reply",
            "",
        )

        intent = ai_data.get(
            "intent",
            "unsupported",
        )

        recommendation = ai_data.get(
            "recommendation"
        )

        # -----------------------------------------------------
        # 12. VALIDATE INTENT
        # -----------------------------------------------------

        allowed_intents = {
            "practice",
            "knowledge",
            "external",
            "unsupported",
        }

        if intent not in allowed_intents:
            intent = "unsupported"
            recommendation = None
            ai_data["action"] = None

        # -----------------------------------------------------
        # 13. VALIDATE RECOMMENDATION
        # -----------------------------------------------------

        if intent == "practice":

            allowed_types = {
                "meditation",
                "breathing",
                "yoga",
                "deep_dive",
            }

            if not isinstance(
                recommendation,
                dict
            ):

                recommendation = None

            elif recommendation.get("type") not in allowed_types:

                recommendation = None

        else:

            recommendation = None

        # -----------------------------------------------------
        # 14. BUILD SAFE ACTION
        # -----------------------------------------------------

        action = build_action(ai_data)

        # -----------------------------------------------------
        # 15. RETURN RESPONSE
        # -----------------------------------------------------

        return Response(
            {
                "reply": reply,
                "intent": intent,
                "recommendation": recommendation,
                "action": action,
            },
            status=status.HTTP_200_OK,
        )

    # ---------------------------------------------------------
    # 16. INVALID JSON
    # ---------------------------------------------------------

    except json.JSONDecodeError:

        print(
            "Gemini returned invalid JSON:"
        )

        print(raw_output)

        return Response(
            {
                "error":
                    "FlowState AI returned an invalid "
                    "response format."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    # ---------------------------------------------------------
    # 17. OTHER ERRORS
    # ---------------------------------------------------------

    except Exception as error:

        print("Gemini Error:", repr(error))

        error_message = str(error).lower()

        # Gemini rate-limit / quota error
        if (
            "429" in error_message
            or "too_many_requests" in error_message
            or "quota" in error_message
            or "rate limit" in error_message
        ):
            return Response(
                {
                    "error": (
                        "FlowState AI is temporarily unavailable because "
                        "the Gemini API quota has been reached. "
                        "Please try again later."
                    )
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        # Other unexpected Gemini errors
        return Response(
            {
                "error": (
                    "FlowState AI is temporarily unavailable. "
                    "Please try again."
                )
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
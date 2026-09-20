import json
from datetime import datetime

from django.conf import settings

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from google import genai

from meditation.models import MeditationSession


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

    api_key = getattr(settings, "GEMINI_API_KEY", None)

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

    recent_sessions = MeditationSession.objects.filter(
        user=request.user
    ).order_by("-completed_at")[:5]

    recent_history = []

    for session in recent_sessions:
        recent_history.append(
            {
                "session_type": session.get_session_type_display(),
                "duration_minutes": session.duration_minutes,
                "completed_at": session.completed_at.isoformat(),
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
    # 6. SEND DATA TO GEMINI
    # ---------------------------------------------------------

    try:

        client = genai.Client(
            api_key=api_key
        )

        # -----------------------------------------------------
        # Build user's current input
        # -----------------------------------------------------

        user_input = ""

        if mood:
            user_input += f"Current mood: {mood}\n"

        if message:
            user_input += f"User says: {message}"

        # -----------------------------------------------------
        # Gemini Prompt
        # -----------------------------------------------------

        prompt = f"""
You are FlowState AI, a wellness assistant inside the FlowState
mental wellness and yoga platform.

Your purpose is to help users with everyday wellness situations such as:

- stress
- anxiety
- tiredness
- low energy
- difficulty relaxing
- sleep and relaxation
- general physical soreness
- meditation
- breathing exercises
- yoga
- gentle movement
- recovery

Analyze the user's current situation and give ONE clear personalized
wellness recommendation.

Do not give a list of different practices.

Possible recommendation types are:

- meditation
- breathing
- yoga
- deep_dive

Choose the single most suitable type.

---------------------------------------------------------
SAFETY
---------------------------------------------------------

Do not diagnose medical or mental health conditions.

Do not claim to be a doctor or therapist.

If the user describes a serious emergency or immediate danger,
encourage them to contact appropriate emergency or professional
support.

---------------------------------------------------------
CURRENT USER SITUATION
---------------------------------------------------------

The user's current situation is:

{user_input}

---------------------------------------------------------
USER'S RECENT MEDITATION HISTORY
---------------------------------------------------------

{recent_history}

---------------------------------------------------------
USER'S OVERALL MEDITATION STATISTICS
---------------------------------------------------------

Total meditation sessions: {total_sessions}

Total meditation minutes: {total_minutes}

---------------------------------------------------------
CURRENT TIME CONTEXT
---------------------------------------------------------

Current time:

{current_time.strftime("%I:%M %p")}

Time of day:

{time_of_day}

---------------------------------------------------------
PERSONALIZATION RULES
---------------------------------------------------------

Use the user's recent activity as supporting context when choosing
the ONE recommendation.

Consider the time of day when selecting the recommendation,
but do not let time override the user's current mood or message.

Consider the current mood and message first.

Use meditation history only as additional context.

Do not assume that the user needs meditation simply because they
have meditation history.

Do not mention private technical details or database information
to the user.

Do not mention the user's meditation statistics directly unless
it is useful and natural.

---------------------------------------------------------
RESPONSE FORMAT
---------------------------------------------------------

Return ONLY valid JSON.

The JSON must follow exactly this structure:

{{
    "reply": "A short supportive explanation for the user.",
    "recommendation": {{
        "type": "meditation",
        "title": "Short practice title",
        "duration": 5
    }}
}}

Rules:

- "reply" must be concise and supportive.
- "type" must be exactly one of:
  meditation, breathing, yoga, deep_dive
- "title" should describe the recommended practice.
- "duration" must be the approximate duration in minutes.
- "duration" must be a number.
- Do not include markdown.
- Do not include ```json.
- Do not include any text outside the JSON.

---------------------------------------------------------
FINAL INSTRUCTION
---------------------------------------------------------

Give the user ONE clear next action.

Do not provide multiple recommendations.
"""

        # -----------------------------------------------------
        # 7. CALL GEMINI
        # -----------------------------------------------------

        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=prompt,
        )

        # -----------------------------------------------------
        # 8. GET GEMINI RESPONSE
        # -----------------------------------------------------

        raw_output = interaction.output_text.strip()

        # -----------------------------------------------------
        # 9. REMOVE MARKDOWN CODE FENCES IF PRESENT
        # -----------------------------------------------------

        if raw_output.startswith("```json"):
            raw_output = raw_output[7:]

        if raw_output.startswith("```"):
            raw_output = raw_output[3:]

        if raw_output.endswith("```"):
            raw_output = raw_output[:-3]

        raw_output = raw_output.strip()

        # -----------------------------------------------------
        # 10. CONVERT JSON STRING TO PYTHON DICTIONARY
        # -----------------------------------------------------

        ai_data = json.loads(raw_output)

        # -----------------------------------------------------
        # 11. GET RECOMMENDATION
        # -----------------------------------------------------

        recommendation = ai_data.get(
            "recommendation",
            {}
        )

        # -----------------------------------------------------
        # 12. RETURN RESPONSE TO REACT
        # -----------------------------------------------------

        return Response(
            {
                "reply": ai_data.get(
                    "reply",
                    ""
                ),

                "recommendation": recommendation,
            },
            status=status.HTTP_200_OK,
        )

    # ---------------------------------------------------------
    # 13. INVALID GEMINI JSON
    # ---------------------------------------------------------

    except json.JSONDecodeError:

        print("Gemini returned invalid JSON:")
        print(raw_output)

        return Response(
            {
                "error": (
                    "FlowState AI returned an invalid "
                    "response format."
                )
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    # ---------------------------------------------------------
    # 14. OTHER ERRORS
    # ---------------------------------------------------------

    except Exception as e:

        print(
            "Gemini Error:",
            repr(e)
        )

        return Response(
            {
                "error": str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
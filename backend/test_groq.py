import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

print("1. Reading Groq API key...")

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    print("❌ GROQ_API_KEY NOT FOUND")
    exit()

print("2. Groq API key found")
print("3. Creating Groq client...")

client = Groq(api_key=api_key)

print("4. Client created")
print("5. Sending test request...")

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {
            "role": "user",
            "content": "Reply with exactly: Groq connection working"
        }
    ],
    max_completion_tokens=50,
)

print("6. Response received!")
print(response.choices[0].message.content)
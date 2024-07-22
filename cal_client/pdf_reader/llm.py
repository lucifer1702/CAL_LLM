from litellm import completion
import os
from prompts import summary_prompt
from dotenv import load_dotenv

load_dotenv()


def summary_model(text):
    messages = [
        {"role": "system", "content": f"{summary_prompt}"},
        {"role": "user", "content": f"{text}"},
    ]
    response = completion(
        model="gpt-4",
        messages=messages,
        max_tokens=1024,
        api_key=os.getenv("OPENAI_API_KEY"),
    )
    return response.choices[0].message.content

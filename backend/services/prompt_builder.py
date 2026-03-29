import json

SYSTEM_PROMPT_PATH = "services/system_prompt.txt"


def load_system_prompt():
    """
    Loads the system prompt from file.
    """
    try:
        with open(SYSTEM_PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        print("Error loading system prompt:", e)
        return ""


def build_analysis_input(user_data: dict) -> str:
    """
    Converts user financial data into a clean string format
    to pass into the LLM.
    """
    try:
        return json.dumps(user_data, indent=2)
    except Exception as e:
        print("Error serializing user data:", e)
        return "{}"


def build_chat_input(question: str, context: dict = None) -> str:
    """
    Builds input for chat-based queries with optional context.
    """
    try:
        base = f"User question:\n{question}\n"

        if context:
            base += "\nUser financial context:\n"
            base += json.dumps(context, indent=2)

        return base
    except Exception as e:
        print("Error building chat input:", e)
        return question
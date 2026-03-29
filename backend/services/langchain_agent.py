import json
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from schemas.financial_schema import FinancialAnalysis
from dotenv import load_dotenv
load_dotenv()

# LLM setup
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    temperature=0.2,
    
)
structured_llm = llm.with_structured_output(FinancialAnalysis)
parser = JsonOutputParser()

with open("services/system_prompt.txt") as f:
    system_prompt = f.read()

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("user", "Evaluate this financial profile:\n\n{input}")
])
chain=prompt | structured_llm
def run_agent(user_data):
    for _ in range(2):
        try:
            formatted_prompt = prompt.invoke({
                "input": json.dumps(user_data)
            })

            result = structured_llm.invoke(formatted_prompt)

            return result.dict()

        except Exception as e:
            print("Retry due to:", e)

    return fallback()
    # return fallback()

def fallback():
    return {
        "overall_score": 50,
        "summary": "We could not fully analyze your data.",
        "dimensions": {
            "emergency_preparedness": {
                "score": 40,
                "reason": "Low savings buffer",
                "actions": ["Build 3-6 months emergency fund"]
            }
        }
    }
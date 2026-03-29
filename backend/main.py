from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError

from models.user_input import UserRequest
from schemas.financial_schema import FinancialAnalysis
from services.langchain_agent import run_agent

app = FastAPI()

# ✅ CORS FIX (MANDATORY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ FIXED ROUTE
@app.post("/api/analyze", response_model=FinancialAnalysis)
def analyze_financials(request: UserRequest):
    try:
        user_data = request.model_dump(by_alias=True)

        income = user_data["user"]["monthly_income"]
        expenses = user_data["user"]["monthly_expenses"]

        if expenses > income:
            raise HTTPException(
                status_code=400,
                detail="Expenses cannot exceed income"
            )

        surplus = income - expenses
        user_data["user"]["monthly_surplus"] = surplus

        raw_result = run_agent(user_data)

        

        return raw_result

    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
from pydantic import BaseModel, Field
from typing import List, Literal


# -----------------------------
# Nested Models
# -----------------------------

class Goal(BaseModel):
    name: str
    amount: float = Field(..., ge=0)
    timeline_years: int = Field(..., ge=1)


class Investments(BaseModel):
    equity: float = Field(..., ge=0)
    mutual_funds: float = Field(..., ge=0)
    fixed_deposits: float = Field(..., ge=0)


class RetirementGoal(BaseModel):
    target_age: int = Field(..., ge=1)
    target_corpus: float = Field(..., ge=0)


class Debt(BaseModel):
    amount: float = Field(..., ge=0)
    interest_rate: float = Field(..., ge=0)
    emi: float = Field(..., ge=0)
    type: Literal["personal_loan", "home", "credit_card"]


class Insurance(BaseModel):
    health: bool
    life: bool


class TaxSavingInstruments(BaseModel):
    # 🔥 Use alias to match JSON keys like "80C"
    sec_80C: float = Field(..., alias="80C", ge=0)
    sec_80D: float = Field(..., alias="80D", ge=0)
    NPS: float = Field(..., ge=0)

    class Config:
        populate_by_name = True


# -----------------------------
# Main User Model
# -----------------------------

class User(BaseModel):
    age: int = Field(..., ge=1)

    profession: Literal[
        "student", "salaried", "freelancer", "business"
    ]

    monthly_income: float = Field(..., ge=0)
    monthly_expenses: float = Field(..., ge=0)
    emergency_fund: float = Field(..., ge=0)

    risk_profile: Literal["low", "medium", "high"]
    dependents: int = Field(..., ge=0)

    life_event: Literal[
        "none", "marriage", "child", "home", "bonus"
    ]

    tax_regime: Literal["old", "new", "unknown"]

    investments: Investments

    retirement_savings: float = Field(..., ge=0)
    retirement_goal: RetirementGoal

    debt:List[Debt]=[]
    insurance: Insurance

    tax_saving_instruments: TaxSavingInstruments

    goals: List[Goal]


# -----------------------------
# Wrapper (same as CLI output)
# -----------------------------

class UserRequest(BaseModel):
    user: User
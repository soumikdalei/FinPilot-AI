from pydantic import BaseModel, Field, model_validator
from typing import List, Optional, Annotated


# =============================
# Dimension Models
# =============================

class Dimension(BaseModel):
    score: int = Field(..., ge=0, le=100)
    reason: str
    # 🔧 allow flexibility (avoid crashes)
    actions: Annotated[List[str], Field(min_length=2, max_length=4)]


class Dimensions(BaseModel):
    emergency_preparedness: Dimension
    insurance_coverage: Dimension
    investment_diversification: Dimension
    debt_health: Dimension
    tax_efficiency: Dimension
    retirement_readiness: Dimension


# =============================
# Financial Metrics
# =============================

class FinancialMetrics(BaseModel):
    savings_rate: float = Field(..., ge=0, le=1)
    emergency_months: float = Field(..., ge=0)
    debt_to_income_ratio: float = Field(..., ge=0)


# =============================
# Gap Analysis
# =============================

class Gaps(BaseModel):
    emergency_fund_gap: float = Field(..., ge=0)


# =============================
# Goal Planning
# =============================

class GoalPlan(BaseModel):
    goal: str
    monthly_investment: float = Field(..., ge=0)
    feasible: bool
    note: Optional[str] = None


# =============================
# Monthly Roadmap
# =============================

class MonthlyAllocation(BaseModel):
    emergency_fund: float = Field(..., ge=0)
    debt_repayment: float = Field(..., ge=0)
    investment: float = Field(..., ge=0)


class MonthlyPlan(BaseModel):
    month: int = Field(..., ge=1)
    allocation: MonthlyAllocation


class Roadmap(BaseModel):
    monthly_plan: List[MonthlyPlan]


# =============================
# Asset Allocation
# =============================

class AssetAllocation(BaseModel):
    equity: int = Field(..., ge=0, le=100)
    debt: int = Field(..., ge=0, le=100)
    liquid: int = Field(..., ge=0, le=100)

    @model_validator(mode="after")
    def check_total(self):
        total = self.equity + self.debt + self.liquid
        # 🔧 safer validation (avoid rounding issues)
        if abs(total - 100) > 1:
            raise ValueError("Asset allocation must sum approx to 100")
        return self


# =============================
# Insurance Gap
# =============================

class InsuranceGap(BaseModel):
    life_required: bool
    recommended_cover: Optional[float] = Field(default=None, ge=0)


# =============================
# Tax Recommendation
# =============================

class TaxRecommendation(BaseModel):
    instrument: str
    risk: str
    liquidity: str


# =============================
# What-if Scenario
# =============================

class WhatIf(BaseModel):
    scenario: str
    result: str


# =============================
# MAIN OUTPUT MODEL
# =============================

class FinancialAnalysis(BaseModel):
    overall_score: int = Field(..., ge=0, le=100)
    summary: str

    financial_metrics: FinancialMetrics
    gaps: Gaps

   
    goals_plan: List[GoalPlan] = Field(default_factory=list)

    priority_actions: Annotated[List[str], Field(min_length=2, max_length=5)]

    roadmap: Roadmap
    asset_allocation: AssetAllocation
    insurance_gap: InsuranceGap

    tax_recommendations: Annotated[List[TaxRecommendation], Field(min_length=1)]

    what_if: Optional[WhatIf] = None
    disclaimer: str

    dimensions: Dimensions

    # =============================
    # GLOBAL VALIDATION (IMPROVED)
    # =============================
    @model_validator(mode="after")
    def logical_checks(self):
       
        keywords = ["emergency", "buffer", "contingency"]

        if self.financial_metrics.emergency_months > 6:
            for action in self.priority_actions:
                if any(k in action.lower() for k in keywords):
                    raise ValueError(
                        "Contradiction: Emergency fund already sufficient"
                    )

        return self
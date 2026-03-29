import json
from services.langchain_agent import run_agent


def get_bool(prompt):
    return input(prompt + " (y/n): ").strip().lower() == "y"


def get_user_input():
    print("\n===== Enter Complete Financial Profile =====\n")

    # Basic Info
    age = int(input("Age: "))
    job = input("Profession (student/salaried/freelancer/business): ").lower()
    income = float(input("Monthly Income: "))
    expenses = float(input("Monthly Expenses: "))
    emergency_fund = float(input("Emergency Fund Amount: "))

    # Derived awareness
    surplus = income - expenses
    print(f"👉 Monthly Surplus: ₹{surplus}\n")

    # Risk Profile
    print("\n--- Risk Profile ---")
    risk_profile = input("Risk Profile (low/medium/high): ").lower()

    # Dependents
    dependents = int(input("Number of Dependents: "))

    # Investments
    print("\n--- Investments ---")
    equity = float(input("Equity: "))
    mutual_funds = float(input("Mutual Funds: "))
    fd = float(input("Fixed Deposits: "))

    # Retirement
    print("\n--- Retirement ---")
    retirement_savings = float(input("Current Retirement Savings: "))
    target_age = int(input("Retirement Target Age: "))
    target_corpus = float(input("Target Retirement Corpus: "))

    # Debt
    print("\n--- Debt ---")
    debt_amount = float(input("Debt Amount: "))
    debt_interest = float(input("Interest Rate (%): "))
    debt_emi = float(input("EMI: "))
    debt_type = input("Debt Type (personal_loan/home/credit_card): ")

    # Insurance
    print("\n--- Insurance ---")
    health_insurance = get_bool("Do you have Health Insurance?")
    life_insurance = get_bool("Do you have Life Insurance?")

    # Life Scenario
    print("\n--- Life Scenario ---")
    life_event = input("Any upcoming life event? (none/marriage/child/home/bonus): ").lower()

    # Tax Saving
    print("\n--- Tax Saving ---")
    sec_80c = float(input("80C Investment: "))
    sec_80d = float(input("80D Investment: "))
    nps = float(input("NPS Investment: "))

    # Tax Regime
    tax_regime = input("Tax Regime (old/new/unknown): ").lower()

    # Goals
    print("\n--- Goals ---")
    goals = []
    num_goals = int(input("How many financial goals? "))

    for i in range(num_goals):
        print(f"\nGoal {i+1}:")
        name = input("Goal Name: ")
        amount = float(input("Target Amount: "))
        years = int(input("Timeline (years): "))

        goals.append({
            "name": name,
            "amount": amount,
            "timeline_years": years
        })

    # Final JSON (CLEAN STRUCTURE)
    user_data = {
        "user": {
            "age": age,
            "profession": job,

            "monthly_income": income,
            "monthly_expenses": expenses,
            "emergency_fund": emergency_fund,

            "risk_profile": risk_profile,
            "dependents": dependents,
            "life_event": life_event,
            "tax_regime": tax_regime,

            "investments": {
                "equity": equity,
                "mutual_funds": mutual_funds,
                "fixed_deposits": fd
            },

            "retirement_savings": retirement_savings,
            "retirement_goal": {
                "target_age": target_age,
                "target_corpus": target_corpus
            },

            "debt": {
                "amount": debt_amount,
                "interest_rate": debt_interest,
                "emi": debt_emi,
                "type": debt_type
            },

            "insurance": {
                "health": health_insurance,
                "life": life_insurance
            },

            "tax_saving_instruments": {
                "80C": sec_80c,
                "80D": sec_80d,
                "NPS": nps
            },

            "goals": goals
        }
    }

    return user_data


if __name__ == "__main__":
    user_data = get_user_input()

    print("\n===== Sending to Agent =====\n")
    result = run_agent(user_data)

    print("\n===== Result =====\n")
    print(json.dumps(result, indent=2))
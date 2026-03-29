import { useState, useCallback } from "react";


const API_BASE = "http://127.0.0.1:8000";

async function analyzeFinances(formData) {
  // 🔌 BACKEND API INTEGRATION REQUIRED
  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(errBody || `Server error: ${response.status}`);
  }
  return response.json();
}

// ─── Design tokens ───────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0a0f1e;
    --navy-2: #111827;
    --navy-3: #1a2236;
    --navy-4: #243049;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --gold-dim: rgba(201,168,76,0.18);
    --teal: #1fd4c0;
    --teal-dim: rgba(31,212,192,0.12);
    --red: #f04c5c;
    --green: #22c985;
    --text: #e8eaf0;
    --text-2: #9ba3b8;
    --border: rgba(255,255,255,0.07);
    --card: rgba(255,255,255,0.04);
    --radius: 14px;
    --font-display: 'Playfair Display', serif;
    --font-body: 'DM Sans', sans-serif;
  }

  body { background: var(--navy); color: var(--text); font-family: var(--font-body); }

  .app-wrap {
    min-height: 100vh;
    background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.08) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 90% 80%, rgba(31,212,192,0.05) 0%, transparent 60%),
                var(--navy);
  }

  /* ── Header ── */
  .header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px;
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(12px);
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,15,30,0.85);
  }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .logo-text { font-family: var(--font-display); font-size: 20px; color: var(--text); }
  .logo-text span { color: var(--gold); }
  .header-badge {
    font-size: 11px; padding: 4px 12px; border-radius: 20px;
    border: 1px solid var(--gold-dim); color: var(--gold);
    background: var(--gold-dim); letter-spacing: 1px; text-transform: uppercase;
  }

  /* ── Progress stepper ── */
  .stepper {
    display: flex; align-items: center; gap: 0;
    padding: 28px 40px 0;
    overflow-x: auto;
  }
  .step-item { display: flex; align-items: center; flex-shrink: 0; }
  .step-circle {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; cursor: pointer;
    transition: all 0.25s;
    border: 2px solid var(--border);
    background: var(--navy-3);
    color: var(--text-2);
  }
  .step-circle.active {
    border-color: var(--gold); background: var(--gold-dim); color: var(--gold);
  }
  .step-circle.done {
    border-color: var(--green); background: rgba(34,201,133,0.12); color: var(--green);
  }
  .step-label {
    font-size: 10px; color: var(--text-2); margin-top: 4px; text-align: center;
    white-space: nowrap;
  }
  .step-label.active { color: var(--gold); }
  .step-connector {
    flex: 1; min-width: 24px; height: 1px;
    background: var(--border); margin: 0 4px;
  }
  .step-connector.done { background: var(--green); }
  .step-wrap { display: flex; flex-direction: column; align-items: center; }

  /* ── Form shell ── */
  .form-shell {
    max-width: 700px; margin: 32px auto; padding: 0 20px 60px;
  }
  .step-title {
    font-family: var(--font-display); font-size: 28px; color: var(--text);
    margin-bottom: 6px;
  }
  .step-title span { color: var(--gold); }
  .step-sub { font-size: 14px; color: var(--text-2); margin-bottom: 28px; }

  /* ── Inputs ── */
  .field { margin-bottom: 18px; }
  .field label {
    display: block; font-size: 12px; font-weight: 500;
    color: var(--text-2); margin-bottom: 6px; text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .field input, .field select {
    width: 100%; padding: 12px 16px;
    background: var(--navy-3); border: 1px solid var(--border);
    border-radius: 10px; color: var(--text); font-family: var(--font-body);
    font-size: 15px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field input:focus, .field select:focus {
    border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-dim);
  }
  .field select option { background: var(--navy-2); }
  .field input::placeholder { color: var(--text-2); }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  /* ── Toggle ── */
  .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; background: var(--navy-3); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 12px; }
  .toggle-label { font-size: 14px; color: var(--text); }
  .toggle { position: relative; width: 44px; height: 24px; }
  .toggle input { opacity: 0; width: 0; height: 0; }
  .toggle-slider {
    position: absolute; inset: 0; border-radius: 24px;
    background: var(--navy-4); cursor: pointer; transition: 0.3s;
  }
  .toggle-slider::before {
    content: ''; position: absolute; width: 18px; height: 18px;
    border-radius: 50%; background: var(--text-2);
    bottom: 3px; left: 3px; transition: 0.3s;
  }
  .toggle input:checked + .toggle-slider { background: rgba(34,201,133,0.3); }
  .toggle input:checked + .toggle-slider::before { transform: translateX(20px); background: var(--green); }

  /* ── Risk selector ── */
  .risk-group { display: flex; gap: 10px; }
  .risk-btn {
    flex: 1; padding: 10px; border-radius: 10px; cursor: pointer;
    border: 1.5px solid var(--border); background: var(--navy-3);
    color: var(--text-2); font-size: 13px; text-align: center;
    transition: all 0.2s; font-family: var(--font-body);
  }
  .risk-btn:hover { border-color: var(--gold-dim); }
  .risk-btn.sel-low { border-color: var(--green); background: rgba(34,201,133,0.1); color: var(--green); }
  .risk-btn.sel-medium { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); }
  .risk-btn.sel-high { border-color: var(--red); background: rgba(240,76,92,0.1); color: var(--red); }

  /* ── Debt cards ── */
  .debt-card {
    background: var(--navy-3); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px; margin-bottom: 12px;
  }
  .debt-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .debt-card-title { font-size: 13px; font-weight: 500; color: var(--gold); }
  .btn-remove { background: rgba(240,76,92,0.1); border: 1px solid rgba(240,76,92,0.2); color: var(--red); border-radius: 6px; padding: 4px 10px; font-size: 12px; cursor: pointer; font-family: var(--font-body); }
  .btn-remove:hover { background: rgba(240,76,92,0.2); }
  .btn-add {
    width: 100%; padding: 12px; background: var(--gold-dim);
    border: 1px dashed var(--gold); border-radius: 10px; color: var(--gold);
    font-size: 13px; cursor: pointer; font-family: var(--font-body);
    transition: background 0.2s;
  }
  .btn-add:hover { background: rgba(201,168,76,0.28); }

  /* ── Goal cards ── */
  .goal-card { background: var(--navy-3); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; margin-bottom: 12px; }

  /* ── Nav buttons ── */
  .form-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; }
  .btn-prev { background: transparent; border: 1px solid var(--border); color: var(--text-2); padding: 12px 24px; border-radius: 10px; cursor: pointer; font-size: 14px; font-family: var(--font-body); transition: all 0.2s; }
  .btn-prev:hover { border-color: var(--text-2); color: var(--text); }
  .btn-next {
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    border: none; color: var(--navy); padding: 12px 32px; border-radius: 10px;
    cursor: pointer; font-size: 14px; font-weight: 600; font-family: var(--font-body);
    transition: opacity 0.2s; letter-spacing: 0.3px;
  }
  .btn-next:hover { opacity: 0.88; }
  .btn-next:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── Dashboard ── */
  .dash-wrap { max-width: 1100px; margin: 0 auto; padding: 32px 24px 80px; }
  .dash-hero { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
  .dash-title { font-family: var(--font-display); font-size: 32px; }
  .dash-title span { color: var(--gold); }
  .btn-restart { background: transparent; border: 1px solid var(--border); color: var(--text-2); padding: 10px 20px; border-radius: 10px; cursor: pointer; font-size: 13px; font-family: var(--font-body); transition: all 0.2s; }
  .btn-restart:hover { border-color: var(--gold); color: var(--gold); }

  /* ── Score gauge ── */
  .score-card {
    background: var(--navy-3); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 28px;
    display: flex; align-items: center; gap: 28px;
    margin-bottom: 24px;
  }
  .gauge-wrap { position: relative; width: 120px; height: 120px; flex-shrink: 0; }
  .gauge-svg { transform: rotate(-90deg); }
  .gauge-bg { fill: none; stroke: var(--navy-4); stroke-width: 10; }
  .gauge-fill { fill: none; stroke-width: 10; stroke-linecap: round; transition: stroke-dashoffset 1s ease; }
  .gauge-text { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .gauge-num { font-family: var(--font-display); font-size: 28px; font-weight: 700; }
  .gauge-label { font-size: 10px; color: var(--text-2); text-transform: uppercase; letter-spacing: 1px; }
  .score-info { flex: 1; }
  .score-grade { font-family: var(--font-display); font-size: 22px; margin-bottom: 6px; }
  .score-summary { font-size: 14px; color: var(--text-2); line-height: 1.6; }

  /* ── Metric cards ── */
  .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
  .metric-card { background: var(--navy-3); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .metric-label { font-size: 11px; color: var(--text-2); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
  .metric-value { font-family: var(--font-display); font-size: 26px; color: var(--text); }
  .metric-sub { font-size: 12px; color: var(--text-2); margin-top: 4px; }

  /* ── Section header ── */
  .section-header { font-family: var(--font-display); font-size: 20px; color: var(--text); margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
  .section-header span { color: var(--gold); }
  .dash-section { margin-bottom: 32px; }

  /* ── Dimension cards ── */
  .dims-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .dim-card { background: var(--navy-3); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; }
  .dim-name { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-2); margin-bottom: 10px; }
  .dim-score-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .dim-score { font-family: var(--font-display); font-size: 22px; }
  .dim-bar-bg { flex: 1; height: 6px; background: var(--navy-4); border-radius: 3px; overflow: hidden; }
  .dim-bar-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
  .dim-reason { font-size: 12px; color: var(--text-2); margin-bottom: 8px; line-height: 1.5; }
  .dim-actions { list-style: none; }
  .dim-actions li { font-size: 12px; color: var(--teal); padding-left: 14px; position: relative; margin-bottom: 4px; line-height: 1.4; }
  .dim-actions li::before { content: '→'; position: absolute; left: 0; }

  /* ── Priority actions ── */
  .action-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .action-item { display: flex; align-items: flex-start; gap: 12px; background: var(--navy-3); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; }
  .action-num { width: 24px; height: 24px; border-radius: 50%; background: var(--gold-dim); color: var(--gold); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .action-text { font-size: 14px; color: var(--text); line-height: 1.5; }

  /* ── Goals table ── */
  .goals-table { width: 100%; border-collapse: collapse; }
  .goals-table th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--text-2); padding: 10px 14px; border-bottom: 1px solid var(--border); text-align: left; }
  .goals-table td { padding: 12px 14px; font-size: 13px; color: var(--text); border-bottom: 1px solid var(--border); }
  .goals-table tr:last-child td { border-bottom: none; }
  .feasible-yes { color: var(--green); font-weight: 600; }
  .feasible-no { color: var(--red); font-weight: 600; }

  /* ── Roadmap ── */
  .roadmap-list { display: flex; flex-direction: column; gap: 8px; }
  .roadmap-item { display: flex; gap: 14px; align-items: flex-start; background: var(--navy-3); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; }
  .roadmap-month { font-size: 11px; font-weight: 600; color: var(--gold); min-width: 60px; padding-top: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
  .roadmap-content { font-size: 13px; color: var(--text); line-height: 1.6; }

  /* ── Asset allocation ── */
  .alloc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .alloc-card { background: var(--navy-3); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; text-align: center; }
  .alloc-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-2); margin-bottom: 8px; }
  .alloc-value { font-family: var(--font-display); font-size: 28px; }
  .alloc-bar-wrap { margin-top: 10px; height: 4px; background: var(--navy-4); border-radius: 2px; overflow: hidden; }
  .alloc-bar { height: 100%; border-radius: 2px; transition: width 1s ease; }

  /* ── Insurance ── */
  .insure-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .insure-card { background: var(--navy-3); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .insure-label { font-size: 11px; color: var(--text-2); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
  .insure-value { font-size: 20px; font-weight: 600; color: var(--text); }

  /* ── Tax recs ── */
  .tax-table { width: 100%; border-collapse: collapse; }
  .tax-table th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--text-2); padding: 10px 14px; border-bottom: 1px solid var(--border); text-align: left; }
  .tax-table td { padding: 12px 14px; font-size: 13px; color: var(--text); border-bottom: 1px solid var(--border); }
  .tax-table tr:last-child td { border-bottom: none; }

  /* ── What-if ── */
  .whatif-card { background: var(--teal-dim); border: 1px solid rgba(31,212,192,0.2); border-radius: var(--radius); padding: 20px; }
  .whatif-label { font-size: 11px; color: var(--teal); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }

  /* ── Disclaimer ── */
  .disclaimer {
    background: rgba(240,76,92,0.05); border: 1px solid rgba(240,76,92,0.18);
    border-radius: var(--radius); padding: 16px 20px;
    font-size: 12px; color: var(--text-2); line-height: 1.6;
    margin-top: 24px;
  }
  .disclaimer strong { color: var(--red); }

  /* ── Loading / Error / Empty ── */
  .center-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 16px; text-align: center; }
  .spinner { width: 48px; height: 48px; border-radius: 50%; border: 3px solid var(--navy-4); border-top-color: var(--gold); animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-size: 15px; color: var(--text-2); }
  .loading-sub { font-size: 13px; color: var(--text-2); opacity: 0.6; }
  .error-icon { font-size: 48px; }
  .error-msg { font-size: 16px; color: var(--red); }
  .error-detail { font-size: 13px; color: var(--text-2); max-width: 400px; }
  .empty-icon { font-size: 56px; }
  .empty-title { font-family: var(--font-display); font-size: 24px; color: var(--text); }
  .empty-sub { font-size: 14px; color: var(--text-2); max-width: 360px; }

  .gap-card { background: rgba(240,76,92,0.07); border: 1px solid rgba(240,76,92,0.2); border-radius: var(--radius); padding: 18px; margin-bottom: 10px; }
  .gap-label { font-size: 12px; color: var(--text-2); margin-bottom: 4px; }
  .gap-value { font-size: 18px; font-weight: 600; color: var(--red); }

  .pill { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .pill-green { background: rgba(34,201,133,0.12); color: var(--green); }
  .pill-red { background: rgba(240,76,92,0.12); color: var(--red); }
  .pill-gold { background: var(--gold-dim); color: var(--gold); }

  @media (max-width: 768px) {
    .header { padding: 14px 18px; }
    .stepper { padding: 16px 18px 0; }
    .form-shell { padding: 0 14px 60px; }
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .metrics-row { grid-template-columns: 1fr; }
    .dims-grid { grid-template-columns: 1fr; }
    .alloc-grid { grid-template-columns: 1fr; }
    .insure-grid { grid-template-columns: 1fr; }
    .dash-wrap { padding: 20px 14px 60px; }
  }
`;

// ─── Initial form state ───────────────────────────────────────
const initForm = {
  age: "", profession: "salaried", monthly_income: "", monthly_expenses: "",
  emergency_fund: "", risk_profile: "medium", dependents: "", life_event: "none",
  tax_regime: "unknown", equity: "", mutual_funds: "", fixed_deposits: "",
  retirement_savings: "", target_age: "", target_corpus: "",
  debts: [],
  insurance: { health: false, life: false },
  tax_saving: { "80C": "", "80D": "", NPS: "" },
  goals: [],
};

const STEPS = ["Basic Info","Profile","Investments","Retirement","Debt","Insurance","Tax Saving","Goals"];

// ─── Score color helper ───────────────────────────────────────
function scoreColor(s) {
  if (s >= 75) return "var(--green)";
  if (s >= 45) return "var(--gold)";
  return "var(--red)";
}

// ─── Gauge component ─────────────────────────────────────────
function Gauge({ score }) {
  const r = 50, circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(score || 0, 0), 100) / 100;
  const offset = circ * (1 - pct);
  const color = scoreColor(score);
  const grade = score >= 80 ? "Excellent" : score >= 65 ? "Good" : score >= 45 ? "Fair" : "Needs Work";
  return (
    <div className="gauge-wrap">
      <svg className="gauge-svg" viewBox="0 0 120 120" width="120" height="120">
        <circle className="gauge-bg" cx="60" cy="60" r={r} />
        <circle className="gauge-fill" cx="60" cy="60" r={r}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={offset} />
      </svg>
      <div className="gauge-text">
        <span className="gauge-num" style={{ color }}>{score ?? "—"}</span>
        <span className="gauge-label">{grade}</span>
      </div>
    </div>
  );
}

// ─── Step 1: Basic Info ───────────────────────────────────────
function StepBasic({ form, set }) {
  return (
    <>
      <h2 className="step-title">Basic <span>Information</span></h2>
      <p className="step-sub">Tell us about yourself and your current financial situation.</p>
      <div className="grid-2">
        <div className="field"><label>Age</label>
          <input type="number" min={18} max={80} placeholder="e.g. 30"
            value={form.age} onChange={e => set("age", e.target.value)} /></div>
        <div className="field"><label>Profession</label>
          <select value={form.profession} onChange={e => set("profession", e.target.value)}>
            <option value="student">Student</option>
            <option value="salaried">Salaried</option>
            <option value="freelancer">Freelancer</option>
            <option value="business">Business Owner</option>
          </select></div>
      </div>
      <div className="grid-2">
        <div className="field"><label>Monthly Income (₹)</label>
          <input type="number" min={0} placeholder="e.g. 80000"
            value={form.monthly_income} onChange={e => set("monthly_income", e.target.value)} /></div>
        <div className="field"><label>Monthly Expenses (₹)</label>
          <input type="number" min={0} placeholder="e.g. 45000"
            value={form.monthly_expenses} onChange={e => set("monthly_expenses", e.target.value)} /></div>
      </div>
      <div className="field"><label>Emergency Fund (₹)</label>
        <input type="number" min={0} placeholder="Total amount in liquid savings"
          value={form.emergency_fund} onChange={e => set("emergency_fund", e.target.value)} /></div>
    </>
  );
}

// ─── Step 2: Profile ──────────────────────────────────────────
function StepProfile({ form, set }) {
  return (
    <>
      <h2 className="step-title">Financial <span>Profile</span></h2>
      <p className="step-sub">Your risk appetite and life stage shape the analysis.</p>
      <div className="field"><label>Risk Profile</label>
        <div className="risk-group">
          {["low","medium","high"].map(r => (
            <button key={r} className={`risk-btn ${form.risk_profile === r ? `sel-${r}` : ""}`}
              onClick={() => set("risk_profile", r)}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid-2">
        <div className="field"><label>Dependents</label>
          <input type="number" min={0} max={20} placeholder="0"
            value={form.dependents} onChange={e => set("dependents", e.target.value)} /></div>
        <div className="field"><label>Life Event</label>
          <select value={form.life_event} onChange={e => set("life_event", e.target.value)}>
            {["none","marriage","child","home","bonus"].map(v =>
              <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
          </select></div>
      </div>
      <div className="field"><label>Tax Regime</label>
        <select value={form.tax_regime} onChange={e => set("tax_regime", e.target.value)}>
          <option value="old">Old Regime</option>
          <option value="new">New Regime</option>
          <option value="unknown">Not Sure</option>
        </select></div>
    </>
  );
}

// ─── Step 3: Investments ─────────────────────────────────────
function StepInvestments({ form, set }) {
  return (
    <>
      <h2 className="step-title">Current <span>Investments</span></h2>
      <p className="step-sub">Enter the current total value of your investments.</p>
      <div className="field"><label>Equity / Stocks (₹)</label>
        <input type="number" min={0} placeholder="Total value"
          value={form.equity} onChange={e => set("equity", e.target.value)} /></div>
      <div className="field"><label>Mutual Funds (₹)</label>
        <input type="number" min={0} placeholder="Total value"
          value={form.mutual_funds} onChange={e => set("mutual_funds", e.target.value)} /></div>
      <div className="field"><label>Fixed Deposits (₹)</label>
        <input type="number" min={0} placeholder="Total value"
          value={form.fixed_deposits} onChange={e => set("fixed_deposits", e.target.value)} /></div>
    </>
  );
}

// ─── Step 4: Retirement ───────────────────────────────────────
function StepRetirement({ form, set }) {
  return (
    <>
      <h2 className="step-title">Retirement <span>Planning</span></h2>
      <p className="step-sub">Set your retirement goal and current corpus.</p>
      <div className="field"><label>Current Retirement Savings (₹)</label>
        <input type="number" min={0} placeholder="Total saved so far"
          value={form.retirement_savings} onChange={e => set("retirement_savings", e.target.value)} /></div>
      <div className="grid-2">
        <div className="field"><label>Target Retirement Age</label>
          <input type="number" min={40} max={80} placeholder="e.g. 60"
            value={form.target_age} onChange={e => set("target_age", e.target.value)} /></div>
        <div className="field"><label>Target Corpus (₹)</label>
          <input type="number" min={0} placeholder="e.g. 30000000"
            value={form.target_corpus} onChange={e => set("target_corpus", e.target.value)} /></div>
      </div>
    </>
  );
}

// ─── Step 5: Debt ─────────────────────────────────────────────
function StepDebt({ form, setForm }) {
  const addDebt = () => setForm(f => ({ ...f, debts: [...f.debts, { amount: "", interest_rate: "", emi: "", type: "personal_loan" }] }));
  const removeDebt = i => setForm(f => ({ ...f, debts: f.debts.filter((_, j) => j !== i) }));
  const updateDebt = (i, k, v) => setForm(f => ({ ...f, debts: f.debts.map((d, j) => j === i ? { ...d, [k]: v } : d) }));

  return (
    <>
      <h2 className="step-title">Debt <span>Overview</span></h2>
      <p className="step-sub">Add all your active loans and liabilities.</p>
      {form.debts.map((d, i) => (
        <div key={i} className="debt-card">
          <div className="debt-card-header">
            <span className="debt-card-title">Debt #{i + 1}</span>
            <button className="btn-remove" onClick={() => removeDebt(i)}>✕ Remove</button>
          </div>
          <div className="grid-2">
            <div className="field"><label>Type</label>
              <select value={d.type} onChange={e => updateDebt(i, "type", e.target.value)}>
                <option value="personal_loan">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="credit_card">Credit Card</option>
              </select></div>
            <div className="field"><label>Outstanding Amount (₹)</label>
              <input type="number" min={0} placeholder="e.g. 500000" value={d.amount} onChange={e => updateDebt(i, "amount", e.target.value)} /></div>
          </div>
          <div className="grid-2">
            <div className="field"><label>Interest Rate (%)</label>
              <input type="number" min={0} max={100} step={0.1} placeholder="e.g. 12.5" value={d.interest_rate} onChange={e => updateDebt(i, "interest_rate", e.target.value)} /></div>
            <div className="field"><label>EMI (₹/month)</label>
              <input type="number" min={0} placeholder="e.g. 15000" value={d.emi} onChange={e => updateDebt(i, "emi", e.target.value)} /></div>
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={addDebt}>+ Add Debt</button>
    </>
  );
}

// ─── Step 6: Insurance ───────────────────────────────────────
function StepInsurance({ form, setForm }) {
  const toggle = k => setForm(f => ({ ...f, insurance: { ...f.insurance, [k]: !f.insurance[k] } }));
  return (
    <>
      <h2 className="step-title">Insurance <span>Coverage</span></h2>
      <p className="step-sub">Do you currently have the following coverage?</p>
      {[["health","🏥 Health Insurance"],["life","🛡️ Life Insurance"]].map(([k, label]) => (
        <div key={k} className="toggle-row">
          <span className="toggle-label">{label}</span>
          <label className="toggle">
            <input type="checkbox" checked={form.insurance[k]} onChange={() => toggle(k)} />
            <span className="toggle-slider" />
          </label>
        </div>
      ))}
    </>
  );
}

// ─── Step 7: Tax Saving ───────────────────────────────────────
function StepTax({ form, setForm }) {
  const set = (k, v) => setForm(f => ({ ...f, tax_saving: { ...f.tax_saving, [k]: v } }));
  return (
    <>
      <h2 className="step-title">Tax <span>Savings</span></h2>
      <p className="step-sub">Annual amounts invested under these sections.</p>
      <div className="field"><label>Section 80C (₹/year)</label>
        <input type="number" min={0} max={150000} placeholder="Max ₹1,50,000 (ELSS, PPF, etc.)"
          value={form.tax_saving["80C"]} onChange={e => set("80C", e.target.value)} /></div>
      <div className="field"><label>Section 80D (₹/year)</label>
        <input type="number" min={0} placeholder="Health insurance premium"
          value={form.tax_saving["80D"]} onChange={e => set("80D", e.target.value)} /></div>
      <div className="field"><label>NPS Contribution (₹/year)</label>
        <input type="number" min={0} placeholder="Under 80CCD(1B), max ₹50,000 extra"
          value={form.tax_saving.NPS} onChange={e => set("NPS", e.target.value)} /></div>
    </>
  );
}

// ─── Step 8: Goals ────────────────────────────────────────────
function StepGoals({ form, setForm }) {
  const addGoal = () => setForm(f => ({ ...f, goals: [...f.goals, { name: "", amount: "", timeline_years: "" }] }));
  const removeGoal = i => setForm(f => ({ ...f, goals: f.goals.filter((_, j) => j !== i) }));
  const updateGoal = (i, k, v) => setForm(f => ({ ...f, goals: f.goals.map((g, j) => j === i ? { ...g, [k]: v } : g) }));
  return (
    <>
      <h2 className="step-title">Financial <span>Goals</span></h2>
      <p className="step-sub">List goals you're planning and saving towards.</p>
      {form.goals.map((g, i) => (
        <div key={i} className="goal-card">
          <div className="debt-card-header">
            <span className="debt-card-title">Goal #{i + 1}</span>
            <button className="btn-remove" onClick={() => removeGoal(i)}>✕ Remove</button>
          </div>
          <div className="field"><label>Goal Name</label>
            <input type="text" placeholder="e.g. Buy a car, World trip"
              value={g.name} onChange={e => updateGoal(i, "name", e.target.value)} /></div>
          <div className="grid-2">
            <div className="field"><label>Target Amount (₹)</label>
              <input type="number" min={0} placeholder="e.g. 500000" value={g.amount} onChange={e => updateGoal(i, "amount", e.target.value)} /></div>
            <div className="field"><label>Timeline (years)</label>
              <input type="number" min={1} max={40} placeholder="e.g. 3" value={g.timeline_years} onChange={e => updateGoal(i, "timeline_years", e.target.value)} /></div>
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={addGoal}>+ Add Goal</button>
    </>
  );
}

// ─── Dashboard ───────────────────────────────────────────────
function Dashboard({ data, onRestart }) {
  if (!data) return null;
  const {
    overall_score, summary, financial_metrics, dimensions,
    gaps, priority_actions, goals_plan, roadmap,
    asset_allocation, insurance_gap, tax_recommendations,
    what_if, disclaimer
  } = data;

  // Normalise percent values: backend returns 0-1 fractions, display as %
  const savingsRatePct = financial_metrics?.savings_rate !== undefined
    ? +(financial_metrics.savings_rate * 100).toFixed(1) : undefined;
  // Clamp sub-0.01% DTI (e.g. 1e-06) to 0 for clean display
  const dtiRaw = financial_metrics?.debt_to_income_ratio;
  const dtiPct = dtiRaw !== undefined
    ? (dtiRaw * 100 < 0.01 ? 0 : +(dtiRaw * 100).toFixed(1)) : undefined;
  // Round emergency months to 1 decimal place
  const emergencyMonths = financial_metrics?.emergency_months !== undefined
    ? +Number(financial_metrics.emergency_months).toFixed(1) : undefined;

  // Roadmap items live at roadmap.monthly_plan
  const monthlyPlan = roadmap?.monthly_plan ?? [];

  // Filter gaps: skip zero values so they don't render as alarming red cards
  const nonZeroGaps = gaps
    ? Object.entries(gaps).filter(([, v]) => (typeof v === "number" ? v > 0 : Boolean(v)))
    : [];

  return (
    <div className="dash-wrap">
      <div className="dash-hero">
        <div>
          <h1 className="dash-title">Your Financial <span>Analysis</span></h1>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>AI-generated report based on your inputs</p>
        </div>
        <button className="btn-restart" onClick={onRestart}>← New Analysis</button>
      </div>

      {/* Overall Score */}
      {overall_score !== undefined && (
        <div className="score-card">
          <Gauge score={overall_score} />
          <div className="score-info">
            <div className="score-grade" style={{ color: scoreColor(overall_score) }}>
              Financial Health Score: {overall_score}/100
            </div>
            {summary && <p className="score-summary">{summary}</p>}
          </div>
        </div>
      )}

      {/* Financial Metrics */}
      {financial_metrics && (
        <div className="dash-section">
          <h3 className="section-header">Key <span>Metrics</span></h3>
          <div className="metrics-row">
            {savingsRatePct !== undefined && (
              <div className="metric-card">
                <div className="metric-label">Savings Rate</div>
                <div className="metric-value" style={{ color: scoreColor(savingsRatePct) }}>
                  {savingsRatePct}%
                </div>
                <div className="metric-sub">of monthly income saved</div>
              </div>
            )}
            {financial_metrics.emergency_months !== undefined && (
              <div className="metric-card">
                <div className="metric-label">Emergency Cover</div>
                <div className="metric-value" style={{ color: (emergencyMonths ?? 0) >= 6 ? "var(--green)" : "var(--red)" }}>
                  {emergencyMonths} mo
                </div>
                <div className="metric-sub">recommended: 6 months</div>
              </div>
            )}
            {dtiPct !== undefined && (
              <div className="metric-card">
                <div className="metric-label">Debt-to-Income</div>
                <div className="metric-value" style={{ color: dtiPct <= 35 ? "var(--green)" : "var(--red)" }}>
                  {dtiPct}%
                </div>
                <div className="metric-sub">healthy: below 35%</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dimension Scores */}
      {dimensions && Object.keys(dimensions).length > 0 && (
        <div className="dash-section">
          <h3 className="section-header">Dimension <span>Analysis</span></h3>
          <div className="dims-grid">
            {Object.entries(dimensions).map(([key, val]) => (
              <div key={key} className="dim-card">
                <div className="dim-name">{key.replace(/_/g, " ")}</div>
                <div className="dim-score-row">
                  <span className="dim-score" style={{ color: scoreColor(val.score) }}>{val.score}</span>
                  <div className="dim-bar-bg">
                    <div className="dim-bar-fill" style={{ width: `${val.score}%`, background: scoreColor(val.score) }} />
                  </div>
                </div>
                {val.reason && <p className="dim-reason">{val.reason}</p>}
                {val.actions?.length > 0 && (
                  <ul className="dim-actions">
                    {val.actions.slice(0, 2).map((ap, i) => <li key={i}>{ap}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gaps */}
      {gaps && (
        <div className="dash-section">
          <h3 className="section-header">Financial <span>Gaps</span></h3>
          {nonZeroGaps.length > 0 ? nonZeroGaps.map(([k, v]) => (
            <div key={k} className="gap-card">
              <div className="gap-label">{k.replace(/_/g, " ").toUpperCase()}</div>
              <div className="gap-value">{typeof v === "number" ? `₹${v.toLocaleString()}` : v}</div>
            </div>
          )) : (
            <div style={{ background: "rgba(34,201,133,0.07)", border: "1px solid rgba(34,201,133,0.2)", borderRadius: "var(--radius)", padding: "18px" }}>
              <div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 4 }}>ALL GAPS</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "var(--green)" }}>✓ No financial gaps detected</div>
            </div>
          )}
        </div>
      )}

      {/* Priority Actions */}
      {priority_actions?.length > 0 && (
        <div className="dash-section">
          <h3 className="section-header">Priority <span>Actions</span></h3>
          <ul className="action-list">
            {priority_actions.map((a, i) => (
              <li key={i} className="action-item">
                <span className="action-num">{i + 1}</span>
                <span className="action-text">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Goals Plan */}
      {goals_plan !== undefined && (
        <div className="dash-section">
          <h3 className="section-header">Goals <span>Roadmap</span></h3>
          {goals_plan.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table className="goals-table">
                <thead>
                  <tr>
                    <th>Goal</th><th>Monthly Investment</th><th>Feasible</th><th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {goals_plan.map((g, i) => (
                    <tr key={i}>
                      <td>{g.goal}</td>
                      <td>{g.monthly_investment !== undefined ? `₹${Number(g.monthly_investment).toLocaleString()}` : "—"}</td>
                      <td className={g.feasible ? "feasible-yes" : "feasible-no"}>
                        {g.feasible ? "✓ Yes" : "✗ No"}
                      </td>
                      <td style={{ color: "var(--text-2)" }}>{g.note || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ background: "var(--navy-3)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px", color: "var(--text-2)", fontSize: 14 }}>
              No goals were submitted. Add goals in the form to see a personalised goals plan.
            </div>
          )}
        </div>
      )}

      {/* Monthly Roadmap */}
      {monthlyPlan.length > 0 && (
        <div className="dash-section">
          <h3 className="section-header">Monthly <span>Roadmap</span></h3>
          <div className="roadmap-list">
            {monthlyPlan.map((item, i) => (
              <div key={i} className="roadmap-item">
                <span className="roadmap-month">Month {item.month ?? i + 1}</span>
                <span className="roadmap-content">
                  {item.allocation
                    ? [
                        item.allocation.emergency_fund !== undefined && `Emergency Fund: ₹${Number(item.allocation.emergency_fund).toLocaleString()}`,
                        item.allocation.debt_repayment !== undefined && `Debt Repayment: ₹${Number(item.allocation.debt_repayment).toLocaleString()}`,
                        item.allocation.investment !== undefined && `Investment: ₹${Number(item.allocation.investment).toLocaleString()}`,
                      ].filter(Boolean).join("  ·  ")
                    : item.action || JSON.stringify(item)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Asset Allocation */}
      {asset_allocation && (
        <div className="dash-section">
          <h3 className="section-header">Recommended Asset <span>Allocation</span></h3>
          <div className="alloc-grid">
            {[
              { k: "equity", label: "Equity", color: "var(--teal)" },
              { k: "debt", label: "Debt", color: "var(--gold)" },
              { k: "liquid", label: "Liquid", color: "var(--green)" },
            ].map(({ k, label, color }) => (
              <div key={k} className="alloc-card">
                <div className="alloc-label">{label}</div>
                <div className="alloc-value" style={{ color }}>{asset_allocation[k] ?? "—"}%</div>
                <div className="alloc-bar-wrap">
                  <div className="alloc-bar" style={{ width: `${asset_allocation[k] ?? 0}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insurance Gap */}
      {insurance_gap && (
        <div className="dash-section">
          <h3 className="section-header">Insurance <span>Gap Analysis</span></h3>
          <div className="insure-grid">
            {insurance_gap.life_required !== undefined && (
              <div className="insure-card">
                <div className="insure-label">Life Cover Required</div>
                <div className="insure-value" style={{ color: insurance_gap.life_required ? "var(--red)" : "var(--green)" }}>
                  {insurance_gap.life_required ? "Required" : "Not Required"}
                </div>
              </div>
            )}
            {insurance_gap.recommended_cover !== undefined && (
              <div className="insure-card">
                <div className="insure-label">Recommended Health Cover</div>
                <div className="insure-value">₹{Number(insurance_gap.recommended_cover).toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tax Recommendations */}
      {tax_recommendations?.length > 0 && (
        <div className="dash-section">
          <h3 className="section-header">Tax <span>Recommendations</span></h3>
          <div style={{ overflowX: "auto" }}>
            <table className="tax-table">
              <thead>
                <tr><th>Instrument</th><th>Risk Level</th><th>Liquidity</th></tr>
              </thead>
              <tbody>
                {tax_recommendations.map((t, i) => (
                  <tr key={i}>
                    <td>{t.instrument}</td>
                    <td><span className={`pill ${t.risk === "low" ? "pill-green" : t.risk === "high" ? "pill-red" : "pill-gold"}`}>{t.risk}</span></td>
                    <td style={{ color: "var(--text-2)" }}>{t.liquidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* What-if Scenario */}
      {what_if && (
        <div className="dash-section">
          <h3 className="section-header">What-if <span>Scenario</span></h3>
          <div className="whatif-card">
            {what_if.scenario && <div className="whatif-label">{what_if.scenario}</div>}
            <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7 }}>
              {what_if.result ?? (typeof what_if === "string" ? what_if : JSON.stringify(what_if))}
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer">
        <strong>⚠️ Disclaimer:</strong>{" "}
        {disclaimer || "This analysis is AI-generated for informational purposes only and does not constitute professional financial, investment, or tax advice. Past performance is not indicative of future results. Please consult a SEBI-registered financial advisor before making investment decisions. All figures are estimates based on provided inputs."}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initForm);
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const set = useCallback((k, v) => setForm(f => ({ ...f, [k]: v })), []);

  // 🔌 BACKEND API INTEGRATION — builds exact schema expected by FastAPI /api/analyze
  const buildPayload = () => ({
    user: {
      age: Number(form.age),
      profession: form.profession,
      monthly_income: Number(form.monthly_income),
      monthly_expenses: Number(form.monthly_expenses),
      emergency_fund: Number(form.emergency_fund),
      risk_profile: form.risk_profile,
      dependents: Number(form.dependents),
      life_event: form.life_event,
      tax_regime: form.tax_regime,
      investments: {
        equity: Number(form.equity) || 0,
        mutual_funds: Number(form.mutual_funds) || 0,
        fixed_deposits: Number(form.fixed_deposits) || 0,
      },
      retirement_savings: Number(form.retirement_savings) || 0,
      retirement_goal: {
        target_age: Number(form.target_age),
        target_corpus: Number(form.target_corpus),
      },
      debt: form.debts.map(d => ({
        amount: Number(d.amount),
        interest_rate: Number(d.interest_rate),
        emi: Number(d.emi),
        type: d.type,
      })),
      insurance: form.insurance,
      tax_saving_instruments: {
        "80C": Number(form.tax_saving["80C"]) || 0,
        "80D": Number(form.tax_saving["80D"]) || 0,
        NPS: Number(form.tax_saving.NPS) || 0,
      },
      goals: form.goals.map(g => ({
        name: g.name,
        amount: Number(g.amount),
        timeline_years: Number(g.timeline_years),
      })),
    },
  });

  const handleSubmit = async () => {
    setState("loading");
    setErrMsg("");
    try {
   
      const payload = buildPayload();
      const data = await analyzeFinances(payload);
      setResult(data);
      setState("done");
    } catch (e) {
      setErrMsg(e.message || "Something went wrong. Please try again.");
      setState("error");
    }
  };

  const restart = () => { setState("idle"); setResult(null); setStep(0); setForm(initForm); };

  const stepComponents = [
    <StepBasic form={form} set={set} />,
    <StepProfile form={form} set={set} />,
    <StepInvestments form={form} set={set} />,
    <StepRetirement form={form} set={set} />,
    <StepDebt form={form} setForm={setForm} />,
    <StepInsurance form={form} setForm={setForm} />,
    <StepTax form={form} setForm={setForm} />,
    <StepGoals form={form} setForm={setForm} />,
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrap">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">₹</div>
            <span className="logo-text"> <span>FinPilot AI</span></span>
          </div>
          <span className="header-badge">AI Powered</span>
        </header>

        {/* States */}
        {state === "loading" && (
          <div className="center-screen">
            <div className="spinner" />
            <p className="loading-text">Analyzing your financial profile…</p>
            <p className="loading-sub">Our AI is crunching your numbers</p>
          </div>
        )}

        {state === "error" && (
          <div className="center-screen">
            <span className="error-icon">⚠️</span>
            <p className="error-msg">Analysis Failed</p>
            <p className="error-detail">{errMsg}</p>
            <button className="btn-next" style={{ marginTop: 12 }} onClick={() => setState("idle")}>Try Again</button>
          </div>
        )}

        {state === "done" && result && (
          <Dashboard data={result} onRestart={restart} />
        )}

        {state === "idle" && (
          <>
            {/* Stepper */}
            <div className="stepper">
              {STEPS.map((label, i) => (
                <div key={i} className="step-item">
                  <div className="step-wrap">
                    <div className={`step-circle ${i === step ? "active" : i < step ? "done" : ""}`}
                      onClick={() => i < step && setStep(i)}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span className={`step-label ${i === step ? "active" : ""}`}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`step-connector ${i < step ? "done" : ""}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="form-shell">
              {stepComponents[step]}
              <div className="form-nav">
                <button className="btn-prev" disabled={step === 0}
                  onClick={() => setStep(s => s - 1)}>← Back</button>
                {step < STEPS.length - 1 ? (
                  <button className="btn-next" onClick={() => setStep(s => s + 1)}>
                    Continue →
                  </button>
                ) : (
                  <button className="btn-next" onClick={handleSubmit}>
                    🚀 Generate Analysis
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
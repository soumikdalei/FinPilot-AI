<h1 align="center">🚀 FinPilot AI Your AI Money Mentor – ET Hackathon Project</h1>

<h2>📌 Overview</h2>
<p>
FinPilot AI is a financial advisory system designed for Indian users. It analyzes user financial data and provides 
safe, practical, and actionable insights using AI.
</p>
<p>
The system focuses on financial health evaluation, risk-aware suggestions, and beginner-friendly guidance.
</p>

<hr/>

<h2>🧠 Key Features</h2>
<ul>
  <li>📊 Financial health scoring across multiple dimensions</li>
  <li>🤖 AI generated structured recommendations</li>
  <li>🔐 Safe and compliance aware financial advice</li>
  <li>⚙️ Modular backend with clean architecture</li>
  <li>🌐 Interactive React-based frontend</li>
</ul>

<hr/>

<h2>🛠️ Tech Stack</h2>

<h3>Backend</h3>
<ul>
  <li>Python (FastAPI)</li>
  <li>Pydantic (Schema validation)</li>
  <li>LangChain + Google Generative AI</li>
  
</ul>

<h3>Frontend</h3>
<ul>
  <li>React.js</li>
  <li>CSS</li>
</ul>

<hr/>

<h2>📂 Project Structure</h2>

<pre>
ET-HACKATHON-PROJECT/
│
├── backend/
│   ├── data/profiles.json
│   ├── models/user_input.py
│   ├── schemas/financial_schema.py
│   ├── services/
│   ├── input_full.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/my-react-app/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── index.css
│
└── README.md
</pre>

<hr/>

<h2>⚙️ Installation & Setup</h2>

<h3>1. Clone the Repository</h3>
<pre>git clone 
https://github.com/soumikdalei/FinPilot-AI.git
cd ai-money-mentor
</pre>

<h3>2. Backend Setup</h3>
<pre>
cd backend
pip install -r requirements.txt
</pre>

<p>Create a <code>.env</code> file:</p>
<pre>
GOOGLE_API_KEY=your_api_key
</pre>

<p>Run backend:</p>
<pre>
uvicorn main:app --reload
</pre>

<h3>3. Frontend Setup</h3>
<pre>
cd frontend/my-react-app
npm install
npm start
</pre>

<hr/>

<h2>▶️ How It Works</h2>
<ol>
  <li>User inputs financial details (income, expenses, savings, etc.)</li>
  <li>Backend validates data using schemas</li>
  <li>AI evaluates financial health</li>
  <li>System returns:
    <ul>
      <li>Scores (0–100)</li>
      <li>Reasons</li>
      <li>Actionable suggestions</li>
    </ul>
  </li>
</ol>

<hr/>

<h2>🔐 Safety Rules</h2>
<ul>
  <li>❌ No stock tips</li>
  <li>❌ No guaranteed returns</li>
  <li>❌ No complex jargon</li>
  <li>✅ Only safe, practical advice</li>
</ul>

<hr/>

<h2>🚧 Future Improvements</h2>
<ul>
  <li>Add user authentication</li>
  <li>Integrate database</li>
  <li>Improve AI personalization</li>
  <li>Deploy on cloud (AWS / Vercel)</li>
</ul>

<hr/>


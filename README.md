
# 🧠 Finance Risk Analytics Dashboard

A full-stack web application that provides a visual dashboard for analyzing financial risk scores and customer credit data.

---

## 📁 Project Structure

```
/backend      # Express/Node.js backend
/frontend     # React + TypeScript frontend
```

---

## ⚙️ Setup Instructions

### 🔧 Backend (Node.js + Express)

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   Add the following (update with actual values if required):
   ```
   PORT=5000
   DB_URL=your_database_connection_string
   ```

4. **Run the backend server**:
   ```bash
   npm start
   ```

---

### 💻 Frontend (React + TypeScript)

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

Frontend will run on `http://localhost:3000`  
Backend will run on `http://localhost:5000`

---

## 🔍 Risk Scoring Explanation

Each customer is assigned a **Risk Score** between 0 and 100 based on multiple parameters like:

- Credit Score
- Income vs Expenses ratio
- Payment history
- Account age
- Loan defaults (if any)


**Calculation Breakdown:**


### 📌 Example:

**Customer Name:** *Kevin Baker* 
**Loan Repayment History**: [1, 1, 0, 1, 0, 0, 1, 1] 
**Missed Payments: count of 0’s**: 3
**Credit Score:** 655  
**repaymentPenalty**: 3 × 5 = 15
**Outstanding Loans / Income**:17000 / 5700 ≈ 2.9825
**debtRatio**: 2.9825 × 10 ≈ 29.825
**Credit‐score penalty**: (850 – 655) × 0.1 = 195 × 0.1 = 19.5
**Monthly Income:** ₹5700 
**Monthly Expenses:** ₹2900 
**Status:** Review

**debtRatio**=(monthlyIncome/outstandingLoans )×10
**score**=(850−creditScore)×0.1+repaymentPenalty+debtRatio
**Round to nearest integer, then clamp between 0 and 100**: 64

Hence, Risk Score = **64** → Placed in “Moderate Risk” category.

---

## 🤖 AI Tool Usage (ChatGPT Assistance)

This project was fully guided and built using **ChatGPT-4**.  
Here's how it helped:

### 🛠️ Development Help:
- Explained React and TypeScript setup
- Helped me with the calculation in risk-scoring calculations 
- Built filtering and sorting logic
- Debugged styling issues

### 📈 Visualization:
- Guided on using Recharts for pie charts and line charts

### ⚙️ Backend:
- Explained basic Express server setup
- Helped design API structure
- Suggested folder structure for maintainability

---

### 📸 Suggested Screenshots:

1. **Dashboard Screenshot**  
   _Show the complete working dashboard with filters and chart visualizations._
   

3. **ChatGPT Conversations** 

   _Screenshots of conversations with ChatGPT helping in React component creation, chart configuration, or risk calculation logic._

4. **Code Snippet Screenshot**  
   _Screenshot of code generated with AI help (e.g., PieChart component, filter section)._

---
<img width="1274" alt="dashboard" src="https://github.com/user-attachments/assets/9f16fe66-8c12-4302-b7d4-a30c23631a98" />
<img width="1280" alt="nightmode_dashboard" src="https://github.com/user-attachments/assets/ad79f79e-981d-4776-a32e-640418bffb1e" />
<img width="732" alt="risk_score-algorith" src="https://github.com/user-attachments/assets/3139c86b-1fc1-4f3e-9712-ebdd43b4d8e8" />




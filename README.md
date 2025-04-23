
# 🧠 Finance Risk Analytics Dashboard

A full-stack web application that provides a visual dashboard for analyzing financial risk scores and customer credit data.

---

## 📁 Project Structure

```
├── backend      # Express/Node.js backend
├── public/
├── src/
│   ├── assets/                # Images or icons
│   ├── components/            # Reusable components (Charts, Table, etc.)
│   ├── pages/                 # Main pages like Dashboard
│   ├── styles/                # All CSS files
│   │   └── Dashboard.css
│   ├── utils/                 # Helper functions like risk score calculation
│   ├── types/                 # TypeScript interfaces and types
│   ├── App.tsx
│   ├── index.tsx
├── package.json
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

3. **Create `.env` file (Optional)**:
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
   cd credit-risk-dashboard
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

**FORMULA**
**debtRatio**=(outstandingLoans/monthlyIncome)×10
**score**=(850−creditScore)×0.1 + repaymentPenalty + debtRatio

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

**score**=(850−creditScore)×0.1+repaymentPenalty+debtRatio
         =(850-655)*0.1+15+29.825 = 64.325
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
   <img width="1274" alt="dashboard" src="https://github.com/user-attachments/assets/9f16fe66-8c12-4302-b7d4-a30c23631a98" />
   
   <img width="1280" alt="nightmode_dashboard" src="https://github.com/user-attachments/assets/ad79f79e-981d-4776-a32e-640418bffb1e" />

2. **Responsive Mobile View**
   <img width="1279" alt="image" src="https://github.com/user-attachments/assets/5416230f-e964-4172-a7d2-76b0463187b9" />


3. **ChatGPT Conversations** 

  <img width="1076" alt="image" src="https://github.com/user-attachments/assets/7af18b7d-b0f4-4983-83c5-a3e0b5bf04ff" />
  
  <img width="1075" alt="image" src="https://github.com/user-attachments/assets/3a5f7a68-16e2-4941-a259-3ae49c5db9c8" />

  <img width="732" alt="risk_score-algorith" src="https://github.com/user-attachments/assets/3139c86b-1fc1-4f3e-9712-ebdd43b4d8e8" />



4. **Code Snippet Screenshot**  
   <img width="1081" alt="image" src="https://github.com/user-attachments/assets/7040554c-4c46-4d38-bb6e-d2d22c79b26d" />

   <img width="1075" alt="image" src="https://github.com/user-attachments/assets/1f66ef2e-294e-495f-b881-5be04711a9d6" />


---








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

### 📌 Example:

**Customer Name:** *John Doe*  
**Credit Score:** 610  
**Monthly Income:** ₹50,000  
**Monthly Expenses:** ₹47,000  
**Status:** Review

**Calculation Breakdown:**

| Metric                  | Score   |
|-------------------------|---------|
| Credit Score (Moderate) | 25/40   |
| High Expenses           | 10/20   |
| No defaults             | 20/20   |
| Short account age       | 5/10    |
| Late payments (minor)   | 4/10    |
| **Total**               | **64/100** |

Hence, Risk Score = **64** → Placed in “Moderate Risk” category.

---

## 🤖 AI Tool Usage (ChatGPT Assistance)

This project was fully guided and built using **ChatGPT-4**.  
Here's how it helped:

### 🛠️ Development Help:
- Explained React and TypeScript setup
- Helped with `useState`, `useEffect`, and props typing
- Built filtering and sorting logic
- Wrote Jest unit tests for components
- Debugged styling issues

### 📈 Visualization:
- Guided on using Recharts for pie charts and line charts
- Helped center-align charts and components

### ⚙️ Backend:
- Explained basic Express server setup
- Helped design API structure
- Suggested folder structure for maintainability

---

### 📸 Suggested Screenshots:

1. **Dashboard Screenshot**  
   _Show the complete working dashboard with filters and chart visualizations._

2. **ChatGPT Conversations**  
   _Screenshots of conversations with ChatGPT helping in React component creation, chart configuration, or risk calculation logic._

3. **Code Snippet Screenshot**  
   _Screenshot of code generated with AI help (e.g., PieChart component, filter section)._

4. **Testing Output**  
   _Screenshot of running Jest test results (if tests are included)._

---

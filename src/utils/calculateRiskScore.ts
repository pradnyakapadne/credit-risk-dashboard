import { Customer } from "../types/Customer";

export const calculateRiskScore = (customer: Customer): number => {
  const missedPayments = customer.loanRepaymentHistory.filter(p => p === 0).length;
  const repaymentPenalty = missedPayments * 5;
  const debtRatio = (customer.outstandingLoans / customer.monthlyIncome) * 10;
  const score = (850 - customer.creditScore) * 0.1 + repaymentPenalty + debtRatio;
  return Math.min(Math.max(Math.round(score), 0), 100);
};

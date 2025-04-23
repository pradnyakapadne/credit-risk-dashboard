export interface Customer {
    customerId: string;
    name: string;
    monthlyIncome: number;
    monthlyExpenses: number;
    creditScore: number;
    outstandingLoans: number;
    loanRepaymentHistory: number[];
    accountBalance: number;
    status: string;
    riskScore?: number;
  }
  
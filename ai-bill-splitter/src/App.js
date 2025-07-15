import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (data) => {
    setExpenses((prev) => [...prev, data]);
  };

  const handleTogglePayment = (expenseIndex, user) => {
    setExpenses((prev) =>
      prev.map((exp, i) =>
        i === expenseIndex
          ? {
              ...exp,
              payments: {
                ...exp.payments,
                [user]: !exp.payments[user],
              },
            }
          : exp
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Bill Splitter</h1>
      <ExpenseForm onAdd={handleAddExpense} />
      <ExpenseSummary expenses={expenses} onTogglePayment={handleTogglePayment} />
    </div>
  );
}

export default App;

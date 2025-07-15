export default function ExpenseSummary({ expenses, onTogglePayment }) {
  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Summary</h2>
      <ul className="space-y-2">
        {expenses.map((expense, i) =>
          expense.participants.map((person) => {
            if (person === expense.payer) return null;

            const paid = expense.payments[person];
            const key = `${i}-${person}`;

            return (
              <li key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={paid}
                  onChange={() => onTogglePayment(i, person)}
                />
                <span
                  className={`${
                    paid ? "line-through text-gray-500" : ""
                  }`}
                >
                  {person} owes {expense.payer} ${(
                    expense.amount / expense.participants.length
                  ).toFixed(2)}
                  {paid && " (Paid)"}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

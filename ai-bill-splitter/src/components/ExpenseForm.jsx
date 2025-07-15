import { useState } from "react";

const mockUsers = ["Alice", "Bob", "Charlie", "David", "Eve"];

export default function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState(mockUsers[0]);
  const [participants, setParticipants] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (participants.length === 0) {
      alert("Please select at least one participant");
      return;
    }

    // Build initial payments object
    const payments = {};
    participants.forEach((person) => {
      if (person !== payer) {
        payments[person] = false; // not paid yet
      }
    });

    onAdd({
      description,
      amount: parseFloat(amount),
      payer,
      participants,
      payments,
    });

    setDescription("");
    setAmount("");
    setPayer(mockUsers[0]);
    setParticipants([]);
  };

  const toggleParticipant = (user) => {
    setParticipants((prev) =>
      prev.includes(user)
        ? prev.filter((u) => u !== user)
        : [...prev, user]
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4"
    >
      <div>
        <label className="block font-semibold">Description</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Amount ($)</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Who Paid?</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        >
          {mockUsers.map((user) => (
            <option key={user}>{user}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Split Between</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {mockUsers.map((user) => (
            <label key={user} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={participants.includes(user)}
                onChange={() => toggleParticipant(user)}
              />
              {user}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Expense
      </button>
    </form>
  );
}

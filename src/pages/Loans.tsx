import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

interface Loan {
  id: number;
  amount: number;
  months: number;
  status: string;
}

const Loans: React.FC = () => {
  const { user } = useUser();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');

  useEffect(() => {
    if (user) {
      fetchLoans();
    }
  }, [user]);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(`http://localhost:5213/api/loans/user/${user?.id}`);
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const handleRequestLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newLoan = { userId: user.id, amount: parseFloat(amount), months: parseInt(months), status: 'Pending' };
      await axios.post('http://localhost:5213/api/loans', newLoan);
      
      // Limpiar el formulario
      setAmount('');
      setMonths('');

      // Recargar la lista de préstamos
      fetchLoans();
    } catch (error) {
      console.error('Error requesting loan:', error);
    }
  };

  return (
    <div>
      <h2>Loans</h2>
      <p>Welcome, {user?.name}!</p>
      <p>Your role: {user?.role}</p>

      {user?.role === 'User' && (
        <div>
          <h3>Request a Loan</h3>
          <form onSubmit={handleRequestLoan}>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Months:</label>
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                required
              />
            </div>
            <button type="submit">Request Loan</button>
          </form>
        </div>
      )}

      <h3>Your Loans</h3>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            Amount: ${loan.amount}, Months: {loan.months}, Status: {loan.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Loans;

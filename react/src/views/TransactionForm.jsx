import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function TransactionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [transactions, setTransactions] = useState({
    id: null,
    payment_type: '',
    transaction_date: '',
    status: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/transactions/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setTransactions(data.data);  // Ensure the response matches the structure from your API
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching transaction:", error);
        });
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    setErrors(null);

    if (transactions.id) {
      axiosClient.put(`/transactions/${transactions.id}`, transactions)
        .then(() => {
          navigate('/transactions');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/transactions`, transactions)
        .then(() => {
          navigate('/transactions');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleInputChange = (key, value) => {
    setTransactions({ ...transactions, [key]: value });
  };

  return (
    <>
      {transactions.id ? <h1 className="text-3xl font-bold mb-4">Update Transaction</h1> : <h1 className="text-3xl font-bold mb-4">New Transaction</h1>}
      <div className="card animated fadeInDown p-6">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} className="space-y-4">
            <input 
              value={transactions.payment_type} 
              onChange={ev => handleInputChange('payment_type', ev.target.value)} 
              placeholder="Payment Type" 
              className="w-full px-3 py-2 border rounded"
            />
            <input 
              type="date"
              value={transactions.transaction_date} 
              onChange={ev => handleInputChange('transaction_date', ev.target.value)} 
              placeholder="Transaction Date" 
              className="w-full px-3 py-2 border rounded"
            />
            <input 
              value={transactions.status} 
              onChange={ev => handleInputChange('status', ev.target.value)} 
              placeholder="Status" 
              className="w-full px-3 py-2 border rounded"
            />
            <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{transactions.id ? 'Update' : 'Save'}</button>
          </form>
        )}
      </div>
    </>
  );
}

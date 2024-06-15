import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTransactions();
  }, []);

  const onDelete = (transaction) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }
    axiosClient.delete(`/transactions/${transaction.id}`)
      .then(() => {
        getTransactions();
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  const getTransactions = () => {
    setLoading(true);
    axiosClient.get('/transactions')
      .then(({ data }) => {
        setLoading(false);
        console.log("Fetched transactions:", data);
        setTransactions(data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching transactions: " + error.message);
        console.error(error.response.data);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Transactions</h1>
        <Link to="/transactions/new" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add new
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Payment Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Transaction Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
                transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.payment_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transaction_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={'/transactions/' + transaction.id} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                    <button onClick={() => onDelete(transaction)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
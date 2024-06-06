import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const onDelete = (order) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    axiosClient.delete(`/orders/${order.id}`).then(() => {
      getOrders();
    });
  };

  const getOrders = () => {
    setLoading(true);
    axiosClient.get("/orders")
     .then(({ data }) => {
        setLoading(false);
        setOrder(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Orders</h1>
        <Link to="/orders/new" className="btn-add">Add new</Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Quantity</th>
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
              orders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.status}</td>
                  <td>
                    <Link to={'/orders/' + order.id} className="text-indigo-600 hover:text-indigo-900 mr-2">
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      onClick={() => onDelete(order)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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

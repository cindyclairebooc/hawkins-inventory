import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  const onDelete = (item) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    axiosClient.delete(`/items/${item.items_id}`)
      .then(() => {
        getItems();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const getItems = () => {
    setLoading(true);
    axiosClient.get('/items')
      .then(({ data }) => {
        setLoading(false);
        setItems(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching items:", error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Items</h1>
        <Link to="/items/new" className="btn-add">Add new</Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Manufactured Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Stock</th>
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
              items.map((item) => (
                <tr key={item.items_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.items_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.item_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.manufactured_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={'/items/' + item.items_id} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                    <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900">Delete</button>
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
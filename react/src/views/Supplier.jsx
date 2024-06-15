import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Supplier() {
  const [suppliers, setSuppliers] = useState([]);  // plural, since it holds multiple suppliers
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const onDelete = (supplier) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) {
      return;
    }

    axiosClient.delete(`/suppliers/${supplier.id}`)
      .then(() => {
        fetchSuppliers();
      })
      .catch((error) => {
        console.error("Error deleting supplier:", error);
      });
  };

  const fetchSuppliers = () => {
    setLoading(true);
    axiosClient.get('/suppliers')
      .then(({ data }) => {
        setLoading(false);
        console.log("Fetched suppliers:", data);
        setSuppliers(data.data);  // plural, since it holds multiple suppliers
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching suppliers: " + error.message);
        console.error(error.response.data);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Suppliers</h1>
        <Link to="/suppliers/new" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add new
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Phone Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Item Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.supplier_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.phone_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.item_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={'/suppliers/' + supplier.id} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                    <button onClick={() => onDelete(supplier)} className="text-red-600 hover:text-red-900">Delete</button>
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

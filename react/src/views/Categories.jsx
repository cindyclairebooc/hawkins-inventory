import { useEffect, useState } from "react";
import axiosClient from "../axios-client"; // Ensure this path is correct
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const onDelete = (category) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    axiosClient.delete(`/categories/${category.id}`)
      .then(() => {
        getCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const getCategories = () => {
    setLoading(true);
    axiosClient.get('/categories')
      .then(({ data }) => {
        setLoading(false);
        setCategories(data.data); // Adjust this according to your API response structure
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching categories:", error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Categories</h1>
        <Link to="/categories/new" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add new</Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.category_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link className="text-indigo-600 hover:text-indigo-900 mr-2" to={'/categories/' + category.id}>Edit</Link>
                    <button onClick={() => onDelete(category)} className="text-red-600 hover:text-red-900">Delete</button>
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

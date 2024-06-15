import { useEffect, useState } from "react";
import axiosClient from "../axios-client"; // Make sure this path is correct
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Categories</h1>
        <Link to="/categories/new" className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.category_name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Link className="btn-edit" to={'/categories/' + category.id}>Edit</Link>
                    &nbsp;
                    <button onClick={() => onDelete(category)} className="btn-delete">Delete</button>
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

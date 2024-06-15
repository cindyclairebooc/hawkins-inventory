import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { getCategories } from "../axios-client";

export default function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState({
    id: null,
    item_name: '',
    manufactured_date: '',
    price: '',
    stock: '',
    category_id: '',
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/items/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setItem(data.data);  // Ensure the response matches the structure from your API
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching item:", error);
        });
    }

    getCategories()
      .then((data) => {
        if (Array.isArray(data)) {
          setCategory(data);
        } else {
          console.error('Category response is not an array');
        }
      })
      .catch(err => console.error(err));

  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    const itemData = {
      ...item,
      category_id: parseInt(item.category_id),
    };

    if (item.id) {
      axiosClient.put(`/items/${item.id}`, itemData)
        .then(() => {
          navigate('/items');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/items`, item)
        .then(() => {
          navigate('/items');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleCategoryChange = (value) => {
    setItem(prevItem => ({ ...prevItem, category_id: parseInt(value) }));
  };  

  return (
    <>
      {item.id ? <h1 className="text-3xl font-bold mb-4">Update Item: {item.item_name}</h1> : <h1 className="text-3xl font-bold mb-4">New Item</h1>}
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
              value={item.item_name}
              onChange={(ev) => setItem({ ...item, item_name: ev.target.value })}
              placeholder="Item Name"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="date"
              value={item.manufactured_date}
              onChange={(ev) => setItem({ ...item, manufactured_date: ev.target.value })}
              placeholder="Manufactured Date"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="number"
              value={item.price}
              onChange={(ev) => setItem({ ...item, price: ev.target.value })}
              placeholder="Price"
              step="0.01"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="number"
              value={item.stock}
              onChange={(ev) => setItem({ ...item, stock: ev.target.value })}
              placeholder="Stock"
              className="w-full px-3 py-2 border rounded"
            />
            <select 
              value={item.category_id} 
              onChange={ev => handleCategoryChange(ev.target.value)} 
              placeholder="Category"
              className="w-full px-3 py-2 border rounded"
            >
            <option value="">Select Category</option>
              {category.map(category => (
              <option key={category.id} value={category.id}>{category.cat_name}</option>
              ))}
            </select>
            <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{item.id ? 'Update' : 'Save'}</button>
          </form>
        )}
      </div>
    </>
  );
}
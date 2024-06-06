import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [item, setItem] = useState({
    items_id: null,
    item_name: '',
    manufactured_date: '',
    price: '',
    stock: '',
    category_id: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/items/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setItem(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    setErrors(null);

    if (item.items_id) {
      axiosClient.put(`/items/${item.items_id}`, item)
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

  return (
    <>
      {item.items_id ? <h1>Update Item: {item.item_name}</h1> : <h1>New Item</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={item.item_name}
              onChange={(ev) => setItem({ ...item, item_name: ev.target.value })}
              placeholder="Item Name"
            />
            <input
              type="date"
              value={item.manufactured_date}
              onChange={(ev) => setItem({ ...item, manufactured_date: ev.target.value })}
              placeholder="Manufactured Date"
            />
            <input
              type="number"
              value={item.price}
              onChange={(ev) => setItem({ ...item, price: ev.target.value })}
              placeholder="Price"
              step="0.01"
            />
            <input
              type="number"
              value={item.stock}
              onChange={(ev) => setItem({ ...item, stock: ev.target.value })}
              placeholder="Stock"
            />
            {/* <input
              type="number"
              value={item.category_id}
              onChange={(ev) => setItem({ ...item, category_id: ev.target.value })}
              placeholder="Category ID"
            /> */}
            <button type="submit" className="btn">{item.items_id ? 'Update' : 'Save'}</button>
          </form>
        )}
      </div>
    </>
  );
}
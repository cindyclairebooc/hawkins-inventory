import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { getItems, getSuppliers } from "../axios-client";

export default function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [order, setOrder] = useState({
    id: null,
    item_id: '',
    supplier_id: '',
    quantity: 1,
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/orders/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setOrder(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }

    getItems()
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('Item response is not an array');
        }
      })
      .catch(err => console.error(err));

    getSuppliers()
      .then((data) => {
        if (Array.isArray(data)) {
          setSuppliers(data);
        } else {
          console.error('Supplier response is not an array');
        }
      })
      .catch(err => console.error(err));

  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const orderData = {
      ...order,
      item_id: parseInt(order.item_id),
      supplier_id: parseInt(order.supplier_id),
    };

    setLoading(true); // Add a loading state before making the request

    if (order.id) {
      axiosClient.put(`/orders/${order.id}`, orderData)
        .then(() => {
          setLoading(false); // Stop loading state after request completes
          navigate('/orders');
        })
        .catch((err) => {
          setLoading(false); // Stop loading state if there's an error
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/orders`, orderData)
        .then(() => {
          setLoading(false); // Stop loading state after request completes
          navigate('/orders');
        })
        .catch((err) => {
          setLoading(false); // Stop loading state if there's an error
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleItemChange = (value) => {
    setOrder(prevOrder => ({ ...prevOrder, item_id: parseInt(value) }));
  };

  const handleSupplierChange = (value) => {
    setOrder(prevOrder => ({ ...prevOrder, supplier_id: parseInt(value) }));
  };

  const handleStatusChange = (value) => {
    setOrder({ ...order, status: value });
  };

  return (
    <>
      {order.id ? <h1 className="text-xl font-bold mb-4">Update Order</h1> : <h1 className="text-xl font-bold mb-4">New Order</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center text-gray-500">
            Loading...
          </div>
        )}
        {errors && (
          <div className="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} className="space-y-4">
            <select 
              value={order.item_id} 
              onChange={ev => handleItemChange(ev.target.value)} 
              placeholder="Item"
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Item</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>{item.item_name}</option>
              ))}
            </select>
            <select 
              value={order.supplier_id} 
              onChange={ev => handleSupplierChange(ev.target.value)} 
              placeholder="Supplier"
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.supplier_name}</option>
              ))}
            </select>
            <input
              type="number"
              value={order.quantity}
              onChange={(ev) => setOrder({ ...order, quantity: parseInt(ev.target.value) || 0 })}
              placeholder="Quantity"
              className="w-full px-3 py-2 border rounded"
            />
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="Pending"
                  checked={order.status === 'Pending'}
                  onChange={(ev) => handleStatusChange(ev.target.value)}
                />
                Pending
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="Completed"
                  checked={order.status === 'Completed'}
                  onChange={(ev) => handleStatusChange(ev.target.value)}
                />
                Completed
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="Cancelled"
                  checked={order.status === 'Cancelled'}
                  onChange={(ev) => handleStatusChange(ev.target.value)}
                />
                Cancelled
              </label>
            </div>
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
          </form>
        )}
      </div>
    </>
  );
}

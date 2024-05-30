import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    id: null,
    customer: '',
    product: '',
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
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    setLoading(true);

    if (id) {
      axiosClient.put(`/orders/${order.id}`, order)
        .then(() => {
          navigate('/orders');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/orders`, order)
        .then(() => {
          navigate('/orders');
        })
        .catch((err) => {
            setLoading(false);
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {order.id ? <h1>Update Order: {order.product}</h1> : <h1>Create New Order</h1>}
      <div className="card animated fadeInDown">
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key, index) => (
              <p key={index}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={order.customer}
              onChange={(ev) => setOrder({ ...order, customer: ev.target.value })}
              placeholder="Customer"
            />
            <input
              value={order.product}
              onChange={(ev) => setOrder({ ...order, product: ev.target.value })}
              placeholder="Product"
            />
            <input
              type="number"
              value={order.quantity}
              onChange={(ev) => setOrder({ ...order, quantity: parseInt(ev.target.value) || 0 })}
              placeholder="Quantity"
            />
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="Pending"
                  checked={order.status === 'Pending'}
                  onChange={(ev) => setOrder({ ...order, status: ev.target.value })}
                />
                Pending
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="Completed"
                  checked={order.status === 'Completed'}
                  onChange={(ev) => setOrder({ ...order, status: ev.target.value })}
                />
                Completed
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="Cancelled"
                  checked={order.status === 'Cancelled'}
                  onChange={(ev) => setOrder({ ...order, status: ev.target.value })}
                />
                Cancelled
              </label>
            </div>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
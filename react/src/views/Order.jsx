import { useEffect } from "react";
import { useState } from "react";
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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Orders</h1>
        <Link to="/orders/new" className="btn-add">
          Add Order
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading &&
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link className="btn-edit" to={'/orders/' + order.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      onClick={() => onDelete(order)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
}
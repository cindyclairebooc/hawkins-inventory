import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client'; // Adjust the import path as necessary

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    axiosClient.get('/items')
      .then(({ data }) => {
        setItems(data.data);
        setLoadingItems(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoadingItems(false);
      });

    axiosClient.get('/users')
      .then(({ data }) => {
        setUsers(data.data);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoadingUsers(false);
      });
  }, []);

  useEffect(() => {
    axiosClient.get('/orders')
      .then(({ data }) => {
        setOrders(data.data);
        setLoadingOrders(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoadingOrders(false);
      });
  }, []);


  return (
    <main className="flex-1 bg-gray-100 p-8">
     <div id="hs-single-bar-chart"></div>
    </main>
  );
};

export default Dashboard;

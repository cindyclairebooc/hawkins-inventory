import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client'; // Adjust the import path as necessary

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

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

  return (
    <main className="flex-1 bg-gray-100 p-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Employees</h2>
          {loadingUsers ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <Link
                  key={user.id}
                  to={`/users/${user.id}`}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Email: {user.email}</p>
                  <p className="text-sm text-gray-600 mb-2">Gender: {user.gender}</p>
                  <p className="text-sm text-gray-600">Birth: {user.date_of_birth}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="container mx-auto mt-8">
          <h2 className="text-3xl font-semibold mb-4">Items</h2>
          {loadingItems ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <Link
                  key={item.items_id}
                  to={`/items/${item.items_id}`}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.item_name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Manufactured Date: {item.manufactured_date}</p>
                  <p className="text-sm text-gray-600 mb-2">Price: ${item.price}</p>
                  <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                  {/* <p className="text-sm text-gray-600 mb-2">Category: {i.category_name}</p> */}
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
  );
};

export default Dashboard;
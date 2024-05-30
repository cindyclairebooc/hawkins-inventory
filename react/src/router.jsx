import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import NotFound from './views/NotFound.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Dashboard from './views/Dashboard.jsx';
import UserForm from './views/UserForm.jsx';
import Users from './views/Users.jsx';
import Order from './views/Order.jsx';
import OrderForm from './views/OrderForm.jsx';


const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/users/new',
                element: <UserForm />,
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>,
            },
            {
                path: '/orders',
                element: <Order/>,
            },
            {
                path: '/orders/new',
                element: <OrderForm />,
            },
            {
                path: '/orders/:id',
                element: <OrderForm key="orderUpdate"/>,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;


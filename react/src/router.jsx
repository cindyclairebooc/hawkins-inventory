import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import NotFound from './views/NotFound.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Dashboard from './views/Dashboard.jsx';
import UserForm from './views/UserForm.jsx';
import Users from './views/Users.jsx';
import Item from './views/Item.jsx';
import ItemForm from './views/ItemForm.jsx';
import Categories from './views/Categories.jsx';
import CategoryForm from './views/CategoryForm.jsx';
import CustomerDashboard from './views/CustomerDashboard.jsx';
import DefaultLayoutCustomer from './components/DefaultLayoutCustomer.jsx';
import ItemsView from './views/ItemsView.jsx';
import Orders from './views/Order.jsx';
import OrderForm from './views/OrderForm.jsx';
import Customer from './views/Customer.jsx';
import Transaction from './views/Transaction.jsx';
import Department from './views/Department.jsx';
import DepartmentForm from './views/DepartmentForm.jsx';
import Position from './views/Position.jsx';
import PositionForm from './views/PositionForm.jsx';



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
                element: <UserForm />,
            },
            {
                path: '/items',
                element: <Item />,
            },
            {
                path: '/items/new',
                element: <ItemForm />,
            },
            {
                path: '/items/:id',
                element: <ItemForm key="itemUpdate" />,
            },
            {
                path: '/categories',
                element: <Categories />,
            },
            {
                path: '/categories/new',
                element: <CategoryForm />,
            },
            {
                path: '/categories/:id',
                element: <CategoryForm key=" Category Update"/>,
            },
            {
                path: '/orders',
                element: <Orders/>,
            },
            {
                path: '/orders/new',
                element: <OrderForm />,
            },
            {
                path: '/orders/:id',
                element: <OrderForm key="orderUpdate"/>,
            },
            {
                path: '/customer',
                element: <Customer />,
            },
            {
                path: '/transactions',
                element: <Transaction />,
            },
            {
                path: '/departments',
                element: <Department />,
            },
            {
                path: '/departments/new',
                element: <DepartmentForm />,
            },
            {
                path: '/departments/:id',
                element: <DepartmentForm />,
            },
            {
                path: '/positions',
                element: <Position />,
            },
            {
                path: '/positions/new',
                element: <PositionForm />,
            },
            {
                path: '/positions/:id',
                element: <PositionForm />,
            },

        ], 
        
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
    {
        path: '/customer',
        element: <DefaultLayoutCustomer />,
        children: [
            {
                path: '/customer/dashboard',
                element: <CustomerDashboard />,
            },
            {
                path: '/customer/dashboard/items/view',
                element: <ItemsView />,
            },
        ]
    },
]);

export default router;
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
import Department from './views/Department.jsx';
import DepartmentForm from './views/DepartmentForm.jsx';
import Position from './views/Position.jsx';
import PositionForm from './views/PositionForm.jsx';
import Items from './views/Item.jsx';
import ItemForm from './views/ItemForm.jsx';
import Category from './views/Category.jsx';
import CategoryForm from './views/CategoryForm.jsx';
import Supplier from './views/Supplier.jsx';
import SupplierForm from './views/SupplierForm.jsx';
import Transaction from'./views/Transaction.jsx';
import TransactionForm from './views/TransactionForm.jsx';
import CustomerDashboard from './views/CustomerDashboard.jsx';
import DefaultLayoutCustomer from './components/DefaultLayoutCustomer.jsx';


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
            {
                path: '/departments',
                element: <Department/>,
            },
            {
                path: '/departments/new',
                element: <DepartmentForm />,
            },
            {
                path: '/departments/:id',
                element: <DepartmentForm key="departmentUpdate"/>,
            },
            {
                path: '/positions',
                element: <Position/>,
            },
            {
                path: '/positions/new',
                element: <PositionForm />,
            },
            {
                path: '/positions/:id',
                element: <PositionForm key="positionUpdate"/>,
            },
            {
                path: '/items',
                element: <Items />,
            },
            {
                path: '/items/new',
                element: <ItemForm />,
            },
            {
                path: '/items/:id',
                element: <ItemForm key="ItemUpdate"/>,
            },
            {
                path: '/categories',
                element: <Category />,
            },
            {
                path: '/categories/new',
                element: <CategoryForm />,
            },
            {
                path: '/categories/:id',
                element: <CategoryForm key="CategoryUpdate"/>,
            },
            {
                path: '/suppliers',
                element: <Supplier />,
            },
            {
                path: '/suppliers/new',
                element: <SupplierForm />,
            },
            {
                path: '/suppliers/:id',
                element: <SupplierForm key="SupplierUpdate"/>,
            },
            {
                path: '/transactions',
                element: <Transaction />,
            },
            {
                path: '/transactions/new',
                element: <TransactionForm />,
            },
            {
                path: '/transactions/:id',
                element: <TransactionForm key="TransactionUpdate"/>,
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
    {
        path: '/customer/dashboard',
        element: <DefaultLayoutCustomer />,
        children: [
            {
                path: '/customer/dashboard',
                element: <CustomerDashboard />,
            },
        ]
    }
]);

export default router;


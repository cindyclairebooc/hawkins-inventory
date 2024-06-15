import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/EmployeeContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            });
    };

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            });
    }, [setUser]);

    return (
        <div id="defaultLayout" className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-blue-500 text-white flex flex-col justify-between p-6 shadow-lg">
                <div>
                    <div className="text-2xl font-bold mb-6">Hawkins</div>
                    <nav className="flex flex-col space-y-4">
                        <Link to="/dashboard" className="text-lg font-medium hover:text-gray-300">
                            Dashboard
                        </Link>
                        <Link to="/users" className="text-lg font-medium hover:text-gray-300">
                            Employees
                        </Link>
                        <Link to="/items" className="text-lg font-medium hover:text-gray-300">
                            Items
                        </Link>
                        <Link to="/orders" className="text-lg font-medium hover:text-gray-300">
                            Orders
                        </Link>
                        <Link to="/categories" className="text-lg font-medium hover:text-gray-300">
                            Categories
                        </Link>
                        <Link to="/customer" className="text-lg font-medium hover:text-gray-300">
                            Customers
                        </Link>
                        <Link to="/transactions" className="text-lg font-medium hover:text-gray-300">
                            Transactions
                        </Link>
                        <Link to="/departments" className="text-lg font-medium hover:text-gray-300">
                            Departments
                        </Link>
                        <Link to="/positions" className="text-lg font-medium hover:text-gray-300">
                            Positions
                        </Link>
                    </nav>
                </div>
                <div className="flex justify-center">
                    <span
                        onClick={onLogout}
                        className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-red-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400 cursor-pointer"
                    >
                        <svg
                            className="flex-shrink-0 w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </span>
                </div>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="text-xl font-semibold text-gray-800">Header</div>
                    <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-800">{user.name}</span>
                        <img className="inline-block w-12 h-12 rounded-full" src={`https://i.pravatar.cc/150?img=${user.id}`} alt="User Avatar" />
                    </div>
                </header>
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; 2024 Hawkins. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

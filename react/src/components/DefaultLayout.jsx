import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/EmployeeContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext()

    if (!token){
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then( () => {
                setUser({})
                setToken(null)
            })
    }

    useEffect( () => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }
    
    )


    return (
        <div id="defaultLayout" className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
                <Link to="/dashboard" className="text-lg font-medium hover:text-gray-300">Dashboard</Link>
                <Link to="/users" className="text-lg font-medium hover:text-gray-300">Employees</Link>
                <Link to="/orders" className="text-lg font-medium hover:text-gray-300">Orders</Link>
                <Link to="/items" className="text-lg font-medium hover:text-gray-300"> Items </Link>
                <Link to="/categories" className="text-lg font-medium hover:text-gray-300"> Categories </Link>
                <Link to="/departments" className="text-lg font-medium hover:text-gray-300">Departments</Link>
                <Link to="/positions" className="text-lg font-medium hover:text-gray-300">Positions</Link>
                <Link to="/suppliers" className="text-lg font-medium hover:text-gray-300">Suppliers</Link>
                <Link to="/transactions" className="text-lg font-medium hover:text-gray-300">Transactions</Link>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-200 p-4 flex justify-between items-center">
                    <div className="text-xl font-semibold">Header</div>
                    <div className="flex items-center space-x-4">
                        <span className="font-medium">{user.name}</span>
                        <button
                        onClick={onLogout}
                        className="text-sm text-red-600 hover:underline"
                        >
                        Logout
                        </button>
                    </div>
                    </header>
                    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    <Outlet />
                </main>
        </div>
    </div>
    )
}

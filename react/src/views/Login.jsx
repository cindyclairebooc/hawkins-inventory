import { Link, useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/EmployeeContextProvider.jsx";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        const { user, token } = data;
        setUser(user);
        setToken(token);

        // Check user type and redirect accordingly
        if (user.user_type === 'admin') {
          navigate('/dashboard');
        } else if (user.user_type === 'customer') {
          navigate('/customer/dashboard');
        } else {
          // Default redirect if user type is unknown
          navigate('/');
        }
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message]
            });
          }
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
          <img src="src/img/login-icon.png" alt="Logo" className="h-15 w-24 mx-auto pb-1" />
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account!</h1>
        <form onSubmit={onSubmit}>
          {errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input ref={emailRef} type="email" id="email" placeholder="Enter your email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input ref={passwordRef} type="password" id="password" placeholder="Enter your password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
          </div>
          <p className="mt-6 text-center text-gray-600 text-sm">
            Not registered? <Link to="/signup" className="text-blue-500 hover:underline">Create an account!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

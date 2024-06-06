import { Link, useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/EmployeeContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const genderRef = createRef();
  const birthRef = createRef();
  const userTypeRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const onSubmit = ev => {
    ev.preventDefault();
  
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      gender: genderRef.current.value,
      date_of_birth: birthRef.current.value,
      user_type: userTypeRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        const { user, token, redirect_url } = data;
        setUser(user);
        setToken(token);
        navigate(redirect_url);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          // Capture and display validation errors
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-6 text-blue-600">Signup for Free</h1>
          {errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <div className="mb-4">
            <input ref={nameRef} type="text" placeholder="Full Name" className="w-full px-3 py-2 border rounded bg-gray-200"/>
          </div>
          <div className="mb-4">
            <input ref={emailRef} type="email" placeholder="Email Address" className="w-full px-3 py-2 border rounded bg-gray-200"/>
          </div>
          <div className="mb-4">
            <select ref={genderRef} defaultValue="" className="w-full px-3 py-2 border rounded bg-gray-200">
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <input ref={birthRef} type="date" placeholder="Date of Birth" className="w-full px-3 py-2 border rounded bg-gray-200"/>
          </div>
          <div className="mb-4">
            <select ref={userTypeRef} defaultValue="" className="w-full px-3 py-2 border rounded bg-gray-200">
              <option value="" disabled>Select User Type</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <input ref={passwordRef} type="password" placeholder="Password" className="w-full px-3 py-2 border rounded bg-gray-200"/>
          </div>
          <div className="mb-4">
            <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" className="w-full px-3 py-2 border rounded bg-gray-200"/>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Signup</button>
          <p className="mt-4 text-center text-gray-600">Already registered? <Link to="/login" className="text-blue-500 hover:underline">Log In!</Link></p>
        </form>
      </div>
    </div>
    );
  }

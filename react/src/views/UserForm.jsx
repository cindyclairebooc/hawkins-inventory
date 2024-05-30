import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        gender: '',
        date_of_birth: '',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser({
                        ...data,
                        password: '',
                        password_confirmation: ''
                    });
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = ev => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post('/users', user)
                .then(() => {
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const handleGenderChange = (value) => {
        setUser({ ...user, gender: value });
    };

    const handleDateOfBirthChange = (value) => {
        setUser({ ...user, date_of_birth: value });
    };

    return (
        <>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input 
                            value={user.name} 
                            onChange={ev => setUser({ ...user, name: ev.target.value })} 
                            placeholder="Name" 
                        />
                        <input 
                            value={user.email} 
                            onChange={ev => setUser({ ...user, email: ev.target.value })} 
                            placeholder="Email" 
                        />
                        <select 
                            value={user.gender} 
                            onChange={ev => handleGenderChange(ev.target.value)} 
                            placeholder="Gender"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input 
                            type="date" 
                            value={user.date_of_birth} 
                            onChange={ev => handleDateOfBirthChange(ev.target.value)} 
                            placeholder="Date of Birth" 
                        />
                        <input 
                            type="password" 
                            value={user.password} 
                            onChange={ev => setUser({ ...user, password: ev.target.value })} 
                            placeholder="Password" 
                        />
                        <input 
                            type="password" 
                            value={user.password_confirmation} 
                            onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} 
                            placeholder="Password Confirmation" 
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}

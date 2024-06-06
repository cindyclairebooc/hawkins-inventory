import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function PositionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState({
    id: null,
    pos_name: '',
    pos_description: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/positions/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setPosition(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    setLoading(true);

    if (id) {
      axiosClient.put(`/positions/${position.id}`, position)
        .then(() => {
          navigate('/positions');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/positions`, position)
        .then(() => {
          navigate('/positions');
        })
        .catch((err) => {
            setLoading(false);
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {position.id ? <h1>Update Position: {position.pos_name}</h1> : <h1>Create New Position</h1>}
      <div className="card animated fadeInDown">
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key, index) => (
              <p key={index}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={position.pos_name}
              onChange={(ev) => setPosition({ ...position, pos_name: ev.target.value })}
              placeholder="Name"
            />
            <input
              value={position.pos_description}
              onChange={(ev) => setPosition({ ...position, pos_description: ev.target.value })}
              placeholder="Description"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    id: null,
    cat_name: '',
    cat_description: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/categories/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setCategory(data);
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
      axiosClient.put(`/categories/${category.id}`, category)
        .then(() => {
          navigate('/categories');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/categories`, category)
        .then(() => {
          navigate('/categories');
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
      {category.id ? <h1>Update Category: {category.cat_name}</h1> : <h1>Create New Category</h1>}
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
              value={category.cat_name}
              onChange={(ev) => setCategory({ ...category, cat_name: ev.target.value })}
              placeholder="Name"
            />
            <input
              value={category.cat_description}
              onChange={(ev) => setCategory({ ...category, cat_description: ev.target.value })}
              placeholder="Description"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [category, setCategory] = useState({
    id: null,
    category_name: '',
    description: '',
  });

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
    setErrors(null);

    if (category.id) {
      axiosClient.put(`/categories/${category.id}`, category)
        .then(() => {
          navigate('/categories');
        })
        .catch(err => {
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
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {category.id ? <h1>Update Category: {category.category_name}</h1> : <h1>New Category</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={category.category_name}
              onChange={(ev) => setCategory({ ...category, category_name: ev.target.value })}
              placeholder="Category Name"
            />
            <input
              value={category.description}
              onChange={(ev) => setCategory({ ...category, description: ev.target.value })}
              placeholder="Description"
            />
            <button type="submit" className="btn">{category.id ? 'Update' : 'Save'}</button>
          </form>
        )}
      </div>
    </>
  );
}

export default CategoryForm

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function SupplierForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [supplier, setSupplier] = useState({
    id: null,
    supplier_name: '',
    phone_number: '',
    email: '',
    address: '',
    item_type: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/suppliers/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setSupplier(data.data);  // singular, since it holds one supplier
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching supplier:", error.response.data);
        });
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    setErrors(null);

    if (supplier.id) {
      axiosClient.put(`/suppliers/${supplier.id}`, supplier)
        .then(() => {
          navigate('/suppliers');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/suppliers`, supplier)
        .then(() => {
          navigate('/suppliers');
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
      {supplier.id ? <h1 className="text-3xl font-bold mb-4">Update Supplier: {supplier.supplier_name}</h1> : <h1 className="text-3xl font-bold mb-4">New Supplier</h1>}
      <div className="card animated fadeInDown p-6">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              value={supplier.supplier_name}
              onChange={(ev) => setSupplier({...supplier, supplier_name: ev.target.value })}
              placeholder="Supplier Name"
              className="w-full px-3 py-2 border rounded"
            />
            <input 
                value={supplier.phone_number} 
                onChange={ev => setSupplier({...supplier, phone_number: ev.target.value })} 
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded" 
            />
            <input 
                value={supplier.email} 
                onChange={ev => setSupplier({...supplier, email: ev.target.value })} 
                placeholder="Email" 
                className="w-full px-3 py-2 border rounded"
            />
            <input 
                value={supplier.address} 
                onChange={ev => setSupplier({...supplier, address: ev.target.value })} 
                placeholder="Address" 
                className="w-full px-3 py-2 border rounded"
            />
            <input 
                value={supplier.item_type} 
                onChange={ev => setSupplier({...supplier, item_type: ev.target.value})} 
                placeholder="Item Type" 
                className="w-full px-3 py-2 border rounded"
            />
            <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{supplier.id ? 'Update' : 'Save'}</button>
          </form>
        )}
      </div>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/api-client';
import Loader from '../Common/Loader';

const Sellers = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState('');
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    apiClient
      .get('/users')
      .then(res => {
        setSellers(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setErrors(err.message);
      });
  }, []);

  // if (isLoading) return <h3>Loading ...</h3>;

  const addSeller = () => {
    const newSeller = {
      name,
      id: sellers.length + 1,
    };

    setSellers([newSeller, ...sellers]);
    apiClient
      .post('/users', newSeller)
      .then(res => setSellers(res.data, ...sellers))
      .catch(err => {
        setErrors(err.message);
        setSellers(sellers);
      });
  };

  const deleteSeller = id => {
    setSellers(sellers.filter(s => s.id !== id));

    apiClient.delete(`/users/${id}`).catch(err => {
      setErrors(err.message);
      setSellers(sellers);
    });
  };

  const updateSeller = seller => {
    const updatedSeller = {
      ...seller,
      name: seller.name + ' Updated',
    };

    setSellers(sellers.map(s => (s.id === seller.id ? updatedSeller : s)));

    apiClient.patch(`/users/${seller.id}`, updatedSeller).catch(err => {
      setErrors(err.message);
      setSellers(sellers);
    });
  };

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input type="text" onChange={e => setName(e.target.value)} />
      <button onClick={addSeller}>Add Seller</button>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {errors && <em>{errors}</em>}
      <table>
        <tbody>
          {sellers.map(seller => (
            <tr key={seller.id}>
              <td>{seller.name}</td>
              <td>
                <button onClick={() => updateSeller(seller)}>Update</button>
              </td>
              <td>
                <button onClick={() => deleteSeller(seller.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sellers;

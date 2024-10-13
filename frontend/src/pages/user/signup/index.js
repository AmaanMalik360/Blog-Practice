import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showToast } from '../../../components/common/toaster';
import "../../../stylesheets/Create.css";
import { BACKEND_URL } from '../../../BackendLink';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Initialize role as 'user'
  const [pending, setPending] = useState(false);
  const move = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/users/register`, {
        username,
        password,
        role,
      });

      if (response.status === 201) {
        showToast(response.data.message, 'success');
        setPending(false);
        move('/signin');
      } else {
        console.error('Error during signup:');
        setPending(false);
        showToast(response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setPending(false);
      showToast('Error during signup', 'error');
    }
  };

  return (
    <>
      <div className='create'>
        <h2>Sign up</h2>

        <form onSubmit={handleSubmit}>
          <input
            type='username'
            required
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            required
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Select option for role */}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {!pending && <button>Signup</button>}
          {pending && <button disabled>Signing Up.....</button>}
        </form>
      </div>
    </>
  );
};

export default Signup;
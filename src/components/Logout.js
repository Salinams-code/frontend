import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    logout();
    history.push('/login');
  }, [logout, history]);

  return <p>Logging out...</p>;
};

export default Logout;

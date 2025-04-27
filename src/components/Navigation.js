import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Navigation.module.css'; // Import CSS module

const Navigation = () => {
  const { auth } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/" className={styles.active}>Home</Link>
        </li>
        {auth.token ? (
          <>
            <li>
              <Link to="/invoices">Invoices</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className={styles.login}>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

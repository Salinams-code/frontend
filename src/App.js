// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import InvoiceList from './components/pages/InvoiceList';
import AddInvoice from './components/pages/AddInvoice';
import EditInvoice from './components/pages/EditInvoice';
import Login from './components/Login';
import Logout from './components/Logout';
import Navigation from './components/Navigation';
import InvoiceDetails from './components/pages/InvoiceDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute exact path="/" component={InvoiceList} />
          <PrivateRoute path="/invoices/:id" component={InvoiceDetails} />
          <PrivateRoute path="/add" component={AddInvoice} />
          <PrivateRoute path="/edit/:id" component={EditInvoice} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

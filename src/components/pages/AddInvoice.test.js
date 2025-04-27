// src/components/pages/AddInvoice.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AddInvoice from './AddInvoice';

const mockStore = configureStore([]);
const store = mockStore({ invoices: { invoices: [], status: 'idle', error: null } });

test('renders the AddInvoice form', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AddInvoice />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByLabelText(/Client:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Amount:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Due Date:/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Invoice/i)).toBeInTheDocument();
});

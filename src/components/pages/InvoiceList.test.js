// src/components/pages/InvoiceList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import InvoiceList from './InvoiceList';
import { fetchInvoices } from '../../redux/features/invoiceSlice';

jest.mock('../../redux/features/invoiceSlice', () => ({
  fetchInvoices: jest.fn(),
  deleteInvoice: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({
  invoices: {
    invoices: [{ id: 1, client: 'Client A', amount: 100, due_date: '2024-06-30' }],
    status: 'idle',
    error: null,
  },
});

test('renders the InvoiceList with data', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <InvoiceList />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/Client A/i)).toBeInTheDocument();
  expect(screen.getByText(/\$100/i)).toBeInTheDocument();
  expect(screen.getByText(/2024-06-30/i)).toBeInTheDocument();
  expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  expect(screen.getByText(/Delete/i)).toBeInTheDocument();
});

test('calls fetchInvoices on load', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <InvoiceList />
      </MemoryRouter>
    </Provider>
  );

  expect(fetchInvoices).toHaveBeenCalledTimes(1);
});

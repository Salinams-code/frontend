// src/components/pages/EditInvoice.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import EditInvoice from './EditInvoice';

const mockStore = configureStore([]);
const store = mockStore({
  invoices: {
    invoices: [{ id: 1, client: 'Client A', amount: 100, due_date: '2024-06-30' }],
    status: 'idle',
    error: null,
  },
});

test('renders the EditInvoice form with pre-filled data', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/edit/1']}>
        <Route path="/edit/:id">
          <EditInvoice />
        </Route>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByLabelText(/Client:/i)).toHaveValue('Client A');
  expect(screen.getByLabelText(/Amount:/i)).toHaveValue(100);
  expect(screen.getByLabelText(/Due Date:/i)).toHaveValue('2024-06-30');
});

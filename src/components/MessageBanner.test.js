// src/components/MessageBanner.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageBanner from './MessageBanner';

test('renders the message banner with a success message', () => {
  const message = 'Operation was successful!';
  const onClose = jest.fn();

  render(<MessageBanner message={message} type="success" onClose={onClose} />);

  expect(screen.getByText(message)).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('closes the banner when close button is clicked', () => {
  const message = 'Operation was successful!';
  const onClose = jest.fn();

  render(<MessageBanner message={message} type="success" onClose={onClose} />);

  fireEvent.click(screen.getByRole('button'));

  expect(onClose).toHaveBeenCalledTimes(1);
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders console title screen', () => {
  render(<App />);
  const consoleTitle = screen.getByText(/Are you winning son/i);
  expect(consoleTitle).toBeInTheDocument();
});

test('renders fetched answer', () => {});

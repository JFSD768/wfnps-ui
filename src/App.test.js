import React from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Name Pronunciation Tool");
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router';
test('Test the header appears', () => {
  render(
    <BrowserRouter >
      <App />
    </BrowserRouter >
  );
  const header = screen.getByText(/Welcome to my Blog!/i);
  expect(header).toBeInTheDocument();
});
test('Test the image loads', () => {
  render(
    <BrowserRouter >
      <App />
    </BrowserRouter >
  );
  const image = screen.getByAltText("Site Logo");
  expect(image).toBeInTheDocument();
});

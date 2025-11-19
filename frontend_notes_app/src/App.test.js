import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const titleNode = screen.getByLabelText('app-title');
  expect(titleNode).toBeInTheDocument();
});

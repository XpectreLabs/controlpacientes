import { render, screen } from '@testing-library/react';
import Home from '../app/page.jsx';

describe('<Home />', () => {
  test('Validar boton', () => {
    render(<Home />);
    const buttonElement = screen.getByText(/Login/i);
    expect(buttonElement).toBeInTheDocument();
  })

});

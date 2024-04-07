import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Item from './item';

describe('Item component', () => {
  const mockProps = {
    name: 'Country',
    flagUrl: 'https://example.com/flag.png',
    capital: 'Capital City',
  };

  it('renders without crashing', () => {
    render(<Item {...mockProps} />);
  });

  it('initially hides the capital', () => {
    const { queryByText } = render(<Item {...mockProps} />);
    expect(queryByText('Capital City')).toBeNull();
  });

  it('shows the capital on button click', () => {
    const { getByText, queryByText } = render(<Item {...mockProps} />);
    fireEvent.click(getByText('Show Capital'));
    expect(queryByText('Capital City')).toBeInTheDocument();
  });

  it('toggles capital visibility on button click', () => {
    const { getByText, queryByText } = render(<Item {...mockProps} />);
    fireEvent.click(getByText('Show Capital'));
    expect(queryByText('Capital City')).toBeInTheDocument();
    fireEvent.click(getByText('Hide Capital'));
    expect(queryByText('Capital City')).toBeNull();
  });

  it('changes button text on capital visibility toggle', () => {
    const { getByText } = render(<Item {...mockProps} />);
    const button = getByText('Show Capital');
    fireEvent.click(button);
    expect(button.textContent).toBe('Hide Capital');
    fireEvent.click(button);
    expect(button.textContent).toBe('Show Capital');
  });
});
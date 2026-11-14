import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatCard } from '../components/StatCard';

describe('StatCard Component', () => {
  test('renders with label and value', () => {
    render(<StatCard label="Test Label" value={42} color="bg-blue-500" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  test('applies correct color class', () => {
    const { container } = render(
      <StatCard label="Colored" value={10} color="bg-red-500" />
    );

    const colorDiv = container.querySelector('.bg-red-500');
    expect(colorDiv).toBeInTheDocument();
  });

  test('displays correct numerical value', () => {
    render(<StatCard label="Count" value={0} color="bg-gray-500" />);
    expect(screen.getByText('0')).toBeInTheDocument();

    const { unmount } = render(
      <StatCard label="Count" value={999} color="bg-green-500" />
    );
    expect(screen.getByText('999')).toBeInTheDocument();
  });
});

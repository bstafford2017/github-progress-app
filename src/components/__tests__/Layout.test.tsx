import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from '../components/Layout';

describe('Layout Component', () => {
  test('renders navigation bar', () => {
    render(
      <Router>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </Router>
    );

    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <Router>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </Router>
    );

    const dashboardLink = screen.getByText('Dashboard');
    const changesLink = screen.getByText('Changes');

    expect(dashboardLink).toBeInTheDocument();
    expect(changesLink).toBeInTheDocument();
  });

  test('renders children content', () => {
    render(
      <Router>
        <Layout>
          <div>Test Content Here</div>
        </Layout>
      </Router>
    );

    expect(screen.getByText('Test Content Here')).toBeInTheDocument();
  });

  test('has dark mode styling', () => {
    const { container } = render(
      <Router>
        <Layout>
          <div>Content</div>
        </Layout>
      </Router>
    );

    const darkBg = container.querySelector('.bg-gray-900');
    expect(darkBg).toBeInTheDocument();
  });
});

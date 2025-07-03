// src/tests/LaunchModal.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LaunchModal from '../components/LaunchModal';

const mockLaunch = {
  id: '123',
  name: 'FalconSat',
  rocket: 'Falcon 9',
  date_utc: '2020-05-30T00:00:00.000Z',
  flight_number: 42,
  manufacturer: 'SpaceX',
  nationality: 'USA',
  launchpad: 'Launch Complex 39A',
  success: true,
  upcoming: false,
  details: 'A test mission.',
  payloads: [{ type: 'Satellite', orbit: 'LEO' }],
  links: {
    patch: {
      small: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
    },
    wikipedia: 'https://en.wikipedia.org/wiki/FalconSat',
  },
};

describe('LaunchModal Component', () => {
  

  it('renders image with alt text', () => {
    render(<LaunchModal launch={mockLaunch} onClose={() => {}} />);
    const img = screen.getByAltText('FalconSat');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockLaunch.links.patch.small);
  });

  it('renders Wikipedia link', () => {
    render(<LaunchModal launch={mockLaunch} onClose={() => {}} />);
    const link = screen.getByRole('link', { name: /wikipedia/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockLaunch.links.wikipedia);
  });

  it('renders webcast, YouTube, and article icons', () => {
    render(<LaunchModal launch={mockLaunch} onClose={() => {}} />);
    expect(screen.getByTestId('icon-weebly')).toBeInTheDocument();
    expect(screen.getByTestId('icon-youtube')).toBeInTheDocument();
    expect(screen.getByTestId('icon-article')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(<LaunchModal launch={mockLaunch} onClose={mockOnClose} />);
    const closeButton = screen.getByRole('button', { name: /close modal/i }); // match aria-label
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});

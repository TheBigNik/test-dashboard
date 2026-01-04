import { render, screen, fireEvent } from '@testing-library/react';
import { ProductFilters } from './ProductFilters';
import { useRouter, useSearchParams } from 'next/navigation';
import { vi, describe, it, expect } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

describe('ProductFilters', () => {
  it('updates the URL when the search input changes', () => {
    const pushMock = vi.fn();
    (useRouter as any).mockReturnValue({ push: pushMock });

    render(<ProductFilters />);
    
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'laptop' } });

    // Check if router.push was called with the correct search param
    expect(pushMock).toHaveBeenCalledWith(expect.stringContaining('q=laptop'));
  });
});
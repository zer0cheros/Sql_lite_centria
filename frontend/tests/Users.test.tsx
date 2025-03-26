import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Users from '../src/components/Users'; // adjust the path as needed

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('Users Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('renders title and empty user list', async () => {
    render(<Users />);
    
    // Title check
    expect(screen.getByText(/User List/i)).toBeInTheDocument();
    
    // No users message
    await waitFor(() => {
      expect(screen.getByText(/No users found/i)).toBeInTheDocument();
    });
  });

  test('renders form inputs and submit button', () => {
    render(<Users />);

    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add User/i })).toBeInTheDocument();
  });

  test('submits form and adds new user to list', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            id: 1,
            name: 'Alice',
            email: 'alice@example.com',
          }),
      });
  
    render(<Users />);
  
    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'alice@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /Add User/i }));
  
    const listItems = await screen.findAllByRole('listitem');
  
    expect(
      listItems.some((li) =>
        li.textContent?.includes('Alice') &&
        li.textContent?.includes('alice@example.com')
      )
    ).toBe(true);
  });
  });

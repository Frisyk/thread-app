/**
 * Skenario testing
 *
 * - AddComment component
 *   - should handle content typing correctly
 *   - should show alert when the comment is empty
 *   - should call addComment function when the button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import AddComment from './AddComment';

expect.extend(matchers);

describe('AddComment component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle content typing correctly', async () => {
    // Arrange
    render(<AddComment id="1" addComment={() => {}} />);
    const textarea = await screen.getByPlaceholderText('Tambahkan komentar mu...');

    // Action
    await userEvent.type(textarea, 'This is a comment');

    // Assert
    expect(textarea).toHaveValue('This is a comment');
  });

  it('should show alert when the comment is empty', async () => {
    // Arrange
    window.alert = vi.fn();
    render(<AddComment id="1" addComment={() => {}} />);
    const button = await screen.getByRole('button', { name: 'Tambahkan' });

    // Action
    await userEvent.click(button);

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Comment cannot be empty!');
  });

  it('should call addComment function when the button is clicked', async () => {
    // Arrange
    const mockAddComment = vi.fn();
    render(<AddComment id="1" addComment={mockAddComment} />);
    const textarea = await screen.getByPlaceholderText('Tambahkan komentar mu...');
    await userEvent.type(textarea, 'This is a comment');
    const button = await screen.getByRole('button', { name: 'Tambahkan' });

    // Action
    await userEvent.click(button);

    // Assert
    expect(mockAddComment).toHaveBeenCalledWith('1', 'This is a comment');
    expect(textarea).toHaveValue('');
  });
});

/**
 * Skenario testing
 *
 * - AddThreadInput component
 *   - should handle title typing correctly
 *   - should handle description typing correctly
 *   - should handle category selection correctly
 *   - should call addThread function when the form is submitted with valid inputs
 *   - should show alert when form is submitted with empty title or description
 */

import React from 'react';
import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import {
  afterEach,
  describe, expect, it, vi,
} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import AddThreadInput from './ThreadInput';

expect.extend(matchers);

describe('AddThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    render(
      <MemoryRouter>
        <AddThreadInput addThread={() => {}} />
      </MemoryRouter>,
    );
    const titleInput = await screen.getByPlaceholderText('Masukkan judul thread');

    await userEvent.type(titleInput, 'Judul baru');

    expect(titleInput).toHaveValue('Judul baru');
  });

  it('should handle description typing correctly', async () => {
    render(
      <MemoryRouter>
        <AddThreadInput addThread={() => {}} />
      </MemoryRouter>,
    );

    const descInput = screen.getByPlaceholderText('Masukkan deskripsi thread');

    await userEvent.type(descInput, 'Deskripsi baru');

    expect(descInput).toHaveValue('Deskripsi baru');
  });

  it('should handle category selection correctly', async () => {
    render(
      <MemoryRouter>
        <AddThreadInput addThread={() => {}} />
      </MemoryRouter>,
    );
    const categorySelect = screen.getByLabelText('Kategori');

    fireEvent.change(categorySelect, { target: { value: 'teknologi' } });

    expect(categorySelect).toHaveValue('teknologi');
  });

  it('should call addThread function when the form is submitted with valid inputs', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    render(
      <MemoryRouter>
        <AddThreadInput addThread={mockAddThread} />
      </MemoryRouter>,
    );

    const titleInput = await screen.getByPlaceholderText('Masukkan judul thread');
    await userEvent.type(titleInput, 'Judul thread');

    const descInput = await screen.getByPlaceholderText('Masukkan deskripsi thread');
    await userEvent.type(descInput, 'Deskripsi thread');

    const categorySelect = await screen.getByLabelText('Kategori');
    await userEvent.selectOptions(categorySelect, 'teknologi');

    const submitButton = await screen.getByRole('button', { name: /Tambahkan Thread/i });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockAddThread).toHaveBeenCalledWith('Judul thread', 'Deskripsi thread', 'teknologi');
  });

  it('should show alert when form is submitted with empty title or description', () => {
    global.alert = vi.fn();
    render(
      <MemoryRouter>
        <AddThreadInput addThread={() => {}} />
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole('button', { name: /Tambahkan Thread/i });
    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith('Semua field harus diisi!');
  });
});

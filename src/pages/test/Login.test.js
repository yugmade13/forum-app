/**
 * skenario testing
 *
 * - Login
 *   - should Button and Placeholder to be in the document
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 */

import React from 'react';
import { act, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserEvent from '@testing-library/user-event';
import RenderConnected from './RenderConnected';
import Register from '../Register';

describe('Login', () => {
  beforeEach(async () => {
    await act(async () => render(<RenderConnected children={<Register />} />));
  });

  it('should Button and Placeholder to be in the document', async () => {
    const text = await screen.getByPlaceholderText('Nama');
    const button = await screen.getByRole('button');

    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should handle email typing correctly', async () => {
    const email = await screen.getByPlaceholderText('Email');

    await act(async () => UserEvent.type(email, 'test@gmail.com'));

    expect(email).toHaveValue('test@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    const password = await screen.getByPlaceholderText('******');

    await act(async () => UserEvent.type(password, '123456'));

    expect(password).toHaveValue('123456');
  });
});
/** @jest-environment jsdom */
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthCard } from './AuthCard';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

describe('AuthCard', () => {
  it('renders title + children', () => {
    const { getByText } = render(<AuthCard title="Sign in">body</AuthCard>);
    expect(getByText('Sign in')).toBeTruthy();
    expect(getByText('body')).toBeTruthy();
  });
});

describe('LoginForm', () => {
  it('validates required fields before submitting', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByRole } = render(<LoginForm onSubmit={onSubmit} />);
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(getByText('Email is required')).toBeTruthy());
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits credentials when valid', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByText, getByRole, getByPlaceholderText, container } = render(<LoginForm onSubmit={onSubmit} />);
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.change(container.querySelector('input[type="password"]')!, { target: { value: 'secret12' } });
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.c', password: 'secret12' }));
  });

  it('surfaces a thrown error', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('bad creds'));
    const { getByText, getByRole, getByPlaceholderText, container } = render(<LoginForm onSubmit={onSubmit} />);
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.change(container.querySelector('input[type="password"]')!, { target: { value: 'secret12' } });
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(getByText('bad creds')).toBeTruthy());
  });
});

describe('SignupForm / ForgotPasswordForm', () => {
  it('SignupForm enforces min password length', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText, container } = render(<SignupForm onSubmit={onSubmit} />);
    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[0]!, { target: { value: 'Abir' } }); // name
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.change(container.querySelector('input[type="password"]')!, { target: { value: 'short' } });
    fireEvent.click(getByText('Sign up'));
    await waitFor(() => expect(getByText(/at least 8/)).toBeTruthy());
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('ForgotPasswordForm shows sent state', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordForm onSubmit={onSubmit} />);
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.click(getByText('Send reset link'));
    await waitFor(() => expect(getByText(/Check your email/)).toBeTruthy());
    expect(onSubmit).toHaveBeenCalledWith('a@b.c');
  });
});

import * as React from 'react';
import { fireEvent, waitFor, within } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { AuthCard } from './AuthCard';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

describe('AuthCard (native)', () => {
  it('renders the title and its children', () => {
    const { getByText } = renderThemed(
      <AuthCard title="Welcome">
        <></>
      </AuthCard>,
      SEED_LIGHT
    );
    expect(getByText('Welcome')).toBeTruthy();
  });
});

describe('LoginForm (native)', () => {
  it('renders email + password fields and a submit button', () => {
    const { getByText, getByRole } = renderThemed(<LoginForm onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    // 'Sign in' is both the card heading and the submit label, so target the
    // button (a Pressable → role "button") and assert its own label.
    expect(within(getByRole('button')).getByText('Sign in')).toBeTruthy();
  });

  it('shows validation errors and does not call onSubmit when empty', () => {
    const onSubmit = jest.fn();
    const { getByText, getByRole } = renderThemed(<LoginForm onSubmit={onSubmit} />, SEED_LIGHT);
    fireEvent.press(getByRole('button'));
    expect(getByText('Email is required')).toBeTruthy();
    expect(getByText('Password is required')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with the values when valid', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByRole, getByPlaceholderText, UNSAFE_getAllByType } = renderThemed(
      <LoginForm onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'ada@example.com');
    // password is the second TextInput (no placeholder).
    const inputs = UNSAFE_getAllByType(require('react-native').TextInput);
    fireEvent.changeText(inputs[1], 'hunter2');
    fireEvent.press(getByRole('button'));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ email: 'ada@example.com', password: 'hunter2' })
    );
  });
});

describe('SignupForm (native)', () => {
  it('renders name/email/password fields and enforces min password length', () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText, UNSAFE_getAllByType } = renderThemed(
      <SignupForm onSubmit={onSubmit} minPasswordLength={8} />,
      SEED_LIGHT
    );
    expect(getByText('Name')).toBeTruthy();
    const inputs = UNSAFE_getAllByType(require('react-native').TextInput);
    fireEvent.changeText(inputs[0], 'Ada'); // name
    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'ada@example.com');
    fireEvent.changeText(inputs[2], 'short'); // password < 8
    fireEvent.press(getByText('Sign up'));
    expect(getByText('Password must be at least 8 characters')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with the values when valid', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByText, getByPlaceholderText, UNSAFE_getAllByType } = renderThemed(
      <SignupForm onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    const inputs = UNSAFE_getAllByType(require('react-native').TextInput);
    fireEvent.changeText(inputs[0], 'Ada Lovelace');
    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'ada@example.com');
    fireEvent.changeText(inputs[2], 'longenoughpw');
    fireEvent.press(getByText('Sign up'));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        password: 'longenoughpw',
      })
    );
  });
});

describe('ForgotPasswordForm (native)', () => {
  it('validates the email field and does not call onSubmit when empty', () => {
    const onSubmit = jest.fn();
    const { getByText } = renderThemed(<ForgotPasswordForm onSubmit={onSubmit} />, SEED_LIGHT);
    fireEvent.press(getByText('Send reset link'));
    expect(getByText('Email is required')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with the email and shows the sent state', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByText, getByPlaceholderText } = renderThemed(
      <ForgotPasswordForm onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'ada@example.com');
    fireEvent.press(getByText('Send reset link'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith('ada@example.com'));
    await waitFor(() => expect(getByText('Check your email for a reset link.')).toBeTruthy());
  });
});

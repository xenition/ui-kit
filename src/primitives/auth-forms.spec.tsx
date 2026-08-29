/** @jest-environment jsdom */
/**
 * The auth family (web): `AuthCard` and the parts every auth surface shares,
 * plus the three composed forms.
 *
 * The forms are drawn from `AuthCard`'s parts now (§6/§9 of
 * ONBOARDING-DESIGN-SPEC.md), so the specs cover both halves: the wiring the
 * forms have always had, and the anatomy they gained — the 56px field with its
 * leading icon and eye toggle, the errors that are never colour-only, and the
 * empty states that must still look composed.
 */
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthCard, AuthDivider, AuthField, AuthProviderButton, AuthTermsCard } from './AuthCard';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

describe('AuthCard', () => {
  it('renders title + children', () => {
    const { getByText } = render(<AuthCard title="Sign in">body</AuthCard>);
    expect(getByText('Sign in')).toBeTruthy();
    expect(getByText('body')).toBeTruthy();
  });

  it('renders the brand tile only when a glyph or icon is given', () => {
    const { queryByText } = render(<AuthCard title="Sign in">body</AuthCard>);
    expect(queryByText('🥕')).toBeNull();

    const { getByText } = render(
      <AuthCard title="Sign in" brandGlyph="🥕">
        body
      </AuthCard>
    );
    expect(getByText('🥕')).toBeTruthy();
  });

  it('survives its empty state — no title, no subtitle, no footer', () => {
    const { getByText, container } = render(<AuthCard>body</AuthCard>);
    expect(getByText('body')).toBeTruthy();
    expect(container.querySelector('h1')).toBeNull();
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});

describe('AuthField', () => {
  it('renders a 56px row with a leading icon, against token classes only', () => {
    const { getByLabelText, container } = render(
      <AuthField label="Email" icon="mail" aria-label="Email" value="" onChange={() => {}} />
    );
    expect(getByLabelText('Email')).toBeTruthy();
    // The height is the one geometric literal §10 allows, named in AuthCard —
    // `h-14`, the same 56 `GetStartedButton` pins the CTA to.
    expect(container.innerHTML).toContain('h-14');
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('draws an error as a border AND a message — never colour alone', () => {
    const clean = render(
      <AuthField label="Email" aria-label="Email" value="" onChange={() => {}} />
    );
    expect(clean.container.innerHTML).not.toContain('border-danger');

    // Scoped to its own container: both renders share `document.body`, and the
    // default queries are bound to the body rather than the container.
    const { getByText, container } = render(
      <AuthField
        label="Email"
        aria-label="Email"
        value=""
        onChange={() => {}}
        error="Enter a valid email"
      />
    );
    expect(getByText('Enter a valid email')).toBeTruthy();
    expect(getByText('Enter a valid email').className).toContain('text-danger-text');
    expect(container.querySelector('input')!.getAttribute('aria-invalid')).toBe('true');
    expect(container.innerHTML).toContain('border-danger');
  });

  it('toggles masking from the eye affordance', () => {
    const { getByLabelText, getByRole } = render(
      <AuthField secure label="Password" aria-label="Password" value="" onChange={() => {}} />
    );
    expect((getByLabelText('Password') as HTMLInputElement).type).toBe('password');
    fireEvent.click(getByRole('button', { name: 'Show password' }));
    expect((getByLabelText('Password') as HTMLInputElement).type).toBe('text');
  });

  it('reports edits through onChangeText, the native twin’s signature', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = render(
      <AuthField label="Email" aria-label="Email" value="" onChangeText={onChangeText} />
    );
    fireEvent.change(getByLabelText('Email'), { target: { value: 'a@b.c' } });
    expect(onChangeText).toHaveBeenCalledWith('a@b.c');
  });
});

describe('AuthDivider / AuthProviderButton', () => {
  it('draws the rule bare when it has no label', () => {
    const { queryByText, container } = render(<AuthDivider />);
    expect(queryByText('or continue with')).toBeNull();
    expect(container.innerHTML).toContain('bg-border');
  });

  it('reports the clicked provider', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <AuthProviderButton label="Continue with Google" glyph="🌐" onClick={onClick} />
    );
    fireEvent.click(getByRole('button', { name: 'Continue with Google' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('AuthTermsCard', () => {
  it('renders both links inline and reports which was clicked', () => {
    const onLinkClick = jest.fn();
    const { getByText } = render(<AuthTermsCard onLinkClick={onLinkClick} />);
    expect(getByText('Terms of Service')).toBeTruthy();
    expect(getByText('Privacy Policy')).toBeTruthy();
    fireEvent.click(getByText('Privacy Policy'));
    expect(onLinkClick).toHaveBeenCalledWith('privacy');
  });

  it('reports the next consent value', () => {
    const onCheckedChange = jest.fn();
    const { getByLabelText } = render(<AuthTermsCard onCheckedChange={onCheckedChange} />);
    fireEvent.click(getByLabelText('I agree to the'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
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
    const { getByRole, getByPlaceholderText, container } = render(<LoginForm onSubmit={onSubmit} />);
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.change(container.querySelector('input[type="password"]')!, {
      target: { value: 'secret12' },
    });
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.c', password: 'secret12' })
    );
  });

  it('surfaces a thrown error', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('bad creds'));
    const { getByText, getByRole, getByPlaceholderText, container } = render(
      <LoginForm onSubmit={onSubmit} />
    );
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.change(container.querySelector('input[type="password"]')!, {
      target: { value: 'secret12' },
    });
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(getByText('bad creds')).toBeTruthy());
  });

  it('takes the optional §9 dressing — brand tile, subtitle, right-aligned forgot link', () => {
    const onForgotPassword = jest.fn();
    const { getByText, getByRole, container } = render(
      <LoginForm
        onSubmit={jest.fn()}
        brandGlyph="🥕"
        subtitle="Pick up where you left off."
        onForgotPassword={onForgotPassword}
      />
    );
    expect(getByText('🥕')).toBeTruthy();
    expect(getByText('Pick up where you left off.')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Forgot password?' }));
    expect(onForgotPassword).toHaveBeenCalledTimes(1);
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('hides the forgot link and the sign-up switch until they are wired', () => {
    const { queryByText } = render(<LoginForm onSubmit={jest.fn()} />);
    expect(queryByText('Forgot password?')).toBeNull();
    expect(queryByText('No account?')).toBeNull();
  });
});

describe('SignupForm / ForgotPasswordForm', () => {
  it('SignupForm enforces min password length', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText, container } = render(<SignupForm onSubmit={onSubmit} />);
    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[0]!, { target: { value: 'Abir' } }); // name
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.change(container.querySelector('input[type="password"]')!, {
      target: { value: 'short' },
    });
    fireEvent.click(getByText('Sign up'));
    await waitFor(() => expect(getByText(/at least 8/)).toBeTruthy());
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('SignupForm has no consent step by default', () => {
    const { queryByText } = render(<SignupForm onSubmit={jest.fn()} />);
    expect(queryByText('Terms of Service')).toBeNull();
  });

  it('SignupForm gates the CTA behind the terms card when requireTerms is set', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByText, getByRole, getByLabelText, getByPlaceholderText, container } = render(
      <SignupForm onSubmit={onSubmit} requireTerms />
    );
    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[0]!, { target: { value: 'Abir' } });
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.change(container.querySelector('input[type="password"]')!, {
      target: { value: 'longenoughpw' },
    });

    expect(getByText('Terms of Service')).toBeTruthy();
    expect((getByRole('button', { name: 'Sign up' }) as HTMLButtonElement).disabled).toBe(true);

    fireEvent.click(getByLabelText('I agree to the'));
    fireEvent.click(getByRole('button', { name: 'Sign up' }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('ForgotPasswordForm shows sent state', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordForm onSubmit={onSubmit} />);
    fireEvent.change(getByPlaceholderText('you@example.com'), { target: { value: 'a@b.c' } });
    fireEvent.click(getByText('Send reset link'));
    await waitFor(() => expect(getByText(/Check your email/)).toBeTruthy());
    expect(onSubmit).toHaveBeenCalledWith('a@b.c');
  });

  it('ForgotPasswordForm hides the back link until it is wired', () => {
    const { queryByText } = render(<ForgotPasswordForm onSubmit={jest.fn()} />);
    expect(queryByText('Back to sign in')).toBeNull();

    const onLoginClick = jest.fn();
    const { getByRole } = render(
      <ForgotPasswordForm onSubmit={jest.fn()} onLoginClick={onLoginClick} />
    );
    fireEvent.click(getByRole('button', { name: 'Back to sign in' }));
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });
});

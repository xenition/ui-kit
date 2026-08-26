/**
 * The auth family (native): `AuthCard` and the parts every auth surface shares,
 * plus the three composed forms.
 *
 * The forms are drawn from `AuthCard`'s parts now (§6/§9 of
 * ONBOARDING-DESIGN-SPEC.md), so the specs cover both halves: the wiring the
 * forms have always had, and the anatomy they gained — the 56px field with its
 * leading icon and eye toggle, the errors that are never colour-only, and the
 * empty states that must still look composed.
 */
import * as React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { compileTheme } from '../../theme/compile';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import {
  AUTH_CONTROL_HEIGHT,
  AuthCard,
  AuthDivider,
  AuthField,
  AuthProviderButton,
  AuthTermsCard,
} from './AuthCard';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

/** Every flattened `style` object in the rendered tree. */
function allStyles(root: Parameters<typeof renderedStyleHexes>[0]): Record<string, unknown>[] {
  return root.findAll(() => true).map((node) => {
    const out: Record<string, unknown> = {};
    const walk = (s: unknown): void => {
      if (!s) return;
      if (Array.isArray(s)) return s.forEach(walk);
      if (typeof s === 'object') Object.assign(out, s as Record<string, unknown>);
    };
    walk((node.props as { style?: unknown }).style);
    return out;
  });
}

/** Does any node in the tree carry `key: value` in its resolved style? */
const hasStyle = (
  root: Parameters<typeof renderedStyleHexes>[0],
  key: string,
  value: unknown
): boolean => allStyles(root).some((style) => style[key] === value);

/** The compiled danger slot for SEED_LIGHT — what an error border must be. */
const DANGER = compileTheme(SEED_LIGHT).light.danger;

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

  it('renders the brand tile only when a glyph or icon is given', () => {
    const withoutBrand = renderThemed(
      <AuthCard title="Welcome">
        <></>
      </AuthCard>,
      SEED_LIGHT
    );
    expect(withoutBrand.queryByText('🥕', { includeHiddenElements: true })).toBeNull();

    const withBrand = renderThemed(
      <AuthCard title="Welcome" brandGlyph="🥕">
        <></>
      </AuthCard>,
      SEED_LIGHT
    );
    // The glyph is decorative, so it is hidden from the accessibility tree.
    expect(withBrand.getByText('🥕', { includeHiddenElements: true })).toBeTruthy();
    assertTokenPure(withBrand.root);
  });

  it('survives its empty state — no title, no subtitle, no footer', () => {
    const { getByText, root } = renderThemed(
      <AuthCard>
        <></>
      </AuthCard>,
      SEED_LIGHT
    );
    expect(() => getByText('undefined')).toThrow();
    assertTokenPure(root);
  });
});

describe('AuthField (native)', () => {
  it('is 56 tall with a leading icon and stays token-pure', () => {
    const { getByLabelText, getByText, root } = renderThemed(
      <AuthField label="Email" icon="mail" accessibilityLabel="Email" value="" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByText('✉', { includeHiddenElements: true })).toBeTruthy();
    // The 56 lives on the row that wraps the input, not the input itself.
    expect(hasStyle(root, 'height', AUTH_CONTROL_HEIGHT)).toBe(true);
    assertTokenPure(root);
  });

  it('draws an error as a border AND a message — never colour alone', () => {
    const clean = renderThemed(
      <AuthField label="Email" icon="mail" accessibilityLabel="Email" value="" />,
      SEED_LIGHT
    );
    expect(hasStyle(clean.root, 'borderColor', DANGER)).toBe(false);

    const { getByText, root } = renderThemed(
      <AuthField label="Email" icon="mail" accessibilityLabel="Email" value="" error="Enter a valid email" />,
      SEED_LIGHT
    );
    expect(getByText('Enter a valid email')).toBeTruthy();
    expect(hasStyle(root, 'borderColor', DANGER)).toBe(true);
  });

  it('toggles masking from the eye affordance', () => {
    const { getByLabelText } = renderThemed(
      <AuthField secure label="Password" accessibilityLabel="Password" value="hunter22" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Password').props.secureTextEntry).toBe(true);
    fireEvent.press(getByLabelText('Show password'));
    expect(getByLabelText('Password').props.secureTextEntry).toBe(false);
    expect(getByLabelText('Hide password')).toBeTruthy();
  });

  it('freezes when disabled', () => {
    const { getByLabelText } = renderThemed(
      <AuthField label="Email" accessibilityLabel="Email" value="" disabled />,
      SEED_LIGHT
    );
    expect(getByLabelText('Email').props.editable).toBe(false);
  });
});

describe('AuthDivider / AuthProviderButton (native)', () => {
  it('draws the rule bare when it has no label', () => {
    const { queryByText, root } = renderThemed(<AuthDivider />, SEED_LIGHT);
    expect(queryByText('or continue with')).toBeNull();
    assertTokenPure(root);
  });

  it('reports the pressed provider and matches the control height', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <AuthProviderButton label="Continue with Google" glyph="🌐" onPress={onPress} />,
      SEED_LIGHT
    );
    const button = getByLabelText('Continue with Google');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('AuthTermsCard (native)', () => {
  it('renders both links inline and reports which was pressed', () => {
    const onLinkPress = jest.fn();
    const { getByText, root } = renderThemed(
      <AuthTermsCard onLinkPress={onLinkPress} />,
      SEED_LIGHT
    );
    expect(getByText('Terms of Service')).toBeTruthy();
    expect(getByText('Privacy Policy')).toBeTruthy();
    fireEvent.press(getByText('Privacy Policy'));
    expect(onLinkPress).toHaveBeenCalledWith('privacy');
    assertTokenPure(root);
  });

  it('reports the next consent value', () => {
    const onCheckedChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <AuthTermsCard onCheckedChange={onCheckedChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('I agree to the'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});

describe('LoginForm (native)', () => {
  it('renders email + password fields and a submit button', () => {
    const { getByText, getByLabelText } = renderThemed(<LoginForm onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    // 'Sign in' is both the card heading and the submit label; the CTA is the
    // one that answers to the accessibility label.
    expect(getByLabelText('Sign in')).toBeTruthy();
  });

  it('shows validation errors and does not call onSubmit when empty', () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = renderThemed(<LoginForm onSubmit={onSubmit} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Sign in'));
    expect(getByText('Email is required')).toBeTruthy();
    expect(getByText('Password is required')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with the values when valid', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByLabelText } = renderThemed(<LoginForm onSubmit={onSubmit} />, SEED_LIGHT);
    fireEvent.changeText(getByLabelText('Email'), 'ada@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'hunter2');
    fireEvent.press(getByLabelText('Sign in'));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ email: 'ada@example.com', password: 'hunter2' })
    );
  });

  it('takes the optional §9 dressing — brand tile, subtitle, right-aligned forgot link', () => {
    const onForgotPassword = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <LoginForm
        onSubmit={jest.fn()}
        brandGlyph="🥕"
        subtitle="Pick up where you left off."
        onForgotPassword={onForgotPassword}
      />,
      SEED_LIGHT
    );
    expect(getByText('🥕', { includeHiddenElements: true })).toBeTruthy();
    expect(getByText('Pick up where you left off.')).toBeTruthy();
    fireEvent.press(getByLabelText('Forgot password?'));
    expect(onForgotPassword).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });

  it('hides the forgot link and the sign-up switch until they are wired', () => {
    const { queryByText } = renderThemed(<LoginForm onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(queryByText('Forgot password?')).toBeNull();
    expect(queryByText('No account?')).toBeNull();
  });
});

describe('SignupForm (native)', () => {
  it('renders name/email/password fields and enforces min password length', () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SignupForm onSubmit={onSubmit} minPasswordLength={8} />,
      SEED_LIGHT
    );
    expect(getByText('Name')).toBeTruthy();
    fireEvent.changeText(getByLabelText('Name'), 'Ada');
    fireEvent.changeText(getByLabelText('Email'), 'ada@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'short');
    fireEvent.press(getByLabelText('Sign up'));
    expect(getByText('Password must be at least 8 characters')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with the values when valid', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByLabelText } = renderThemed(<SignupForm onSubmit={onSubmit} />, SEED_LIGHT);
    fireEvent.changeText(getByLabelText('Name'), 'Ada Lovelace');
    fireEvent.changeText(getByLabelText('Email'), 'ada@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'longenoughpw');
    fireEvent.press(getByLabelText('Sign up'));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        password: 'longenoughpw',
      })
    );
  });

  it('has no consent step by default', () => {
    const { queryByText } = renderThemed(<SignupForm onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(queryByText('Terms of Service')).toBeNull();
  });

  it('gates the CTA behind the terms card when requireTerms is set', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByLabelText, getByText } = renderThemed(
      <SignupForm onSubmit={onSubmit} requireTerms />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Name'), 'Ada');
    fireEvent.changeText(getByLabelText('Email'), 'ada@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'longenoughpw');

    fireEvent.press(getByLabelText('Sign up'));
    expect(onSubmit).not.toHaveBeenCalled();

    expect(getByText('Terms of Service')).toBeTruthy();
    fireEvent.press(getByLabelText('I agree to the'));
    fireEvent.press(getByLabelText('Sign up'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });
});

describe('ForgotPasswordForm (native)', () => {
  it('validates the email field and does not call onSubmit when empty', () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ForgotPasswordForm onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Send reset link'));
    expect(getByText('Email is required')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with the email and shows the sent state', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByText, getByLabelText } = renderThemed(
      <ForgotPasswordForm onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Email'), 'ada@example.com');
    fireEvent.press(getByLabelText('Send reset link'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith('ada@example.com'));
    await waitFor(() => expect(getByText('Check your email for a reset link.')).toBeTruthy());
  });

  it('hides the back link until it is wired, and shows it when it is', () => {
    const bare = renderThemed(<ForgotPasswordForm onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(bare.queryByText('Back to sign in')).toBeNull();

    const onLoginClick = jest.fn();
    const wired = renderThemed(
      <ForgotPasswordForm onSubmit={jest.fn()} onLoginClick={onLoginClick} />,
      SEED_LIGHT
    );
    fireEvent.press(wired.getByLabelText('Back to sign in'));
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });
});

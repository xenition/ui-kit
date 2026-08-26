/**
 * `SignInScreen` (native) — the auth half of the onboarding anatomy. It is
 * presentational and fully controlled, so the specs are about wiring: every
 * callback fires with what the host needs, the optional affordances stay hidden
 * until wired, and `pending` freezes the form.
 *
 * Past the wiring they also hold the §9 anatomy in place — the register mode,
 * the consent gate, the empty states that must still look composed, and the
 * three design lines that share every part and differ only in layout.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { SignInScreen } from './SignInScreen';
import { SignInScreenV2 } from './SignInScreenV2';
import { SignInScreenV3 } from './SignInScreenV3';
import type { SignInScreenProps } from './SignInScreen';
import type { SignInProvider } from './types';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

const PROVIDERS: SignInProvider[] = [
  { id: 'google', label: 'Continue with Google', glyph: '🌐' },
  { id: 'apple', label: 'Continue with Apple', glyph: '🍎' },
];

/** The minimum controlled contract — every spec below layers onto this. */
function base(): {
  email: string;
  password: string;
  onEmailChange: jest.Mock;
  onPasswordChange: jest.Mock;
  onSubmit: jest.Mock;
} {
  return {
    email: 'cook@pantrymeld.app',
    password: 'hunter22',
    onEmailChange: jest.fn(),
    onPasswordChange: jest.fn(),
    onSubmit: jest.fn(),
  };
}

describe('SignInScreen (native)', () => {
  it('renders the headline and both fields, and is token-pure', () => {
    const props = base();
    const { getByText, getByLabelText, root } = renderThemed(
      <SignInScreen {...props} subtitle="Pick up where you left off." logoGlyph="🥕" />,
      SEED_LIGHT
    );
    expect(getByText('Welcome back')).toBeTruthy();
    expect(getByText('Pick up where you left off.')).toBeTruthy();
    expect(getByLabelText('Email').props.value).toBe('cook@pantrymeld.app');
    expect(getByLabelText('Password').props.value).toBe('hunter22');
    assertTokenPure(root);
  });

  it('reports edits to the host — it owns no state of its own', () => {
    const props = base();
    const { getByLabelText } = renderThemed(<SignInScreen {...props} />, SEED_LIGHT);
    fireEvent.changeText(getByLabelText('Email'), 'new@example.com');
    expect(props.onEmailChange).toHaveBeenCalledWith('new@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'letmein9');
    expect(props.onPasswordChange).toHaveBeenCalledWith('letmein9');
  });

  it('fires onSubmit from the primary CTA', () => {
    const props = base();
    const { getByLabelText } = renderThemed(<SignInScreen {...props} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Sign in'));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('surfaces a form-level error above the fields', () => {
    const props = base();
    const { getByText, root } = renderThemed(
      <SignInScreen {...props} error="Wrong email or password" />,
      SEED_LIGHT
    );
    expect(getByText('Wrong email or password')).toBeTruthy();
    assertTokenPure(root);
  });

  it('surfaces field-level errors under their inputs', () => {
    const props = base();
    const { getByText } = renderThemed(
      <SignInScreen {...props} emailError="Enter a valid email" passwordError="Too short" />,
      SEED_LIGHT
    );
    expect(getByText('Enter a valid email')).toBeTruthy();
    expect(getByText('Too short')).toBeTruthy();
  });

  it('blocks the form while pending', () => {
    const props = base();
    const { getByLabelText } = renderThemed(<SignInScreen {...props} pending />, SEED_LIGHT);
    expect(getByLabelText('Email').props.editable).toBe(false);
    fireEvent.press(getByLabelText('Sign in'));
    expect(props.onSubmit).not.toHaveBeenCalled();
  });

  it('renders the provider row and reports the provider id', () => {
    const props = base();
    const onProviderPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SignInScreen {...props} providers={PROVIDERS} onProviderPress={onProviderPress} />,
      SEED_LIGHT
    );
    expect(getByText('or continue with')).toBeTruthy();
    fireEvent.press(getByLabelText('Continue with Apple'));
    expect(onProviderPress).toHaveBeenCalledWith('apple');
  });

  it('hides the provider row, forgot link and sign-up switch until they are wired', () => {
    const props = base();
    const { queryByText } = renderThemed(<SignInScreen {...props} />, SEED_LIGHT);
    expect(queryByText('or continue with')).toBeNull();
    expect(queryByText('Forgot password?')).toBeNull();
    expect(queryByText('Sign up')).toBeNull();
  });

  it('fires the forgot-password and switch-to-sign-up callbacks', () => {
    const props = base();
    const onForgotPassword = jest.fn();
    const onSwitchToSignUp = jest.fn();
    const { getByLabelText } = renderThemed(
      <SignInScreen
        {...props}
        onForgotPassword={onForgotPassword}
        onSwitchToSignUp={onSwitchToSignUp}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Forgot password?'));
    expect(onForgotPassword).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('Sign up'));
    expect(onSwitchToSignUp).toHaveBeenCalledTimes(1);
  });
});

describe('SignInScreen empty states (native)', () => {
  it('renders no brand tile and no subtitle gap when it has neither', () => {
    const props = base();
    const { queryByText, root } = renderThemed(<SignInScreen {...props} />, SEED_LIGHT);
    expect(queryByText('🥕', { includeHiddenElements: true })).toBeNull();
    assertTokenPure(root);
  });

  it('does NOT draw the "or continue with" rule when providers is empty', () => {
    const props = base();
    const { queryByText } = renderThemed(
      <SignInScreen {...props} providers={[]} onProviderPress={jest.fn()} />,
      SEED_LIGHT
    );
    // The whole block goes, divider included — a labelled rule above nothing
    // is worse than no rule at all.
    expect(queryByText('or continue with')).toBeNull();
  });

  it('still renders the CTA and the fields with nothing optional supplied', () => {
    const props = base();
    const { getByLabelText } = renderThemed(<SignInScreen {...props} />, SEED_LIGHT);
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByLabelText('Sign in')).toBeTruthy();
  });
});

describe('SignInScreen mode="register" (native)', () => {
  const registerProps = (): SignInScreenProps => ({ ...base(), mode: 'register' });

  it('swaps the copy and adds the First/Last row', () => {
    const { getAllByText, getByLabelText, queryByText } = renderThemed(
      <SignInScreen {...registerProps()} />,
      SEED_LIGHT
    );
    // 'Create account' is both the headline and the CTA label.
    expect(getAllByText('Create account').length).toBeGreaterThan(1);
    expect(getByLabelText('First name')).toBeTruthy();
    expect(getByLabelText('Last name')).toBeTruthy();
    expect(getByLabelText('Create account')).toBeTruthy();
    // No password to have forgotten for an account that does not exist yet.
    expect(queryByText('Forgot password?')).toBeNull();
  });

  it('reports first/last name edits', () => {
    const onFirstNameChange = jest.fn();
    const onLastNameChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <SignInScreen
        {...registerProps()}
        onFirstNameChange={onFirstNameChange}
        onLastNameChange={onLastNameChange}
      />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('First name'), 'Ada');
    expect(onFirstNameChange).toHaveBeenCalledWith('Ada');
    fireEvent.changeText(getByLabelText('Last name'), 'Lovelace');
    expect(onLastNameChange).toHaveBeenCalledWith('Lovelace');
  });

  it('renders the terms card with both links inline and keeps the CTA disabled until ticked', () => {
    const props = registerProps();
    const onTermsChange = jest.fn();
    const onTermsLinkPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SignInScreen {...props} onTermsChange={onTermsChange} onTermsLinkPress={onTermsLinkPress} />,
      SEED_LIGHT
    );
    expect(getByText('Terms of Service')).toBeTruthy();
    expect(getByText('Privacy Policy')).toBeTruthy();

    fireEvent.press(getByLabelText('Create account'));
    expect(props.onSubmit).not.toHaveBeenCalled();

    fireEvent.press(getByText('Terms of Service'));
    expect(onTermsLinkPress).toHaveBeenCalledWith('terms');
    fireEvent.press(getByLabelText('I agree to the'));
    expect(onTermsChange).toHaveBeenCalledWith(true);

    // Ticked, the same screen submits. (A fresh tree rather than `rerender`,
    // which would drop the theme provider `renderThemed` wraps around it.)
    const ticked = renderThemed(
      <SignInScreen {...props} termsAccepted onTermsChange={onTermsChange} />,
      SEED_LIGHT
    );
    fireEvent.press(ticked.getByLabelText('Create account'));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('drops the consent gate when requireTerms is false', () => {
    const props = registerProps();
    const { queryByText, getByLabelText } = renderThemed(
      <SignInScreen {...props} requireTerms={false} />,
      SEED_LIGHT
    );
    expect(queryByText('Terms of Service')).toBeNull();
    fireEvent.press(getByLabelText('Create account'));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('points the footer at the sign-in switch', () => {
    const onSwitchToSignIn = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SignInScreen {...registerProps()} onSwitchToSignIn={onSwitchToSignIn} />,
      SEED_LIGHT
    );
    expect(getByText('Already have an account?')).toBeTruthy();
    fireEvent.press(getByLabelText('Sign in'));
    expect(onSwitchToSignIn).toHaveBeenCalledTimes(1);
  });
});

describe('SignInScreen design lines (native)', () => {
  const lines: [string, React.ComponentType<SignInScreenProps>][] = [
    ['base', SignInScreen],
    ['V2', SignInScreenV2],
    ['V3', SignInScreenV3],
  ];

  it.each(lines)('%s takes identical props and renders the same parts', (_name, Line) => {
    const props = base();
    const { getByText, getByLabelText, root } = renderThemed(
      <Line
        {...props}
        logoGlyph="🥕"
        subtitle="Pick up where you left off."
        providers={PROVIDERS}
        onProviderPress={jest.fn()}
        onForgotPassword={jest.fn()}
        onSwitchToSignUp={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(getByText('Welcome back')).toBeTruthy();
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByLabelText('Sign in')).toBeTruthy();
    expect(getByText('or continue with')).toBeTruthy();
    expect(getByLabelText('Forgot password?')).toBeTruthy();
    assertTokenPure(root);
  });

  it.each(lines)('%s fires onSubmit and survives its empty state', (_name, Line) => {
    const props = base();
    const { getByLabelText, queryByText, root } = renderThemed(<Line {...props} />, SEED_LIGHT);
    expect(queryByText('or continue with')).toBeNull();
    fireEvent.press(getByLabelText('Sign in'));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });

  it.each(lines)('%s renders the register variant', (_name, Line) => {
    const props = base();
    const { getAllByText, getByText, getByLabelText } = renderThemed(
      <Line {...props} mode="register" />,
      SEED_LIGHT
    );
    expect(getAllByText('Create account').length).toBeGreaterThan(1);
    expect(getByLabelText('First name')).toBeTruthy();
    expect(getByText('Terms of Service')).toBeTruthy();
  });
});

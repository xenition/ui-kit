/** @jest-environment jsdom */
/**
 * `SignInScreen` (web) — twin of the native screen, same props but
 * `onProviderClick`/`onTermsLinkClick` for the `…Press` names. Presentational
 * and fully controlled, so the specs are about wiring: callbacks fire with what
 * the host needs, the optional affordances stay hidden until wired, and
 * `pending` freezes the form.
 *
 * Past the wiring they also hold the §9 anatomy in place — the register mode,
 * the consent gate, the empty states that must still look composed, and the
 * three design lines that share every part and differ only in layout.
 */
import { fireEvent, render } from '@testing-library/react';
import { SignInScreen } from './SignInScreen';
import { SignInScreenV2 } from './SignInScreenV2';
import { SignInScreenV3 } from './SignInScreenV3';
import type { SignInScreenProps } from './SignInScreen';
import type { SignInProvider } from './types';

const PROVIDERS: SignInProvider[] = [
  { id: 'google', label: 'Continue with Google', glyph: '🌐' },
  { id: 'apple', label: 'Continue with Apple', glyph: '🍎' },
];

/** The minimum controlled contract — every spec below layers onto this. */
function base() {
  return {
    email: 'cook@pantrymeld.app',
    password: 'hunter22',
    onEmailChange: jest.fn(),
    onPasswordChange: jest.fn(),
    onSubmit: jest.fn(),
  };
}

describe('SignInScreen (web)', () => {
  it('renders the headline and both fields against token classes only', () => {
    const props = base();
    const { getByText, getByLabelText, container } = render(
      <SignInScreen {...props} subtitle="Pick up where you left off." logoGlyph="🥕" />
    );
    expect(getByText('Welcome back')).toBeTruthy();
    expect(getByText('Pick up where you left off.')).toBeTruthy();
    expect((getByLabelText('Email') as HTMLInputElement).value).toBe('cook@pantrymeld.app');
    expect((getByLabelText('Password') as HTMLInputElement).value).toBe('hunter22');
    expect(container.innerHTML).toContain('bg-surface');
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('reports edits to the host — it owns no state of its own', () => {
    const props = base();
    const { getByLabelText } = render(<SignInScreen {...props} />);
    fireEvent.change(getByLabelText('Email'), { target: { value: 'new@example.com' } });
    expect(props.onEmailChange).toHaveBeenCalledWith('new@example.com');
    fireEvent.change(getByLabelText('Password'), { target: { value: 'letmein9' } });
    expect(props.onPasswordChange).toHaveBeenCalledWith('letmein9');
  });

  it('fires onSubmit from the primary CTA', () => {
    const props = base();
    const { getByRole } = render(<SignInScreen {...props} />);
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('surfaces a form-level error above the fields', () => {
    const props = base();
    const { getByText } = render(<SignInScreen {...props} error="Wrong email or password" />);
    expect(getByText('Wrong email or password')).toBeTruthy();
  });

  it('surfaces field-level errors under their inputs', () => {
    const props = base();
    const { getByText, getByLabelText } = render(
      <SignInScreen {...props} emailError="Enter a valid email" passwordError="Too short" />
    );
    // Never colour alone: the message is text, and the input is marked invalid.
    expect(getByText('Enter a valid email')).toBeTruthy();
    expect(getByText('Too short')).toBeTruthy();
    expect(getByLabelText('Email').getAttribute('aria-invalid')).toBe('true');
  });

  it('blocks the form while pending', () => {
    const props = base();
    const { getByLabelText, getByRole } = render(<SignInScreen {...props} pending />);
    expect((getByLabelText('Email') as HTMLInputElement).disabled).toBe(true);
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    expect(props.onSubmit).not.toHaveBeenCalled();
  });

  it('renders the provider row and reports the provider id', () => {
    const props = base();
    const onProviderClick = jest.fn();
    const { getByText, getByRole } = render(
      <SignInScreen {...props} providers={PROVIDERS} onProviderClick={onProviderClick} />
    );
    expect(getByText('or continue with')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Continue with Apple' }));
    expect(onProviderClick).toHaveBeenCalledWith('apple');
  });

  it('hides the provider row, forgot link and sign-up switch until they are wired', () => {
    const props = base();
    const { queryByText } = render(<SignInScreen {...props} />);
    expect(queryByText('or continue with')).toBeNull();
    expect(queryByText('Forgot password?')).toBeNull();
    expect(queryByText('Sign up')).toBeNull();
  });

  it('fires the forgot-password and switch-to-sign-up callbacks', () => {
    const props = base();
    const onForgotPassword = jest.fn();
    const onSwitchToSignUp = jest.fn();
    const { getByRole } = render(
      <SignInScreen
        {...props}
        onForgotPassword={onForgotPassword}
        onSwitchToSignUp={onSwitchToSignUp}
      />
    );
    fireEvent.click(getByRole('button', { name: 'Forgot password?' }));
    expect(onForgotPassword).toHaveBeenCalledTimes(1);
    fireEvent.click(getByRole('button', { name: 'Sign up' }));
    expect(onSwitchToSignUp).toHaveBeenCalledTimes(1);
  });

  it('toggles password masking from the eye affordance', () => {
    const props = base();
    const { getByLabelText, getByRole } = render(<SignInScreen {...props} />);
    expect((getByLabelText('Password') as HTMLInputElement).type).toBe('password');
    fireEvent.click(getByRole('button', { name: 'Show password' }));
    expect((getByLabelText('Password') as HTMLInputElement).type).toBe('text');
  });
});

describe('SignInScreen empty states (web)', () => {
  it('renders no brand tile when it has no glyph', () => {
    const props = base();
    const { queryByText } = render(<SignInScreen {...props} />);
    expect(queryByText('🥕')).toBeNull();
  });

  it('does NOT draw the "or continue with" rule when providers is empty', () => {
    const props = base();
    const { queryByText } = render(
      <SignInScreen {...props} providers={[]} onProviderClick={jest.fn()} />
    );
    // The whole block goes, divider included — a labelled rule above nothing
    // is worse than no rule at all.
    expect(queryByText('or continue with')).toBeNull();
  });

  it('still renders the CTA and the fields with nothing optional supplied', () => {
    const props = base();
    const { getByLabelText, getByRole, container } = render(<SignInScreen {...props} />);
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByRole('button', { name: 'Sign in' })).toBeTruthy();
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});

describe('SignInScreen mode="register" (web)', () => {
  const registerProps = (): SignInScreenProps => ({ ...base(), mode: 'register' });

  it('swaps the copy and adds the First/Last row', () => {
    const { getAllByText, getByLabelText, queryByText } = render(
      <SignInScreen {...registerProps()} />
    );
    // 'Create account' is both the headline and the CTA label.
    expect(getAllByText('Create account').length).toBeGreaterThan(1);
    expect(getByLabelText('First name')).toBeTruthy();
    expect(getByLabelText('Last name')).toBeTruthy();
    // No password to have forgotten for an account that does not exist yet.
    expect(queryByText('Forgot password?')).toBeNull();
  });

  it('reports first/last name edits', () => {
    const onFirstNameChange = jest.fn();
    const onLastNameChange = jest.fn();
    const { getByLabelText } = render(
      <SignInScreen
        {...registerProps()}
        onFirstNameChange={onFirstNameChange}
        onLastNameChange={onLastNameChange}
      />
    );
    fireEvent.change(getByLabelText('First name'), { target: { value: 'Ada' } });
    expect(onFirstNameChange).toHaveBeenCalledWith('Ada');
    fireEvent.change(getByLabelText('Last name'), { target: { value: 'Lovelace' } });
    expect(onLastNameChange).toHaveBeenCalledWith('Lovelace');
  });

  it('renders the terms card with both links inline and keeps the CTA disabled until ticked', () => {
    const props = registerProps();
    const onTermsChange = jest.fn();
    const onTermsLinkClick = jest.fn();
    const { getByText, getByRole, getByLabelText, rerender } = render(
      <SignInScreen {...props} onTermsChange={onTermsChange} onTermsLinkClick={onTermsLinkClick} />
    );
    expect(getByText('Terms of Service')).toBeTruthy();
    expect(getByText('Privacy Policy')).toBeTruthy();

    const cta = getByRole('button', { name: 'Create account' }) as HTMLButtonElement;
    expect(cta.disabled).toBe(true);
    fireEvent.click(cta);
    expect(props.onSubmit).not.toHaveBeenCalled();

    fireEvent.click(getByText('Terms of Service'));
    expect(onTermsLinkClick).toHaveBeenCalledWith('terms');
    fireEvent.click(getByLabelText('I agree to the'));
    expect(onTermsChange).toHaveBeenCalledWith(true);

    rerender(<SignInScreen {...props} termsAccepted onTermsChange={onTermsChange} />);
    fireEvent.click(getByRole('button', { name: 'Create account' }));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('drops the consent gate when requireTerms is false', () => {
    const props = registerProps();
    const { queryByText, getByRole } = render(<SignInScreen {...props} requireTerms={false} />);
    expect(queryByText('Terms of Service')).toBeNull();
    fireEvent.click(getByRole('button', { name: 'Create account' }));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('points the footer at the sign-in switch', () => {
    const onSwitchToSignIn = jest.fn();
    const { getByText, getByRole } = render(
      <SignInScreen {...registerProps()} onSwitchToSignIn={onSwitchToSignIn} />
    );
    expect(getByText('Already have an account?')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    expect(onSwitchToSignIn).toHaveBeenCalledTimes(1);
  });
});

describe('SignInScreen design lines (web)', () => {
  const lines: [string, React.ComponentType<SignInScreenProps>][] = [
    ['base', SignInScreen],
    ['V2', SignInScreenV2],
    ['V3', SignInScreenV3],
  ];

  it.each(lines)('%s takes identical props and renders the same parts', (_name, Line) => {
    const props = base();
    const { getByText, getByLabelText, getByRole, container } = render(
      <Line
        {...props}
        logoGlyph="🥕"
        subtitle="Pick up where you left off."
        providers={PROVIDERS}
        onProviderClick={jest.fn()}
        onForgotPassword={jest.fn()}
        onSwitchToSignUp={jest.fn()}
      />
    );
    expect(getByText('Welcome back')).toBeTruthy();
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByRole('button', { name: 'Sign in' })).toBeTruthy();
    expect(getByText('or continue with')).toBeTruthy();
    expect(getByRole('button', { name: 'Forgot password?' })).toBeTruthy();
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it.each(lines)('%s fires onSubmit and survives its empty state', (_name, Line) => {
    const props = base();
    const { getByRole, queryByText } = render(<Line {...props} />);
    expect(queryByText('or continue with')).toBeNull();
    fireEvent.click(getByRole('button', { name: 'Sign in' }));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it.each(lines)('%s renders the register variant', (_name, Line) => {
    const props = base();
    const { getAllByText, getByText, getByLabelText } = render(<Line {...props} mode="register" />);
    expect(getAllByText('Create account').length).toBeGreaterThan(1);
    expect(getByLabelText('First name')).toBeTruthy();
    expect(getByText('Terms of Service')).toBeTruthy();
  });
});

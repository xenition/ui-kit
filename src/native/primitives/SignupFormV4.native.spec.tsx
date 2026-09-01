/**
 * `SignupFormV4` (native) — §9's register screen as one composite.
 *
 * The spec covers the props, the submit + validation wiring inherited from
 * `useForm`, the error path, the consent gate that keeps the CTA disabled until
 * the box is ticked, and §12's empty states — above all that `providers={[]}`
 * shows no orphaned divider. Token purity is asserted the native way: every hex
 * in a rendered style traces back to the compiled theme.
 */
import * as React from 'react';
import { fireEvent, waitFor, type RenderResult } from '@testing-library/react-native';
import { compileTheme } from '../../theme/compile';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { SignupFormV4 } from './SignupFormV4';

const THEME = compileTheme(SEED_LIGHT);

/** Fill every required box with something valid. */
function fillValid(r: RenderResult, opts: { last?: string } = {}): void {
  fireEvent.changeText(r.getByLabelText('First name'), 'Ada');
  if (opts.last !== undefined) fireEvent.changeText(r.getByLabelText('Last name'), opts.last);
  fireEvent.changeText(r.getByLabelText('Email'), 'ada@example.com');
  fireEvent.changeText(r.getByLabelText('Password'), 'longenoughpw');
}

const cta = (r: RenderResult) => r.getByLabelText('Sign up');
const accept = (r: RenderResult): void => {
  fireEvent.press(r.getByLabelText('I agree to the'));
};

describe('SignupFormV4 (native) — §9 anatomy', () => {
  it('renders the register shell: First/Last on one row, then email, password, terms, CTA', () => {
    const r = renderThemed(
      <SignupFormV4 onSubmit={jest.fn()} title="Create account" subtitle="It takes a minute" />,
      SEED_LIGHT
    );

    expect(r.getByText('Create account')).toBeTruthy();
    expect(r.getByText('It takes a minute')).toBeTruthy();
    expect(r.getByLabelText('First name')).toBeTruthy();
    expect(r.getByLabelText('Last name')).toBeTruthy();
    expect(r.getByLabelText('Email')).toBeTruthy();
    expect(r.getByLabelText('Password')).toBeTruthy();
    expect(r.getByText('Terms of Service')).toBeTruthy();
    expect(cta(r)).toBeTruthy();
  });

  it('puts the two short fields on one row with §6’s `spacing.sm` between them', () => {
    const r = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />, SEED_LIGHT);
    const rows = r.root.findAll(
      (node) =>
        typeof node.type === 'string' &&
        node.props?.style?.flexDirection === 'row' &&
        node.props?.style?.gap === THEME.spacing.sm &&
        node.props?.style?.alignItems === 'flex-start'
    );
    expect(rows.length).toBe(1);
    // Both boxes halve the row rather than overflowing a narrow phone.
    const flexed = rows[0]!.findAll(
      (node) => typeof node.type === 'string' && node.props?.style?.flex === 1
    );
    expect(flexed.length).toBeGreaterThanOrEqual(2);
  });

  it('paints from tokens only — every rendered hex traces to the compiled theme', () => {
    const r = renderThemed(
      <SignupFormV4
        onSubmit={jest.fn()}
        brandGlyph="🥕"
        onLoginClick={jest.fn()}
        providers={[{ id: 'google', label: 'Continue with Google', glyph: '🌐' }]}
      />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(r.root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  it('honours the copy props — every string a user reads is the host’s', () => {
    const r = renderThemed(
      <SignupFormV4
        onSubmit={jest.fn()}
        onLoginClick={jest.fn()}
        firstNameLabel="Given name"
        lastNameLabel="Family name"
        emailLabel="Work email"
        passwordLabel="Passphrase"
        firstNamePlaceholder="Grace"
        submitLabel="Create my account"
        switchPrompt="Already aboard?"
        switchLabel="Log in"
        termsLabel="I accept the"
        termsLinks={[{ id: 'eula', label: 'EULA' }]}
        providersLabel="or use"
        providers={[{ id: 'google', label: 'Continue with Google', glyph: '🌐' }]}
      />,
      SEED_LIGHT
    );

    expect(r.getByLabelText('Given name')).toBeTruthy();
    expect(r.getByLabelText('Family name')).toBeTruthy();
    expect(r.getByPlaceholderText('Grace')).toBeTruthy();
    expect(r.getByLabelText('Create my account')).toBeTruthy();
    expect(r.getByText('Already aboard?')).toBeTruthy();
    expect(r.getByLabelText('Log in')).toBeTruthy();
    expect(r.getByLabelText('I accept the')).toBeTruthy();
    expect(r.getByText('EULA')).toBeTruthy();
    expect(r.getByText('or use')).toBeTruthy();
  });

  it('renders the brand tile only when a glyph is given', () => {
    // The mark is decorative, so it is hidden from the accessibility tree —
    // which is exactly where a screen reader should not meet a carrot.
    const bare = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(bare.queryByText('🥕', { includeHiddenElements: true })).toBeNull();

    const marked = renderThemed(<SignupFormV4 onSubmit={jest.fn()} brandGlyph="🥕" />, SEED_LIGHT);
    expect(marked.getByText('🥕', { includeHiddenElements: true })).toBeTruthy();
  });
});

describe('SignupFormV4 (native) — the consent gate', () => {
  it('keeps the CTA disabled until the terms box is ticked', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fillValid(r, { last: 'Lovelace' });

    expect(cta(r).props.accessibilityState.disabled).toBe(true);
    fireEvent.press(cta(r));
    expect(onSubmit).not.toHaveBeenCalled();

    accept(r);
    expect(cta(r).props.accessibilityState.disabled).toBe(false);

    fireEvent.press(cta(r));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('blocks a submit forced past the disabled button, and says why in the card', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fillValid(r);

    // The keyboard's "go" key reaches the submit without touching the CTA.
    fireEvent(r.getByLabelText('Password'), 'submitEditing');

    await waitFor(() => expect(r.getByText('Please accept the terms to continue')).toBeTruthy());
    expect(onSubmit).not.toHaveBeenCalled();

    accept(r);
    expect(r.queryByText('Please accept the terms to continue')).toBeNull();
  });

  it('takes a custom gate message', async () => {
    const r = renderThemed(
      <SignupFormV4 onSubmit={jest.fn()} termsError="Tick the box first" />,
      SEED_LIGHT
    );
    fillValid(r);
    fireEvent(r.getByLabelText('Password'), 'submitEditing');
    await waitFor(() => expect(r.getByText('Tick the box first')).toBeTruthy());
  });

  it('reports the pressed legal link by id', () => {
    const onTermsLinkPress = jest.fn();
    const r = renderThemed(
      <SignupFormV4 onSubmit={jest.fn()} onTermsLinkPress={onTermsLinkPress} />,
      SEED_LIGHT
    );
    fireEvent.press(r.getByLabelText('Privacy Policy'));
    expect(onTermsLinkPress).toHaveBeenCalledWith('privacy');
  });

  it('drops the card and the gate entirely with requireTerms={false}', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} requireTerms={false} />, SEED_LIGHT);

    expect(r.queryByText('Terms of Service')).toBeNull();
    expect(cta(r).props.accessibilityState.disabled).toBe(false);

    fillValid(r, { last: 'Lovelace' });
    fireEvent.press(cta(r));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });
});

describe('SignupFormV4 (native) — submit + validation', () => {
  it('composes the two name boxes into the base’s single `name`', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fillValid(r, { last: 'Lovelace' });
    accept(r);
    fireEvent.press(cta(r));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        password: 'longenoughpw',
      })
    );
  });

  it('submits a mononym without a trailing space when the last name is left empty', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fillValid(r);
    accept(r);
    fireEvent.press(cta(r));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Ada' }))
    );
  });

  it('reports every missing field as text, and does not submit', async () => {
    const onSubmit = jest.fn();
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    accept(r);
    fireEvent.press(cta(r));

    await waitFor(() => expect(r.getByText('First name is required')).toBeTruthy());
    expect(r.getByText('Email is required')).toBeTruthy();
    expect(r.getByText(/at least 8 characters/)).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('honours minPasswordLength', async () => {
    const onSubmit = jest.fn();
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} minPasswordLength={12} />, SEED_LIGHT);
    fillValid(r);
    fireEvent.changeText(r.getByLabelText('Password'), 'elevenchars');
    accept(r);
    fireEvent.press(cta(r));

    await waitFor(() => expect(r.getByText(/at least 12 characters/)).toBeTruthy());
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('leaves the last name optional by default, and requires it on request', async () => {
    const optional = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />, SEED_LIGHT);
    fillValid(optional);
    accept(optional);
    fireEvent.press(cta(optional));
    await waitFor(() => expect(optional.queryByText('Last name is required')).toBeNull());

    const required = renderThemed(<SignupFormV4 onSubmit={jest.fn()} requireLastName />, SEED_LIGHT);
    fillValid(required);
    accept(required);
    fireEvent.press(cta(required));
    await waitFor(() => expect(required.getByText('Last name is required')).toBeTruthy());
  });

  it('falls back to one Name box with splitName={false}', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} splitName={false} />, SEED_LIGHT);

    expect(r.queryByLabelText('First name')).toBeNull();
    expect(r.getByLabelText('Name')).toBeTruthy();

    accept(r);
    fireEvent.press(cta(r));
    await waitFor(() => expect(r.getByText('Name is required')).toBeTruthy());

    fireEvent.changeText(r.getByLabelText('Name'), 'Ada Lovelace');
    fireEvent.changeText(r.getByLabelText('Email'), 'ada@example.com');
    fireEvent.changeText(r.getByLabelText('Password'), 'longenoughpw');
    fireEvent.press(cta(r));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Ada Lovelace' }))
    );
  });

  it('surfaces a thrown submit as a message, not a colour', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Email already registered'));
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fillValid(r, { last: 'Lovelace' });
    accept(r);
    fireEvent.press(cta(r));

    await waitFor(() => expect(r.getByText('Email already registered')).toBeTruthy());
  });

  it('falls back to a generic message when the thrown value is not an Error', async () => {
    const onSubmit = jest.fn().mockRejectedValue('nope');
    const r = renderThemed(<SignupFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fillValid(r, { last: 'Lovelace' });
    accept(r);
    fireEvent.press(cta(r));

    await waitFor(() => expect(r.getByText('Sign up failed')).toBeTruthy());
  });

  it('announces the pending CTA with submittingLabel', async () => {
    let release: () => void = () => {};
    const onSubmit = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          release = resolve;
        })
    );
    const r = renderThemed(
      <SignupFormV4 onSubmit={onSubmit} submittingLabel="Creating your account…" />,
      SEED_LIGHT
    );
    fillValid(r, { last: 'Lovelace' });
    accept(r);
    fireEvent.press(cta(r));

    await waitFor(() => expect(r.getByLabelText('Creating your account…')).toBeTruthy());
    release();
    await waitFor(() => expect(cta(r)).toBeTruthy());
  });
});

describe('SignupFormV4 (native) — providers and §12 empty states', () => {
  it('draws the divider and the provider row, and reports the pressed id', () => {
    const onProviderPress = jest.fn();
    const r = renderThemed(
      <SignupFormV4
        onSubmit={jest.fn()}
        onProviderPress={onProviderPress}
        providers={[
          { id: 'google', label: 'Continue with Google', glyph: '🌐' },
          { id: 'email', label: 'Continue with email', name: 'mail' },
        ]}
      />,
      SEED_LIGHT
    );

    expect(r.getByText('or continue with')).toBeTruthy();
    fireEvent.press(r.getByLabelText('Continue with Google'));
    expect(onProviderPress).toHaveBeenCalledWith('google');
    expect(r.getByLabelText('Continue with email')).toBeTruthy();
  });

  it('shows NO divider with providers={[]} — §9’s empty-provider rule', () => {
    const r = renderThemed(<SignupFormV4 onSubmit={jest.fn()} providers={[]} />, SEED_LIGHT);
    expect(r.queryByText('or continue with')).toBeNull();
  });

  it('shows no divider when providers is omitted altogether', () => {
    const r = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(r.queryByText('or continue with')).toBeNull();
  });

  it('hides the switch footer until onLoginClick is wired', () => {
    const bare = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(bare.queryByText('Have an account?')).toBeNull();

    const onLoginClick = jest.fn();
    const r = renderThemed(
      <SignupFormV4 onSubmit={jest.fn()} onLoginClick={onLoginClick} />,
      SEED_LIGHT
    );
    fireEvent.press(r.getByLabelText('Sign in'));
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  it('survives the fully empty state — no subtitle, no brand, no providers, no footer', () => {
    const r = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />, SEED_LIGHT);
    expect(r.getByText('Create account')).toBeTruthy();
    expect(r.queryByText('or continue with')).toBeNull();
    expect(r.queryByText('Have an account?')).toBeNull();
    expect(cta(r)).toBeTruthy();
  });
});

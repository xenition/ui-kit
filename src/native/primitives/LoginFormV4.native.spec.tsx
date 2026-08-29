import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { LoginFormV4, type LoginProviderV4 } from './LoginFormV4';

const THEME = compileTheme(SEED_LIGHT);
const TOKENS = THEME.spacing;

const PROVIDERS: LoginProviderV4[] = [
  { id: 'google', label: 'Continue with Google', glyph: 'G' },
  { id: 'apple', label: 'Continue with Apple', glyph: '' },
];

/**
 * Every style object on a **host** node in the rendered tree.
 *
 * Host-only on purpose: `findAll` returns the composite element and the host
 * instance for the same view, so counting both would double every rule.
 */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  root.findAll((node) => typeof node.type === 'string').forEach((node) => walk(node.props?.style));
  return out;
}

/**
 * The headline, not the CTA — both say "Sign in", and only the headline is a
 * header.
 */
function heading(nodes: ReactTestInstance[]): ReactTestInstance {
  return nodes.find((n) => n.props?.accessibilityRole === 'header') as ReactTestInstance;
}

/** The resolved style of one node, flattened into a single object. */
function styleOf(node: ReactTestInstance): Record<string, unknown> {
  const flat: Record<string, unknown> = {};
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') Object.assign(flat, style as Record<string, unknown>);
  };
  walk(node.props?.style);
  return flat;
}

/** The brand tile's own box, wherever `AuthBrandTileV4` put it. */
function brandTile(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.backgroundColor === THEME.light.primary && s.borderRadius !== undefined && s.width !== undefined);
}

/** The divider's hairline segments. Nothing else in the tree is 1 tall and flexed. */
function rules(root: ReactTestInstance): Record<string, unknown>[] {
  return styles(root).filter((s) => s.height === 1 && s.flex === 1);
}

function fillCredentials(api: { getByPlaceholderText: (t: string) => ReactTestInstance }): void {
  fireEvent.changeText(api.getByPlaceholderText('you@example.com'), 'a@b.c');
  fireEvent.changeText(api.getByPlaceholderText('Your password'), 'secret12');
}

describe('LoginFormV4 (native)', () => {
  // ───────────────────────────────────────────────────────────────────────────
  // §9 anatomy
  // ───────────────────────────────────────────────────────────────────────────

  it('lays out §9: brand tile top-LEFT, 3xl bold headline, muted subhead', () => {
    const { getAllByText, getByText, root } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        brandGlyph="🥕"
        subtitle="Pick up where you left off."
      />,
      SEED_LIGHT
    );
    // The tile's glyph is decorative, so it is hidden from the a11y tree.
    expect(getByText('🥕', { includeHiddenElements: true })).toBeTruthy();

    // §9 is explicit that the tile is top-LEFT, not centred.
    expect(brandTile(root)?.alignSelf).toBe('flex-start');

    // The headline is the `3xl` step at bold — not the card's historical `xl`.
    const title = styleOf(heading(getAllByText('Sign in')));
    expect(title.fontSize).toBe(THEME.typography.scale['3xl']);
    expect(title.fontWeight).toBe('700');
    expect(title.textAlign).toBe('left');

    const subhead = styleOf(getByText('Pick up where you left off.'));
    expect(subhead.color).toBe(THEME.light.mutedText);
  });

  it('renders the two §9 inputs with their leading icons and real labels', () => {
    const { getByPlaceholderText, getByLabelText, getByText } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByPlaceholderText('you@example.com')).toBeTruthy();
    expect(getByPlaceholderText('Your password')).toBeTruthy();
    // Announced names, and real visible labels above the controls (§6).
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
  });

  it('right-aligns "Forgot password?" in primary ink, on the field above it', () => {
    const onForgotPassword = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} onForgotPassword={onForgotPassword} />,
      SEED_LIGHT
    );
    const link = getByLabelText('Forgot password?');
    const style = styleOf(link);
    // §9: right-aligned.
    expect(style.alignSelf).toBe('flex-end');
    // A real tap target composed off the scale, not the base's remembered 44.
    expect(style.minHeight).toBe(TOKENS['2xl'] - TOKENS.xs);
    expect(style.borderRadius).toBe(THEME.radius.md);
    // §9: the link is the primary colour — the AA-corrected slot.
    expect(styleOf(getByText('Forgot password?')).color).toBe(THEME.light.primaryText);

    fireEvent.press(link);
    expect(onForgotPassword).toHaveBeenCalledTimes(1);
  });

  it('centres the footer line carrying the opposite action', () => {
    const onSignupClick = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        onSignupClick={onSignupClick}
        switchPrompt="Don't have an account?"
        switchLabel="Register"
      />,
      SEED_LIGHT
    );
    expect(getByText("Don't have an account?")).toBeTruthy();
    fireEvent.press(getByLabelText('Register'));
    expect(onSignupClick).toHaveBeenCalledTimes(1);
  });

  it('spaces itself from the scale only — nothing picked (§10.1)', () => {
    const { root } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} onForgotPassword={jest.fn()} />,
      SEED_LIGHT
    );
    const scale = new Set(Object.values(TOKENS));
    // The two groups this component composes itself: the form's `lg` rhythm
    // and the `sm` that binds the forgot link to the field above it.
    const gaps = styles(root)
      .map((s) => s.gap)
      .filter((g): g is number => typeof g === 'number');
    expect(gaps).toContain(TOKENS.lg);
    expect(gaps).toContain(TOKENS.sm);
    gaps.forEach((g) => expect(scale.has(g)).toBe(true));
  });

  it('paints no colour that is not a token (§10.1)', () => {
    const { root } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        brandGlyph="🥕"
        subtitle="Pick up where you left off."
        onForgotPassword={jest.fn()}
        onSignupClick={jest.fn()}
        providers={PROVIDERS}
      />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Submit + validation — preserved from the base
  // ───────────────────────────────────────────────────────────────────────────

  it('validates both required fields before submitting', async () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <LoginFormV4 onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Sign in'));
    await waitFor(() => expect(getByText('Email is required')).toBeTruthy());
    expect(getByText('Password is required')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits the credentials once both fields are filled', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const api = renderThemed(<LoginFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fillCredentials(api);
    fireEvent.press(api.getByLabelText('Sign in'));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.c', password: 'secret12' })
    );
  });

  it('clears a field error once the field is filled and resubmitted', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const api = renderThemed(<LoginFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fireEvent.press(api.getByLabelText('Sign in'));
    await waitFor(() => expect(api.getByText('Email is required')).toBeTruthy());
    fillCredentials(api);
    fireEvent.press(api.getByLabelText('Sign in'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(api.queryByText('Email is required')).toBeNull();
  });

  it('seeds the email field from initialEmail without controlling it', () => {
    const { getByPlaceholderText } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} initialEmail="a@b.c" />,
      SEED_LIGHT
    );
    const email = getByPlaceholderText('you@example.com');
    expect(email.props.value).toBe('a@b.c');
    fireEvent.changeText(email, 'x@y.z');
    expect(getByPlaceholderText('you@example.com').props.value).toBe('x@y.z');
  });

  it('lets the host own every validation string', async () => {
    const { getByLabelText, getByText } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        emailRequiredMessage="On oublie l’e-mail"
        passwordRequiredMessage="Mot de passe requis"
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Sign in'));
    await waitFor(() => expect(getByText('On oublie l’e-mail')).toBeTruthy());
    expect(getByText('Mot de passe requis')).toBeTruthy();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The error path — always text, never colour alone
  // ───────────────────────────────────────────────────────────────────────────

  it('surfaces a thrown Error as TEXT in a danger alert', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Wrong email or password'));
    const api = renderThemed(<LoginFormV4 onSubmit={onSubmit} />, SEED_LIGHT);
    fillCredentials(api);
    fireEvent.press(api.getByLabelText('Sign in'));
    await waitFor(() => expect(api.getByText('Wrong email or password')).toBeTruthy());
    // Announced, not merely tinted.
    expect(api.root.findAll((n) => n.props?.accessibilityRole === 'alert').length).toBeGreaterThan(
      0
    );
  });

  it('falls back to submitErrorFallback when something that is not an Error is thrown', async () => {
    const onSubmit = jest.fn().mockRejectedValue('nope');
    const api = renderThemed(
      <LoginFormV4 onSubmit={onSubmit} submitErrorFallback="Could not sign you in" />,
      SEED_LIGHT
    );
    fillCredentials(api);
    fireEvent.press(api.getByLabelText('Sign in'));
    await waitFor(() => expect(api.getByText('Could not sign you in')).toBeTruthy());
  });

  it('renders a host-owned `error` for an app that does not throw', () => {
    const { getByText } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} error="You’re offline" />,
      SEED_LIGHT
    );
    expect(getByText('You’re offline')).toBeTruthy();
  });

  it('lets a thrown message replace the host-owned one — the newer wins', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Wrong email or password'));
    const api = renderThemed(
      <LoginFormV4 onSubmit={onSubmit} error="You’re offline" />,
      SEED_LIGHT
    );
    expect(api.getByText('You’re offline')).toBeTruthy();
    fillCredentials(api);
    fireEvent.press(api.getByLabelText('Sign in'));
    await waitFor(() => expect(api.getByText('Wrong email or password')).toBeTruthy());
    expect(api.queryByText('You’re offline')).toBeNull();
  });

  it('field errors are a MESSAGE, not only a red border (§6)', async () => {
    const { getByLabelText, getByText } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Sign in'));
    await waitFor(() => expect(getByText('Email is required')).toBeTruthy());
    expect(styleOf(getByText('Email is required')).color).toBe(THEME.light.dangerText);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Providers + the divider
  // ───────────────────────────────────────────────────────────────────────────

  it('EMPTY STATE — §9: providers={[]} renders NO divider at all', () => {
    const { queryByText, root } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} providers={[]} />,
      SEED_LIGHT
    );
    expect(queryByText('or continue with')).toBeNull();
    // Not an orphaned hairline either.
    expect(rules(root)).toHaveLength(0);
  });

  it('EMPTY STATE — omitting `providers` entirely is the same as []', () => {
    const { queryByText, root } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} />,
      SEED_LIGHT
    );
    expect(queryByText('or continue with')).toBeNull();
    expect(rules(root)).toHaveLength(0);
  });

  it('draws the divider and the row once there are providers', () => {
    const { getByText, getByLabelText, root } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} providers={PROVIDERS} />,
      SEED_LIGHT
    );
    expect(getByText('or continue with')).toBeTruthy();
    // The label sits ON the rule: one segment either side.
    expect(rules(root)).toHaveLength(2);
    expect(getByLabelText('Continue with Google')).toBeTruthy();
    expect(getByLabelText('Continue with Apple')).toBeTruthy();
  });

  it('reports the pressed provider by id', () => {
    const onProviderClick = jest.fn();
    const { getByLabelText } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        providers={PROVIDERS}
        onProviderClick={onProviderClick}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Continue with Apple'));
    expect(onProviderClick).toHaveBeenCalledWith('apple');
  });

  it('greys one provider out without removing it from the row', () => {
    const { getByLabelText } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        providers={[{ id: 'google', label: 'Continue with Google', disabled: true }]}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText('Continue with Google').props.accessibilityState.disabled).toBe(true);
  });

  it('renames the divider copy and compacts the provider row on request', () => {
    const { getByText, queryByText, getByLabelText } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        providers={PROVIDERS}
        providersLabel="or sign in with"
        compactProviders
      />,
      SEED_LIGHT
    );
    expect(getByText('or sign in with')).toBeTruthy();
    // Compact keeps the accessible name and drops the visible label.
    expect(getByLabelText('Continue with Google')).toBeTruthy();
    expect(queryByText('Continue with Google')).toBeNull();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Pending
  // ───────────────────────────────────────────────────────────────────────────

  it('a host-driven `pending` swaps the CTA copy and blocks the providers', () => {
    const { getByLabelText } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        pending
        providers={PROVIDERS}
        onForgotPassword={jest.fn()}
      />,
      SEED_LIGHT
    );
    const cta = getByLabelText('Signing in…');
    expect(cta.props.accessibilityState.busy).toBe(true);
    expect(cta.props.accessibilityState.disabled).toBe(true);
    expect(
      getByLabelText('Continue with Google').props.accessibilityState.disabled
    ).toBe(true);
    expect(getByLabelText('Forgot password?').props.accessibilityState.disabled).toBe(true);
  });

  it('gates the CTA without changing its shape (§5)', () => {
    const { getByLabelText } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} submitDisabled />,
      SEED_LIGHT
    );
    const cta = getByLabelText('Sign in');
    expect(cta.props.accessibilityState.disabled).toBe(true);
    // Same pill: still full-width and centred, only dimmed by its parent.
    expect(styleOf(cta).justifyContent).toBe('center');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §12 — the empty states
  // ───────────────────────────────────────────────────────────────────────────

  it('EMPTY STATE — with only `onSubmit` it still renders a composed screen', () => {
    const { queryByText, getAllByText, getByLabelText, getByPlaceholderText, root } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} />,
      SEED_LIGHT
    );
    // No brand tile, no subtitle, no forgot link, no footer, no providers —
    // and no holes where they would have been.
    expect(queryByText('Forgot password?')).toBeNull();
    expect(queryByText('No account?')).toBeNull();
    expect(rules(root)).toHaveLength(0);
    expect(brandTile(root)).toBeUndefined();
    // The headline and both fields are still there.
    expect(heading(getAllByText('Sign in'))).toBeTruthy();
    expect(getByLabelText('Sign in')).toBeTruthy();
    expect(getByPlaceholderText('you@example.com')).toBeTruthy();
    expect(getByPlaceholderText('Your password')).toBeTruthy();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Copy + escape hatches
  // ───────────────────────────────────────────────────────────────────────────

  it('lets the host own every string a user reads', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        title="Welcome back"
        submitLabel="Log in"
        emailLabel="Work email"
        emailPlaceholder="you@work.com"
        passwordLabel="Passphrase"
        passwordPlaceholder="••••••"
        forgotLabel="Lost it?"
        onForgotPassword={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(getByText('Welcome back')).toBeTruthy();
    expect(getByLabelText('Log in')).toBeTruthy();
    expect(getByPlaceholderText('you@work.com')).toBeTruthy();
    expect(getByLabelText('Lost it?')).toBeTruthy();
  });

  it('takes an extra footer node alongside the switch line', () => {
    const { getByText } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        onSignupClick={jest.fn()}
        footer={<Text>Terms apply</Text>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Terms apply')).toBeTruthy();
    expect(getByText('Sign up')).toBeTruthy();
  });

  it('forwards style, align and titleSize to the card', () => {
    const { getAllByText, root } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        style={{ marginTop: TOKENS.lg }}
        align="center"
        titleSize="xl"
        brandGlyph="🥕"
      />,
      SEED_LIGHT
    );
    expect(styles(root).some((s) => s.marginTop === TOKENS.lg)).toBe(true);
    expect(styleOf(heading(getAllByText('Sign in'))).fontSize).toBe(THEME.typography.scale.xl);
    // Centred puts the tile in the middle instead of on the leading edge.
    expect(brandTile(root)?.alignSelf).toBe('center');
  });
});

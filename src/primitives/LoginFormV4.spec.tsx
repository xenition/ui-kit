/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { LoginFormV4, type LoginProviderV4 } from './LoginFormV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const PROVIDERS: LoginProviderV4[] = [
  { id: 'google', label: 'Continue with Google', glyph: 'G' },
  { id: 'apple', label: 'Continue with Apple', glyph: '' },
];

/** Every hairline segment the divider draws. Nothing else in the tree uses `h-px`. */
function rules(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.h-px'));
}

function emailInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector('input[type="email"]') as HTMLInputElement;
}

function passwordInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector('input[type="password"]') as HTMLInputElement;
}

/** Fill both fields with something that passes the required-field validation. */
function fillCredentials(container: HTMLElement): void {
  fireEvent.change(emailInput(container), { target: { value: 'a@b.c' } });
  fireEvent.change(passwordInput(container), { target: { value: 'secret12' } });
}

describe('LoginFormV4 (web)', () => {
  // ───────────────────────────────────────────────────────────────────────────
  // §9 anatomy
  // ───────────────────────────────────────────────────────────────────────────

  it('lays out §9: brand tile top-LEFT, 3xl bold headline, muted subhead', () => {
    const { q, container } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        brandGlyph="🥕"
        subtitle="Pick up where you left off."
      />
    );
    expect(q.getByText('🥕')).toBeTruthy();

    const heading = container.querySelector('[data-xen-v4-auth-heading]') as HTMLElement;
    // §9 is explicit that the tile and the headline are NOT centred.
    expect(heading.getAttribute('data-align')).toBe('left');

    const title = within(container.querySelector('h1') as HTMLElement).getByText('Sign in');
    expect(title.getAttribute('data-xen-v4-text')).toBe('3xl');
    expect(title.className).toContain('font-bold');

    const subhead = q.getByText('Pick up where you left off.');
    expect(subhead.className).toContain('text-muted-text');
  });

  it('renders the two §9 inputs with their leading icons and real labels', () => {
    const { q, container } = renderThemed(<LoginFormV4 onSubmit={jest.fn()} />);
    expect(emailInput(container)).toBeTruthy();
    expect(passwordInput(container)).toBeTruthy();
    expect(q.getByPlaceholderText('you@example.com')).toBeTruthy();
    expect(q.getByPlaceholderText('Your password')).toBeTruthy();
    // The labels are real, not faked with a placeholder (§6).
    const labels = Array.from(container.querySelectorAll('label')).map((l) => l.textContent);
    expect(labels).toEqual(expect.arrayContaining(['Email', 'Password']));
  });

  it('right-aligns "Forgot password?" in primary ink, on the field above it', () => {
    const onForgotPassword = jest.fn();
    const { q } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} onForgotPassword={onForgotPassword} />
    );
    const link = q.getByRole('button', { name: 'Forgot password?' });
    // §9: right-aligned, not centred and not on the far margin.
    expect((link.parentElement as HTMLElement).className).toContain('justify-end');
    // §9: the link is the primary colour — the AA-corrected slot, as every
    // other V4 auth link uses.
    expect(within(link).getByText('Forgot password?').className).toContain('text-primary-text');
    // It is a real tap target, not the size of the word.
    expect(link.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');

    fireEvent.click(link);
    expect(onForgotPassword).toHaveBeenCalledTimes(1);
  });

  it('centres the footer line carrying the opposite action', () => {
    const onSignupClick = jest.fn();
    const { q, container } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        onSignupClick={onSignupClick}
        switchPrompt="Don't have an account?"
        switchLabel="Register"
      />
    );
    const footer = container.querySelector('[data-xen-v4-auth-footer]') as HTMLElement;
    expect(footer).toBeTruthy();
    expect(within(footer).getByText("Don't have an account?")).toBeTruthy();
    fireEvent.click(q.getByRole('button', { name: 'Register' }));
    expect(onSignupClick).toHaveBeenCalledTimes(1);
  });

  it('composes the V4 line, not the base (§10.5)', () => {
    const { container } = renderThemed(<LoginFormV4 onSubmit={jest.fn()} brandGlyph="🥕" />);
    expect(container.querySelector('[data-xen-v4-auth-card]')).toBeTruthy();
    expect(container.querySelector('[data-xen-v4-form]')).toBeTruthy();
    expect(container.querySelector('[data-xen-v4-auth-submit]')).toBeTruthy();
    expect(container.querySelector('[data-xen-v4-shell]')).toBeTruthy();
    // The Addendum's settled field metrics, inherited from AuthFieldV4.
    const shell = container.querySelector('[data-xen-v4-shell]') as HTMLElement;
    expect(shell.className).toContain('min-h-[var(--xen-space-2xl)]');
  });

  it('picks no colour, spacing, radius or font size of its own (§10.1)', () => {
    const { container } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        brandGlyph="🥕"
        subtitle="Pick up where you left off."
        onForgotPassword={jest.fn()}
        onSignupClick={jest.fn()}
        providers={PROVIDERS}
      />
    );
    const page = container.querySelector('[data-theme]') as HTMLElement;

    // Not one literal value in a class name, anywhere in the composed tree.
    Array.from(page.querySelectorAll<HTMLElement>('[class]')).forEach((el) => {
      expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(el.className).not.toMatch(/rgba?\(/);
    });

    // The literals that DO reach the DOM are compiled-theme values on
    // `--xen-*` custom properties (the CTA's gradient, the card's elevation) —
    // never a colour this component chose.
    Array.from(page.querySelectorAll<HTMLElement>('[style]')).forEach((el) => {
      const style = el.getAttribute('style') as string;
      if (/#[0-9a-fA-F]{3,8}\b|rgba?\(/.test(style)) {
        style
          .split(';')
          .filter((d) => d.trim() !== '')
          .forEach((d) => expect(d.trim().startsWith('--xen-')).toBe(true));
      }
    });

    // And the markup this component writes itself carries no inline style and
    // no picked number: every arbitrary value on it is a `--xen-*` expression.
    const forgot = within(page).getByRole('button', { name: 'Forgot password?' });
    expect(forgot.getAttribute('style')).toBeNull();
    expect((forgot.parentElement as HTMLElement).getAttribute('style')).toBeNull();
    (forgot.className.match(/\[[^\]]+\]/g) ?? []).forEach((v) => {
      // `[0.38]` is `V4_DISABLED_CLASS` — M3's disabled-content opacity, one
      // spelling shared by the whole line, not a number this component picked.
      expect(v === '[0.38]' || v.includes('--xen-')).toBe(true);
    });
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Submit + validation — preserved from the base
  // ───────────────────────────────────────────────────────────────────────────

  it('validates both required fields before submitting', async () => {
    const onSubmit = jest.fn();
    const { q } = renderThemed(<LoginFormV4 onSubmit={onSubmit} />);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(q.getByText('Email is required')).toBeTruthy());
    expect(q.getByText('Password is required')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits the credentials once both fields are filled', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { q, container } = renderThemed(<LoginFormV4 onSubmit={onSubmit} />);
    fillCredentials(container);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.c', password: 'secret12' })
    );
  });

  it('clears a field error once the field is filled and resubmitted', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { q, container } = renderThemed(<LoginFormV4 onSubmit={onSubmit} />);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(q.getByText('Email is required')).toBeTruthy());
    fillCredentials(container);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(q.queryByText('Email is required')).toBeNull();
  });

  it('seeds the email field from initialEmail without controlling it', () => {
    const { container } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} initialEmail="a@b.c" />
    );
    expect(emailInput(container).value).toBe('a@b.c');
    fireEvent.change(emailInput(container), { target: { value: 'x@y.z' } });
    expect(emailInput(container).value).toBe('x@y.z');
  });

  it('lets the host own every validation string', async () => {
    const { q } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        emailRequiredMessage="On oublie l’e-mail"
        passwordRequiredMessage="Mot de passe requis"
      />
    );
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(q.getByText('On oublie l’e-mail')).toBeTruthy());
    expect(q.getByText('Mot de passe requis')).toBeTruthy();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The error path — always text, never colour alone
  // ───────────────────────────────────────────────────────────────────────────

  it('surfaces a thrown Error as TEXT in a danger alert', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Wrong email or password'));
    const { q, container } = renderThemed(<LoginFormV4 onSubmit={onSubmit} />);
    fillCredentials(container);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    const alert = await waitFor(() => q.getByText('Wrong email or password'));
    expect(alert).toBeTruthy();
    // Announced, not merely tinted.
    expect(alert.closest('[role="alert"]')).toBeTruthy();
  });

  it('falls back to submitErrorFallback when something that is not an Error is thrown', async () => {
    const onSubmit = jest.fn().mockRejectedValue('nope');
    const { q, container } = renderThemed(
      <LoginFormV4 onSubmit={onSubmit} submitErrorFallback="Could not sign you in" />
    );
    fillCredentials(container);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(q.getByText('Could not sign you in')).toBeTruthy());
  });

  it('renders a host-owned `error` for an app that does not throw', () => {
    const { q } = renderThemed(<LoginFormV4 onSubmit={jest.fn()} error="You’re offline" />);
    expect(q.getByText('You’re offline')).toBeTruthy();
  });

  it('lets a thrown message replace the host-owned one — the newer wins', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Wrong email or password'));
    const { q, container } = renderThemed(
      <LoginFormV4 onSubmit={onSubmit} error="You’re offline" />
    );
    expect(q.getByText('You’re offline')).toBeTruthy();
    fillCredentials(container);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(q.getByText('Wrong email or password')).toBeTruthy());
    expect(q.queryByText('You’re offline')).toBeNull();
  });

  it('field errors are a MESSAGE, not only a red border (§6)', async () => {
    const { q, container } = renderThemed(<LoginFormV4 onSubmit={jest.fn()} />);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(q.getByText('Email is required')).toBeTruthy());
    expect(emailInput(container).getAttribute('aria-invalid')).toBe('true');
    expect(q.getByText('Email is required').className).toContain('text-danger-text');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Providers + the divider
  // ───────────────────────────────────────────────────────────────────────────

  it('EMPTY STATE — §9: providers={[]} renders NO divider at all', () => {
    const { q, container } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} providers={[]} />
    );
    expect(q.queryByText('or continue with')).toBeNull();
    // Not an orphaned hairline either.
    expect(rules(container)).toHaveLength(0);
  });

  it('EMPTY STATE — omitting `providers` entirely is the same as []', () => {
    const { q, container } = renderThemed(<LoginFormV4 onSubmit={jest.fn()} />);
    expect(q.queryByText('or continue with')).toBeNull();
    expect(rules(container)).toHaveLength(0);
  });

  it('draws the divider and the row once there are providers', () => {
    const { q, container } = renderThemed(
      <LoginFormV4 onSubmit={jest.fn()} providers={PROVIDERS} />
    );
    expect(q.getByText('or continue with')).toBeTruthy();
    // The label sits ON the rule: one segment either side.
    expect(rules(container)).toHaveLength(2);
    expect(q.getByRole('button', { name: 'Continue with Google' })).toBeTruthy();
    expect(q.getByRole('button', { name: 'Continue with Apple' })).toBeTruthy();
  });

  it('reports the pressed provider by id', () => {
    const onProviderClick = jest.fn();
    const { q } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        providers={PROVIDERS}
        onProviderClick={onProviderClick}
      />
    );
    fireEvent.click(q.getByRole('button', { name: 'Continue with Apple' }));
    expect(onProviderClick).toHaveBeenCalledWith('apple');
  });

  it('greys one provider out without removing it from the row', () => {
    const { q } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        providers={[{ id: 'google', label: 'Continue with Google', disabled: true }]}
      />
    );
    expect(
      (q.getByRole('button', { name: 'Continue with Google' }) as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('renames the divider copy and compacts the provider row on request', () => {
    const { q } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        providers={PROVIDERS}
        providersLabel="or sign in with"
        compactProviders
      />
    );
    expect(q.getByText('or sign in with')).toBeTruthy();
    // Compact keeps the accessible name and drops the visible label.
    const google = q.getByRole('button', { name: 'Continue with Google' });
    expect(within(google).queryByText('Continue with Google')).toBeNull();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Pending
  // ───────────────────────────────────────────────────────────────────────────

  it('a host-driven `pending` swaps the CTA copy and blocks the providers', () => {
    const { q } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        pending
        providers={PROVIDERS}
        onForgotPassword={jest.fn()}
      />
    );
    const cta = q.getByRole('button', { name: 'Signing in…' });
    expect(cta.getAttribute('aria-busy')).toBe('true');
    expect((cta as HTMLButtonElement).disabled).toBe(true);
    expect(
      (q.getByRole('button', { name: 'Continue with Google' }) as HTMLButtonElement).disabled
    ).toBe(true);
    expect(
      (q.getByRole('button', { name: 'Forgot password?' }) as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('gates the CTA without changing its shape (§5)', () => {
    const { q } = renderThemed(<LoginFormV4 onSubmit={jest.fn()} submitDisabled />);
    const cta = q.getByRole('button', { name: 'Sign in' }) as HTMLButtonElement;
    expect(cta.disabled).toBe(true);
    // Same pill, dimmed by the shared state layer — not a second shape.
    expect(cta.getAttribute('data-xen-v4-auth-submit')).toBe('');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §12 — the empty states
  // ───────────────────────────────────────────────────────────────────────────

  it('EMPTY STATE — with only `onSubmit` it still renders a composed screen', () => {
    const { q, container } = renderThemed(<LoginFormV4 onSubmit={jest.fn()} />);
    // No brand tile, no subtitle, no forgot link, no footer, no providers —
    // and no holes where they would have been.
    expect(q.queryByText('Forgot password?')).toBeNull();
    expect(q.queryByText('No account?')).toBeNull();
    expect(container.querySelector('[data-xen-v4-auth-footer]')).toBeNull();
    expect(rules(container)).toHaveLength(0);
    // The headline and both fields are still there.
    expect((container.querySelector('h1') as HTMLElement).textContent).toBe('Sign in');
    expect(q.getByRole('button', { name: 'Sign in' })).toBeTruthy();
    expect(emailInput(container)).toBeTruthy();
    expect(passwordInput(container)).toBeTruthy();
  });

  it('EMPTY STATE — no brand glyph draws no tile', () => {
    const { container } = renderThemed(<LoginFormV4 onSubmit={jest.fn()} />);
    expect(container.querySelector('[data-xen-v4-auth-heading]')).toBeTruthy();
    expect(container.querySelector('[data-xen-v4-brand-tile]')).toBeNull();
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Copy + escape hatches
  // ───────────────────────────────────────────────────────────────────────────

  it('lets the host own every string a user reads', () => {
    const { q } = renderThemed(
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
      />
    );
    expect(q.getByText('Welcome back')).toBeTruthy();
    expect(q.getByRole('button', { name: 'Log in' })).toBeTruthy();
    expect(q.getByPlaceholderText('you@work.com')).toBeTruthy();
    expect(q.getByRole('button', { name: 'Lost it?' })).toBeTruthy();
  });

  it('takes an extra footer node alongside the switch line', () => {
    const { container } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        onSignupClick={jest.fn()}
        footer={<span data-testid="legal">Terms apply</span>}
      />
    );
    const footer = container.querySelector('[data-xen-v4-auth-footer]') as HTMLElement;
    expect(within(footer).getByTestId('legal')).toBeTruthy();
    expect(within(footer).getByText('Sign up')).toBeTruthy();
  });

  it('forwards className, align and titleSize to the card', () => {
    const { container } = renderThemed(
      <LoginFormV4
        onSubmit={jest.fn()}
        className="mt-lg"
        align="center"
        titleSize="xl"
        brandGlyph="🥕"
      />
    );
    const card = container.querySelector('[data-xen-v4-auth-card]') as HTMLElement;
    expect(card.className).toContain('mt-lg');
    expect(card.getAttribute('data-align')).toBe('center');
    const title = within(container.querySelector('h1') as HTMLElement).getByText('Sign in');
    expect(title.getAttribute('data-xen-v4-text')).toBe('xl');
  });
});

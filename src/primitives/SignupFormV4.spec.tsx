/** @jest-environment jsdom */
/**
 * `SignupFormV4` (web) — §9's register screen as one composite.
 *
 * The spec covers the props, the submit + validation wiring inherited from
 * `useForm`, the error path, the consent gate that keeps the CTA disabled until
 * the box is ticked, and §12's empty states — above all that `providers={[]}`
 * shows no orphaned divider.
 */
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { SignupFormV4 } from './SignupFormV4';

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

/** Fill every required box with something valid. */
function fillValid(q: ReturnType<typeof within>, opts: { last?: string } = {}): void {
  fireEvent.change(q.getByLabelText('First name'), { target: { value: 'Ada' } });
  if (opts.last !== undefined)
    fireEvent.change(q.getByLabelText('Last name'), { target: { value: opts.last } });
  fireEvent.change(q.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
  fireEvent.change(q.getByLabelText('Password'), { target: { value: 'longenoughpw' } });
}

const cta = (q: ReturnType<typeof within>): HTMLButtonElement =>
  q.getByRole('button', { name: 'Sign up' }) as HTMLButtonElement;

const accept = (q: ReturnType<typeof within>): void => {
  fireEvent.click(q.getByLabelText('I agree to the'));
};

describe('SignupFormV4 (web) — §9 anatomy', () => {
  it('renders the register shell: First/Last on one row, then email, password, terms, CTA', () => {
    const { q, container } = renderThemed(
      <SignupFormV4 onSubmit={jest.fn()} title="Create account" subtitle="It takes a minute" />
    );

    expect(q.getByText('Create account')).toBeTruthy();
    expect(q.getByText('It takes a minute')).toBeTruthy();
    expect(q.getByLabelText('First name')).toBeTruthy();
    expect(q.getByLabelText('Last name')).toBeTruthy();
    expect(q.getByLabelText('Email')).toBeTruthy();
    expect(q.getByLabelText('Password')).toBeTruthy();
    expect(q.getByText('Terms of Service')).toBeTruthy();
    expect(cta(q)).toBeTruthy();

    // §6 — the two short fields share a row with `spacing.sm` between them.
    const row = q.getByLabelText('First name').closest('.flex.w-full.items-start');
    expect(row).not.toBeNull();
    expect(row!.className).toContain('gap-sm');
    expect(row!.contains(q.getByLabelText('Last name'))).toBe(true);

    // §10.1 — the field shell paints from `--xen-*` tokens, never a literal.
    const shell = q.getByLabelText('First name').closest('[data-xen-v4-shell]') as HTMLElement;
    expect(shell.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(shell.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(shell.className).toContain('bg-surface');
    // Nothing this component wrote is a literal colour; the only hexes in the
    // tree are the provider's own compiled `--xen-*` sheet.
    expect(container.querySelector('form')!.className).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('honours the copy props — every string a user reads is the host’s', () => {
    const { q } = renderThemed(
      <SignupFormV4
        onSubmit={jest.fn()}
        onLoginClick={jest.fn()}
        firstNameLabel="Given name"
        lastNameLabel="Family name"
        emailLabel="Work email"
        passwordLabel="Passphrase"
        firstNamePlaceholder="Grace"
        lastNamePlaceholder="Hopper"
        emailPlaceholder="you@work.com"
        passwordPlaceholder="At least 8"
        submitLabel="Create my account"
        switchPrompt="Already aboard?"
        switchLabel="Log in"
        termsLabel="I accept the"
        termsLinks={[{ id: 'eula', label: 'EULA' }]}
        providersLabel="or use"
        providers={[{ id: 'google', label: 'Continue with Google', glyph: '🌐' }]}
      />
    );

    expect(q.getByLabelText('Given name')).toBeTruthy();
    expect(q.getByLabelText('Family name')).toBeTruthy();
    expect(q.getByPlaceholderText('Grace')).toBeTruthy();
    expect(q.getByPlaceholderText('Hopper')).toBeTruthy();
    expect(q.getByPlaceholderText('you@work.com')).toBeTruthy();
    expect(q.getByPlaceholderText('At least 8')).toBeTruthy();
    expect(q.getByRole('button', { name: 'Create my account' })).toBeTruthy();
    expect(q.getByText('Already aboard?')).toBeTruthy();
    expect(q.getByRole('button', { name: 'Log in' })).toBeTruthy();
    expect(q.getByLabelText('I accept the')).toBeTruthy();
    expect(q.getByText('EULA')).toBeTruthy();
    expect(q.getByText('or use')).toBeTruthy();
  });

  it('renders the brand tile only when a glyph or icon is given', () => {
    const bare = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />);
    expect(bare.q.queryByText('🥕')).toBeNull();

    const marked = renderThemed(<SignupFormV4 onSubmit={jest.fn()} brandGlyph="🥕" />);
    expect(marked.q.getByText('🥕')).toBeTruthy();
  });
});

describe('SignupFormV4 (web) — the consent gate', () => {
  it('keeps the CTA disabled until the terms box is ticked', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} />);
    fillValid(q, { last: 'Lovelace' });

    expect(cta(q).disabled).toBe(true);
    fireEvent.click(cta(q));
    expect(onSubmit).not.toHaveBeenCalled();

    accept(q);
    expect(cta(q).disabled).toBe(false);

    fireEvent.click(cta(q));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('blocks a submit forced past the disabled button, and says why in the card', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { q, container } = renderThemed(<SignupFormV4 onSubmit={onSubmit} />);
    fillValid(q);

    // An Enter keypress in a field submits the form without going near the
    // disabled button.
    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => expect(q.getByText('Please accept the terms to continue')).toBeTruthy());
    expect(onSubmit).not.toHaveBeenCalled();
    // The message is text, not a tint. Colour alone is not a state.
    expect(q.getByText('Please accept the terms to continue').className).toContain(
      'text-danger-text'
    );

    // Ticking the box clears it.
    accept(q);
    expect(q.queryByText('Please accept the terms to continue')).toBeNull();
  });

  it('takes a custom gate message', async () => {
    const { q, container } = renderThemed(
      <SignupFormV4 onSubmit={jest.fn()} termsError="Tick the box first" />
    );
    fillValid(q);
    fireEvent.submit(container.querySelector('form')!);
    await waitFor(() => expect(q.getByText('Tick the box first')).toBeTruthy());
  });

  it('reports the pressed legal link by id', () => {
    const onTermsLinkClick = jest.fn();
    const { q } = renderThemed(
      <SignupFormV4 onSubmit={jest.fn()} onTermsLinkClick={onTermsLinkClick} />
    );
    fireEvent.click(q.getByText('Privacy Policy'));
    expect(onTermsLinkClick).toHaveBeenCalledWith('privacy');
  });

  it('drops the card and the gate entirely with requireTerms={false}', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} requireTerms={false} />);

    expect(q.queryByText('Terms of Service')).toBeNull();
    expect(cta(q).disabled).toBe(false);

    fillValid(q, { last: 'Lovelace' });
    fireEvent.click(cta(q));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });
});

describe('SignupFormV4 (web) — submit + validation', () => {
  it('composes the two name boxes into the base’s single `name`', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} />);
    fillValid(q, { last: 'Lovelace' });
    accept(q);
    fireEvent.click(cta(q));

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
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} />);
    fillValid(q);
    accept(q);
    fireEvent.click(cta(q));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Ada' }))
    );
  });

  it('reports every missing field as text, and does not submit', async () => {
    const onSubmit = jest.fn();
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} />);
    accept(q);
    fireEvent.click(cta(q));

    await waitFor(() => expect(q.getByText('First name is required')).toBeTruthy());
    expect(q.getByText('Email is required')).toBeTruthy();
    expect(q.getByText(/at least 8 characters/)).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('honours minPasswordLength', async () => {
    const onSubmit = jest.fn();
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} minPasswordLength={12} />);
    fillValid(q);
    fireEvent.change(q.getByLabelText('Password'), { target: { value: 'elevenchars' } });
    accept(q);
    fireEvent.click(cta(q));

    await waitFor(() => expect(q.getByText(/at least 12 characters/)).toBeTruthy());
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('leaves the last name optional by default, and requires it on request', async () => {
    const optional = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />);
    fillValid(optional.q);
    accept(optional.q);
    fireEvent.click(cta(optional.q));
    await waitFor(() => expect(optional.q.queryByText('Last name is required')).toBeNull());

    const required = renderThemed(<SignupFormV4 onSubmit={jest.fn()} requireLastName />);
    fillValid(required.q);
    accept(required.q);
    fireEvent.click(cta(required.q));
    await waitFor(() => expect(required.q.getByText('Last name is required')).toBeTruthy());
  });

  it('falls back to one Name box with splitName={false}', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} splitName={false} />);

    expect(q.queryByLabelText('First name')).toBeNull();
    expect(q.getByLabelText('Name')).toBeTruthy();

    accept(q);
    fireEvent.click(cta(q));
    await waitFor(() => expect(q.getByText('Name is required')).toBeTruthy());

    fireEvent.change(q.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(q.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.change(q.getByLabelText('Password'), { target: { value: 'longenoughpw' } });
    fireEvent.click(cta(q));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Ada Lovelace' }))
    );
  });

  it('surfaces a thrown submit as a message, not a colour', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Email already registered'));
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} />);
    fillValid(q, { last: 'Lovelace' });
    accept(q);
    fireEvent.click(cta(q));

    await waitFor(() => expect(q.getByText('Email already registered')).toBeTruthy());
  });

  it('falls back to a generic message when the thrown value is not an Error', async () => {
    const onSubmit = jest.fn().mockRejectedValue('nope');
    const { q } = renderThemed(<SignupFormV4 onSubmit={onSubmit} />);
    fillValid(q, { last: 'Lovelace' });
    accept(q);
    fireEvent.click(cta(q));

    await waitFor(() => expect(q.getByText('Sign up failed')).toBeTruthy());
  });

  it('announces the pending CTA with submittingLabel', async () => {
    let release: () => void = () => {};
    const onSubmit = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          release = resolve;
        })
    );
    const { q } = renderThemed(
      <SignupFormV4 onSubmit={onSubmit} submittingLabel="Creating your account…" />
    );
    fillValid(q, { last: 'Lovelace' });
    accept(q);
    fireEvent.click(cta(q));

    await waitFor(() =>
      expect(q.getByRole('button', { name: 'Creating your account…' })).toBeTruthy()
    );
    release();
    await waitFor(() => expect(cta(q)).toBeTruthy());
  });
});

describe('SignupFormV4 (web) — providers and §12 empty states', () => {
  it('draws the divider and the provider row, and reports the pressed id', () => {
    const onProviderClick = jest.fn();
    const { q } = renderThemed(
      <SignupFormV4
        onSubmit={jest.fn()}
        onProviderClick={onProviderClick}
        providers={[
          { id: 'google', label: 'Continue with Google', glyph: '🌐' },
          { id: 'email', label: 'Continue with email', name: 'mail' },
        ]}
      />
    );

    expect(q.getByText('or continue with')).toBeTruthy();
    fireEvent.click(q.getByRole('button', { name: 'Continue with Google' }));
    expect(onProviderClick).toHaveBeenCalledWith('google');
    expect(q.getByRole('button', { name: 'Continue with email' })).toBeTruthy();
  });

  it('shows NO divider with providers={[]} — §9’s empty-provider rule', () => {
    const { q } = renderThemed(<SignupFormV4 onSubmit={jest.fn()} providers={[]} />);
    expect(q.queryByText('or continue with')).toBeNull();
  });

  it('shows no divider when providers is omitted altogether', () => {
    const { q } = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />);
    expect(q.queryByText('or continue with')).toBeNull();
  });

  it('hides the switch footer until onLoginClick is wired', () => {
    const bare = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />);
    expect(bare.q.queryByText('Have an account?')).toBeNull();

    const onLoginClick = jest.fn();
    const { q } = renderThemed(<SignupFormV4 onSubmit={jest.fn()} onLoginClick={onLoginClick} />);
    fireEvent.click(q.getByRole('button', { name: 'Sign in' }));
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  it('survives the fully empty state — no subtitle, no brand, no providers, no footer', () => {
    const { q, container } = renderThemed(<SignupFormV4 onSubmit={jest.fn()} />);
    expect(q.getByText('Create account')).toBeTruthy();
    expect(q.queryByText('or continue with')).toBeNull();
    expect(q.queryByText('Have an account?')).toBeNull();
    expect(cta(q)).toBeTruthy();
    // The empty shell is still composed: a headline, the fields, one CTA.
    expect(container.querySelector('form')!.children.length).toBeGreaterThan(0);
  });
});

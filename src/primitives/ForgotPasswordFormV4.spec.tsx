/** @jest-environment jsdom */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ForgotPasswordFormV4 } from './ForgotPasswordFormV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

/** Just what the component drew — not the provider's compiled `<style>` block. */
function markup(container: HTMLElement): string {
  return container.querySelector('[data-theme]')!.innerHTML;
}

/** Every class name in the tree, with inline compiled theme values stripped. */
function classes(container: HTMLElement): string {
  return Array.from(container.querySelectorAll<HTMLElement>('[class]'))
    .map((el) => el.getAttribute('class') ?? '')
    .join(' ');
}

/**
 * Anything on this composite's OWN wrappers that is not a token utility — a raw
 * hex, a bare `px`/`rem` length, or a Tailwind numeric spacing step.
 */
function ownLiterals(container: HTMLElement): string[] {
  const own = [
    container.querySelector<HTMLElement>('[data-xen-v4-forgot-sent]'),
    container.querySelector<HTMLElement>('[data-xen-v4-forgot-address]'),
  ].filter((el): el is HTMLElement => el !== null);
  return own
    .flatMap((el) => el.className.split(/\s+/))
    .filter((c) => c !== '' && /#[0-9a-fA-F]{3,8}|[0-9](px|rem)|^(gap|p|m|px|py|mx|my)-[0-9]/.test(c));
}

function emailInput(): HTMLInputElement {
  return screen.getByLabelText('Email') as HTMLInputElement;
}

function submitButton(container: HTMLElement): HTMLButtonElement {
  return container.querySelector('button[type="submit"]') as HTMLButtonElement;
}

function form(container: HTMLElement): HTMLFormElement | null {
  return container.querySelector('[data-xen-v4-form]');
}

function sentBlock(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-v4-forgot-sent]');
}

/** Every switch-footer line on screen, in document order. */
function switchRows(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-auth-switch]'));
}

function linkNamed(label: string): HTMLButtonElement {
  return screen.getByRole('button', { name: label }) as HTMLButtonElement;
}

/** Fill the field and press the CTA, flushing the async submit. */
async function send(container: HTMLElement, email: string): Promise<void> {
  fireEvent.change(emailInput(), { target: { value: email } });
  await act(async () => {
    fireEvent.click(submitButton(container));
  });
}

describe('ForgotPasswordFormV4 (web)', () => {
  it('composes the V4 line end to end (§10.5)', () => {
    const container = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} onLoginClick={jest.fn()} />);
    // The shell, the rhythm, the field, the CTA and the footer are all V4.
    expect(container.querySelector('[data-xen-v4-auth-card]')).not.toBeNull();
    expect(form(container)).not.toBeNull();
    expect(container.querySelector('[data-xen-v4-shell]')).not.toBeNull();
    expect(submitButton(container)).not.toBeNull();
    expect(switchRows(container)).toHaveLength(1);
  });

  it('carries the base defaults: title, CTA copy, field copy, back link', () => {
    const container = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} onLoginClick={jest.fn()} />);
    expect(screen.getByText('Reset password')).not.toBeNull();
    expect(submitButton(container).textContent).toContain('Send reset link');
    expect(emailInput().placeholder).toBe('you@example.com');
    expect(emailInput().type).toBe('email');
    expect(linkNamed('Back to sign in')).not.toBeNull();
  });

  it('the CTA carries no trailing arrow — sending a link is terminal (§5)', () => {
    const container = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    expect(submitButton(container).querySelector('[data-xen-v4-trailing]')).toBeNull();
    expect(submitButton(container).textContent).not.toContain('→');
  });

  it('takes every string the host owns', () => {
    const container = draw(
      <ForgotPasswordFormV4
        onSubmit={jest.fn()}
        onLoginClick={jest.fn()}
        title="Lost your password?"
        subtitle="We'll email you a link."
        brandGlyph="X"
        align="center"
        submitLabel="Email me a link"
        emailLabel="Work email"
        emailPlaceholder="you@work.com"
        backLabel="Return to sign in"
        backPrompt="Remembered it?"
      />
    );
    expect(screen.getByText('Lost your password?')).not.toBeNull();
    expect(screen.getByText("We'll email you a link.")).not.toBeNull();
    expect(screen.getByText('X')).not.toBeNull();
    expect(container.querySelector('[data-xen-v4-auth-card]')!.getAttribute('data-align')).toBe(
      'center'
    );
    expect(submitButton(container).textContent).toContain('Email me a link');
    expect((screen.getByLabelText('Work email') as HTMLInputElement).placeholder).toBe(
      'you@work.com'
    );
    expect(screen.getByText('Remembered it?')).not.toBeNull();
    expect(linkNamed('Return to sign in')).not.toBeNull();
  });

  it('validates before it submits, and says so in words (§6)', async () => {
    const onSubmit = jest.fn();
    const container = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await act(async () => {
      fireEvent.click(submitButton(container));
    });
    expect(onSubmit).not.toHaveBeenCalled();
    // The message is TEXT, not a red border alone — the whole reason a V4
    // field-shaped control is allowed to break prop parity for `error`.
    expect(screen.getByText('Email is required')).not.toBeNull();
    expect(emailInput().getAttribute('aria-invalid')).toBe('true');
    expect(emailInput().getAttribute('aria-describedby')).not.toBeNull();
  });

  it('submits the address and shows the confirmation', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const container = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} onLoginClick={jest.fn()} />);
    await send(container, 'ada@example.com');

    expect(onSubmit).toHaveBeenCalledWith('ada@example.com');
    await waitFor(() => expect(sentBlock(container)).not.toBeNull());

    // The form is gone…
    expect(form(container)).toBeNull();
    // …the heading followed the state…
    expect(screen.queryByText('Reset password')).toBeNull();
    expect(screen.getByText('Check your inbox')).not.toBeNull();
    // …the confirmation copy is there…
    expect(screen.getByText('Check your email for a reset link.')).not.toBeNull();
    expect(container.querySelector('[data-xen-v4-status-message="empty"]')).not.toBeNull();
    // …and so is the address it went to.
    expect(container.querySelector('[data-xen-v4-forgot-address]')!.textContent).toBe(
      'ada@example.com'
    );
    // The back link survives the state change.
    expect(linkNamed('Back to sign in')).not.toBeNull();
  });

  it('announces the confirmation politely — the control that had focus is gone', async () => {
    const container = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    await send(container, 'ada@example.com');
    await waitFor(() => expect(sentBlock(container)).not.toBeNull());
    expect(sentBlock(container)!.getAttribute('role')).toBe('status');
    expect(sentBlock(container)!.getAttribute('aria-live')).toBe('polite');
  });

  it('the confirmation drops the subtitle — it described a form that is gone', async () => {
    const container = draw(
      <ForgotPasswordFormV4 onSubmit={jest.fn()} subtitle="We'll email you a link." />
    );
    expect(screen.getByText("We'll email you a link.")).not.toBeNull();
    await send(container, 'ada@example.com');
    await waitFor(() => expect(sentBlock(container)).not.toBeNull());
    expect(screen.queryByText("We'll email you a link.")).toBeNull();
  });

  it('takes the confirmation copy from the host', async () => {
    const container = draw(
      <ForgotPasswordFormV4
        onSubmit={jest.fn()}
        sentTitle="Link on its way"
        sentMessage="Open it within an hour."
        resendPrompt="Nothing yet?"
        resendLabel="Send it again"
      />
    );
    await send(container, 'ada@example.com');
    await waitFor(() => expect(sentBlock(container)).not.toBeNull());
    expect(screen.getByText('Link on its way')).not.toBeNull();
    expect(screen.getByText('Open it within an hour.')).not.toBeNull();
    expect(screen.getByText('Nothing yet?')).not.toBeNull();
    expect(linkNamed('Send it again')).not.toBeNull();
  });

  it('resends to the same address, and says so while it is in flight (§15)', async () => {
    let release: () => void = () => {};
    const onSubmit = jest
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            release = resolve;
          })
      );
    const container = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await send(container, 'ada@example.com');
    await waitFor(() => expect(sentBlock(container)).not.toBeNull());

    act(() => {
      fireEvent.click(linkNamed('Resend link'));
    });
    expect(onSubmit).toHaveBeenNthCalledWith(2, 'ada@example.com');
    // The label speaks the state; a link has no spinner to speak it with.
    await waitFor(() => expect(linkNamed('Sending…').disabled).toBe(true));

    await act(async () => {
      release();
    });
    await waitFor(() => expect(linkNamed('Resend link').disabled).toBe(false));
  });

  it('renders the failure as text, above the form (§6, §38)', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('No account for that address'));
    const container = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await send(container, 'ada@example.com');

    await waitFor(() => expect(screen.getByText('No account for that address')).not.toBeNull());
    // A failed request does NOT advance to the confirmation.
    expect(sentBlock(container)).toBeNull();
    expect(form(container)).not.toBeNull();
    expect(emailInput().value).toBe('ada@example.com');
  });

  it('falls back to its own copy when the rejection carries none', async () => {
    const onSubmit = jest.fn().mockRejectedValue('nope');
    const container = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await send(container, 'ada@example.com');
    await waitFor(() => expect(screen.getByText('Could not send reset email')).not.toBeNull());
  });

  it('surfaces a failed resend inside the confirmation, without losing it', async () => {
    const onSubmit = jest
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('Too many requests'));
    const container = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await send(container, 'ada@example.com');
    await waitFor(() => expect(sentBlock(container)).not.toBeNull());

    await act(async () => {
      fireEvent.click(linkNamed('Resend link'));
    });
    await waitFor(() => expect(screen.getByText('Too many requests')).not.toBeNull());
    // The user is still looking at the confirmation, address and all.
    expect(sentBlock(container)).not.toBeNull();
    expect(container.querySelector('[data-xen-v4-forgot-address]')!.textContent).toBe(
      'ada@example.com'
    );
  });

  it('empty state: no footer without an onLoginClick (§12)', () => {
    const container = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    expect(switchRows(container)).toHaveLength(0);
    expect(screen.queryByText('Back to sign in')).toBeNull();
    // The form itself is untouched by the missing footer.
    expect(form(container)).not.toBeNull();
  });

  it('empty state: no subtitle, no brand mark, still composed (§12)', () => {
    const container = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    expect(container.querySelector('[data-xen-v4-auth-tile]')).toBeNull();
    expect(screen.getByText('Reset password')).not.toBeNull();
    expect(submitButton(container)).not.toBeNull();
  });

  it('empty state: resendable={false} leaves the confirmation standing alone', async () => {
    const container = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} resendable={false} />);
    await send(container, 'ada@example.com');
    await waitFor(() => expect(sentBlock(container)).not.toBeNull());
    expect(screen.queryByText('Resend link')).toBeNull();
    expect(switchRows(container)).toHaveLength(0);
    // The message is the whole point of the state and never depends on the action.
    expect(screen.getByText('Check your email for a reset link.')).not.toBeNull();
  });

  it('names no colour, spacing or radius of its own (§10.1)', async () => {
    const container = draw(
      <ForgotPasswordFormV4 onSubmit={jest.fn()} onLoginClick={jest.fn()} brandGlyph="X" />
    );
    // Classes only. The one place a hex appears on this page is the CTA's
    // inline `--xen-v4-image-*` — the brand gradient the compiler derived from
    // the seed, which IS the theme rather than a literal. What must hold is
    // that nothing in the tree *names* a colour in a class, and that this
    // composite spends nothing but tokens on its own wrappers.
    expect(classes(container)).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup(container)).toContain('var(--xen-radius-md)');

    await send(container, 'ada@example.com');
    await waitFor(() => expect(sentBlock(container)).not.toBeNull());
    expect(classes(container)).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // `gap-md` off the spacing scale, never a `gap-[16px]`.
    expect(sentBlock(container)!.className).toContain('gap-md');
    expect(ownLiterals(container)).toEqual([]);
  });
});

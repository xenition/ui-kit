import * as React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import type { RenderResult } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { ForgotPasswordFormV4 } from './ForgotPasswordFormV4';

function draw(ui: React.ReactElement): RenderResult {
  return renderThemed(ui, SEED_LIGHT);
}

/** Fill the one field and press the CTA, flushing the async submit. */
async function send(r: RenderResult, email: string, cta = 'Send reset link'): Promise<void> {
  fireEvent.changeText(r.getByPlaceholderText('you@example.com'), email);
  await act(async () => {
    fireEvent.press(r.getByLabelText(cta));
  });
}

describe('ForgotPasswordFormV4 (native)', () => {
  it('composes the V4 line end to end (§10.5)', () => {
    const r = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} onLoginClick={jest.fn()} />);
    // The rhythm, the field, the CTA and the footer link are all V4.
    expect(r.getByTestId('xen-v4-forgot-form')).toBeTruthy();
    expect(r.getByPlaceholderText('you@example.com')).toBeTruthy();
    expect(r.getByLabelText('Send reset link')).toBeTruthy();
    expect(r.getByLabelText('Back to sign in')).toBeTruthy();
  });

  it('carries the base defaults: title, CTA copy, field copy, back link', () => {
    const r = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} onLoginClick={jest.fn()} />);
    expect(r.getByText('Reset password')).toBeTruthy();
    expect(r.getByText('Send reset link')).toBeTruthy();
    expect(r.getByText('Email')).toBeTruthy();
    expect(r.getByText('Back to sign in')).toBeTruthy();
  });

  it('the CTA carries no trailing arrow — sending a link is terminal (§5)', () => {
    const r = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    expect(r.queryByText('→')).toBeNull();
  });

  it('takes every string the host owns', () => {
    const r = draw(
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
    expect(r.getByText('Lost your password?')).toBeTruthy();
    expect(r.getByText("We'll email you a link.")).toBeTruthy();
    // The brand glyph is decorative, so it is hidden from the a11y tree —
    // which is exactly why it has to be asked for with hidden elements in.
    expect(r.getByText('X', { includeHiddenElements: true })).toBeTruthy();
    expect(r.getByText('Email me a link')).toBeTruthy();
    expect(r.getByPlaceholderText('you@work.com')).toBeTruthy();
    expect(r.getByText('Work email')).toBeTruthy();
    expect(r.getByText('Remembered it?')).toBeTruthy();
    expect(r.getByLabelText('Return to sign in')).toBeTruthy();
  });

  it('validates before it submits, and says so in words (§6)', async () => {
    const onSubmit = jest.fn();
    const r = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await act(async () => {
      fireEvent.press(r.getByLabelText('Send reset link'));
    });
    expect(onSubmit).not.toHaveBeenCalled();
    // The message is TEXT, not a red border alone.
    expect(r.getByText('Email is required')).toBeTruthy();
  });

  it('submits the address and shows the confirmation', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const r = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} onLoginClick={jest.fn()} />);
    await send(r, 'ada@example.com');

    expect(onSubmit).toHaveBeenCalledWith('ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());

    // The form is gone…
    expect(r.queryByTestId('xen-v4-forgot-form')).toBeNull();
    // …the heading followed the state…
    expect(r.queryByText('Reset password')).toBeNull();
    expect(r.getByText('Check your inbox')).toBeTruthy();
    // …the confirmation copy is there…
    expect(r.getByText('Check your email for a reset link.')).toBeTruthy();
    // …and so is the address it went to.
    expect(r.getByTestId('xen-v4-forgot-address').props.children).toBe('ada@example.com');
    // The back link survives the state change.
    expect(r.getByLabelText('Back to sign in')).toBeTruthy();
  });

  it('announces the confirmation politely — the control that had focus is gone', async () => {
    const r = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());
    expect(r.getByTestId('xen-v4-forgot-sent').props.accessibilityLiveRegion).toBe('polite');
  });

  it('the confirmation drops the subtitle — it described a form that is gone', async () => {
    const r = draw(
      <ForgotPasswordFormV4 onSubmit={jest.fn()} subtitle="We'll email you a link." />
    );
    expect(r.getByText("We'll email you a link.")).toBeTruthy();
    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());
    expect(r.queryByText("We'll email you a link.")).toBeNull();
  });

  it('takes the confirmation copy from the host', async () => {
    const r = draw(
      <ForgotPasswordFormV4
        onSubmit={jest.fn()}
        sentTitle="Link on its way"
        sentMessage="Open it within an hour."
        resendPrompt="Nothing yet?"
        resendLabel="Send it again"
      />
    );
    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());
    expect(r.getByText('Link on its way')).toBeTruthy();
    expect(r.getByText('Open it within an hour.')).toBeTruthy();
    expect(r.getByText('Nothing yet?')).toBeTruthy();
    expect(r.getByLabelText('Send it again')).toBeTruthy();
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
    const r = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());

    act(() => {
      fireEvent.press(r.getByLabelText('Resend link'));
    });
    expect(onSubmit).toHaveBeenNthCalledWith(2, 'ada@example.com');
    // The label speaks the state; a text link has no spinner to speak it with.
    await waitFor(() => expect(r.getByLabelText('Sending…')).toBeTruthy());
    expect(r.getByLabelText('Sending…').props.accessibilityState.disabled).toBe(true);

    await act(async () => {
      release();
    });
    await waitFor(() => expect(r.getByLabelText('Resend link')).toBeTruthy());
  });

  it('renders the failure as text, above the form (§6, §38)', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('No account for that address'));
    const r = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await send(r, 'ada@example.com');

    await waitFor(() => expect(r.getByText('No account for that address')).toBeTruthy());
    // A failed request does NOT advance to the confirmation.
    expect(r.queryByTestId('xen-v4-forgot-sent')).toBeNull();
    expect(r.getByTestId('xen-v4-forgot-form')).toBeTruthy();
    expect(r.getByPlaceholderText('you@example.com').props.value).toBe('ada@example.com');
  });

  it('falls back to its own copy when the rejection carries none', async () => {
    const onSubmit = jest.fn().mockRejectedValue('nope');
    const r = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByText('Could not send reset email')).toBeTruthy());
  });

  it('surfaces a failed resend inside the confirmation, without losing it', async () => {
    const onSubmit = jest
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('Too many requests'));
    const r = draw(<ForgotPasswordFormV4 onSubmit={onSubmit} />);
    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());

    await act(async () => {
      fireEvent.press(r.getByLabelText('Resend link'));
    });
    await waitFor(() => expect(r.getByText('Too many requests')).toBeTruthy());
    // The user is still looking at the confirmation, address and all.
    expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy();
    expect(r.getByTestId('xen-v4-forgot-address').props.children).toBe('ada@example.com');
  });

  it('empty state: no footer without an onPress for the back link (§12)', () => {
    const r = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    expect(r.queryByText('Back to sign in')).toBeNull();
    expect(r.getByTestId('xen-v4-forgot-form')).toBeTruthy();
  });

  it('empty state: no subtitle, no brand mark, still composed (§12)', () => {
    const r = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    expect(r.getByText('Reset password')).toBeTruthy();
    expect(r.getByText('Send reset link')).toBeTruthy();
  });

  it('empty state: resendable={false} leaves the confirmation standing alone', async () => {
    const r = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} resendable={false} />);
    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());
    expect(r.queryByText('Resend link')).toBeNull();
    expect(r.queryByText("Didn't get the email?")).toBeNull();
    // The message is the whole point of the state and never depends on the action.
    expect(r.getByText('Check your email for a reset link.')).toBeTruthy();
  });

  it('every colour it renders traces to a token (§10.1)', async () => {
    const allowed = tokenHexSet(SEED_LIGHT);
    const r = draw(
      <ForgotPasswordFormV4 onSubmit={jest.fn()} onLoginClick={jest.fn()} brandGlyph="X" />
    );
    renderedStyleHexes(r.UNSAFE_root).forEach((hex) => {
      expect(allowed.has(hex)).toBe(true);
    });

    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());
    renderedStyleHexes(r.UNSAFE_root).forEach((hex) => {
      expect(allowed.has(hex)).toBe(true);
    });
  });

  it('spends only the spacing scale on its own wrapper (§10.1)', async () => {
    const theme = compileTheme(SEED_LIGHT);
    const scale = new Set<number>(Object.values(theme.spacing));
    const r = draw(<ForgotPasswordFormV4 onSubmit={jest.fn()} />);
    await send(r, 'ada@example.com');
    await waitFor(() => expect(r.getByTestId('xen-v4-forgot-sent')).toBeTruthy());

    const style = r.getByTestId('xen-v4-forgot-sent').props.style as { gap?: number };
    expect(typeof style.gap).toBe('number');
    expect(scale.has(style.gap as number)).toBe(true);
  });
});

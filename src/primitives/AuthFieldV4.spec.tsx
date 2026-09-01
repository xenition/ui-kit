/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { AuthFieldV4 } from './AuthFieldV4';
import { resolveIconGlyph } from './icon-names';

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

/** The shell is the input's parent — the box that wears the border and the ring. */
function shellOf(input: HTMLElement): HTMLElement {
  return input.parentElement as HTMLElement;
}

describe('AuthFieldV4 (web)', () => {
  it('takes the settled V4 field metrics, not §6’s 56 / radius.lg', () => {
    const { q } = renderThemed(<AuthFieldV4 aria-label="Email" placeholder="you@example.com" />);
    const shell = shellOf(q.getByPlaceholderText('you@example.com'));
    expect(shell.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(shell.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(shell.className).toContain('px-md');
    // The Addendum's whole point: the base's 56 / radius.lg must not survive.
    expect(shell.className).not.toContain('h-14');
    expect(shell.className).not.toContain('--xen-radius-lg');
  });

  it('leads with a muted icon and a muted placeholder that never fakes the label', () => {
    const { q, container } = renderThemed(
      <AuthFieldV4 label="Email address" icon="mail" placeholder="you@example.com" />
    );
    // §6: the leading icon is `muted`.
    expect(q.getByText(resolveIconGlyph('mail')).className).toContain('text-muted');
    // §6: the placeholder is `muted` and the label is real, above the control.
    const input = q.getByPlaceholderText('you@example.com');
    expect(input.className).toContain('placeholder:text-muted');
    const label = container.querySelector('label') as HTMLLabelElement;
    expect(label.textContent).toBe('Email address');
    expect(label.htmlFor).toBe(input.id);
    expect(input.id).not.toBe('');
  });

  it('RENDERS the error message, not only a red border', () => {
    const { q } = renderThemed(
      <AuthFieldV4 aria-label="Email" placeholder="you@example.com" error="Enter a valid email" />
    );
    const alert = q.getByRole('alert');
    expect(alert.textContent).toBe('Enter a valid email');
    expect(alert.className).toContain('text-danger-text');

    const input = q.getByPlaceholderText('you@example.com');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    // The message is wired to the field, so a screen reader gets the recovery
    // copy and not just "invalid".
    expect(input.getAttribute('aria-describedby')).toBe(alert.id);

    const shell = shellOf(input);
    expect(shell.className).toContain('border-danger');
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('shows the hint below when there is nothing wrong, and yields it to the error', () => {
    const hinted = renderThemed(
      <AuthFieldV4 aria-label="Password" hint="At least 8 characters" />
    );
    expect(hinted.q.getByText('At least 8 characters')).toBeTruthy();
    expect(hinted.q.queryByRole('alert')).toBeNull();

    const failed = renderThemed(
      <AuthFieldV4 aria-label="Password" hint="At least 8 characters" error="Too short" />
    );
    expect(failed.q.getByRole('alert').textContent).toBe('Too short');
    expect(failed.q.queryByText('At least 8 characters')).toBeNull();
  });

  it('earns its trailing affordance: the eye masks and reveals', () => {
    const { q } = renderThemed(
      <AuthFieldV4 aria-label="Password" placeholder="Password" secure icon="lock" />
    );
    const input = q.getByPlaceholderText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');

    const eye = q.getByLabelText('Show password');
    expect(eye.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(eye);

    expect((q.getByPlaceholderText('Password') as HTMLInputElement).type).toBe('text');
    expect(q.getByLabelText('Hide password').getAttribute('aria-pressed')).toBe('true');
  });

  it('draws the clear ✕ only once there is something to clear, and empties the field for real', () => {
    const onChangeText = jest.fn();
    const onChange = jest.fn();
    const onClear = jest.fn();
    const { q } = renderThemed(
      <AuthFieldV4
        aria-label="Email"
        placeholder="you@example.com"
        clearable
        onChangeText={onChangeText}
        onChange={onChange}
        onClear={onClear}
      />
    );
    const input = q.getByPlaceholderText('you@example.com') as HTMLInputElement;
    // §10.6 — no affordance over an empty field.
    expect(q.queryByLabelText('Clear')).toBeNull();

    fireEvent.change(input, { target: { value: 'ada@example.com' } });
    expect(onChangeText).toHaveBeenLastCalledWith('ada@example.com');

    fireEvent.click(q.getByLabelText('Clear'));
    expect(input.value).toBe('');
    // Clearing replays a real change, so a form library bound to `onChange`
    // sees it exactly as it sees the user emptying the field by hand.
    expect(onChangeText).toHaveBeenLastCalledWith('');
    expect(onChange).toHaveBeenCalled();
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(q.queryByLabelText('Clear')).toBeNull();
  });

  it('re-syncs the clear affordance with a controlled value', () => {
    const { q, rerender } = renderThemed(
      <AuthFieldV4 aria-label="Email" clearable value="" onChange={() => undefined} />
    );
    expect(q.queryByLabelText('Clear')).toBeNull();
    rerender(
      <XenitionUIProvider theme={SEED}>
        <AuthFieldV4 aria-label="Email" clearable value="ada" onChange={() => undefined} />
      </XenitionUIProvider>
    );
    expect(q.getByLabelText('Clear')).toBeTruthy();
  });

  it('rings the whole control on focus-within, off the shared V4 sheet', () => {
    const { q } = renderThemed(<AuthFieldV4 aria-label="Email" placeholder="you@example.com" />);
    const shell = shellOf(q.getByPlaceholderText('you@example.com'));
    expect(shell.hasAttribute('data-xen-v4-shell')).toBe(true);
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');

    const css = document.getElementById('xen-v4-field-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-shell]:focus-within');
    expect(css).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
    // A keyboard user tabbing to the eye must still see where they are.
    expect(css).toContain('[data-xen-v4-inline-action]:focus-visible');
  });

  it('survives its empty state: a bare field, and no hole where a part would be', () => {
    const { q, container } = renderThemed(<AuthFieldV4 aria-label="Email" />);
    expect(container.querySelector('label')).toBeNull();
    expect(q.queryByRole('alert')).toBeNull();
    expect(q.queryAllByRole('button')).toHaveLength(0);
    // The control itself is still fully drawn.
    const shell = shellOf(q.getByLabelText('Email'));
    expect(shell.className).toContain('border-border');
    expect(shell.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(q.getByLabelText('Email').getAttribute('aria-describedby')).toBeNull();
  });

  it('freezes and dims when disabled, and offers nothing to press', () => {
    const { q } = renderThemed(
      <AuthFieldV4 aria-label="Email" clearable value="ada" disabled onChange={() => undefined} />
    );
    const input = q.getByLabelText('Email') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(shellOf(input).className).toContain('opacity-[0.38]');
    expect(q.queryByLabelText('Clear')).toBeNull();
  });

  it('paints nothing it cannot trace to a token', () => {
    const { q } = renderThemed(
      <AuthFieldV4 label="Email" icon="mail" hint="We never share it" placeholder="you@" />
    );
    const shell = shellOf(q.getByPlaceholderText('you@'));
    const field = shell.parentElement as HTMLElement;
    expect(shell.className).not.toMatch(/shadow|gradient|backdrop/);
    expect(field.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // Every custom property it sets is a `--xen-*` reference, never a literal.
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toMatch(/^var\(--xen-/);
  });
});

/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { PasswordInputV4 } from './PasswordInputV4';

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

const sheet = (id: string): string => document.getElementById(id)?.textContent ?? '';

describe('PasswordInputV4 (web)', () => {
  it('masks by default and reveals on request, in a word not an icon', () => {
    const { q } = renderThemed(<PasswordInputV4 value="hunter2" />);
    const field = q.getByLabelText('Password') as HTMLInputElement;
    expect(field.type).toBe('password');

    const toggle = q.getByRole('button', { name: 'Show password' });
    expect(toggle.textContent).toBe('Show');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(toggle);
    expect((q.getByLabelText('Password') as HTMLInputElement).type).toBe('text');
    expect(q.getByRole('button', { name: 'Hide password' }).textContent).toBe('Hide');
  });

  it('is a field like the others, on the shared V4 metrics', () => {
    const { q } = renderThemed(<PasswordInputV4 />);
    const shell = q.getByLabelText('Password').parentElement!;
    expect(shell.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(shell.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(shell.className).toContain('px-md');
  });

  it('rings the whole control, toggle included, on focus-within', () => {
    const { q } = renderThemed(<PasswordInputV4 />);
    const shell = q.getByLabelText('Password').parentElement!;
    expect(shell.hasAttribute('data-xen-v4-shell')).toBe(true);
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    expect(sheet('xen-v4-field-styles')).toContain('[data-xen-v4-shell]:focus-within');
  });

  it('leaves the toggle its own focus ring — a keyboard must see where it is', () => {
    const { q } = renderThemed(<PasswordInputV4 />);
    const toggle = q.getByRole('button', { name: 'Show password' });
    expect(toggle.hasAttribute('data-xen-v4-inline-action')).toBe(true);
    const css = sheet('xen-v4-field-styles');
    // The outline is only suppressed on entry elements, never on a button.
    expect(css).toContain('[data-xen-v4-shell] input:focus');
    expect(css).not.toContain('[data-xen-v4-shell]:focus-within :focus,');
    expect(css).toContain('[data-xen-v4-inline-action]:focus-visible');
  });

  it('gives the toggle a full-height target', () => {
    const { q } = renderThemed(<PasswordInputV4 />);
    expect(q.getByRole('button', { name: 'Show password' }).className).toContain(
      'h-[var(--xen-space-2xl)]'
    );
  });

  it('tints the revealed toggle with the contrast-safe text form', () => {
    const { q } = renderThemed(<PasswordInputV4 />);
    expect(q.getByRole('button', { name: 'Show password' }).className).toContain('text-muted');
    fireEvent.click(q.getByRole('button', { name: 'Show password' }));
    expect(q.getByRole('button', { name: 'Hide password' }).className).toContain(
      'text-primary-text'
    );
  });

  it('turns the border and the ring danger from one flag', () => {
    const { q } = renderThemed(<PasswordInputV4 invalid />);
    const shell = q.getByLabelText('Password').parentElement!;
    expect(q.getByLabelText('Password').getAttribute('aria-invalid')).toBe('true');
    expect(shell.className).toContain('border-danger');
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('reports typed text and renders its label', () => {
    const onChangeText = jest.fn();
    const { q } = renderThemed(<PasswordInputV4 label="Choose a password" onChangeText={onChangeText} />);
    expect(q.getByText('Choose a password').className).toContain('text-sm');
    fireEvent.change(q.getByLabelText('Password'), { target: { value: 'abc' } });
    expect(onChangeText).toHaveBeenCalledWith('abc');
  });

  it('forwards its ref to the input', () => {
    let node: HTMLInputElement | null = null;
    const { q } = renderThemed(
      <PasswordInputV4
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(q.getByLabelText('Password'));
  });
});

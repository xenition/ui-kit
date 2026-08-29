/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { InputV4 } from './InputV4';

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

describe('InputV4 (web)', () => {
  it('is taller and softer than the base field, entirely from the scales', () => {
    const { q } = renderThemed(<InputV4 placeholder="Email" />);
    const el = q.getByPlaceholderText('Email');
    expect(el.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(el.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(el.className).toContain('px-md');
    expect(el.className).toContain('text-base');
  });

  it('arms the focus ring from the brand slot', () => {
    const { q } = renderThemed(<InputV4 placeholder="Email" />);
    const el = q.getByPlaceholderText('Email');
    expect(el.hasAttribute('data-xen-v4-input')).toBe(true);
    expect(el.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    expect(el.className).toContain('border-border');
  });

  it('draws the ring with box-shadow, so focus costs no layout', () => {
    renderThemed(<InputV4 placeholder="Email" />);
    const css = document.getElementById('xen-v4-input-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-input]:focus');
    expect(css).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
    // The ring is a mix of a token, never a literal colour.
    expect(css).toContain('color-mix(in srgb, var(--xen-v4-ring-color, var(--xen-ring))');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('turns the field and its ring danger when invalid', () => {
    const { q } = renderThemed(<InputV4 placeholder="Email" invalid />);
    const el = q.getByPlaceholderText('Email');
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.className).toContain('border-danger');
    expect(el.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('shows the error as border AND message — §38, help recovery', () => {
    const { q } = renderThemed(
      <InputV4 placeholder="Email" error="Enter an address like name@work.com" />
    );
    const el = q.getByPlaceholderText('Email');
    // The message implies the invalid state, so the two can never disagree.
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.className).toContain('border-danger');
    const message = q.getByRole('alert');
    expect(message.textContent).toBe('Enter an address like name@work.com');
    // The recovery copy reaches a screen reader, not just "invalid".
    expect(el.getAttribute('aria-describedby')).toBe(message.getAttribute('id'));
  });

  it('renders no message when there is nothing to say', () => {
    const { q } = renderThemed(<InputV4 placeholder="Email" invalid />);
    expect(q.queryByRole('alert')).toBeNull();
    expect(q.getByPlaceholderText('Email').getAttribute('aria-describedby')).toBeNull();
  });

  it('wires the label to the field', () => {
    const { q } = renderThemed(<InputV4 label="Work email" placeholder="Email" />);
    const el = q.getByLabelText('Work email');
    expect(el).toBe(q.getByPlaceholderText('Email'));
  });

  it('keeps a caller-supplied id', () => {
    const { q } = renderThemed(<InputV4 id="email" label="Work email" placeholder="Email" />);
    expect(q.getByPlaceholderText('Email').getAttribute('id')).toBe('email');
    expect(q.getByLabelText('Work email').getAttribute('id')).toBe('email');
  });

  it('forwards its ref to the input, not the wrapper', () => {
    let node: HTMLInputElement | null = null;
    const { q } = renderThemed(
      <InputV4
        placeholder="Email"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(q.getByPlaceholderText('Email'));
  });

  it('spends no depth on a form field — no gradient, no shadow class', () => {
    const { q } = renderThemed(<InputV4 placeholder="Email" />);
    const el = q.getByPlaceholderText('Email');
    expect(el.className).not.toMatch(/shadow|gradient/);
    expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('injects the ring sheet once', () => {
    renderThemed(<InputV4 placeholder="One" />);
    renderThemed(<InputV4 placeholder="Two" />);
    expect(document.querySelectorAll('#xen-v4-input-styles')).toHaveLength(1);
  });
});

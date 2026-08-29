/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { SwitchV4 } from './SwitchV4';
import { FIELD_MOTION } from './internal/field-v4';
import { EASE_ENTER, transitionCss } from './internal/v4-motion';

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

describe('SwitchV4 (web)', () => {
  it('is a switch to the accessibility tree, and says which way it is thrown', () => {
    const { q } = renderThemed(<SwitchV4 aria-label="Email alerts" checked />);
    const el = q.getByRole('switch', { name: 'Email alerts' });
    expect(el.getAttribute('aria-checked')).toBe('true');
    expect(el.getAttribute('type')).toBe('button');
  });

  it('takes its pill from its own height, so a sharp seed keeps a round switch', () => {
    const { q } = renderThemed(<SwitchV4 aria-label="Email alerts" />);
    const el = q.getByRole('switch');
    expect(el.className).toContain('h-[calc(var(--xen-space-lg)_+_var(--xen-space-xs))]');
    expect(el.className).toContain('w-[var(--xen-space-2xl)]');
    expect(el.className).toContain(
      'rounded-[calc((var(--xen-space-lg)_+_var(--xen-space-xs))_/_2)]'
    );
    // Never `--xen-radius-full`, which a `sharp` seed compiles to zero.
    expect(el.className).not.toContain('--xen-radius-full');
  });

  it('rests on the semantic border, not a ramp step that inverts in dark', () => {
    const { q } = renderThemed(<SwitchV4 aria-label="Email alerts" />);
    expect(q.getByRole('switch').className).toContain('bg-border');
    expect(q.getByRole('switch').className).not.toMatch(/bg-neutral-\d/);
  });

  it('throws the knob and fades the track up, both from tokens', () => {
    renderThemed(<SwitchV4 aria-label="Email alerts" />);
    const css = sheet('xen-v4-switch-styles');
    expect(css).toContain(
      'translateX(calc(var(--xen-space-2xl) - var(--xen-space-lg) - var(--xen-space-xs)))'
    );
    expect(css).toContain('background-color: var(--xen-primary)');
    expect(css).toContain(`transition: ${transitionCss(['transform'], FIELD_MOTION, EASE_ENTER)}`);
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('raises the knob on the compiled elevation token, so a flat seed flattens it', () => {
    renderThemed(<SwitchV4 aria-label="Email alerts" />);
    expect(sheet('xen-v4-switch-styles')).toContain('box-shadow: var(--xen-elevation-card)');
  });

  it('arms the shared V4 focus ring', () => {
    const { q } = renderThemed(<SwitchV4 aria-label="Email alerts" />);
    expect(q.getByRole('switch').hasAttribute('data-xen-v4-field')).toBe(true);
    expect(sheet('xen-v4-field-styles')).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
  });

  it('reports the requested state, preferring the original spelling', () => {
    const onCheckedChange = jest.fn();
    const onChange = jest.fn();
    const { q } = renderThemed(
      <SwitchV4
        aria-label="Email alerts"
        checked
        onCheckedChange={onCheckedChange}
        onChange={onChange}
      />
    );
    fireEvent.click(q.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('falls back to the canonical onChange when it is the only one given', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<SwitchV4 aria-label="Email alerts" onChange={onChange} />);
    fireEvent.click(q.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('forwards its ref to the button', () => {
    let node: HTMLButtonElement | null = null;
    const { q } = renderThemed(
      <SwitchV4
        aria-label="Email alerts"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(q.getByRole('switch'));
  });
});

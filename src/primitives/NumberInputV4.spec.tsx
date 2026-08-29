/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { NumberInputV4 } from './NumberInputV4';
import { stateCss } from './internal/v4-state';

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

describe('NumberInputV4 (web)', () => {
  it('gives each stepper a square target at the control height', () => {
    const { q } = renderThemed(<NumberInputV4 value={3} onChange={() => {}} />);
    for (const label of ['Decrease', 'Increase']) {
      const button = q.getByLabelText(label);
      expect(button.className).toContain('h-[var(--xen-space-2xl)]');
      expect(button.className).toContain('w-[var(--xen-space-2xl)]');
    }
  });

  it('keeps the value from shuffling the steppers as it grows', () => {
    const { q } = renderThemed(<NumberInputV4 value={3} onChange={() => {}} />);
    const field = q.getByRole('spinbutton');
    expect(field.className).toContain('tabular-nums');
    expect(field.className).toContain('text-center');
    expect(field.className).toContain('w-[var(--xen-space-2xl)]');
  });

  it('turns off the browser spinners, so there is only one pair of steppers', () => {
    renderThemed(<NumberInputV4 value={3} onChange={() => {}} />);
    const css = sheet('xen-v4-number-styles');
    expect(css).toContain('::-webkit-inner-spin-button');
    expect(css).toContain('-moz-appearance: textfield');
  });

  it('rings the whole control on focus-within, not the box inside it', () => {
    const { q } = renderThemed(<NumberInputV4 value={3} onChange={() => {}} />);
    const shell = q.getByRole('spinbutton').parentElement!;
    expect(shell.hasAttribute('data-xen-v4-shell')).toBe(true);
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    expect(sheet('xen-v4-field-styles')).toContain('[data-xen-v4-shell]:focus-within');
  });

  it('steps and clamps to the bounds', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(
      <NumberInputV4 value={9} min={0} max={10} step={5} onChange={onChange} />
    );
    fireEvent.click(q.getByLabelText('Increase'));
    expect(onChange).toHaveBeenCalledWith(10);
    onChange.mockClear();
    fireEvent.click(q.getByLabelText('Decrease'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('disables a stepper at its limit rather than only dimming it', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(
      <NumberInputV4 value={10} min={0} max={10} onChange={onChange} />
    );
    const up = q.getByLabelText('Increase') as HTMLButtonElement;
    expect(up.disabled).toBe(true);
    expect(up.className).toContain('disabled:opacity-[0.38]');
    fireEvent.click(up);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('hovers a stepper with a token mix, never a ramp step', () => {
    renderThemed(<NumberInputV4 value={3} onChange={() => {}} />);
    const css = sheet('xen-v4-number-styles');
    expect(css).toContain(stateCss('var(--xen-on-surface)', 'var(--xen-surface)', 'hover'));
    expect(css).not.toMatch(/neutral-\d|#[0-9a-fA-F]{3,8}\b/);
  });

  it('spends no depth on a form control', () => {
    const { q } = renderThemed(<NumberInputV4 value={3} onChange={() => {}} />);
    const shell = q.getByRole('spinbutton').parentElement!;
    expect(shell.className).not.toMatch(/shadow|gradient|backdrop/);
  });
});

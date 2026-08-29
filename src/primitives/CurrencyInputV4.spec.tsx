/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CurrencyInputV4 } from './CurrencyInputV4';

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

describe('CurrencyInputV4 (web)', () => {
  it('is a field like the others, on the shared V4 metrics', () => {
    const { q } = renderThemed(<CurrencyInputV4 />);
    const shell = q.getByLabelText('Amount').parentElement!;
    expect(shell.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(shell.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(shell.className).toContain('px-md');
  });

  it('sets the amount in tabular figures so a column lines up', () => {
    const { q } = renderThemed(<CurrencyInputV4 />);
    const input = q.getByLabelText('Amount');
    expect(input.className).toContain('tabular-nums');
    expect(input.className).toContain('text-right');
  });

  it('rings the whole field — symbol included — on focus-within', () => {
    const { q } = renderThemed(<CurrencyInputV4 />);
    const shell = q.getByLabelText('Amount').parentElement!;
    expect(shell.hasAttribute('data-xen-v4-shell')).toBe(true);
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    const css = document.getElementById('xen-v4-field-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-shell]:focus-within');
    expect(css).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
  });

  it('keeps the currency as context and the number as content', () => {
    const { q } = renderThemed(<CurrencyInputV4 symbol="£" />);
    expect(q.getByText('£').className).toContain('text-muted');
    expect(q.getByLabelText('Amount').className).toContain('text-on-surface');
  });

  it('turns the border and the ring danger from one flag', () => {
    const { q } = renderThemed(<CurrencyInputV4 invalid />);
    const shell = q.getByLabelText('Amount').parentElement!;
    expect(q.getByLabelText('Amount').getAttribute('aria-invalid')).toBe('true');
    expect(shell.className).toContain('border-danger');
    expect(shell.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('reports the parsed number, and null when it is cleared', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<CurrencyInputV4 onChange={onChange} />);
    const input = q.getByLabelText('Amount');
    fireEvent.change(input, { target: { value: '12.50' } });
    expect(onChange).toHaveBeenCalledWith(12.5);
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('keeps the base parsing contract: one point, capped to precision', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<CurrencyInputV4 precision={2} onChange={onChange} />);
    const input = q.getByLabelText('Amount');
    fireEvent.change(input, { target: { value: '1.2.345x' } });
    expect((input as HTMLInputElement).value).toBe('1.23');
  });

  it('spends no depth on an amount', () => {
    const { q } = renderThemed(<CurrencyInputV4 />);
    const shell = q.getByLabelText('Amount').parentElement!;
    expect(shell.className).not.toMatch(/shadow|gradient|backdrop/);
    expect(shell.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});

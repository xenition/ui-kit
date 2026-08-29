/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ComboboxV4 } from './ComboboxV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const OPTIONS = [
  { label: 'Amsterdam', value: 'ams' },
  { label: 'Rotterdam', value: 'rtm' },
  { label: 'Utrecht', value: 'utc' },
];

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const css = (): string => document.getElementById('xen-v4-picker-styles')?.textContent ?? '';
const noop = (): void => undefined;

describe('ComboboxV4 (web)', () => {
  it('wears InputV4 s field treatment', () => {
    const { container } = renderThemed(<ComboboxV4 options={OPTIONS} value="" onChange={noop} />);
    const field = container.querySelector('[data-xen-v4-field]');
    expect(field?.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(field?.className).toContain('rounded-[var(--xen-radius-md)]');
  });

  it('gives every option row the tap-target floor', () => {
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="" onChange={noop} />);
    fireEvent.focus(q.getByRole('combobox'));
    expect(q.getAllByRole('option')[0]!.className).toContain('min-h-[var(--xen-space-2xl)]');
  });

  it('marks the selected option with primary-text and a tick, never bare primary', () => {
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="rtm" onChange={noop} />);
    fireEvent.focus(q.getByRole('combobox'));
    const row = q.getAllByRole('option')[1]!;
    expect(row.getAttribute('aria-selected')).toBe('true');
    expect(row.className).toContain('text-primary-text');
    // The exact class, not a prefix: `text-primary-text` legitimately contains
    // `text-primary`, and it is the slot the compiler derives to read ON a
    // surface. Bare `text-primary` only promises contrast against `on-primary`.
    expect(row.className.split(' ')).not.toContain('text-primary');
    expect(row.textContent).toContain('✓');
  });

  it('arrows through the list and takes the active row on Enter', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="" onChange={onChange} />);
    const input = q.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('rtm');
    expect(q.queryByRole('listbox')).toBeNull();
  });

  it('opens on the first arrow when closed', () => {
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="" onChange={noop} />);
    const input = q.getByRole('combobox');
    expect(input.getAttribute('aria-expanded')).toBe('false');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes on Escape', () => {
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="" onChange={noop} />);
    const input = q.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(q.queryByRole('listbox')).toBeNull();
  });

  it('points aria-activedescendant at the live row', () => {
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="" onChange={noop} />);
    const input = q.getByRole('combobox');
    fireEvent.focus(input);
    expect(q.getAllByRole('option')[0]!.id).toBe(input.getAttribute('aria-activedescendant'));
  });

  it('filters as you type and quotes the query when nothing matches', () => {
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="" onChange={noop} />);
    const input = q.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'dam' } });
    expect(q.getAllByRole('option').length).toBe(2);
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(q.getByRole('status').textContent).toBe('No matches for “zzz”');
  });

  it('shows the selected label when closed and the query when open', () => {
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="utc" onChange={noop} />);
    const input = q.getByRole('combobox') as HTMLInputElement;
    expect(input.value).toBe('Utrecht');
    fireEvent.focus(input);
    expect(input.value).toBe('');
  });

  it('hovers from a color-mix, never the light-oriented neutral ramp', () => {
    const { q } = renderThemed(<ComboboxV4 options={OPTIONS} value="" onChange={noop} />);
    fireEvent.focus(q.getByRole('combobox'));
    expect(q.getAllByRole('option')[0]!.hasAttribute('data-xen-v4-hover')).toBe(true);
    expect(q.getAllByRole('option')[0]!.className).not.toContain('neutral-100');
    expect(css()).toContain('color-mix(in srgb, var(--xen-on-surface) 7%, var(--xen-surface))');
  });

  it('floats the panel and asks for glass rather than assuming it', () => {
    const { q, container } = renderThemed(
      <ComboboxV4 options={OPTIONS} value="" onChange={noop} />
    );
    fireEvent.focus(q.getByRole('combobox'));
    expect(container.querySelector('[data-xen-v4-pop]')?.hasAttribute('data-glass')).toBe(false);
  });

  it('paints no literal colour', () => {
    const { container, q } = renderThemed(
      <ComboboxV4 options={OPTIONS} value="rtm" onChange={noop} />
    );
    fireEvent.focus(q.getByRole('combobox'));
    expect(container.querySelector('[data-xen-v4-pop]')?.outerHTML).not.toMatch(
      /#[0-9a-fA-F]{3,8}\b/
    );
  });
});

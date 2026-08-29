/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { AutoCompleteV4 } from './AutoCompleteV4';

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

describe('AutoCompleteV4 (web)', () => {
  it('wears InputV4 s field treatment', () => {
    const { container } = renderThemed(<AutoCompleteV4 options={OPTIONS} />);
    const field = container.querySelector('[data-xen-v4-field]');
    expect(field?.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(field?.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(css()).toContain('[data-xen-v4-field]:focus-within');
  });

  it('gives every suggestion row the tap-target floor', () => {
    const { q } = renderThemed(<AutoCompleteV4 options={OPTIONS} value="dam" />);
    fireEvent.focus(q.getByRole('combobox'));
    const rows = q.getAllByRole('option');
    expect(rows[0]!.className).toContain('min-h-[var(--xen-space-2xl)]');
  });

  it('marks the matched substring so the eye can confirm a row', () => {
    const { q } = renderThemed(<AutoCompleteV4 options={OPTIONS} value="dam" />);
    fireEvent.focus(q.getByRole('combobox'));
    const strong = q.getAllByRole('option')[0]!.querySelector('strong');
    expect(strong?.textContent).toBe('dam');
  });

  it('says when nothing matches instead of vanishing', () => {
    const { q } = renderThemed(<AutoCompleteV4 options={OPTIONS} value="zzz" />);
    fireEvent.focus(q.getByRole('combobox'));
    expect(q.getByRole('status').textContent).toBe('No matches for “zzz”');
  });

  it('stays closed until there is something to say', () => {
    const { q } = renderThemed(<AutoCompleteV4 options={OPTIONS} />);
    fireEvent.focus(q.getByRole('combobox'));
    expect(q.queryByRole('listbox')).toBeNull();
    expect(q.getByRole('combobox').getAttribute('aria-expanded')).toBe('false');
  });

  it('arrows through the list and takes the active row on Enter', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();
    const { q } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="dam" onChange={onChange} onSelect={onSelect} />
    );
    const input = q.getByRole('combobox');
    fireEvent.focus(input);
    // Two matches: Amsterdam, Rotterdam. The first is active to begin with.
    expect(q.getAllByRole('option')[0]!.getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(q.getAllByRole('option')[1]!.getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('Rotterdam');
    expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
  });

  it('wraps at both ends and closes on Escape', () => {
    const { q } = renderThemed(<AutoCompleteV4 options={OPTIONS} value="dam" />);
    const input = q.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(q.getAllByRole('option')[1]!.getAttribute('aria-selected')).toBe('true');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(q.queryByRole('listbox')).toBeNull();
  });

  it('points aria-activedescendant at the live row', () => {
    const { q } = renderThemed(<AutoCompleteV4 options={OPTIONS} value="dam" />);
    const input = q.getByRole('combobox');
    fireEvent.focus(input);
    const activeId = input.getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    expect(q.getAllByRole('option')[0]!.id).toBe(activeId);
  });

  it('gives the keyboard row the same wash the pointer gets', () => {
    const { q } = renderThemed(<AutoCompleteV4 options={OPTIONS} value="dam" />);
    fireEvent.focus(q.getByRole('combobox'));
    expect(q.getAllByRole('option')[0]!.getAttribute('data-xen-v4-active')).toBe('true');
    expect(css()).toContain('[data-xen-v4-active="true"]');
    expect(css()).toContain('color-mix(in srgb, var(--xen-on-surface) 7%, var(--xen-surface))');
  });

  it('chooses on mousedown, before blur can close the list', () => {
    const onSelect = jest.fn();
    const { q } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="dam" onSelect={onSelect} />
    );
    fireEvent.focus(q.getByRole('combobox'));
    fireEvent.mouseDown(q.getAllByRole('option')[1]!);
    expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
  });

  it('caps the list at maxResults', () => {
    const { q } = renderThemed(<AutoCompleteV4 options={OPTIONS} value="t" maxResults={1} />);
    fireEvent.focus(q.getByRole('combobox'));
    expect(q.getAllByRole('option').length).toBe(1);
  });

  it('floats the panel and asks for glass rather than assuming it', () => {
    const { q, container } = renderThemed(<AutoCompleteV4 options={OPTIONS} value="dam" />);
    fireEvent.focus(q.getByRole('combobox'));
    const pop = container.querySelector('[data-xen-v4-pop]');
    expect(pop?.getAttribute('data-xen-v4-pop')).toBe('card');
    expect(pop?.hasAttribute('data-glass')).toBe(false);
  });

  it('turns the field danger when invalid', () => {
    const { container, q } = renderThemed(<AutoCompleteV4 options={OPTIONS} invalid />);
    expect(container.querySelector('[data-xen-v4-field]')?.getAttribute('data-xen-v4-field')).toBe(
      'invalid'
    );
    expect(q.getByRole('combobox').getAttribute('aria-invalid')).toBe('true');
  });
});

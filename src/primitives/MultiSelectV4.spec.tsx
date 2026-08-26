/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { MultiSelectV4 } from './MultiSelectV4';
import { stateCss } from './internal/v4-state';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const OPTIONS = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'eng' },
];

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const sheet = (id: string): string => document.getElementById(id)?.textContent ?? '';

describe('MultiSelectV4 (web)', () => {
  it('makes the trigger a field, on the shared V4 metrics', () => {
    const { q } = renderThemed(<MultiSelectV4 options={OPTIONS} accessibilityLabel="Teams" />);
    const trigger = q.getByLabelText('Teams');
    expect(trigger.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(trigger.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(trigger.className).toContain('px-md');
    expect(trigger.hasAttribute('data-xen-v4-field')).toBe(true);
    expect(trigger.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
  });

  it('tints chips with the brand instead of spending the accent on every one', () => {
    const { q } = renderThemed(
      <MultiSelectV4 options={OPTIONS} value={['design']} accessibilityLabel="Teams" />
    );
    const chip = q.getByText('Design');
    expect(chip.hasAttribute('data-xen-v4-chip')).toBe(true);
    expect(chip.className).not.toContain('bg-accent');
    const css = sheet('xen-v4-multiselect-styles');
    expect(css).toContain(
      'background-color: color-mix(in srgb, var(--xen-primary) 14%, var(--xen-surface))'
    );
    expect(css).toContain('color: var(--xen-primary-text)');
  });

  it('keeps chips square when the seed asked for square', () => {
    const { q } = renderThemed(
      <MultiSelectV4 options={OPTIONS} value={['design']} accessibilityLabel="Teams" />
    );
    const chip = q.getByText('Design');
    expect(chip.className).toContain('rounded-[var(--xen-radius-sm)]');
    expect(chip.className).not.toContain('--xen-radius-full');
  });

  it('raises the popover on the compiled elevation, not a Tailwind shadow', () => {
    const { q } = renderThemed(<MultiSelectV4 options={OPTIONS} accessibilityLabel="Teams" />);
    fireEvent.click(q.getByLabelText('Teams'));
    const list = q.getByRole('listbox');
    expect(list.className).not.toMatch(/shadow-/);
    expect(sheet('xen-v4-multiselect-styles')).toContain('box-shadow: var(--xen-elevation-sheet)');
  });

  it('hovers a row with a token mix, not a ramp step that inverts in dark', () => {
    renderThemed(<MultiSelectV4 options={OPTIONS} accessibilityLabel="Teams" />);
    const css = sheet('xen-v4-multiselect-styles');
    expect(css).toContain('[data-xen-v4-option]:hover');
    expect(css).toContain(stateCss('var(--xen-on-surface)', 'var(--xen-surface)', 'hover'));
    expect(css).not.toMatch(/neutral-\d/);
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('toggles a value in and out, reporting the whole next selection', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(
      <MultiSelectV4
        options={OPTIONS}
        value={['design']}
        onChange={onChange}
        accessibilityLabel="Teams"
      />
    );
    fireEvent.click(q.getByLabelText('Teams'));
    fireEvent.click(q.getByRole('option', { name: /Engineering/ }));
    expect(onChange).toHaveBeenCalledWith(['design', 'eng']);

    onChange.mockClear();
    fireEvent.click(q.getByRole('option', { name: /Design/ }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('marks the chosen rows as well as tinting them', () => {
    const { q } = renderThemed(
      <MultiSelectV4 options={OPTIONS} value={['design']} accessibilityLabel="Teams" />
    );
    fireEvent.click(q.getByLabelText('Teams'));
    const chosen = q.getByRole('option', { name: /Design/ });
    expect(chosen.getAttribute('aria-selected')).toBe('true');
    expect(chosen.textContent).toContain('✓');
  });

  it('turns the border and the ring danger from one flag', () => {
    const { q } = renderThemed(
      <MultiSelectV4 options={OPTIONS} invalid accessibilityLabel="Teams" />
    );
    const trigger = q.getByLabelText('Teams');
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
    expect(trigger.className).toContain('border-danger');
    expect(trigger.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });
});

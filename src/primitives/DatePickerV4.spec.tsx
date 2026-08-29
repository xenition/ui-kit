/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { DatePickerV4 } from './DatePickerV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement, theme: ThemeSeed = SEED) {
  const result = render(<XenitionUIProvider theme={theme}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const LABEL = (d: string): string =>
  new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${d}T12:00:00`));

const noop = (): void => undefined;

describe('DatePickerV4 (web)', () => {
  it('wears InputV4 s field treatment, so it belongs in a form', () => {
    const { q } = renderThemed(<DatePickerV4 value="2024-03-15" onChange={noop} />);
    const trigger = q.getByRole('button', { expanded: false });
    expect(trigger.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(trigger.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(trigger.hasAttribute('data-xen-v4-field')).toBe(true);
    expect(trigger.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
  });

  it('rings the field while its own popover is open', () => {
    const { q } = renderThemed(<DatePickerV4 value="2024-03-15" onChange={noop} />);
    const trigger = q.getByRole('button', { expanded: false });
    expect(trigger.hasAttribute('data-open')).toBe(false);
    fireEvent.click(trigger);
    expect(trigger.getAttribute('data-open')).toBe('true');
    const css = document.getElementById('xen-v4-picker-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-field][data-open="true"]');
    expect(css).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
  });

  it('draws a real month grid rather than deferring to the browser', () => {
    const { q } = renderThemed(<DatePickerV4 value="2024-03-15" onChange={noop} />);
    expect(q.queryByDisplayValue('2024-03-15')).toBeNull();
    fireEvent.click(q.getByRole('button', { expanded: false }));
    expect(q.getByRole('grid')).toBeTruthy();
    // Six rows always, so paging the month never changes the panel's height.
    expect(q.getAllByRole('row').length).toBe(7);
  });

  it('gives every day the tap-target floor', () => {
    const { q } = renderThemed(<DatePickerV4 value="2024-03-15" onChange={noop} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    const cell = q.getByLabelText(LABEL('2024-03-14'));
    expect(cell.className).toContain('h-[var(--xen-space-2xl)]');
    expect(cell.className).toContain('w-[var(--xen-space-2xl)]');
  });

  it('fills the selected day with the contrast-checked brand pair', () => {
    const { q } = renderThemed(<DatePickerV4 value="2024-03-15" onChange={noop} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    const cell = q.getByLabelText(LABEL('2024-03-15'));
    expect(cell.getAttribute('aria-pressed')).toBe('true');
    expect(cell.querySelector('span')?.className).toContain('bg-primary');
    expect(cell.querySelector('span')?.className).toContain('text-on-primary');
    // Never a ramp step: those keep the light orientation in both schemes.
    expect(cell.querySelector('span')?.className).not.toContain('primary-50');
  });

  it('blocks a day outside min/max instead of merely fading it', () => {
    const { q } = renderThemed(
      <DatePickerV4 value="2024-03-15" onChange={noop} min="2024-03-10" max="2024-03-20" />
    );
    fireEvent.click(q.getByRole('button', { expanded: false }));
    const blocked = q.getByLabelText(LABEL('2024-03-05')) as HTMLButtonElement;
    expect(blocked.disabled).toBe(true);
    expect(blocked.querySelector('span')?.className).toContain('text-muted');
  });

  it('reports the picked day as a civil YYYY-MM-DD and closes', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<DatePickerV4 value="2024-03-15" onChange={onChange} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    fireEvent.click(q.getByLabelText(LABEL('2024-03-21')));
    expect(onChange).toHaveBeenCalledWith('2024-03-21');
    expect(q.queryByRole('grid')).toBeNull();
  });

  it('turns field and ring danger when invalid', () => {
    const { q } = renderThemed(<DatePickerV4 value="" onChange={noop} invalid />);
    const trigger = q.getByRole('button', { expanded: false });
    expect(trigger.getAttribute('data-xen-v4-field')).toBe('invalid');
    expect(trigger.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('asks for glass rather than assuming it, and drops motion on request', () => {
    const { q, container } = renderThemed(
      <DatePickerV4 value="2024-03-15" onChange={noop} />,
      { ...SEED, depth: 'glass' }
    );
    fireEvent.click(q.getByRole('button', { expanded: false }));
    expect(container.querySelector('[data-xen-v4-pop]')?.getAttribute('data-glass')).toBe('true');
    const css = document.getElementById('xen-v4-picker-styles')?.textContent ?? '';
    expect(css).toContain('prefers-reduced-motion');
  });
});

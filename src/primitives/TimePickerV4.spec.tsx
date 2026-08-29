/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { TimePickerV4 } from './TimePickerV4';

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

const TIME = { h: 9, m: 30 };

describe('TimePickerV4 (web)', () => {
  it('wears InputV4 s field treatment, so it belongs in a form', () => {
    const { q } = renderThemed(<TimePickerV4 value={TIME} />);
    const trigger = q.getByRole('button', { expanded: false });
    expect(trigger.className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(trigger.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(trigger.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
  });

  it('rings the field while its own popover is open', () => {
    const { q } = renderThemed(<TimePickerV4 value={TIME} />);
    const trigger = q.getByRole('button', { expanded: false });
    fireEvent.click(trigger);
    expect(trigger.getAttribute('data-open')).toBe('true');
  });

  it('gives every hour and minute row the tap-target floor', () => {
    const { q } = renderThemed(<TimePickerV4 value={TIME} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    for (const label of ['Hour 14', 'Min 45']) {
      expect(q.getByLabelText(label).className).toContain('h-[var(--xen-space-2xl)]');
    }
  });

  it('fills the active hour and minute with the contrast-checked pair', () => {
    const { q } = renderThemed(<TimePickerV4 value={TIME} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    for (const label of ['Hour 9', 'Min 30']) {
      const row = q.getByLabelText(label);
      expect(row.getAttribute('aria-pressed')).toBe('true');
      expect(row.className).toContain('bg-primary');
      expect(row.className).toContain('text-on-primary');
    }
  });

  it('hovers with a color-mix, never the light-oriented neutral ramp', () => {
    const { q } = renderThemed(<TimePickerV4 value={TIME} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    expect(q.getByLabelText('Hour 14').hasAttribute('data-xen-v4-hover')).toBe(true);
    expect(q.getByLabelText('Hour 14').className).not.toContain('neutral-100');
  });

  it('honours minuteStep', () => {
    const { q } = renderThemed(<TimePickerV4 value={TIME} minuteStep={15} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    expect(q.getByLabelText('Min 45')).toBeTruthy();
    expect(q.queryByLabelText('Min 20')).toBeNull();
  });

  it('reports each column independently', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<TimePickerV4 value={TIME} onChange={onChange} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    fireEvent.click(q.getByLabelText('Hour 14'));
    expect(onChange).toHaveBeenLastCalledWith({ h: 14, m: 30 });
    fireEvent.click(q.getByLabelText('Min 45'));
    expect(onChange).toHaveBeenLastCalledWith({ h: 9, m: 45 });
  });

  it('gives Done the primary pair at the tap-target height', () => {
    const { q } = renderThemed(<TimePickerV4 value={TIME} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    const done = q.getByLabelText('Done');
    expect(done.className).toContain('bg-primary');
    expect(done.className).toContain('h-[var(--xen-space-2xl)]');
  });

  it('turns field and ring danger when invalid', () => {
    const { q } = renderThemed(<TimePickerV4 invalid />);
    const trigger = q.getByRole('button', { expanded: false });
    expect(trigger.getAttribute('data-xen-v4-field')).toBe('invalid');
    expect(trigger.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
  });

  it('floats the popover and asks for glass rather than assuming it', () => {
    const { q, container } = renderThemed(<TimePickerV4 value={TIME} />);
    fireEvent.click(q.getByRole('button', { expanded: false }));
    const pop = container.querySelector('[data-xen-v4-pop]');
    expect(pop?.hasAttribute('data-glass')).toBe(false);

    const glassy = renderThemed(<TimePickerV4 value={TIME} />, { ...SEED, depth: 'glass' });
    fireEvent.click(glassy.q.getByRole('button', { expanded: false }));
    expect(
      glassy.container.querySelector('[data-xen-v4-pop]')?.getAttribute('data-glass')
    ).toBe('true');
  });
});

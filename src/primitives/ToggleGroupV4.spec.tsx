/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import type { ToggleGroup, ToggleGroupOption } from './ToggleGroup';
import { ToggleGroupV4 } from './ToggleGroupV4';
import { CHROME_V4_STYLE_ID } from './internal/chrome-v4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const OPTIONS: ToggleGroupOption[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month', disabled: true },
];

function mount(props: Partial<React.ComponentProps<typeof ToggleGroupV4>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <ToggleGroupV4
        options={OPTIONS}
        value="day"
        accessibilityLabel="Range"
        onChange={() => {}}
        {...props}
      />
    </XenitionUIProvider>
  );
}

const group = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-xen-v4-toggle-group]') as HTMLElement;
const chromeCss = (): string => document.getElementById(CHROME_V4_STYLE_ID)?.textContent ?? '';

describe('ToggleGroupV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof ToggleGroup> = {
      options: OPTIONS,
      value: 'day',
      onChange: () => {},
      multiple: false,
      disabled: false,
      accessibilityLabel: 'Range',
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof ToggleGroupV4> = same;
    expect(asV4).toBe(same);
  });

  it('stands at the shared V4 control height and radius', () => {
    const { container } = mount();
    // The single biggest quality signal a form can send is that every control
    // in it agrees. `2xl` / `radius.md` is what InputV4 shipped.
    expect(group(container).className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(group(container).className).toContain('rounded-[var(--xen-radius-md)]');
    expect(group(container).className).not.toContain('py-sm');
  });

  it('divides with a full-bleed hairline, not a border on each cell', () => {
    const { container } = mount();
    // A border on the cell stops at the cell's box, so a filled/unfilled pair
    // reads as a step rather than a seam.
    expect(container.querySelectorAll('span[aria-hidden="true"].w-px')).toHaveLength(2);
    for (const b of Array.from(container.querySelectorAll('button'))) {
      expect(b.className).not.toContain('border-l');
    }
  });

  it('colours only the selected cell, in the compiler’s paired ink', () => {
    const { getByText } = mount();
    const day = getByText('Day');
    expect(day.className).toContain('bg-primary');
    expect(day.className).toContain('text-on-primary');
    expect(day.getAttribute('aria-checked')).toBe('true');

    const week = getByText('Week');
    expect(week.className).toContain('bg-surface');
    expect(week.className).toContain('text-on-surface');
    expect(week.getAttribute('aria-checked')).toBe('false');
  });

  it('layers each cell over ITS OWN ground, selected included', () => {
    const { getByText } = mount();
    expect(getByText('Day').getAttribute('data-xen-v4-chrome')).toBe('filled-primary');
    expect(getByText('Week').getAttribute('data-xen-v4-chrome')).toBe('on-surface');
    // The base's `hover:bg-neutral-100` is a light-oriented ramp step, and it
    // skipped the selected cell entirely.
    expect(getByText('Week').className).not.toContain('neutral-100');
    const css = chromeCss();
    expect(css).toContain('var(--xen-on-primary) 8%, var(--xen-primary)');
    expect(css).toContain('var(--xen-on-surface) 8%, var(--xen-surface)');
    expect(css).toContain('outline: 2px solid var(--xen-ring);');
  });

  it('announces exclusivity only when the choices ARE exclusive', () => {
    expect(group(mount().container).getAttribute('role')).toBe('radiogroup');
    // The base said `group` in both modes on the web and `radiogroup` in both
    // on native, so one of the two always lied about what the control does.
    expect(group(mount({ multiple: true, value: [] }).container).getAttribute('role')).toBe(
      'group'
    );
  });

  it('toggles in single mode, and deselects on a second press', () => {
    const onChange = jest.fn();
    const { getByText } = mount({ onChange });
    fireEvent.click(getByText('Week'));
    expect(onChange).toHaveBeenLastCalledWith('week');
    fireEvent.click(getByText('Day'));
    expect(onChange).toHaveBeenLastCalledWith('');
  });

  it('accumulates in multiple mode', () => {
    const onChange = jest.fn();
    const { getByText } = mount({ multiple: true, value: ['day'], onChange });
    fireEvent.click(getByText('Week'));
    expect(onChange).toHaveBeenLastCalledWith(['day', 'week']);
    fireEvent.click(getByText('Day'));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('blocks a disabled option', () => {
    const onChange = jest.fn();
    const { getByText } = mount({ onChange });
    expect((getByText('Month') as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(getByText('Month'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('blocks a disabled group, and dims at M3’s 0.38 rather than a picked 0.5', () => {
    const onChange = jest.fn();
    const { container, getByText } = mount({ disabled: true, onChange });
    expect(group(container).getAttribute('aria-disabled')).toBe('true');
    expect((getByText('Week') as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(getByText('Week'));
    expect(onChange).not.toHaveBeenCalled();
    expect(chromeCss()).toContain('opacity: 0.38;');
  });

  it('survives its empty state: no options at all', () => {
    const { container } = mount({ options: [] });
    expect(container.querySelectorAll('button')).toHaveLength(0);
    expect(container.querySelector('[data-xen-v4-toggle-group]')).not.toBeNull();
  });

  it('introduces no literal colours', () => {
    const { container } = mount();
    expect(chromeCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    for (const el of Array.from(container.querySelectorAll('*'))) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});

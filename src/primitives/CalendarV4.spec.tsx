/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CalendarV4 } from './CalendarV4';

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

const MARCH = new Date(2024, 2, 15);

describe('CalendarV4 (web)', () => {
  it('gives every day cell a target off the spacing scale, not a 32px pill', () => {
    const { q } = renderThemed(<CalendarV4 month={MARCH} />);
    const cell = q.getByLabelText('March 14, 2024');
    const gridcell = cell.parentElement;
    expect(gridcell?.className).toContain('h-[var(--xen-space-2xl)]');
    // The visible disc is smaller than the target it sits in.
    const disc = cell.querySelector('span');
    expect(disc?.className).toContain('h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
  });

  it('gives the month chevrons the same target as a day', () => {
    const { q } = renderThemed(<CalendarV4 month={MARCH} />);
    for (const label of ['Previous month', 'Next month']) {
      const btn = q.getByLabelText(label);
      expect(btn.className).toContain('h-[var(--xen-space-2xl)]');
      expect(btn.className).toContain('w-[var(--xen-space-2xl)]');
    }
  });

  it('fills the selected day with the contrast-checked brand pair', () => {
    const { q } = renderThemed(<CalendarV4 month={MARCH} selected={MARCH} />);
    const cell = q.getByLabelText('March 15, 2024');
    expect(cell.getAttribute('aria-pressed')).toBe('true');
    expect(cell.querySelector('span')?.className).toContain('bg-primary');
    expect(cell.querySelector('span')?.className).toContain('text-on-primary');
  });

  it('rings today in primary so it cannot be mistaken for a cell edge', () => {
    const today = new Date();
    const label = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(today);
    const { q } = renderThemed(<CalendarV4 month={today} />);
    const cell = q.getByLabelText(label);
    expect(cell.getAttribute('aria-current')).toBe('date');
    expect(cell.querySelector('span')?.className).toContain('border-primary');
    expect(cell.querySelector('span')?.className).not.toContain('border-border');
  });

  it('hovers with a color-mix, never the light-oriented neutral ramp', () => {
    renderThemed(<CalendarV4 month={MARCH} />);
    const css = document.getElementById('xen-v4-picker-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-hover]:hover');
    expect(css).toContain('color-mix(in srgb, var(--xen-on-surface) 7%, var(--xen-surface))');
    expect(css).not.toContain('neutral-100');
  });

  it('floats the panel on the card elevation and keeps its hairline', () => {
    const { container } = renderThemed(<CalendarV4 month={MARCH} />);
    const panel = container.querySelector('[data-xen-v4-pop]');
    expect(panel?.getAttribute('data-xen-v4-pop')).toBe('card');
    const css = document.getElementById('xen-v4-picker-styles')?.textContent ?? '';
    expect(css).toContain('box-shadow: var(--xen-elevation-card)');
    expect(css).toContain('border: 1px solid var(--xen-border)');
    expect(css).toContain('border-radius: var(--xen-radius-lg)');
  });

  it('asks for glass rather than assuming it', () => {
    const { container } = renderThemed(<CalendarV4 month={MARCH} />);
    expect(container.querySelector('[data-xen-v4-pop]')?.hasAttribute('data-glass')).toBe(false);

    const glassy = renderThemed(<CalendarV4 month={MARCH} />, { ...SEED, depth: 'glass' });
    expect(
      glassy.container.querySelector('[data-xen-v4-pop]')?.getAttribute('data-glass')
    ).toBe('true');
  });

  it('reports the clicked day and the paged month', () => {
    const onSelectDate = jest.fn();
    const onMonthChange = jest.fn();
    const { q } = renderThemed(
      <CalendarV4 month={MARCH} onSelectDate={onSelectDate} onMonthChange={onMonthChange} />
    );
    q.getByLabelText('March 14, 2024').click();
    expect((onSelectDate.mock.calls[0]![0] as Date).getDate()).toBe(14);
    q.getByLabelText('Next month').click();
    expect((onMonthChange.mock.calls[0]![0] as Date).getMonth()).toBe(3);
  });

  it('paints no literal colour — every value is a token reference', () => {
    const { container } = renderThemed(<CalendarV4 month={MARCH} selected={MARCH} />);
    // The provider's own <style> carries the compiled hexes; the component's
    // own markup must not.
    const panel = container.querySelector('[data-xen-v4-pop]');
    expect(panel?.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});

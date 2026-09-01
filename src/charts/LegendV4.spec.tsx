/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { LEGEND_V4_CSS, LEGEND_V4_STYLE_ID, LegendV4 } from './LegendV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container as HTMLElement;
}

const ITEMS = [{ label: 'Direct' }, { label: 'Referral' }, { label: 'Organic' }];

describe('LegendV4 (web)', () => {
  // ── the palette, not the status cycle ──────────────────────────────

  it('paints each swatch from its categorical slot, in assignment order', () => {
    const root = mount(<LegendV4 items={ITEMS} />);
    const swatches = root.querySelectorAll<HTMLElement>('[data-xen-v4-legend-swatch]');

    expect(swatches).toHaveLength(3);
    expect(swatches[0]?.style.getPropertyValue('--xen-legend-swatch')).toBe('var(--xen-chart-1)');
    expect(swatches[1]?.style.getPropertyValue('--xen-legend-swatch')).toBe('var(--xen-chart-2)');
    expect(swatches[2]?.style.getPropertyValue('--xen-legend-swatch')).toBe('var(--xen-chart-3)');
  });

  it('paints the swatch at CHART_MARK.dotSize, not a 10px literal', () => {
    const root = mount(<LegendV4 items={[{ label: 'Direct' }]} />);
    const swatch = root.querySelector<HTMLElement>('[data-xen-v4-legend-swatch]');

    expect(swatch?.style.width).toBe(`${CHART_MARK.dotSize}px`);
    expect(swatch?.style.height).toBe(`${CHART_MARK.dotSize}px`);
  });

  it('paints a status hue only for an entry that opted in with `tone`', () => {
    const root = mount(<LegendV4 items={[{ label: 'Failures', tone: 'danger' }]} />);
    const swatch = root.querySelector<HTMLElement>('[data-xen-v4-legend-swatch]');

    expect(swatch?.style.getPropertyValue('--xen-legend-swatch')).toBe('var(--xen-danger)');
  });

  it('throws past the five-slot palette rather than cycling', () => {
    const six = Array.from({ length: 6 }, (_, i) => ({ label: `Series ${i + 1}` }));
    const quiet = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => mount(<LegendV4 items={six} />)).toThrow(/never cycled/);
    quiet.mockRestore();
  });

  // ── new props ──────────────────────────────────────────────────────

  it('is not interactive by default — §7 open question 1’s proposal', () => {
    const root = mount(<LegendV4 items={ITEMS} />);

    expect(root.querySelectorAll('button')).toHaveLength(0);
    expect(root.querySelector('[data-xen-v4-legend]')?.getAttribute('role')).toBe('img');
  });

  it('becomes a group of toggles when `interactive`, each with the 44 hit area', () => {
    const root = mount(<LegendV4 items={ITEMS} interactive />);
    const buttons = root.querySelectorAll<HTMLButtonElement>('button');

    expect(buttons).toHaveLength(3);
    // Rule 10: the composed 44 from the nav line, never a new number.
    buttons.forEach((button) => expect(button.className).toContain(MIN_TAP_CLASS));
    // A group, not an `img` — buttons inside `role="img"` are unreachable.
    expect(root.querySelector('[data-xen-v4-legend]')?.getAttribute('role')).toBe('group');
  });

  it('announces the toggled state and reports it, uncontrolled', () => {
    const onToggle = jest.fn();
    const root = mount(<LegendV4 items={ITEMS} interactive onToggle={onToggle} />);
    const first = root.querySelectorAll<HTMLButtonElement>('button')[0] as HTMLButtonElement;

    expect(first.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(first);
    expect(onToggle).toHaveBeenCalledWith(0, true);
    expect(
      root.querySelectorAll<HTMLButtonElement>('button')[0]?.getAttribute('aria-pressed')
    ).toBe('false');
  });

  it('does not move on its own when `hidden` is controlled', () => {
    const root = mount(<LegendV4 items={ITEMS} interactive hidden={[1]} />);
    const buttons = root.querySelectorAll<HTMLButtonElement>('button');

    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(buttons[0] as HTMLButtonElement);
    // Still exactly one hidden entry: the caller owns the data.
    expect(
      root.querySelectorAll<HTMLButtonElement>('button')[0]?.getAttribute('aria-pressed')
    ).toBe('true');
  });

  it('drains a hidden swatch to the chrome colour instead of fading it', () => {
    const root = mount(<LegendV4 items={ITEMS} interactive hidden={[0]} />);
    const swatch = root.querySelector<HTMLElement>('[data-xen-v4-legend-swatch]');

    expect(swatch?.style.getPropertyValue('--xen-legend-swatch')).toBe('var(--xen-chart-grid)');
    // Never the disabled-content alpha: a hidden series is not a disabled one.
    expect(swatch?.style.opacity).toBe('');
  });

  it('paints the swatch from a sheet, because jsdom drops an inline `var()`', () => {
    mount(<LegendV4 items={ITEMS} />);
    const css = document.getElementById(LEGEND_V4_STYLE_ID)?.textContent ?? '';

    expect(css).toBe(LEGEND_V4_CSS);
    expect(css).toContain('background-color: var(--xen-legend-swatch)');
  });

  it('stacks vertically when asked', () => {
    const root = mount(<LegendV4 items={ITEMS} vertical />);

    expect(root.querySelector('[data-xen-v4-legend]')?.className).toContain('flex-col');
  });

  it('never truncates a label', () => {
    const long = 'Organic search from partner referral campaigns';
    const root = mount(<LegendV4 items={[{ label: long }]} />);
    const item = root.querySelector<HTMLElement>('[data-xen-v4-legend-item]');

    expect(item?.textContent).toBe(long);
    expect(item?.className).not.toContain('truncate');
    expect(item?.className).toContain('break-words');
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state rather than nothing', () => {
    const { getByText } = render(
      <XenitionUIProvider theme={SEED}>
        <LegendV4 items={[]} />
      </XenitionUIProvider>
    );
    expect(getByText('No series')).toBeTruthy();
  });

  it('renders a single entry', () => {
    const root = mount(<LegendV4 items={[{ label: 'Direct', value: '48%' }]} />);

    expect(root.querySelectorAll('[data-xen-v4-legend-item]')).toHaveLength(1);
    expect(root.textContent).toContain('48%');
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence naming every series', () => {
    const root = mount(<LegendV4 items={ITEMS} />);

    expect(root.querySelector('[data-xen-v4-legend]')?.getAttribute('aria-label')).toBe(
      'Legend: Direct, Referral, Organic.'
    );
  });

  it('lets a caller override the derived sentence', () => {
    const root = mount(<LegendV4 items={ITEMS} aria-label="Traffic sources" />);

    expect(root.querySelector('[data-xen-v4-legend]')?.getAttribute('aria-label')).toBe(
      'Traffic sources'
    );
  });
});

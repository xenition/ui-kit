/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { CHART_V4_STYLE_ID } from './internal-v4';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import type { ThemeSeed } from '../theme/types';
import { EASE_STANDARD, V4_MOTION } from '../primitives/internal/v4-motion';
import { BAR_CHART_V4_STYLE_ID, BarChartV4 } from './BarChartV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container.querySelector('[data-xen-v4-bar-chart]') as HTMLElement;
}

/** The sheet this component injects — where every mark's paint actually lives. */
function sheet(): string {
  return document.getElementById(BAR_CHART_V4_STYLE_ID)?.textContent ?? '';
}


/** The one sheet the whole V4 charts line injects — where its motion lives. */
const chartSheet = (): string => document.getElementById(CHART_V4_STYLE_ID)?.textContent ?? '';

function bars(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll('[data-xen-v4-bar]'));
}

/** Every inline style string in the tree — the divide-by-zero net. */
function styleAttributes(root: HTMLElement): string {
  return Array.from(root.querySelectorAll('*'))
    .map((el) => el.getAttribute('style') ?? '')
    .join(' | ');
}

describe('BarChartV4 (web)', () => {
  // ── §4.1: one colour, never by value ───────────────────────────────

  it('paints every bar slot 1 — a single series is one colour', () => {
    const root = mount(<BarChartV4 data={[3, 7, 4, 9]} />);

    // The fill reaches the marks as a custom property on the root and one
    // static rule, because a `var()` in an inline background-color is dropped
    // by the CSSOM (the same hazard internal-v4 records for color-mix).
    expect(root.style.getPropertyValue('--xen-v4-mark-fill')).toBe('var(--xen-chart-1)');
    expect(sheet()).toContain('[data-xen-v4-bar] { background-color: var(--xen-v4-mark-fill); }');

    // Four bars, and not one of them carries a colour of its own — which is
    // what "never colour by value" looks like in the DOM.
    const drawn = bars(root);
    expect(drawn).toHaveLength(4);
    drawn.forEach((bar) => expect(bar.style.backgroundColor).toBe(''));
  });

  it('`tone` is the only route to a status hue, and it replaces the slot', () => {
    const root = mount(<BarChartV4 data={[3, 7]} tone="danger" />);
    // One vocabulary or the other, never both (brief §1 rule 3).
    expect(root.style.getPropertyValue('--xen-v4-mark-fill')).toBe('var(--xen-danger)');
  });

  // ── §3.3 / §4.4: chrome and mark geometry ──────────────────────────

  it('draws the axis with the chart axis token, not `--xen-muted`', () => {
    const root = mount(<BarChartV4 data={[3, 7]} />);
    expect(root.querySelector('[data-xen-v4-chart-axis]')).not.toBeNull();

    const css = sheet();
    expect(css).toContain('[data-xen-v4-chart-axis] { background-color: var(--xen-chart-axis); }');
    // The bug this pass exists to fix: a text colour doing an axis's job.
    expect(css).not.toContain('--xen-muted');
    expect(css).not.toContain('--xen-border');
  });

  it('rounds the data end only — a bar rounded at the baseline floats off it', () => {
    const root = mount(<BarChartV4 data={[3, 7]} />);
    const bar = bars(root)[0] as HTMLElement;
    expect(bar.style.borderTopLeftRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(bar.style.borderTopRightRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(bar.style.borderBottomLeftRadius).toBe('');
    expect(bar.style.borderBottomRightRadius).toBe('');
  });

  it('separates adjacent bars by `CHART_MARK.gap` of page', () => {
    const root = mount(<BarChartV4 data={[3, 7, 4]} />);
    const row = (bars(root)[0] as HTMLElement).parentElement?.parentElement as HTMLElement;
    expect(row.style.gap).toBe(`${CHART_MARK.gap}px`);
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders the title, summary and caption slots', () => {
    const { getByText } = render(
      <XenitionUIProvider theme={SEED}>
        <BarChartV4 data={[3, 7]} title="Revenue" summary="£48,210" caption="vs last month" />
      </XenitionUIProvider>
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('£48,210')).toBeTruthy();
    expect(getByText('vs last month')).toBeTruthy();
  });

  it('keeps the plot at the height it was given', () => {
    const root = mount(<BarChartV4 data={[3, 7]} height={200} />);
    const plot = root.querySelector('[data-xen-v4-chart-plot]') as HTMLElement;
    expect(plot.style.height).toBe('200px');
  });

  // ── §4.4: direct labels are the secondary encoding ─────────────────

  it('direct-labels at four bars or fewer, and stops above that', () => {
    const four = mount(<BarChartV4 data={[1, 2, 3, 4]} />);
    expect(four.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(4);

    const five = mount(<BarChartV4 data={[1, 2, 3, 4, 5]} />);
    expect(five.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(0);
  });

  it('`showValues` overrides the automatic answer in both directions', () => {
    const forced = mount(<BarChartV4 data={[1, 2, 3, 4, 5]} showValues />);
    expect(forced.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(5);

    const suppressed = mount(<BarChartV4 data={[1, 2]} showValues={false} />);
    expect(suppressed.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(0);
  });

  it('`format` spells the value everywhere it appears', () => {
    const { getByText } = render(
      <XenitionUIProvider theme={SEED}>
        <BarChartV4 data={[1200]} format={(v) => `£${v.toLocaleString('en-GB')}`} />
      </XenitionUIProvider>
    );
    expect(getByText('£1,200')).toBeTruthy();
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the footprint, never nothing', () => {
    const root = mount(<BarChartV4 data={[]} height={160} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('160px');
    expect(bars(root)).toHaveLength(0);
  });

  it('takes a custom empty label', () => {
    const root = mount(<BarChartV4 data={[]} emptyLabel="Nothing this week" />);
    expect(root.textContent).toContain('Nothing this week');
  });

  it('renders one bar for one datum and never divides by zero', () => {
    const root = mount(<BarChartV4 data={[7]} />);
    expect(bars(root)).toHaveLength(1);
    // The single-datum defect the base sources guard unevenly.
    const styles = styleAttributes(root);
    expect(styles).not.toContain('NaN');
    expect(styles).not.toContain('Infinity');
    expect((bars(root)[0] as HTMLElement).style.height).toBe('100%');
  });

  it('survives an all-zero series without an Infinity in the geometry', () => {
    const root = mount(<BarChartV4 data={[0, 0]} />);
    const styles = styleAttributes(root);
    expect(styles).not.toContain('NaN');
    expect(styles).not.toContain('Infinity');
    // A datum that exists is still visible: the hairline floor.
    expect((bars(root)[0] as HTMLElement).style.minHeight).toBe('1px');
  });

  it('holds the footprint with a skeleton while loading', () => {
    const root = mount(<BarChartV4 data={[]} loading height={140} />);
    expect(root.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(bars(root)).toHaveLength(0);
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline, the count and the range', () => {
    const root = mount(<BarChartV4 data={[3, 7, 4]} title="Revenue" />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe('Bar chart, Revenue, 3 bars, 3 to 7');
  });

  it('singularises at one datum and collapses a one-value range', () => {
    const root = mount(<BarChartV4 data={[7]} />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe('Bar chart, 1 bar, 7');
  });

  it('lets the caller override the sentence', () => {
    const root = mount(<BarChartV4 data={[3, 7]} aria-label="Revenue is up" />);
    expect(root.getAttribute('aria-label')).toBe('Revenue is up');
  });

  // ── §4.6: interaction ──────────────────────────────────────────────

  it('reveals the precise value on hover, and not when the tooltip is off', () => {
    const root = mount(<BarChartV4 data={[1, 2, 3, 4, 5]} labels={['a', 'b', 'c', 'd', 'e']} />);
    expect(root.querySelector('[data-xen-v4-chart-tooltip]')).toBeNull();

    const hit = root.querySelectorAll('[data-xen-v4-bar-hit]')[1] as HTMLElement;
    fireEvent.pointerOver(hit);
    const tip = root.querySelector('[data-xen-v4-chart-tooltip]') as HTMLElement;
    expect(tip).not.toBeNull();
    expect(tip.textContent).toContain('b: 2');

    fireEvent.pointerOut(hit);
    expect(root.querySelector('[data-xen-v4-chart-tooltip]')).toBeNull();
  });

  it('does not open a tooltip when `tooltip` is false', () => {
    const root = mount(<BarChartV4 data={[1, 2]} tooltip={false} />);
    fireEvent.pointerOver(root.querySelectorAll('[data-xen-v4-bar-hit]')[0] as HTMLElement);
    expect(root.querySelector('[data-xen-v4-chart-tooltip]')).toBeNull();
  });

  it('shapes the tooltip swatch from `indicator`', () => {
    const root = mount(<BarChartV4 data={[1, 2]} indicator="dashed" />);
    fireEvent.pointerOver(root.querySelectorAll('[data-xen-v4-bar-hit]')[0] as HTMLElement);
    const swatch = root.querySelector('[data-xen-v4-chart-indicator]') as HTMLElement;
    expect(swatch.getAttribute('data-shape')).toBe('dashed');
    expect(sheet()).toContain(`border-top: ${CHART_MARK.stroke}px dashed`);
  });

  it('reports the index and the value to `onSelect`', () => {
    const onSelect = jest.fn();
    const root = mount(<BarChartV4 data={[3, 7]} onSelect={onSelect} />);
    fireEvent.click(root.querySelectorAll('[data-xen-v4-bar-hit]')[1] as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith(1, 7);
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('reveals once by default and stays still when asked to', () => {
    const on = mount(<BarChartV4 data={[3, 7]} />);
    expect(
      (on.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBe('true');

    const off = mount(<BarChartV4 data={[3, 7]} animate={false} />);
    expect(
      (off.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBeNull();
  });

  // ── §36: the readout arrives, it does not blink ────────────────────

  it('fades its hover readout in, from the line’s one shared rule', () => {
    const root = mount(<BarChartV4 data={[1, 2]} labels={['a', 'b']} />);
    fireEvent.pointerOver(root.querySelectorAll('[data-xen-v4-bar-hit]')[1] as HTMLElement);

    // The bubble mounts and unmounts, so the entrance is an animation rather
    // than a transition — the same shape `TooltipV4` takes off
    // `[data-xen-v4-nav-tip]`.
    expect(chartSheet()).toContain('@keyframes xen-v4-chart-tip-in');
    expect(chartSheet()).toContain(
      `[data-xen-v4-chart-tooltip],
[data-xen-v4-chart-value][data-reveal="hover"] {
  animation: xen-v4-chart-tip-in ${V4_MOTION.quick}ms ${EASE_STANDARD};`
    );
    // Feedback tied to a pointer, not a panel arriving: `quick`, and an easing
    // that starts and ends in place.
    expect(chartSheet()).not.toContain(`xen-v4-chart-tip-in ${V4_MOTION.enter}ms`);
    expect(root.querySelector('[data-xen-v4-chart-tooltip]')).not.toBeNull();
  });

  it('drops the readout’s fade under reduced motion — §36.10', () => {
    mount(<BarChartV4 data={[1, 2]} />);
    expect(chartSheet()).toContain('@media (prefers-reduced-motion: reduce)');
    expect(chartSheet()).toContain('[data-xen-v4-chart-value][data-reveal="hover"] { animation: none; }');
  });
});

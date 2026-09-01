/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { CHART_V4_STYLE_ID } from './internal-v4';
import { CHART_DIRECT_LABEL_MAX, CHART_MARK } from '../primitives/internal/v4-chart';
import type { ThemeSeed } from '../theme/types';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import { HISTOGRAM_V4_STYLE_ID, HistogramV4 } from './HistogramV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container.querySelector('[data-xen-v4-histogram]') as HTMLElement;
}

function sheet(): string {
  return document.getElementById(HISTOGRAM_V4_STYLE_ID)?.textContent ?? '';
}


/** The one sheet the whole V4 charts line injects — where its motion lives. */
const chartSheet = (): string => document.getElementById(CHART_V4_STYLE_ID)?.textContent ?? '';

function drawnBins(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll('[data-xen-v4-bin]'));
}

function styleAttributes(root: HTMLElement): string {
  return Array.from(root.querySelectorAll('*'))
    .map((el) => el.getAttribute('style') ?? '')
    .join(' | ');
}

describe('HistogramV4 (web)', () => {
  // ── §4.1: bins are one series by definition ────────────────────────

  it('paints every bin one colour — a distribution has one identity', () => {
    const root = mount(<HistogramV4 bins={[1, 5, 9, 4, 2]} />);
    expect(root.style.getPropertyValue('--xen-v4-mark-fill')).toBe('var(--xen-chart-1)');
    const drawn = drawnBins(root);
    expect(drawn).toHaveLength(5);
    drawn.forEach((bin) => expect(bin.style.backgroundColor).toBe(''));
  });

  it('`tone` changes which colour, never how many', () => {
    const root = mount(<HistogramV4 bins={[1, 5, 9]} tone="danger" />);
    expect(root.style.getPropertyValue('--xen-v4-mark-fill')).toBe('var(--xen-danger)');
    expect(sheet()).toContain('[data-xen-v4-bin] { background-color: var(--xen-v4-mark-fill); }');
  });

  // ── §3.3 / §4.4: chrome and mark geometry ──────────────────────────

  it('draws the axis with the chart axis token, not `--xen-muted`', () => {
    const root = mount(<HistogramV4 bins={[1, 5]} />);
    expect(root.querySelector('[data-xen-v4-chart-axis]')).not.toBeNull();
    const css = sheet();
    expect(css).toContain('[data-xen-v4-chart-axis] { background-color: var(--xen-chart-axis); }');
    expect(css).not.toContain('--xen-muted');
  });

  it('sits its bins flush — a distribution is one continuous axis', () => {
    // The ruling on §4.4's gap rule: the gap says "these are separate things",
    // which is true of categorical bars and false of histogram bins. Bin 3's
    // right edge IS bin 4's left edge, and page between them claims a range of
    // the variable fell in neither bucket. See `BIN_GAP` in the source.
    const root = mount(<HistogramV4 bins={[1, 5, 9]} />);
    const row = (drawnBins(root)[0] as HTMLElement).parentElement?.parentElement as HTMLElement;
    expect(row.style.gap).toBe('0');
    expect(row.style.gap).not.toBe(`${CHART_MARK.gap}px`);
    // Nor a stroke standing in for one: it would be centred on the edge and eat
    // half of each neighbour, which is what the base did.
    drawnBins(root).forEach((bin) => expect(bin.style.borderLeftWidth).toBe(''));
  });

  it('rounds the data end only', () => {
    const root = mount(<HistogramV4 bins={[1, 5]} />);
    const bin = drawnBins(root)[0] as HTMLElement;
    expect(bin.style.borderTopLeftRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(bin.style.borderBottomLeftRadius).toBe('');
  });

  // ── §5: bin labels thin, they do not rotate ────────────────────────

  it('thins bin labels rather than rotating them', () => {
    const labels = Array.from({ length: 12 }, (_, i) => `b${i}`);
    const root = mount(<HistogramV4 bins={labels.map((_, i) => i)} labels={labels} />);

    const drawn = Array.from(root.querySelectorAll('[data-xen-v4-histogram] span'))
      .map((el) => el.textContent ?? '')
      .filter((text) => text.startsWith('b'));
    expect(drawn).toEqual(['b0', 'b3', 'b6', 'b9']);
    expect(drawn.length).toBeLessThanOrEqual(CHART_DIRECT_LABEL_MAX);
    // Nothing is rotated to make room.
    expect(styleAttributes(root)).not.toContain('rotate');
  });

  it('labels every bin when there are few enough to fit', () => {
    const root = mount(<HistogramV4 bins={[1, 2, 3]} labels={['x', 'y', 'z']} />);
    expect(root.textContent).toContain('x');
    expect(root.textContent).toContain('y');
    expect(root.textContent).toContain('z');
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders the title, summary and caption slots and honours `height`', () => {
    const root = mount(
      <HistogramV4
        bins={[1, 5]}
        title="Latency"
        summary="p95 240ms"
        caption="last hour"
        height={180}
      />
    );
    expect(root.textContent).toContain('Latency');
    expect(root.textContent).toContain('p95 240ms');
    expect(root.textContent).toContain('last hour');
    expect((root.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).style.height).toBe(
      '180px'
    );
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the footprint, never nothing', () => {
    const root = mount(<HistogramV4 bins={[]} height={150} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('150px');
    expect(drawnBins(root)).toHaveLength(0);
  });

  it('takes a custom empty label', () => {
    const root = mount(<HistogramV4 bins={[]} emptyLabel="No samples" />);
    expect(root.textContent).toContain('No samples');
  });

  it('renders one bin for one bin and never divides by zero', () => {
    const root = mount(<HistogramV4 bins={[4]} />);
    expect(drawnBins(root)).toHaveLength(1);
    const styles = styleAttributes(root);
    expect(styles).not.toContain('NaN');
    expect(styles).not.toContain('Infinity');
    expect((drawnBins(root)[0] as HTMLElement).style.height).toBe('100%');
  });

  it('keeps an empty bin visible — a gap in a distribution is information', () => {
    const root = mount(<HistogramV4 bins={[0, 0, 0]} />);
    expect(styleAttributes(root)).not.toContain('NaN');
    drawnBins(root).forEach((bin) => expect(bin.style.minHeight).toBe('1px'));
  });

  it('holds the footprint with a skeleton while loading', () => {
    const root = mount(<HistogramV4 bins={[]} loading />);
    expect(root.querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline, the count and the range', () => {
    const root = mount(<HistogramV4 bins={[1, 5, 9]} title="Latency" />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe('Histogram, Latency, 3 bins, 1 to 9');
  });

  it('singularises at one bin', () => {
    const root = mount(<HistogramV4 bins={[4]} />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe('Histogram, 1 bin, 4');
  });

  it('lets the caller override the sentence', () => {
    const root = mount(<HistogramV4 bins={[1, 5]} aria-label="Mostly fast" />);
    expect(root.getAttribute('aria-label')).toBe('Mostly fast');
  });

  // ── §4.6: interaction ──────────────────────────────────────────────

  it('carries the precise count in the tooltip', () => {
    const root = mount(<HistogramV4 bins={[1, 5, 9]} labels={['lo', 'mid', 'hi']} />);
    fireEvent.pointerOver(root.querySelectorAll('[data-xen-v4-bin-hit]')[2] as HTMLElement);
    const tip = root.querySelector('[data-xen-v4-chart-tooltip]') as HTMLElement;
    expect(tip.textContent).toContain('hi: 9');
  });

  it('reports the index and the count to `onSelect`', () => {
    const onSelect = jest.fn();
    const root = mount(<HistogramV4 bins={[1, 5]} onSelect={onSelect} />);
    fireEvent.click(root.querySelectorAll('[data-xen-v4-bin-hit]')[1] as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith(1, 5);
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('reveals once by default and stays still when asked to', () => {
    const on = mount(<HistogramV4 bins={[1, 5]} />);
    expect(
      (on.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBe('true');

    const off = mount(<HistogramV4 bins={[1, 5]} animate={false} />);
    expect(
      (off.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBeNull();
  });

  // ── §36: the readout arrives, it does not blink ────────────────────

  it('fades its hover readout in, from the line’s one shared rule', () => {
    const root = mount(<HistogramV4 bins={[1, 5, 9]} />);
    fireEvent.pointerOver(root.querySelectorAll('[data-xen-v4-bin-hit]')[0] as HTMLElement);

    expect(root.querySelector('[data-xen-v4-chart-tooltip]')).not.toBeNull();
    expect(chartSheet()).toContain('@keyframes xen-v4-chart-tip-in');
    expect(chartSheet()).toContain(`animation: xen-v4-chart-tip-in ${V4_MOTION.quick}ms`);
  });
});

/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { CHART_RAMP_STEPS } from './internal-v4';
import { HEATMAP_V4_STYLE_ID, HEATMAP_V4_TAP_MIN, HeatmapV4 } from './HeatmapV4';

const SEED: ThemeSeed = {
  primary: '#0D9488',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container as HTMLElement;
}

const GRID = [
  [0, 1, 2],
  [3, 4, 5],
];

const cells = (root: HTMLElement): NodeListOf<SVGRectElement> =>
  root.querySelectorAll<SVGRectElement>('[data-xen-v4-heatmap-cell]');

describe('HeatmapV4 (web)', () => {
  // ── the sequential ramp replaces the opacity ramp ──────────────────

  it('paints every cell from the sequential ramp, never from fill-opacity', () => {
    const root = mount(<HeatmapV4 data={GRID} />);
    const rects = cells(root);

    expect(rects).toHaveLength(6);
    rects.forEach((rect) => {
      expect(rect.getAttribute('fill')).toMatch(/^var\(--xen-chart-seq-\d\)$/);
      // The retired `opacity: 0.08 + intensity * 0.92`.
      expect(rect.getAttribute('fill-opacity')).toBeNull();
      expect(rect.getAttribute('opacity')).toBeNull();
    });
  });

  it('maps the floor and the ceiling onto the ramp’s two ends', () => {
    const root = mount(<HeatmapV4 data={[[0, 5]]} />);
    const rects = cells(root);

    expect(rects[0]?.getAttribute('fill')).toBe('var(--xen-chart-seq-0)');
    expect(rects[1]?.getAttribute('fill')).toBe(`var(--xen-chart-seq-${CHART_RAMP_STEPS - 1})`);
  });

  it('takes the top bucket rather than dividing by zero on a flat grid', () => {
    const root = mount(<HeatmapV4 data={[[4, 4]]} min={4} max={4} />);

    cells(root).forEach((rect) => {
      expect(rect.getAttribute('fill')).toBe(`var(--xen-chart-seq-${CHART_RAMP_STEPS - 1})`);
    });
  });

  it('rounds the cell from a token in a sheet, never from an `rx` literal', () => {
    const root = mount(<HeatmapV4 data={GRID} />);
    const css = document.getElementById(HEATMAP_V4_STYLE_ID)?.textContent ?? '';

    expect(css).toContain('rx: var(--xen-radius-sm)');
    expect(cells(root)[0]?.getAttribute('rx')).toBeNull();
  });

  it('separates cells by CHART_MARK.gap, not by a bare number', () => {
    const root = mount(<HeatmapV4 data={GRID} cellSize={16} />);
    const rects = cells(root);
    const first = Number(rects[0]?.getAttribute('x'));
    const second = Number(rects[1]?.getAttribute('x'));

    expect(second - first).toBe(16 + CHART_MARK.gap);
  });

  // ── new props ──────────────────────────────────────────────────────

  it('ships the ramp key by default and drops it on request', () => {
    const withKey = mount(<HeatmapV4 data={GRID} />);
    expect(withKey.querySelectorAll('[data-xen-v4-heatmap-key-step]')).toHaveLength(
      CHART_RAMP_STEPS
    );

    const without = mount(<HeatmapV4 data={GRID} legend={false} />);
    expect(without.querySelectorAll('[data-xen-v4-heatmap-key]')).toHaveLength(0);
  });

  it('draws row and column labels — the direct-label channel', () => {
    const root = mount(
      <HeatmapV4 data={GRID} rowLabels={['Mon', 'Tue']} columnLabels={['A', 'B', 'C']} />
    );

    expect(root.textContent).toContain('Mon');
    expect(root.textContent).toContain('Tue');
    expect(root.textContent).toContain('C');
  });

  it('carries a per-cell tooltip naming the row, column and value', () => {
    const root = mount(
      <HeatmapV4 data={[[7]]} rowLabels={['Mon']} columnLabels={['09:00']} />
    );

    expect(root.querySelector('title')?.textContent).toBe('Mon · 09:00: 7');
  });

  it('drops the tooltip when asked', () => {
    const root = mount(<HeatmapV4 data={[[7]]} tooltip={false} />);
    expect(root.querySelector('svg title')).toBeNull();
  });

  it('formats values through `valueFormat`', () => {
    const root = mount(<HeatmapV4 data={[[7]]} valueFormat={(v) => `${v} visits`} />);
    expect(root.querySelector('title')?.textContent).toBe('7 visits');
  });

  it('renders the header and the caption', () => {
    const root = mount(<HeatmapV4 data={GRID} title="Busiest hours" caption="Last 4 weeks" />);

    expect(root.textContent).toContain('Busiest hours');
    expect(root.textContent).toContain('Last 4 weeks');
  });

  it('shows the loading placeholder at the plot’s footprint', () => {
    const root = mount(<HeatmapV4 data={GRID} loading />);

    expect(cells(root)).toHaveLength(0);
    expect(root.querySelector('[data-xen-v4-skeleton]')).not.toBeNull();
  });

  // ── the tap floor and the exception ────────────────────────────────

  it('leaves a non-interactive cell at its given size — no target, no floor', () => {
    const root = mount(<HeatmapV4 data={GRID} cellSize={12} />);

    expect(cells(root)[0]?.getAttribute('width')).toBe('12');
  });

  it('floors an interactive cell at HIG’s absolute 28, the documented exception', () => {
    const onCellSelect = jest.fn();
    const root = mount(<HeatmapV4 data={GRID} cellSize={12} onCellSelect={onCellSelect} />);

    expect(cells(root)[0]?.getAttribute('width')).toBe(String(HEATMAP_V4_TAP_MIN));
    fireEvent.click(cells(root)[1] as SVGRectElement);
    expect(onCellSelect).toHaveBeenCalledWith(
      expect.objectContaining({ row: 0, column: 1, value: 1 })
    );
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state, keeping a footprint, for no rows', () => {
    const root = mount(<HeatmapV4 data={[]} />);

    expect(cells(root)).toHaveLength(0);
    expect(root.textContent).toContain('No data');
  });

  it('renders the empty state for a grid of empty rows', () => {
    const root = mount(<HeatmapV4 data={[[], []]} emptyLabel="Nothing yet" />);
    expect(root.textContent).toContain('Nothing yet');
  });

  it('renders a single cell', () => {
    const root = mount(<HeatmapV4 data={[[3]]} />);

    expect(cells(root)).toHaveLength(1);
    expect(cells(root)[0]?.getAttribute('fill')).toMatch(/^var\(--xen-chart-seq-\d\)$/);
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence naming the shape and the range', () => {
    const root = mount(<HeatmapV4 data={GRID} />);

    expect(root.querySelector('svg')?.getAttribute('aria-label')).toBe(
      'Heatmap, 2 by 3 grid, 0 to 5.'
    );
  });

  it('lets a caller override the derived sentence', () => {
    const root = mount(<HeatmapV4 data={GRID} aria-label="Sign-ins per hour" />);

    expect(root.querySelector('svg')?.getAttribute('aria-label')).toBe('Sign-ins per hour');
  });
});

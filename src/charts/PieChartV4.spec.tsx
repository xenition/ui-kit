/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { PieChartV4, foldPieDataV4, segmentLegendLabelV4 } from './PieChartV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container as unknown as HTMLElement;
}

/** Every `d` the plot emitted — the one place a divide-by-zero surfaces. */
function pathData(root: HTMLElement): string[] {
  return Array.from(root.querySelectorAll('path')).map((p) => p.getAttribute('d') ?? '');
}

const FIVE = [
  { label: 'Direct', value: 40 },
  { label: 'Referral', value: 25 },
  { label: 'Organic', value: 20 },
  { label: 'Social', value: 10 },
  { label: 'Email', value: 5 },
];

describe('PieChartV4 (web)', () => {
  // ── §1 rule 2 + rule 4: the palette, and only the palette ──────────

  it('paints slices from the derived palette in assignment order, never a status token', () => {
    const root = draw(<PieChartV4 data={FIVE} />);
    const fills = Array.from(root.querySelectorAll('path')).map((p) => p.getAttribute('fill'));
    expect(fills).toEqual([
      'var(--xen-chart-1)',
      'var(--xen-chart-2)',
      'var(--xen-chart-3)',
      'var(--xen-chart-4)',
      'var(--xen-chart-5)',
    ]);
    // The bug this pass exists to fix: slice three was `success` and slice
    // five was `danger`, spent on regions where nothing passed or failed.
    expect(fills).not.toContain('var(--xen-success)');
    expect(fills).not.toContain('var(--xen-danger)');
  });

  it('separates adjacent slices with CHART_MARK.gap of surface, not a 1px guess', () => {
    const root = draw(<PieChartV4 data={FIVE} />);
    const first = root.querySelector('path') as SVGPathElement;
    expect(first.getAttribute('stroke')).toBe('var(--xen-surface)');
    expect(first.getAttribute('stroke-width')).toBe(String(CHART_MARK.gap));
  });

  it('reaches a status hue only through `tone`', () => {
    const root = draw(
      <PieChartV4
        data={[
          { label: 'Passed', value: 90, tone: 'success' },
          { label: 'Failed', value: 10, tone: 'danger' },
        ]}
      />
    );
    const fills = Array.from(root.querySelectorAll('path')).map((p) => p.getAttribute('fill'));
    expect(fills).toEqual(['var(--xen-success)', 'var(--xen-danger)']);
  });

  it('refuses a chart that mixes `tone` with palette slots (§1 rule 3)', () => {
    expect(() =>
      foldPieDataV4([
        { label: 'Failed', value: 10, tone: 'danger' },
        { label: 'Other', value: 90 },
      ])
    ).toThrow(/all `tone` or all palette slots/);
  });

  // ── §7 open question 2: the component owns the "Other" fold ────────

  it('folds at six segments: four named, the tail in slot 5, sorted descending', () => {
    const fold = foldPieDataV4([
      { label: 'A', value: 1 },
      { label: 'B', value: 9 },
      { label: 'C', value: 7 },
      { label: 'D', value: 2 },
      { label: 'E', value: 8 },
      { label: 'F', value: 6 },
    ]);
    expect(fold.segments.map((s) => s.label)).toEqual(['B', 'E', 'C', 'F', 'Other']);
    expect(fold.foldedCount).toBe(2);
    // A + D. The tail is always at least two rows deep, which is why the
    // legend can say "categories" without a branch.
    expect(fold.segments[4]?.value).toBe(3);
    expect(fold.total).toBe(33);
  });

  it('does NOT sort at five or fewer — a slice keeps its slot when a sibling filters', () => {
    const fold = foldPieDataV4(FIVE);
    expect(fold.segments.map((s) => s.label)).toEqual([
      'Direct',
      'Referral',
      'Organic',
      'Social',
      'Email',
    ]);
    expect(fold.foldedCount).toBe(0);
  });

  it('drops zero and negative rows rather than giving them a swatch and no slice', () => {
    const fold = foldPieDataV4([
      { label: 'Real', value: 5 },
      { label: 'Zero', value: 0 },
      { label: 'Negative', value: -3 },
      { label: 'NaN', value: Number.NaN },
    ]);
    expect(fold.segments.map((s) => s.label)).toEqual(['Real']);
    expect(fold.total).toBe(5);
  });

  it('says so in the legend, and in the spoken label', () => {
    const root = draw(
      <PieChartV4
        data={[
          { label: 'A', value: 9 },
          { label: 'B', value: 8 },
          { label: 'C', value: 7 },
          { label: 'D', value: 6 },
          { label: 'E', value: 2 },
          { label: 'F', value: 1 },
        ]}
      />
    );
    expect(root.textContent).toContain('Other (2 categories)');
    const svg = root.querySelector('svg') as SVGSVGElement;
    expect(svg.getAttribute('aria-label')).toContain('2 smaller categories folded into Other');
  });

  it('names the fold whatever the caller calls it', () => {
    const fold = foldPieDataV4(
      [
        { label: 'A', value: 9 },
        { label: 'B', value: 8 },
        { label: 'C', value: 7 },
        { label: 'D', value: 6 },
        { label: 'E', value: 2 },
        { label: 'F', value: 1 },
      ],
      'Everything else'
    );
    expect(segmentLegendLabelV4(fold.segments[4]!)).toBe('Everything else (2 categories)');
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders title, summary, caption and a legend with names and shares', () => {
    const root = draw(
      <PieChartV4
        data={FIVE}
        title="Where signups come from"
        summary="12,480"
        caption="last 30 days"
      />
    );
    expect(root.textContent).toContain('Where signups come from');
    expect(root.textContent).toContain('12,480');
    expect(root.textContent).toContain('last 30 days');
    expect(root.textContent).toContain('Direct');
    expect(root.textContent).toContain('40%');
  });

  it('sizes the legend swatch at CHART_MARK.dotSize, never a 10×10 literal', () => {
    const root = draw(<PieChartV4 data={FIVE} />);
    const swatch = root.querySelector('[data-xen-v4-chart-swatch]') as HTMLElement;
    expect(swatch.style.width).toBe(`${CHART_MARK.dotSize}px`);
    expect(swatch.style.height).toBe(`${CHART_MARK.dotSize}px`);
  });

  it('drops the legend at one segment and keeps it at two — the §4.2 default', () => {
    const one = draw(<PieChartV4 data={[{ label: 'Only', value: 1 }]} />);
    expect(one.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
    const two = draw(
      <PieChartV4
        data={[
          { label: 'A', value: 1 },
          { label: 'B', value: 1 },
        ]}
      />
    );
    expect(two.querySelector('[data-xen-v4-chart-legend]')).not.toBeNull();
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state, keeping the footprint, when there is nothing to draw', () => {
    const root = draw(<PieChartV4 data={[]} size={200} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('200px');
    expect(root.querySelector('svg')).toBeNull();
  });

  it('renders the empty state when every value is zero', () => {
    const root = draw(<PieChartV4 data={[{ label: 'A', value: 0 }]} emptyLabel="Nothing yet" />);
    expect(root.textContent).toContain('Nothing yet');
  });

  it('keeps the title around the empty state so the figure does not vanish', () => {
    const root = draw(<PieChartV4 data={[]} title="Signups" />);
    expect(root.textContent).toContain('Signups');
  });

  it('draws a single datum as a full circle, with no NaN in any path', () => {
    const root = draw(<PieChartV4 data={[{ label: 'Only', value: 7 }]} size={160} />);
    // An arc path cannot express 360°, so the whole ring is a <circle>.
    const circle = root.querySelector('circle') as SVGCircleElement;
    expect(circle).not.toBeNull();
    expect(circle.getAttribute('fill')).toBe('var(--xen-chart-1)');
    expect(pathData(root)).toEqual([]);
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('emits no NaN into a path for an ordinary multi-slice pie', () => {
    const root = draw(<PieChartV4 data={FIVE} />);
    for (const d of pathData(root)) {
      expect(d).not.toContain('NaN');
      expect(d).not.toContain('Infinity');
    }
  });

  it('swaps the plot for a skeleton at the same footprint when loading', () => {
    const root = draw(<PieChartV4 data={FIVE} loading />);
    expect(root.querySelector('svg')).toBeNull();
    expect(root.querySelector('[data-xen-v4-skeleton], .animate-pulse, [aria-hidden]')).not.toBeNull();
  });

  // ── §1 rule 6 + §4.8: it says its value in words ───────────────────

  it('derives an accessible sentence naming the form, the count and the leader', () => {
    const root = draw(<PieChartV4 data={FIVE} />);
    const svg = root.querySelector('svg') as SVGSVGElement;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe(
      'Pie chart, 5 slices, largest Direct at 40%'
    );
  });

  it('puts role=img on the plot, not on the figure, so the title stays readable', () => {
    const root = draw(<PieChartV4 data={FIVE} title="Signups" />);
    const figure = root.firstElementChild as HTMLElement;
    expect(figure.getAttribute('role')).toBeNull();
  });

  // ── §4.7: entrance ─────────────────────────────────────────────────

  it('opts into the reveal by default and out on request', () => {
    const on = draw(<PieChartV4 data={FIVE} />);
    expect(on.querySelector('svg')?.getAttribute('data-animate')).toBe('true');
    const off = draw(<PieChartV4 data={FIVE} animate={false} />);
    expect(off.querySelector('svg')?.getAttribute('data-animate')).toBeNull();
  });
});

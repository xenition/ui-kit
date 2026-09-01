/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
} from '../primitives/internal/v4-chart';
import { AreaChartV4, CHART_AREA_FILL_ALPHA } from './AreaChartV4';

const SEED: ThemeSeed = {
  primary: '#0D9488',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

function figure(container: HTMLElement): HTMLElement {
  return container.querySelector('[role="img"]') as HTMLElement;
}

function attrDump(container: HTMLElement): string {
  return Array.from(container.querySelectorAll('*'))
    .flatMap((el) => Array.from(el.attributes).map((a) => a.value))
    .join(' ');
}

describe('AreaChartV4 (web)', () => {
  // ── §4.4: the fill is context, the line is the data ─────────────────

  it('fills under the line at one named alpha, and strokes at full strength', () => {
    const c = mount(<AreaChartV4 data={[1, 5, 3]} />);
    const fill = c.querySelector('[data-xen-v4-chart-area]');
    const line = c.querySelector('[data-xen-v4-chart-line]');
    expect(fill?.getAttribute('fill')).toBe('var(--xen-chart-1)');
    expect(fill?.getAttribute('fill-opacity')).toBe(String(CHART_AREA_FILL_ALPHA));
    expect(line?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
    expect(line?.getAttribute('stroke-width')).toBe(String(CHART_MARK.stroke));
    // The line carries no opacity of its own — full strength, §4.4.
    expect(line?.getAttribute('fill-opacity')).toBeNull();
    // Retired: the two different guesses the twins shipped.
    expect(attrDump(c)).not.toContain('0.15');
    expect(attrDump(c)).not.toContain('0.2 ');
  });

  it('takes several series, each on its own slot', () => {
    const c = mount(
      <AreaChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
        series={[
          { key: 'a', label: 'A' },
          { key: 'b', label: 'B' },
        ]}
      />
    );
    const fills = c.querySelectorAll('[data-xen-v4-chart-area]');
    expect(fills.length).toBe(2);
    expect(fills[0]?.getAttribute('fill')).toBe('var(--xen-chart-1)');
    expect(fills[1]?.getAttribute('fill')).toBe('var(--xen-chart-2)');
  });

  // ── §5 Group A: stacked areas get CHART_MARK.gap between bands ──────

  it('separates stacked bands with a gap of surface — the CVD relief (§1 rule 5)', () => {
    const c = mount(
      <AreaChartV4
        stacked
        data={[
          [1, 2],
          [3, 4],
          [5, 6],
        ]}
        series={[
          { key: 'a', label: 'A' },
          { key: 'b', label: 'B' },
          { key: 'c', label: 'C' },
        ]}
      />
    );
    const gaps = c.querySelectorAll('[data-xen-v4-chart-gap]');
    // One boundary between each adjacent pair, and none above the top band.
    expect(gaps.length).toBe(2);
    expect(gaps[0]?.getAttribute('stroke')).toBe('var(--xen-surface)');
    expect(gaps[0]?.getAttribute('stroke-width')).toBe(String(CHART_MARK.gap));
    // The gap is painted, not inset, so it stays 2 painted pixels at any size.
    expect(gaps[0]?.getAttribute('vector-effect')).toBe('non-scaling-stroke');
  });

  it('draws no band gaps when the areas are overlaid rather than stacked', () => {
    const c = mount(
      <AreaChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
      />
    );
    expect(c.querySelectorAll('[data-xen-v4-chart-gap]').length).toBe(0);
  });

  it('stacks cumulatively and reads a stack against zero', () => {
    const c = mount(
      <AreaChartV4
        stacked
        data={[
          [2, 2],
          [2, 2],
        ]}
        width={100}
        height={100}
      />
    );
    const lines = c.querySelectorAll('[data-xen-v4-chart-line]');
    // Band one tops out at 2 of a 0→4 scale (half height); band two at 4 (top).
    expect(lines[0]?.getAttribute('points')).toBe('0.00,50.00 100.00,50.00');
    expect(lines[1]?.getAttribute('points')).toBe('0.00,0.00 100.00,0.00');
  });

  it('closes the band path without crossing itself', () => {
    const c = mount(
      <AreaChartV4
        stacked
        data={[
          [1, 1],
          [1, 1],
        ]}
      />
    );
    const upper = c.querySelectorAll('[data-xen-v4-chart-area]')[1];
    const d = upper?.getAttribute('d') ?? '';
    // The lower edge is the band beneath, walked in reverse — not a jump to
    // the baseline and back, which is the bow-tie the base's shortcut makes.
    expect(d.endsWith('Z')).toBe(true);
    expect(d.split('L').length).toBeGreaterThan(3);
  });

  // ── §4.3: `tone` is the only route to a status hue ──────────────────

  it('paints a toned series from the status token', () => {
    const c = mount(
      <AreaChartV4
        data={[[1], [2]]}
        series={[
          { key: 'a', label: 'Under' },
          { key: 'b', label: 'Over budget', tone: 'warn' },
        ]}
      />
    );
    const fills = c.querySelectorAll('[data-xen-v4-chart-area]');
    expect(fills[1]?.getAttribute('fill')).toBe('var(--xen-warn)');
  });

  // ── §4.5: empty, single datum, loading ──────────────────────────────

  it('keeps the footprint when there is no data', () => {
    const c = mount(<AreaChartV4 data={[]} height={180} />);
    expect(figure(c).getAttribute('aria-label')).toBe('No data');
    expect(figure(c).style.height).toBe('180px');
  });

  it('shows the skeleton at the plot’s footprint while loading', () => {
    const c = mount(<AreaChartV4 data={[1, 2]} loading />);
    expect(c.querySelector('[data-xen-v4-skeleton]')).not.toBeNull();
    expect(c.querySelector('[data-xen-v4-chart-area]')).toBeNull();
  });

  it('draws ONE datum with no divide-by-zero anywhere in the path', () => {
    const c = mount(<AreaChartV4 data={[7]} width={200} height={100} />);
    const d = c.querySelector('[data-xen-v4-chart-area]')?.getAttribute('d') ?? '';
    expect(d).not.toMatch(/NaN|Infinity/);
    expect(d).toContain('M100.00');
    expect(attrDump(c)).not.toMatch(/NaN|Infinity/);
    // The one point still shows as a dot rather than as an invisible polyline.
    expect(c.querySelectorAll('[data-xen-v4-mark-ring]').length).toBe(1);
  });

  it('draws a FLAT series level rather than dividing by zero', () => {
    const c = mount(<AreaChartV4 data={[3, 3, 3]} width={300} height={100} />);
    const points = c.querySelector('[data-xen-v4-chart-line]')?.getAttribute('points') ?? '';
    expect(points).not.toMatch(/NaN|Infinity/);
    expect(new Set(points.split(' ').map((p) => p.split(',')[1])).size).toBe(1);
  });

  // ── §1 rule 6 / §4.8 ────────────────────────────────────────────────

  it('derives a sentence, and names the stacked form as stacked', () => {
    const flatC = mount(<AreaChartV4 title="Traffic" data={[10, 40]} />);
    expect(figure(flatC).getAttribute('aria-label')).toBe(
      'Area chart, Traffic, 2 points, 10 to 40'
    );
    const stackedC = mount(
      <AreaChartV4
        stacked
        data={[
          [1, 2],
          [3, 4],
        ]}
      />
    );
    expect(figure(stackedC).getAttribute('aria-label')).toBe(
      'Stacked area chart, 2 series, 2 points, 1 to 4'
    );
  });

  it('lets the caller override the sentence', () => {
    const c = mount(<AreaChartV4 data={[1, 2]} aria-label="Storage used over the quarter" />);
    expect(figure(c).getAttribute('aria-label')).toBe('Storage used over the quarter');
  });

  // ── §4.6: hover ─────────────────────────────────────────────────────

  it('shows a tooltip on hover carrying the precise value', () => {
    const c = mount(
      <AreaChartV4
        data={[11, 22]}
        labels={['Q1', 'Q2']}
        series={[{ key: 'u', label: 'Users' }]}
        formatValue={(v) => `${v}k`}
      />
    );
    fireEvent.pointerMove(c.querySelector('.relative') as HTMLElement, { clientX: 0 });
    const tip = c.querySelector('[data-xen-v4-chart-tip]');
    expect(tip?.textContent).toContain('Q1');
    expect(tip?.textContent).toContain('11k');
  });

  it('legends two or more series and stays quiet for one', () => {
    const two = mount(
      <AreaChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
        series={[
          { key: 'a', label: 'Alpha' },
          { key: 'b', label: 'Beta' },
        ]}
      />
    );
    expect(two.querySelector('[data-xen-v4-chart-legend]')?.textContent).toContain('Alpha');
    const one = mount(<AreaChartV4 data={[1, 2]} />);
    expect(one.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
  });

  it('paints chrome from the chart chrome var, never from `border`', () => {
    const c = mount(<AreaChartV4 data={[1, 2, 3]} />);
    expect(c.querySelector('[data-xen-v4-chart-grid]')?.getAttribute('stroke')).toBe(
      'var(--xen-chart-grid)'
    );
    expect(attrDump(c)).not.toContain('var(--xen-border)');
  });

  it('folds past the fifth slot rather than cycling OR throwing (§1 rule 4)', () => {
    // The palette still throws — `chartVar(5)` is a mistake in the caller's own
    // code — but an area chart's series count arrives with the data, so the
    // COMPONENT folds instead of taking the page down (`foldChartSeries`).
    const six = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]];
    const c = mount(<AreaChartV4 data={six} />);

    // Every band still drawn — folding shares a slot, it does not drop data.
    const lines = Array.from(c.querySelectorAll('[data-xen-v4-chart-line]'));
    expect(lines).toHaveLength(six.length);
    // The last two share the last slot rather than reaching for a sixth.
    expect(lines[CHART_SERIES_COUNT]?.getAttribute('stroke')).toBe(
      lines[CHART_SERIES_COUNT - 1]?.getAttribute('stroke')
    );
    // ...and the legend carries five rows, the last named "Other".
    const rows = c.querySelectorAll('[data-xen-v4-legend-item]');
    expect(rows).toHaveLength(CHART_SERIES_COUNT);
    expect(rows[CHART_SERIES_COUNT - 1]?.textContent).toContain(CHART_OVERFLOW_LABEL);
  });
});

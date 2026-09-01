/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { CHART_V4_STYLE_ID } from './internal-v4';
import { EASE_STANDARD, V4_MOTION } from '../primitives/internal/v4-motion';
import type { ThemeSeed } from '../theme/types';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
} from '../primitives/internal/v4-chart';
import { LineChartV4, thinAxisIndicesV4, toSeriesRowsV4 } from './LineChartV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

/** The one sheet the whole V4 charts line injects — where its motion lives. */
const chartSheet = (): string => document.getElementById(CHART_V4_STYLE_ID)?.textContent ?? '';

/** The figure's root — the one node carrying the derived sentence. */
function figure(container: HTMLElement): HTMLElement {
  return container.querySelector('[role="img"]') as HTMLElement;
}

/** Every attribute value on the element, as one string, for a NaN sweep. */
function attrDump(container: HTMLElement): string {
  return Array.from(container.querySelectorAll('*'))
    .flatMap((el) => Array.from(el.attributes).map((a) => a.value))
    .join(' ');
}

describe('LineChartV4 (web)', () => {
  // ── §5 Group A: the reason this component exists ────────────────────

  it('takes several series, which the base could not', () => {
    const c = mount(
      <LineChartV4
        data={[
          [1, 4, 2],
          [3, 2, 5],
          [2, 6, 1],
        ]}
        series={[
          { key: 'direct', label: 'Direct' },
          { key: 'referral', label: 'Referral' },
          { key: 'organic', label: 'Organic' },
        ]}
      />
    );
    const lines = c.querySelectorAll('[data-xen-v4-chart-line]');
    expect(lines.length).toBe(3);
    // Slots in assignment order, from the derived palette — never `SERIES`,
    // never a status token standing in for "series 3".
    expect(lines[0]?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
    expect(lines[1]?.getAttribute('stroke')).toBe('var(--xen-chart-2)');
    expect(lines[2]?.getAttribute('stroke')).toBe('var(--xen-chart-3)');
    expect(attrDump(c)).not.toContain('var(--xen-primary)');
  });

  it('still accepts the base’s single-series shape (§1 rule 8, additive only)', () => {
    expect(toSeriesRowsV4([1, 2, 3])).toEqual([[1, 2, 3]]);
    expect(toSeriesRowsV4([[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]);
    expect(toSeriesRowsV4([])).toEqual([]);
    const c = mount(<LineChartV4 data={[3, 7, 4, 9, 6]} />);
    expect(c.querySelectorAll('[data-xen-v4-chart-line]').length).toBe(1);
  });

  it('folds past the fifth slot rather than cycling OR throwing (§1 rule 4)', () => {
    // The palette still throws — `chartVar(5)` is a bug in the caller's code —
    // but a line chart's series count arrives with the data, so the COMPONENT
    // folds instead of taking the page down (`foldChartSeries`).
    const six = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]];
    const c = mount(<LineChartV4 data={six} />);

    // Every line still drawn — folding shares a slot, it does not drop data.
    expect(c.querySelectorAll('[data-xen-v4-chart-line]')).toHaveLength(six.length);
    // The last two share the last slot rather than reaching for a sixth.
    const inks = Array.from(c.querySelectorAll('[data-xen-v4-chart-line]')).map((l) =>
      l.getAttribute('stroke')
    );
    expect(inks[CHART_SERIES_COUNT - 1]).toBe(inks[CHART_SERIES_COUNT]);
    // ...and the legend carries CHART_SERIES_COUNT rows, the last named "Other".
    const rows = c.querySelectorAll('[data-xen-v4-legend-item]');
    expect(rows).toHaveLength(CHART_SERIES_COUNT);
    expect(rows[CHART_SERIES_COUNT - 1]?.textContent).toContain(CHART_OVERFLOW_LABEL);
  });

  // ── §1 rule 1: no literal marks ─────────────────────────────────────

  it('takes its stroke and its dot from CHART_MARK, not from a literal', () => {
    const c = mount(<LineChartV4 data={[1, 5, 3]} showDots />);
    const line = c.querySelector('[data-xen-v4-chart-line]');
    expect(line?.getAttribute('stroke-width')).toBe(String(CHART_MARK.stroke));
    // The dot is a round-capped zero-length line, so `dotSize` is its width.
    const dots = Array.from(c.querySelectorAll('line[stroke-linecap="round"]'));
    expect(dots.some((d) => d.getAttribute('stroke-width') === String(CHART_MARK.dotSize))).toBe(
      true
    );
    // …and it wears the shared ring rule rather than a colour typed here.
    expect(c.querySelector('[data-xen-v4-mark-ring]')).not.toBeNull();
    expect(attrDump(c)).not.toContain('r="3"');
  });

  it('paints chrome from the chart chrome vars, never from `muted` or `border`', () => {
    const c = mount(<LineChartV4 data={[1, 2, 3]} />);
    const grid = c.querySelector('[data-xen-v4-chart-grid]');
    expect(grid?.getAttribute('stroke')).toBe('var(--xen-chart-grid)');
    const dump = attrDump(c);
    expect(dump).not.toContain('var(--xen-muted)');
    expect(dump).not.toContain('var(--xen-border)');
  });

  // ── §5: showDots becomes automatic ──────────────────────────────────

  it('turns dots on below the auto threshold and off above it', () => {
    const few = mount(<LineChartV4 data={[1, 2, 3, 4]} />);
    expect(few.querySelectorAll('[data-xen-v4-mark-ring]').length).toBe(4);

    const many = mount(<LineChartV4 data={Array.from({ length: 40 }, (_, i) => i)} />);
    expect(many.querySelectorAll('[data-xen-v4-mark-ring]').length).toBe(0);

    // …and the caller can still say so explicitly, either way.
    const forced = mount(
      <LineChartV4 data={Array.from({ length: 40 }, (_, i) => i)} showDots />
    );
    expect(forced.querySelectorAll('[data-xen-v4-mark-ring]').length).toBe(40);
  });

  // ── §4.3: `tone` is the only route to a status hue ──────────────────

  it('paints a toned series from the status token, and only that series', () => {
    const c = mount(
      <LineChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
        series={[
          { key: 'ok', label: 'Delivered' },
          { key: 'bad', label: 'Failed', tone: 'danger' },
        ]}
      />
    );
    const lines = c.querySelectorAll('[data-xen-v4-chart-line]');
    expect(lines[0]?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
    expect(lines[1]?.getAttribute('stroke')).toBe('var(--xen-danger)');
  });

  // ── §4.2 / §1 rule 5: the frame and the legend ──────────────────────

  it('renders the figure frame in order and legends two or more series', () => {
    const c = mount(
      <LineChartV4
        title="Revenue"
        summary="£48,210"
        caption="vs last month"
        data={[
          [1, 2],
          [3, 4],
        ]}
        series={[
          { key: 'a', label: 'Direct' },
          { key: 'b', label: 'Referral' },
        ]}
      />
    );
    const text = c.textContent ?? '';
    expect(text.indexOf('Revenue')).toBeLessThan(text.indexOf('£48,210'));
    expect(text.indexOf('£48,210')).toBeLessThan(text.indexOf('vs last month'));
    const legend = c.querySelector('[data-xen-v4-chart-legend]');
    expect(legend).not.toBeNull();
    expect(legend?.textContent).toContain('Direct');
    expect(legend?.textContent).toContain('Referral');
    // The swatch is `dotSize`, never a 10×10 literal (§4.8). The legend is
    // the shared `LegendV4` since the consolidation pass, so the dot is a
    // `<span>` sized by inline style rather than an SVG sized by attribute —
    // the same 8, spelled the way that component spells it.
    const swatch = legend?.querySelector<HTMLElement>('[data-xen-v4-chart-swatch]');
    expect(swatch?.style.width).toBe(`${CHART_MARK.dotSize}px`);
    expect(swatch?.style.height).toBe(`${CHART_MARK.dotSize}px`);
  });

  it('does not legend a single series, and obeys `legend={false}`', () => {
    expect(mount(<LineChartV4 data={[1, 2, 3]} />).querySelector('[data-xen-v4-chart-legend]')).toBeNull();
    const off = mount(
      <LineChartV4
        data={[
          [1, 2],
          [3, 4],
        ]}
        legend={false}
      />
    );
    expect(off.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
  });

  it('direct-labels at four or fewer series WHEN ASKED, and stops above (§4.4)', () => {
    // `directLabels` is opt-in, not defaulted on. Each label is positioned at
    // `left: 100%` of a plot that reserves no right-hand gutter, so at a phone
    // width inside a card there is nowhere for it to go — defaulting it on
    // meant every two-series chart shipped broken at 390pt. Found by rendering
    // the chart, not by this spec, which is why the spec now asks explicitly.
    const off = mount(
      <LineChartV4
        data={[[1], [2]]}
        series={[
          { key: 'a', label: 'A' },
          { key: 'b', label: 'B' },
        ]}
      />
    );
    expect(off.querySelectorAll('[data-xen-v4-chart-direct-label]').length).toBe(0);

    const four = mount(
      <LineChartV4
        directLabels
        data={[[1], [2], [3], [4]]}
        series={[
          { key: 'a', label: 'A' },
          { key: 'b', label: 'B' },
          { key: 'c', label: 'C' },
          { key: 'd', label: 'D' },
        ]}
      />
    );
    expect(four.querySelectorAll('[data-xen-v4-chart-direct-label]').length).toBe(4);

    const five = mount(
      <LineChartV4
        directLabels
        data={[[1], [2], [3], [4], [5]]}
        series={[
          { key: 'a', label: 'A' },
          { key: 'b', label: 'B' },
          { key: 'c', label: 'C' },
          { key: 'd', label: 'D' },
          { key: 'e', label: 'E' },
        ]}
      />
    );
    expect(five.querySelectorAll('[data-xen-v4-chart-direct-label]').length).toBe(0);
  });

  // ── §4.5: empty, single datum, loading ──────────────────────────────

  it('keeps the footprint when there is no data, and never renders null', () => {
    const c = mount(<LineChartV4 data={[]} height={200} />);
    const empty = figure(c);
    expect(empty).not.toBeNull();
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('200px');
    // Not a bare string in the tree, and not a collapsed box.
    expect(c.querySelector('svg')).toBeNull();
  });

  it('renders a custom empty label', () => {
    const c = mount(<LineChartV4 data={[]} emptyLabel="Nothing yet" />);
    expect(figure(c).getAttribute('aria-label')).toBe('Nothing yet');
  });

  it('shows the skeleton at the plot’s footprint while loading', () => {
    const c = mount(<LineChartV4 data={[1, 2, 3]} loading height={140} />);
    expect(c.querySelector('[data-xen-v4-skeleton]')).not.toBeNull();
    expect(c.querySelector('[data-xen-v4-chart-line]')).toBeNull();
  });

  it('draws ONE datum as a dot at the centre, with no divide-by-zero', () => {
    const c = mount(<LineChartV4 data={[42]} width={320} height={160} />);
    const dump = attrDump(c);
    expect(dump).not.toMatch(/NaN/);
    expect(dump).not.toMatch(/Infinity/);
    // A one-point polyline paints nothing, so the dot is what carries it.
    expect(c.querySelectorAll('[data-xen-v4-mark-ring]').length).toBe(1);
    const line = c.querySelector('[data-xen-v4-chart-line]');
    expect(line?.getAttribute('points')).toBe('160.00,160.00');
  });

  it('draws a FLAT series as a level line rather than dividing by zero', () => {
    const c = mount(<LineChartV4 data={[5, 5, 5]} width={300} height={100} />);
    const points = c.querySelector('[data-xen-v4-chart-line]')?.getAttribute('points') ?? '';
    expect(points).not.toMatch(/NaN|Infinity/);
    const ys = points.split(' ').map((p) => p.split(',')[1]);
    expect(new Set(ys).size).toBe(1);
  });

  // ── §1 rule 6 / §4.8: it says its value in words ────────────────────

  it('derives a sentence naming the form, the title, the count and the range', () => {
    const c = mount(
      <LineChartV4
        title="Revenue"
        data={[
          [10, 20],
          [5, 40],
        ]}
        formatValue={(v) => `£${v}`}
      />
    );
    expect(figure(c).getAttribute('aria-label')).toBe(
      'Line chart, Revenue, 2 series, 2 points, £5 to £40'
    );
  });

  it('lets the caller override the sentence', () => {
    const c = mount(<LineChartV4 data={[1, 2]} aria-label="Weekly signups, trending up" />);
    expect(figure(c).getAttribute('aria-label')).toBe('Weekly signups, trending up');
  });

  it('says “1 point” rather than “1 points”', () => {
    const c = mount(<LineChartV4 data={[7]} />);
    expect(figure(c).getAttribute('aria-label')).toBe('Line chart, 1 point, 7 to 7');
  });

  // ── §3.4 / §4.6: a chart that cannot be hovered is a picture ────────

  it('shows a crosshair and a tooltip on hover, and clears them on leave', () => {
    const c = mount(
      <LineChartV4
        data={[11, 22, 33]}
        labels={['Jan', 'Feb', 'Mar']}
        series={[{ key: 'r', label: 'Revenue' }]}
      />
    );
    const plot = c.querySelector('.relative') as HTMLElement;
    expect(c.querySelector('[data-xen-v4-chart-tip]')).toBeNull();

    fireEvent.pointerMove(plot, { clientX: 0 });
    const tip = c.querySelector('[data-xen-v4-chart-tip]');
    expect(tip).not.toBeNull();
    expect(tip?.textContent).toContain('Jan');
    expect(tip?.textContent).toContain('11');
    expect(c.querySelector('[data-xen-v4-chart-crosshair]')).not.toBeNull();

    fireEvent.pointerLeave(plot);
    expect(c.querySelector('[data-xen-v4-chart-tip]')).toBeNull();
  });

  it('draws no tooltip at all when `tooltip={false}`', () => {
    const c = mount(<LineChartV4 data={[1, 2, 3]} tooltip={false} />);
    fireEvent.pointerMove(c.querySelector('.relative') as HTMLElement, { clientX: 10 });
    expect(c.querySelector('[data-xen-v4-chart-tip]')).toBeNull();
  });

  it('takes the tooltip swatch shape from `indicator` (shadcn’s vocabulary)', () => {
    const c = mount(<LineChartV4 data={[1, 2]} indicator="dashed" />);
    fireEvent.pointerMove(c.querySelector('.relative') as HTMLElement, { clientX: 0 });
    const swatch = c
      .querySelector('[data-xen-v4-chart-tip]')
      ?.querySelector('[data-xen-v4-chart-swatch]');
    expect(swatch?.getAttribute('data-xen-v4-chart-swatch')).toBe('dashed');
    expect(swatch?.querySelector('line')?.getAttribute('stroke-dasharray')).toBe(
      `${CHART_MARK.stroke} ${CHART_MARK.stroke}`
    );
  });

  it('reports the pressed point to `onPointPress`', () => {
    const onPointPress = jest.fn();
    const c = mount(<LineChartV4 data={[1, 2, 3]} onPointPress={onPointPress} />);
    fireEvent.click(c.querySelector('.relative') as HTMLElement, { clientX: 0 });
    expect(onPointPress).toHaveBeenCalledWith(0);
  });

  // ── axis labels thin rather than rotate ─────────────────────────────

  it('thins axis labels instead of rotating them', () => {
    expect(thinAxisIndicesV4(4)).toEqual([0, 1, 2, 3]);
    expect(thinAxisIndicesV4(11)).toEqual([0, 2, 4, 6, 8, 10]);
    const c = mount(
      <LineChartV4
        data={Array.from({ length: 11 }, (_, i) => i)}
        labels={Array.from({ length: 11 }, (_, i) => `M${i}`)}
      />
    );
    expect(c.querySelectorAll('[data-xen-v4-chart-axis] > span').length).toBe(6);
  });

  // ── §4.7: the reveal ────────────────────────────────────────────────

  it('opts into the shared reveal, and can be told not to', () => {
    const on = mount(<LineChartV4 data={[1, 2]} />);
    expect(on.querySelector('svg')?.getAttribute('data-animate')).toBe('true');
    const off = mount(<LineChartV4 data={[1, 2]} animate={false} />);
    expect(off.querySelector('svg')?.getAttribute('data-animate')).toBeNull();
  });

  // ── §36: the readout arrives, it does not blink ────────────────────

  it('fades its crosshair readout in, from the line’s one shared rule', () => {
    const c = mount(<LineChartV4 data={[11, 22, 33]} labels={['Jan', 'Feb', 'Mar']} />);
    fireEvent.pointerMove(c.querySelector('.relative') as HTMLElement, { clientX: 0 });

    expect(c.querySelector('[data-xen-v4-chart-tip]')).not.toBeNull();
    // One rule for every readout in the module, rather than a keyframe per
    // figure — and `quick`, because it is feedback tied to a moving pointer.
    expect(chartSheet()).toContain('@keyframes xen-v4-chart-tip-in');
    expect(chartSheet()).toContain(
      `[data-xen-v4-chart-tip],
[data-xen-v4-chart-tooltip],`
    );
    expect(chartSheet()).toContain(`animation: xen-v4-chart-tip-in ${V4_MOTION.quick}ms ${EASE_STANDARD};`);
  });
});

describe('LineChartV4 — axis thinning', () => {
  /**
   * The regression this file exists for. A fractional step rounded per label
   * clumped instead of thinning: at 10 points and a cap of 6 it emitted
   * [0, 2, 4, 5, 7, 9], and 4 beside 5 printed two dates on top of each other
   * while the gaps either side were empty. Found by rendering a chart at 390pt,
   * not by a spec — so it gets a spec.
   */
  it('never emits adjacent indices', () => {
    for (let count = 1; count <= 60; count += 1) {
      const picked = thinAxisIndicesV4(count);
      if (count <= 6) {
        expect(picked).toHaveLength(count);
        continue;
      }
      for (let i = 1; i < picked.length; i += 1) {
        expect((picked[i] as number) - (picked[i - 1] as number)).toBeGreaterThan(1);
      }
    }
  });

  it('always keeps both ends — on a time axis they are the two that matter', () => {
    for (let count = 1; count <= 60; count += 1) {
      const picked = thinAxisIndicesV4(count);
      expect(picked[0]).toBe(0);
      expect(picked[picked.length - 1]).toBe(count - 1);
    }
  });

  it('never exceeds the cap, and stays inside the range', () => {
    for (let count = 1; count <= 60; count += 1) {
      const picked = thinAxisIndicesV4(count);
      expect(picked.length).toBeLessThanOrEqual(6);
      expect(picked.every((i) => i >= 0 && i < count)).toBe(true);
      expect([...picked].sort((a, b) => a - b)).toEqual(picked);
    }
  });

  it('handles the two cases that used to be the worst', () => {
    // 10 points: the clumping case.
    expect(thinAxisIndicesV4(10)).toEqual([0, 2, 4, 6, 9]);
    // 7 points: kept Mon/Tue/Wed side by side, then dropped Thu entirely.
    expect(thinAxisIndicesV4(7)).toEqual([0, 2, 4, 6]);
  });

  it('anchors the first and last labels to the plot edges instead of centring them', () => {
    const { container } = render(
      <LineChartV4
        data={[3, 9, 4, 8, 6, 11, 5, 12, 7, 10]}
        labels={['13 Aug', '14 Aug', '15 Aug', '16 Aug', '17 Aug', '18 Aug', '19 Aug', '20 Aug', '21 Aug', '22 Aug']}
      />
    );
    const axis = container.querySelector('[data-xen-v4-chart-axis]');
    const marks = Array.from(axis?.querySelectorAll('span[style]') ?? []) as HTMLElement[];
    expect(marks.length).toBeGreaterThan(2);
    // A centred label at 100% hangs half its width past the plot and wraps
    // inside a card; the ends are anchored, everything between is centred.
    expect(marks[0]?.className).not.toContain('-translate-x-1/2');
    expect(marks[marks.length - 1]?.className).not.toContain('-translate-x-1/2');
    expect(marks[1]?.className).toContain('-translate-x-1/2');
  });
});

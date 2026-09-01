/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import { CHART_V4_STYLE_ID } from './internal-v4';
import type { ThemeSeed } from '../theme/types';
import { GaugeChartV4 } from './GaugeChartV4';
import { radialThicknessV4 } from './ProgressRingV4';

const SEED: ThemeSeed = {
  primary: '#EA580C',
  neutral: 'warm',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container as unknown as HTMLElement;
}

/** The one sheet the whole V4 charts line injects — where its motion lives. */
const chartSheet = (): string => document.getElementById(CHART_V4_STYLE_ID)?.textContent ?? '';

function paths(root: HTMLElement): SVGPathElement[] {
  return Array.from(root.querySelectorAll('path'));
}

describe('GaugeChartV4 (web)', () => {
  // ── §5: chrome, thickness, and the needle that went ────────────────

  it('takes its track from the grid var, never `--xen-border`', () => {
    const root = draw(<GaugeChartV4 value={40} />);
    const [track] = paths(root);
    expect(track?.getAttribute('stroke')).toBe('var(--xen-chart-grid)');
    expect(root.innerHTML).not.toContain('var(--xen-border)');
  });

  it('derives the arc thickness from the size rather than shipping a 10', () => {
    const small = draw(<GaugeChartV4 value={40} size={120} />);
    const large = draw(<GaugeChartV4 value={40} size={300} />);
    expect(paths(small)[0]?.getAttribute('stroke-width')).toBe(String(radialThicknessV4(120)));
    expect(paths(large)[0]?.getAttribute('stroke-width')).toBe(String(radialThicknessV4(300)));
    // …and the two are genuinely different, which is the whole point.
    expect(radialThicknessV4(120)).not.toBe(radialThicknessV4(300));
  });

  it('drops the needle: two arcs, no line, no hub circle, no literal radii', () => {
    const root = draw(<GaugeChartV4 value={40} />);
    expect(paths(root).length).toBe(2);
    expect(root.querySelector('line')).toBeNull();
    expect(root.querySelector('circle')).toBeNull();
  });

  it('fills from slot 1, and reaches a status hue only through `tone`', () => {
    const plain = draw(<GaugeChartV4 value={40} />);
    expect(paths(plain)[1]?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
    const toned = draw(<GaugeChartV4 value={95} tone="danger" />);
    expect(paths(toned)[1]?.getAttribute('stroke')).toBe('var(--xen-danger)');
  });

  /*
    The value used to be an arc of its own, ending at `gaugePoint(t)` with a
    large-arc flag that flipped at the halfway mark. It is a dash on the
    track's geometry now — see `GaugeChartV4` — so what this asserts is the
    same claim, measured where the length actually lives: more value, less
    offset, and a full gauge landing at exactly zero.
  */
  it('shortens the dash offset as the value grows, and closes it at the ceiling', () => {
    const offsetOf = (el: HTMLElement): number =>
      Number(paths(el)[1]?.getAttribute('stroke-dashoffset'));

    const low = offsetOf(draw(<GaugeChartV4 value={10} />));
    const high = offsetOf(draw(<GaugeChartV4 value={90} />));
    const full = offsetOf(draw(<GaugeChartV4 value={100} />));

    expect(low).toBeGreaterThan(high);
    expect(full).toBe(0);
    // One fixed path, so the dash has something constant to run along: the
    // whole semicircle, every time, whatever the value is.
    expect(paths(draw(<GaugeChartV4 value={90} />))[1]?.getAttribute('d')).toBe(
      paths(draw(<GaugeChartV4 value={90} />))[0]?.getAttribute('d')
    );
  });

  // ── §5: a figure with a summary and NO legend ──────────────────────

  it('has no legend — one series has no identity to disambiguate', () => {
    const root = draw(<GaugeChartV4 value={40} title="Capacity" />);
    expect(root.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
    expect(root.querySelector('[data-xen-v4-chart-swatch]')).toBeNull();
  });

  it('draws the value as the summary, and takes a formatted override', () => {
    const plain = draw(<GaugeChartV4 value={72} />);
    expect(
      (plain.querySelector('[data-xen-v4-gauge-value]') as HTMLElement).textContent
    ).toBe('72');
    const formatted = draw(<GaugeChartV4 value={72} summary="72%" />);
    expect(
      (formatted.querySelector('[data-xen-v4-gauge-value]') as HTMLElement).textContent
    ).toBe('72%');
  });

  it('hides the visible number from assistive tech, which the label already carries', () => {
    const root = draw(<GaugeChartV4 value={72} />);
    const value = root.querySelector('[data-xen-v4-gauge-value]') as HTMLElement;
    expect(value.getAttribute('aria-hidden')).toBe('true');
  });

  it('drops the number on request', () => {
    const root = draw(<GaugeChartV4 value={72} showValue={false} />);
    expect(root.querySelector('[data-xen-v4-gauge-value]')).toBeNull();
  });

  it('renders title and caption around the plot', () => {
    const root = draw(<GaugeChartV4 value={72} title="Disk in use" caption="of 2 TB" />);
    expect(root.textContent).toContain('Disk in use');
    expect(root.textContent).toContain('of 2 TB');
  });

  // ── §4.5: empty, single value, loading ─────────────────────────────

  it('renders the empty state for a scale with no span, instead of lying with `|| 1`', () => {
    const root = draw(<GaugeChartV4 value={5} min={10} max={10} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(root.querySelector('svg')).toBeNull();
  });

  it('renders the empty state for an inverted scale', () => {
    const root = draw(<GaugeChartV4 value={5} min={100} max={0} emptyLabel="Bad range" />);
    expect(root.textContent).toContain('Bad range');
  });

  it('draws the track only at the floor of the scale, with no NaN', () => {
    // A gauge is a single value, so this IS its single-datum case: at `min`
    // the value arc's endpoints coincide and it is skipped rather than left to
    // the renderer's round-cap behaviour.
    const root = draw(<GaugeChartV4 value={0} />);
    expect(paths(root).length).toBe(1);
    expect(paths(root)[0]?.getAttribute('d')).not.toContain('NaN');
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('clamps out of range and survives a non-finite value', () => {
    const over = draw(<GaugeChartV4 value={9999} />);
    expect(over.querySelector('svg')?.getAttribute('aria-label')).toBe('Gauge, 100 of 100');
    const nan = draw(<GaugeChartV4 value={Number.NaN} min={10} max={20} />);
    expect(nan.querySelector('svg')?.getAttribute('aria-label')).toBe('Gauge, 10 of 20');
    expect(nan.innerHTML).not.toContain('NaN');
  });

  it('draws a full arc at the ceiling with no NaN', () => {
    const root = draw(<GaugeChartV4 value={100} />);
    expect(paths(root).length).toBe(2);
    for (const p of paths(root)) expect(p.getAttribute('d')).not.toContain('NaN');
  });

  it('swaps the plot for a skeleton when loading, keeping the title', () => {
    const root = draw(<GaugeChartV4 value={40} loading title="Capacity" />);
    expect(root.querySelector('svg')).toBeNull();
    expect(root.textContent).toContain('Capacity');
  });

  // ── §1 rule 6 ──────────────────────────────────────────────────────

  it('states its value in words on the plot itself', () => {
    const root = draw(<GaugeChartV4 value={72} />);
    const svg = root.querySelector('svg') as SVGSVGElement;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Gauge, 72 of 100');
  });

  // ── §36.6: a value that CHANGES has to move ────────────────────────

  it('eases the arc when the value changes after mount', () => {
    const { container, rerender } = render(
      <XenitionUIProvider theme={SEED}>
        <GaugeChartV4 value={40} />
      </XenitionUIProvider>
    );
    const before = Array.from(container.querySelectorAll('path'))[1] as SVGPathElement;
    const offsetBefore = Number(before.getAttribute('stroke-dashoffset'));

    rerender(
      <XenitionUIProvider theme={SEED}>
        <GaugeChartV4 value={75} />
      </XenitionUIProvider>
    );
    const after = Array.from(container.querySelectorAll('path'))[1] as SVGPathElement;

    expect(after).toBe(before);
    // The geometry is fixed and only the dash moved — which is the whole point
    // of drawing the value as a dash rather than as its own arc.
    expect(after.getAttribute('d')).toBe(before.getAttribute('d'));
    expect(Number(after.getAttribute('stroke-dashoffset'))).toBeLessThan(offsetBefore);
    expect(after.getAttribute('data-xen-v4-chart-fill')).toBe('');
    expect(chartSheet()).toContain(`stroke-dashoffset ${V4_MOTION.standard}ms`);
  });
});

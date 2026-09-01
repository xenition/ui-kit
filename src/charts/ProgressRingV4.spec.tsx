/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import { CHART_V4_STYLE_ID } from './internal-v4';
import type { ThemeSeed } from '../theme/types';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { ProgressRingV4, RADIAL_THICKNESS_RATIO, radialThicknessV4 } from './ProgressRingV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'pure',
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

function circles(root: HTMLElement): SVGCircleElement[] {
  return Array.from(root.querySelectorAll('circle'));
}

describe('ProgressRingV4 (web)', () => {
  // ── §5: the derived thickness ──────────────────────────────────────

  it('derives the thickness from the size and floors it at the smallest mark', () => {
    expect(radialThicknessV4(120)).toBe(120 * RADIAL_THICKNESS_RATIO);
    // Below the floor a track stops reading as a track and becomes a border.
    expect(radialThicknessV4(40)).toBe(CHART_MARK.dotSize);
    expect(radialThicknessV4(Number.NaN)).toBe(CHART_MARK.dotSize);
  });

  it('paints the ring at the derived width, and at an explicit one when given', () => {
    const derived = draw(<ProgressRingV4 value={50} size={200} />);
    expect(circles(derived)[0]?.getAttribute('stroke-width')).toBe(String(radialThicknessV4(200)));
    const explicit = draw(<ProgressRingV4 value={50} size={200} thickness={4} />);
    expect(circles(explicit)[0]?.getAttribute('stroke-width')).toBe('4');
  });

  // ── §3 decision 3: chrome is chrome ────────────────────────────────

  it('takes its track from the grid var, never `--xen-border`', () => {
    const root = draw(<ProgressRingV4 value={50} />);
    expect(circles(root)[0]?.getAttribute('stroke')).toBe('var(--xen-chart-grid)');
    expect(root.innerHTML).not.toContain('var(--xen-border)');
  });

  it('paints progress from slot 1, and a status hue only through `tone`', () => {
    const plain = draw(<ProgressRingV4 value={50} />);
    expect(circles(plain)[1]?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
    const toned = draw(<ProgressRingV4 value={95} tone="warn" />);
    expect(circles(toned)[1]?.getAttribute('stroke')).toBe('var(--xen-warn)');
  });

  // ── §4.2: it is a MARK, not a figure ───────────────────────────────

  it('takes none of the figure frame — no legend, no title slot', () => {
    const root = draw(<ProgressRingV4 value={50} />);
    expect(root.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
    // The whole component is the ring's own square footprint.
    const shell = root.querySelector('[data-xen-v4-progress-ring]') as HTMLElement;
    expect(shell.style.width).toBe('120px');
    expect(shell.style.height).toBe('120px');
  });

  it('shows the percentage, takes a label override, and drops both on request', () => {
    expect(
      (draw(<ProgressRingV4 value={37} />).querySelector('[data-xen-v4-ring-center]') as HTMLElement)
        .textContent
    ).toBe('37%');
    expect(
      (
        draw(<ProgressRingV4 value={37} label="3 of 8" />).querySelector(
          '[data-xen-v4-ring-center]'
        ) as HTMLElement
      ).textContent
    ).toBe('3 of 8');
    expect(
      draw(<ProgressRingV4 value={37} showValue={false} />).querySelector(
        '[data-xen-v4-ring-center]'
      )
    ).toBeNull();
  });

  it('hides the visible number from assistive tech, which the label already carries', () => {
    const root = draw(<ProgressRingV4 value={37} />);
    const centre = root.querySelector('[data-xen-v4-ring-center]') as HTMLElement;
    expect(centre.getAttribute('aria-hidden')).toBe('true');
  });

  // ── §4.5: empty, single value, loading ─────────────────────────────

  it('renders the empty state for a scale with no ceiling, keeping the footprint', () => {
    const root = draw(<ProgressRingV4 value={5} max={0} size={90} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('90px');
    expect(root.querySelector('svg')).toBeNull();
  });

  it('takes the empty state’s wording from the caller', () => {
    const root = draw(<ProgressRingV4 value={5} max={-1} emptyLabel="Not measured" />);
    expect(root.textContent).toContain('Not measured');
  });

  it('draws the track alone at zero, so a round cap cannot fake a small non-zero', () => {
    const root = draw(<ProgressRingV4 value={0} />);
    expect(circles(root).length).toBe(1);
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('closes the ring exactly at the ceiling — offset 0, no seam, no NaN', () => {
    const root = draw(<ProgressRingV4 value={100} />);
    const progress = circles(root)[1] as SVGCircleElement;
    expect(Number(progress.getAttribute('stroke-dashoffset'))).toBe(0);
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('clamps out of range and survives a non-finite value', () => {
    expect(
      draw(<ProgressRingV4 value={400} />).querySelector('svg')?.getAttribute('aria-label')
    ).toBe('Progress ring, 100%');
    const nan = draw(<ProgressRingV4 value={Number.NaN} />);
    expect(nan.querySelector('svg')?.getAttribute('aria-label')).toBe('Progress ring, 0%');
    expect(nan.innerHTML).not.toContain('NaN');
  });

  it('does not paint outside its own footprint at a very thick ring', () => {
    const root = draw(<ProgressRingV4 value={50} size={40} thickness={80} />);
    // The radius is inset by half the stroke and floored at zero rather than
    // going negative, which would put `NaN` in the geometry.
    expect(Number(circles(root)[0]?.getAttribute('r'))).toBe(0);
    expect(root.innerHTML).not.toContain('NaN');
  });

  it('swaps the ring for a skeleton at the same footprint when loading', () => {
    const root = draw(<ProgressRingV4 value={50} loading />);
    expect(root.querySelector('svg')).toBeNull();
    const shell = root.querySelector('[data-xen-v4-progress-ring]') as HTMLElement;
    expect(shell.style.width).toBe('120px');
  });

  // ── §1 rule 6: a mark still says its value in words ─────────────────

  it('states its value in words even though it carries no title', () => {
    const svg = draw(<ProgressRingV4 value={37} />).querySelector('svg') as SVGSVGElement;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Progress ring, 37%');
  });

  // ── §36.6: a value that CHANGES has to move ────────────────────────

  it('eases the arc when the value changes after mount', () => {
    const { container, rerender } = render(
      <XenitionUIProvider theme={SEED}>
        <ProgressRingV4 value={40} />
      </XenitionUIProvider>
    );
    const before = Array.from(container.querySelectorAll('circle'))[1] as SVGCircleElement;
    const offsetBefore = Number(before.getAttribute('stroke-dashoffset'));

    rerender(
      <XenitionUIProvider theme={SEED}>
        <ProgressRingV4 value={75} />
      </XenitionUIProvider>
    );
    const after = Array.from(container.querySelectorAll('circle'))[1] as SVGCircleElement;

    // The same node re-measured, so the dash offset is a property change a
    // transition can carry rather than a fresh element with a new length.
    expect(after).toBe(before);
    expect(Number(after.getAttribute('stroke-dashoffset'))).toBeLessThan(offsetBefore);
    expect(after.getAttribute('data-xen-v4-chart-fill')).toBe('');
    expect(chartSheet()).toContain(`stroke-dashoffset ${V4_MOTION.standard}ms`);
  });
});

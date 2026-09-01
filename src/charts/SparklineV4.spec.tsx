/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { SparklineV4 } from './SparklineV4';

const SEED: ThemeSeed = {
  primary: '#EA580C',
  neutral: 'warm',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

function root(container: HTMLElement): HTMLElement {
  return container.querySelector('[role="img"]') as HTMLElement;
}

function attrDump(container: HTMLElement): string {
  return Array.from(container.querySelectorAll('*'))
    .flatMap((el) => Array.from(el.attributes).map((a) => a.value))
    .join(' ');
}

describe('SparklineV4 (web)', () => {
  // ── §5 Group A: a mark, not a figure ────────────────────────────────

  it('carries none of the figure frame — no title, no legend, no axis', () => {
    const c = mount(<SparklineV4 data={[1, 4, 2, 6]} />);
    expect(c.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
    expect(c.querySelector('[data-xen-v4-chart-axis]')).toBeNull();
    expect(c.querySelector('[data-xen-v4-chart-grid]')).toBeNull();
    // …and it prints no words at all: the whole frame belongs to the figure
    // this mark sits inside.
    expect(root(c).textContent).toBe('');
  });

  // ── §1 rules 1–2: the palette and the marks ─────────────────────────

  it('takes slot 1 by default — the brand hue, not `var(--xen-primary)`', () => {
    const c = mount(<SparklineV4 data={[1, 2, 3]} />);
    const line = c.querySelector('[data-xen-v4-chart-line]');
    expect(line?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
    expect(attrDump(c)).not.toContain('var(--xen-primary)');
  });

  it('takes another slot when told to, and a status hue only via `tone`', () => {
    const slotted = mount(<SparklineV4 data={[1, 2]} slot={2} />);
    expect(
      slotted.querySelector('[data-xen-v4-chart-line]')?.getAttribute('stroke')
    ).toBe('var(--xen-chart-3)');

    const toned = mount(<SparklineV4 data={[1, 2]} tone="danger" />);
    expect(toned.querySelector('[data-xen-v4-chart-line]')?.getAttribute('stroke')).toBe(
      'var(--xen-danger)'
    );
  });

  it('throws past the fifth slot rather than cycling (§1 rule 4)', () => {
    expect(() => mount(<SparklineV4 data={[1, 2]} slot={5} />)).toThrow(/never cycled/);
  });

  it('strokes at CHART_MARK.stroke — `strokeWidth={1.5}` is retired', () => {
    const c = mount(<SparklineV4 data={[1, 2, 3]} />);
    expect(
      c.querySelector('[data-xen-v4-chart-line]')?.getAttribute('stroke-width')
    ).toBe(String(CHART_MARK.stroke));
    expect(attrDump(c)).not.toContain('1.5');
  });

  // ── §4.5: empty, single datum, loading, all at one footprint ────────

  it('keeps the footprint when there is no data, as a recessive baseline', () => {
    const c = mount(<SparklineV4 data={[]} width={100} height={28} />);
    const svg = c.querySelector('svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('100');
    expect(svg.getAttribute('height')).toBe('28');
    const rule = c.querySelector('[data-xen-v4-chart-empty]');
    expect(rule?.getAttribute('stroke')).toBe('var(--xen-chart-grid)');
    // Never `null`, and never a bare string that would change the height.
    expect(root(c).textContent).toBe('');
  });

  it('says “no data” in words even though it has no room to print it', () => {
    const c = mount(<SparklineV4 data={[]} />);
    expect(root(c).getAttribute('aria-label')).toBe('Sparkline, no data');
  });

  it('shows the skeleton at the mark’s own footprint while loading', () => {
    const c = mount(<SparklineV4 data={[1, 2]} loading width={120} height={30} />);
    expect(c.querySelector('[data-xen-v4-skeleton]')).not.toBeNull();
    expect(c.querySelector('[data-xen-v4-chart-line]')).toBeNull();
  });

  it('draws ONE datum as a centred dot, with no divide-by-zero', () => {
    const c = mount(<SparklineV4 data={[9]} width={100} height={28} />);
    expect(attrDump(c)).not.toMatch(/NaN|Infinity/);
    expect(c.querySelector('[data-xen-v4-chart-line]')).toBeNull();
    const ring = c.querySelector('[data-xen-v4-mark-ring]');
    expect(ring).not.toBeNull();
    expect(ring?.getAttribute('x1')).toBe('50');
    expect(ring?.getAttribute('stroke-width')).toBe(
      String(CHART_MARK.dotSize + CHART_MARK.ring * 2)
    );
  });

  it('draws a FLAT series as a level line rather than dividing by zero', () => {
    const c = mount(<SparklineV4 data={[4, 4, 4]} width={100} height={28} />);
    const points = c.querySelector('[data-xen-v4-chart-line]')?.getAttribute('points') ?? '';
    expect(points).not.toMatch(/NaN|Infinity/);
    expect(new Set(points.split(' ').map((p) => p.split(',')[1])).size).toBe(1);
  });

  it('honours an explicit `min` / `max` window', () => {
    const c = mount(<SparklineV4 data={[5]} min={0} max={10} width={100} height={28} />);
    // Half of the inner band, so the dot sits mid-box rather than at the floor.
    expect(c.querySelector('[data-xen-v4-mark-ring]')?.getAttribute('y1')).toBe('14');
  });

  // ── §1 rule 6: it says its value in words ───────────────────────────

  it('derives a sentence naming the count and the range', () => {
    const c = mount(<SparklineV4 data={[3, 9, 6]} />);
    expect(root(c).getAttribute('aria-label')).toBe('Sparkline, 3 points, 3 to 9');
  });

  it('says “1 point” rather than “1 points”, and takes an override', () => {
    expect(root(mount(<SparklineV4 data={[2]} />)).getAttribute('aria-label')).toBe(
      'Sparkline, 1 point, 2 to 2'
    );
    expect(
      root(mount(<SparklineV4 data={[1, 2]} aria-label="Signups, up" />)).getAttribute(
        'aria-label'
      )
    ).toBe('Signups, up');
  });

  // ── §4.7: the reveal ────────────────────────────────────────────────

  it('opts into the shared reveal, and can be told not to', () => {
    expect(mount(<SparklineV4 data={[1, 2]} />).querySelector('svg')?.getAttribute('data-animate')).toBe(
      'true'
    );
    expect(
      mount(<SparklineV4 data={[1, 2]} animate={false} />)
        .querySelector('svg')
        ?.getAttribute('data-animate')
    ).toBeNull();
  });
});

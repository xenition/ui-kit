/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import { CHART_V4_STYLE_ID } from './internal-v4';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import type { ThemeSeed } from '../theme/types';
import { RANGE_BAR_V4_STYLE_ID, RangeBarV4 } from './RangeBarV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container.querySelector('[data-xen-v4-range-bar]') as HTMLElement;
}

function sheet(): string {
  return document.getElementById(RANGE_BAR_V4_STYLE_ID)?.textContent ?? '';
}

/** The one sheet the whole V4 charts line injects — where its motion lives. */
const chartSheet = (): string => document.getElementById(CHART_V4_STYLE_ID)?.textContent ?? '';

function mark(root: HTMLElement): HTMLElement {
  return root.querySelector('[data-xen-v4-range]') as HTMLElement;
}

/** A percentage style value as a number — float noise is not the assertion. */
function pct(value: string): number {
  return Number.parseFloat(value);
}

function styleAttributes(root: HTMLElement): string {
  return Array.from(root.querySelectorAll('*'))
    .map((el) => el.getAttribute('style') ?? '')
    .join(' | ');
}

describe('RangeBarV4 (web)', () => {
  // ── §4.4: the one form rounded at BOTH ends ────────────────────────

  it('rounds both ends, because neither end of a range is a baseline', () => {
    const root = mount(<RangeBarV4 start={20} end={60} />);
    // A single `border-radius` is all four corners — the exception §5 grants
    // this form and grants no other in the family.
    expect(mark(root).style.borderRadius).toBe(`${CHART_MARK.endRadius}px`);
  });

  it('positions the band by its share of the domain', () => {
    const root = mount(<RangeBarV4 start={20} end={60} domainMin={0} domainMax={200} />);
    expect(pct(mark(root).style.left)).toBeCloseTo(10, 6);
    expect(pct(mark(root).style.width)).toBeCloseTo(20, 6);
  });

  it('clamps a band that runs past its domain rather than overflowing the track', () => {
    const root = mount(<RangeBarV4 start={-50} end={500} domainMin={0} domainMax={100} />);
    expect(pct(mark(root).style.left)).toBeCloseTo(0, 6);
    expect(pct(mark(root).style.width)).toBeCloseTo(100, 6);
  });

  it('reads a reversed pair as a range rather than a negative width', () => {
    const root = mount(<RangeBarV4 start={80} end={20} domainMin={0} domainMax={100} />);
    expect(pct(mark(root).style.left)).toBeCloseTo(20, 6);
    expect(pct(mark(root).style.width)).toBeCloseTo(60, 6);
  });

  // ── §4.1 / rule 2: slot 1, or a tone that means something ──────────

  it('paints the band slot 1, and `tone` is the only route to a status hue', () => {
    const plain = mount(<RangeBarV4 start={20} end={60} />);
    expect(plain.style.getPropertyValue('--xen-v4-mark-fill')).toBe('var(--xen-chart-1)');

    const toned = mount(<RangeBarV4 start={20} end={60} tone="warn" />);
    expect(toned.style.getPropertyValue('--xen-v4-mark-fill')).toBe('var(--xen-warn)');
  });

  // ── §3.3: track is grid, the domain rule is axis ───────────────────

  it('takes the track from the grid token and draws a domain axis the base never had', () => {
    const root = mount(<RangeBarV4 start={20} end={60} />);
    expect(root.querySelector('[data-xen-v4-chart-track]')).not.toBeNull();
    expect(root.querySelector('[data-xen-v4-chart-axis]')).not.toBeNull();

    const css = sheet();
    expect(css).toContain('[data-xen-v4-chart-track] { background-color: var(--xen-chart-grid); }');
    expect(css).toContain('[data-xen-v4-chart-axis] { background-color: var(--xen-chart-axis); }');
    // The base painted `colors.border` — a hairline colour doing a fill's job.
    expect(css).not.toContain('--xen-border');
  });

  it('sizes the track from `height`', () => {
    const root = mount(<RangeBarV4 start={20} end={60} height={14} />);
    expect((root.querySelector('[data-xen-v4-chart-track]') as HTMLElement).style.height).toBe(
      '14px'
    );
  });

  it('gives the bar the 44 tap floor even though the mark is 10', () => {
    const root = mount(<RangeBarV4 start={20} end={60} />);
    const plot = root.querySelector('[data-xen-v4-chart-plot]') as HTMLElement;
    expect(plot.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
  });

  // ── §4.2 / §4.4: the figure frame and the direct labels ────────────

  it('renders the title, summary and caption slots', () => {
    const root = mount(
      <RangeBarV4 start={20} end={60} title="Latency" summary="240ms" caption="p50 to p95" />
    );
    expect(root.textContent).toContain('Latency');
    expect(root.textContent).toContain('240ms');
    expect(root.textContent).toContain('p50 to p95');
  });

  it('labels the domain ends and the band by default, and stops when told to', () => {
    const on = mount(<RangeBarV4 start={20} end={60} domainMin={0} domainMax={100} />);
    expect(on.textContent).toContain('0');
    expect(on.textContent).toContain('100');
    expect((on.querySelector('[data-xen-v4-chart-value]') as HTMLElement).textContent).toBe(
      '20–60'
    );

    const off = mount(<RangeBarV4 start={20} end={60} showValues={false} tooltip={false} />);
    expect(off.querySelector('[data-xen-v4-chart-value]')).toBeNull();
  });

  it('`format` spells every number it shows', () => {
    const root = mount(
      <RangeBarV4 start={20} end={60} domainMax={100} format={(v) => `${v}ms`} />
    );
    expect((root.querySelector('[data-xen-v4-chart-value]') as HTMLElement).textContent).toBe(
      '20ms–60ms'
    );
    expect(root.textContent).toContain('100ms');
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state when the domain cannot be read', () => {
    const root = mount(<RangeBarV4 start={20} end={60} domainMin={100} domainMax={100} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(root.querySelector('[data-xen-v4-range]')).toBeNull();
    // The base divided by `Math.max(span, 1)` and drew a confident band anyway.
    expect(styleAttributes(root)).not.toContain('NaN');
  });

  it('renders the empty state for a non-numeric endpoint', () => {
    const root = mount(<RangeBarV4 start={Number.NaN} end={60} />);
    expect(root.textContent).toContain('No data');
    expect(styleAttributes(root)).not.toContain('NaN');
  });

  it('takes a custom empty label', () => {
    const root = mount(<RangeBarV4 start={0} end={1} domainMax={0} emptyLabel="No reading" />);
    expect(root.textContent).toContain('No reading');
  });

  it('draws a zero-width range as a point rather than as nothing', () => {
    const root = mount(<RangeBarV4 start={40} end={40} domainMax={100} />);
    const band = mark(root);
    expect(pct(band.style.width)).toBeCloseTo(0, 6);
    // The single-datum case: a collapsed range is a real reading, and a point
    // in this line is `dotSize`.
    expect(band.style.minWidth).toBe(`${CHART_MARK.dotSize}px`);
    expect((root.querySelector('[data-xen-v4-chart-value]') as HTMLElement).textContent).toBe('40');
    expect(styleAttributes(root)).not.toContain('NaN');
    expect(styleAttributes(root)).not.toContain('Infinity');
  });

  it('holds the footprint with a skeleton while loading', () => {
    const root = mount(<RangeBarV4 start={20} end={60} loading />);
    expect(root.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(root.querySelector('[data-xen-v4-range]')).toBeNull();
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline, the band and the domain', () => {
    const root = mount(<RangeBarV4 start={20} end={60} domainMax={100} title="Latency" />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe(
      'Range bar, Latency, 20 to 60, on a scale of 0 to 100'
    );
  });

  it('collapses the range in the sentence when it is a single value', () => {
    const root = mount(<RangeBarV4 start={40} end={40} domainMax={100} />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe('Range bar, 40, on a scale of 0 to 100');
  });

  it('lets the caller override the sentence', () => {
    const root = mount(<RangeBarV4 start={20} end={60} aria-label="Well inside budget" />);
    expect(root.getAttribute('aria-label')).toBe('Well inside budget');
  });

  // ── §4.6: interaction ──────────────────────────────────────────────

  it('reveals the band in words on hover when the labels are off', () => {
    const root = mount(<RangeBarV4 start={20} end={60} showValues={false} />);
    expect(root.querySelector('[data-xen-v4-chart-value]')).toBeNull();
    fireEvent.pointerOver(root.querySelector('[data-xen-v4-chart-plot]') as HTMLElement);
    expect((root.querySelector('[data-xen-v4-chart-value]') as HTMLElement).textContent).toBe(
      '20–60'
    );
  });

  it('reports the ordered pair to `onSelect`', () => {
    const onSelect = jest.fn();
    const root = mount(<RangeBarV4 start={60} end={20} onSelect={onSelect} />);
    fireEvent.click(root.querySelector('[data-xen-v4-chart-plot]') as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith(20, 60);
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('reveals once by default and stays still when asked to', () => {
    const on = mount(<RangeBarV4 start={20} end={60} />);
    expect(
      (on.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBe('true');

    const off = mount(<RangeBarV4 start={20} end={60} animate={false} />);
    expect(
      (off.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBeNull();
  });

  // ── §36.6: a band that MOVES has to travel ────────────────────────

  it('eases both of the band’s ends when the range changes after mount', () => {
    const { container, rerender } = render(
      <XenitionUIProvider theme={SEED}>
        <RangeBarV4 start={10} end={30} />
      </XenitionUIProvider>
    );
    const root = container.querySelector('[data-xen-v4-range-bar]') as HTMLElement;
    const before = mark(root);
    expect(pct(before.style.left)).toBeCloseTo(10);

    rerender(
      <XenitionUIProvider theme={SEED}>
        <RangeBarV4 start={50} end={80} />
      </XenitionUIProvider>
    );
    const after = mark(container.querySelector('[data-xen-v4-range-bar]') as HTMLElement);

    expect(after).toBe(before);
    expect(pct(after.style.left)).toBeCloseTo(50);
    expect(after.getAttribute('data-xen-v4-chart-fill')).toBe('');
    // A range has no baseline, so BOTH ends are data and both have to travel.
    expect(chartSheet()).toContain(`left ${V4_MOTION.standard}ms`);
    expect(chartSheet()).toContain(`width ${V4_MOTION.standard}ms`);
  });
});

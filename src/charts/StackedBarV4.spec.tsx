/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import {
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
} from '../primitives/internal/v4-chart';
import type { ThemeSeed } from '../theme/types';
import { STACKED_BAR_V4_STYLE_ID, StackedBarV4 } from './StackedBarV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const SEGMENTS = [
  { value: 52, label: 'Direct' },
  { value: 30, label: 'Referral' },
  { value: 18, label: 'Organic' },
];

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container.querySelector('[data-xen-v4-stacked-bar]') as HTMLElement;
}

function sheet(): string {
  return document.getElementById(STACKED_BAR_V4_STYLE_ID)?.textContent ?? '';
}

function parts(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll('[data-xen-v4-segment]'));
}

function styleAttributes(root: HTMLElement): string {
  return Array.from(root.querySelectorAll('*'))
    .map((el) => el.getAttribute('style') ?? '')
    .join(' | ');
}

describe('StackedBarV4 (web)', () => {
  // ── §4.1 / rule 2: slots in order, never the semantic cycle ────────

  it('takes the palette slots in order and never a status hue as an identity', () => {
    const root = mount(<StackedBarV4 segments={SEGMENTS} />);
    const fills = parts(root).map((el) => el.style.getPropertyValue('--xen-v4-mark-fill'));
    expect(fills).toEqual(['var(--xen-chart-1)', 'var(--xen-chart-2)', 'var(--xen-chart-3)']);
    // The base painted segment 3 `success` and segment 4 `warn`.
    expect(fills.join(' ')).not.toContain('--xen-success');
    expect(fills.join(' ')).not.toContain('--xen-warn');
    expect(sheet()).toContain(
      '[data-xen-v4-segment] { background-color: var(--xen-v4-mark-fill); }'
    );
  });

  it('retires the descending-opacity steps that made segment four look disabled', () => {
    const root = mount(<StackedBarV4 segments={SEGMENTS} />);
    parts(root).forEach((el) => {
      expect(el.style.opacity).toBe('');
      expect(el.getAttribute('fill-opacity')).toBeNull();
    });
    expect(styleAttributes(root)).not.toContain('opacity');
  });

  it('paints status when every segment asks for it', () => {
    const root = mount(
      <StackedBarV4
        segments={[
          { value: 8, label: 'Passed', tone: 'success' },
          { value: 2, label: 'Failed', tone: 'danger' },
        ]}
      />
    );
    const fills = parts(root).map((el) => el.style.getPropertyValue('--xen-v4-mark-fill'));
    expect(fills).toEqual(['var(--xen-success)', 'var(--xen-danger)']);
  });

  it('refuses a stack that mixes status colour with slot colour (rule 3)', () => {
    // A stack where segment 2 is "failed" red and segment 4 is red because it
    // is fourth cannot say which red it means.
    expect(() =>
      mount(
        <StackedBarV4
          segments={[{ value: 8, label: 'Passed', tone: 'success' }, { value: 2, label: 'Other' }]}
        />
      )
    ).toThrow(/status colour or slot colour, never both/);
  });

  it('folds past the last slot rather than throwing — a stack’s count is data', () => {
    // The palette still throws; the COMPONENT folds. A stack handed six
    // segments from a live API must not take the page down with a `RangeError`
    // (`foldChartSeries` in `primitives/internal/v4-chart.ts`).
    const root = mount(<StackedBarV4 segments={[1, 2, 3, 4, 5, 6].map((v) => ({ value: v }))} />);
    // Five drawn parts, not six, and the fifth is the folded tail.
    expect(parts(root)).toHaveLength(CHART_SERIES_COUNT);
    expect(root.textContent).toContain(CHART_OVERFLOW_LABEL);
    // The total is conserved: 5 + 6 = 11 of 21, so the tail is the widest part.
    const grows = parts(root).map((p) => Number(p.style.flexGrow));
    expect(grows[CHART_SERIES_COUNT - 1]).toBeCloseTo(11 / 21, 5);
    expect(grows.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 5);
  });

  // ── §1 rule 5: the gap IS the secondary encoding ───────────────────

  it('runs a `CHART_MARK.gap` of page between segments', () => {
    const root = mount(<StackedBarV4 segments={SEGMENTS} />);
    const bar = (parts(root)[0] as HTMLElement).parentElement as HTMLElement;
    expect(bar.style.gap).toBe(`${CHART_MARK.gap}px`);
  });

  it('always carries a legend at two or more segments, and lets it be turned off', () => {
    const on = mount(<StackedBarV4 segments={SEGMENTS} />);
    expect(on.querySelector('[data-xen-v4-chart-legend]')).not.toBeNull();
    expect(on.querySelectorAll('[data-xen-v4-legend-swatch]')).toHaveLength(3);
    expect(on.textContent).toContain('Direct');

    const off = mount(<StackedBarV4 segments={SEGMENTS} legend={false} />);
    expect(off.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
  });

  it('sizes the legend swatch from `CHART_MARK.dotSize`, not a 10px literal', () => {
    mount(<StackedBarV4 segments={SEGMENTS} />);
    expect(sheet()).toContain(`width: ${CHART_MARK.dotSize}px`);
    expect(sheet()).not.toContain('10px');
  });

  it('puts the direct labels in the legend at four segments or fewer', () => {
    const four = mount(<StackedBarV4 segments={SEGMENTS} />);
    expect(four.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(3);

    const five = mount(<StackedBarV4 segments={[1, 2, 3, 4, 5].map((v) => ({ value: v }))} />);
    expect(five.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(0);
  });

  it('`showValues` and `format` steer the legend numbers', () => {
    const root = mount(
      <StackedBarV4 segments={SEGMENTS} showValues format={(v) => `${v}%`} />
    );
    expect(root.textContent).toContain('52%');
  });

  // ── §4.4: rounding ─────────────────────────────────────────────────

  it('rounds the data end only — the last segment, never the first', () => {
    const root = mount(<StackedBarV4 segments={SEGMENTS} />);
    const [first, , last] = parts(root);
    expect((first as HTMLElement).style.borderTopRightRadius).toBe('');
    expect((first as HTMLElement).style.borderTopLeftRadius).toBe('');
    expect((last as HTMLElement).style.borderTopRightRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect((last as HTMLElement).style.borderBottomRightRadius).toBe(`${CHART_MARK.endRadius}px`);
  });

  it('sizes each segment by its share of the total', () => {
    const root = mount(<StackedBarV4 segments={SEGMENTS} />);
    const grow = parts(root).map((el) => Number(el.style.flexGrow));
    expect(grow[0]).toBeCloseTo(0.52, 5);
    expect(grow[1]).toBeCloseTo(0.3, 5);
    expect(grow[2]).toBeCloseTo(0.18, 5);
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders the title, summary and caption slots and honours `height`', () => {
    const root = mount(
      <StackedBarV4
        segments={SEGMENTS}
        title="Traffic"
        summary="12,400"
        caption="last 30 days"
        height={24}
      />
    );
    expect(root.textContent).toContain('Traffic');
    expect(root.textContent).toContain('12,400');
    expect(root.textContent).toContain('last 30 days');
    const bar = (parts(root)[0] as HTMLElement).parentElement as HTMLElement;
    expect(bar.style.height).toBe('24px');
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the footprint, never nothing', () => {
    const root = mount(<StackedBarV4 segments={[]} height={20} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('20px');
  });

  it('treats an all-zero stack as empty rather than dividing by zero', () => {
    const root = mount(<StackedBarV4 segments={[{ value: 0 }, { value: 0 }]} />);
    expect(parts(root)).toHaveLength(0);
    const styles = styleAttributes(root);
    expect(styles).not.toContain('NaN');
    expect(styles).not.toContain('Infinity');
    expect(root.textContent).toContain('No data');
  });

  it('renders one segment for one segment, at the full width', () => {
    const root = mount(<StackedBarV4 segments={[{ value: 9, label: 'Only' }]} />);
    expect(parts(root)).toHaveLength(1);
    expect(Number((parts(root)[0] as HTMLElement).style.flexGrow)).toBeCloseTo(1, 5);
    // One series needs no legend — colour is not carrying identity.
    expect(root.querySelector('[data-xen-v4-chart-legend]')).toBeNull();
    expect(styleAttributes(root)).not.toContain('NaN');
  });

  it('holds the footprint with a skeleton while loading', () => {
    const root = mount(<StackedBarV4 segments={[]} loading />);
    expect(root.querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline and every share', () => {
    const root = mount(<StackedBarV4 segments={SEGMENTS} title="Traffic" />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe(
      'Stacked bar, Traffic, 3 segments, Direct 52%, Referral 30%, Organic 18%'
    );
  });

  it('singularises at one segment and names an unlabelled one by position', () => {
    const root = mount(<StackedBarV4 segments={[{ value: 9 }]} />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe('Stacked bar, 1 segment, Segment 1 100%');
  });

  it('lets the caller override the sentence', () => {
    const root = mount(<StackedBarV4 segments={SEGMENTS} aria-label="Direct dominates" />);
    expect(root.getAttribute('aria-label')).toBe('Direct dominates');
  });

  // ── §4.6: interaction ──────────────────────────────────────────────

  it('carries the precise value in the tooltip', () => {
    const root = mount(<StackedBarV4 segments={SEGMENTS} />);
    fireEvent.pointerOver(parts(root)[1] as HTMLElement);
    const tip = root.querySelector('[data-xen-v4-chart-tooltip]') as HTMLElement;
    expect(tip.textContent).toContain('Referral: 30');
  });

  it('reports the index and the value to `onSelect`', () => {
    const onSelect = jest.fn();
    const root = mount(<StackedBarV4 segments={SEGMENTS} onSelect={onSelect} />);
    fireEvent.click(parts(root)[2] as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith(2, 18);
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('reveals once by default and stays still when asked to', () => {
    const on = mount(<StackedBarV4 segments={SEGMENTS} />);
    expect(
      (on.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBe('true');

    const off = mount(<StackedBarV4 segments={SEGMENTS} animate={false} />);
    expect(
      (off.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBeNull();
  });
});

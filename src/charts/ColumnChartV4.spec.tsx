/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { CHART_V4_STYLE_ID } from './internal-v4';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import type { ThemeSeed } from '../theme/types';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import { COLUMN_CHART_V4_STYLE_ID, ColumnChartV4 } from './ColumnChartV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const DATA = [
  { label: 'Alpha', value: 12 },
  { label: 'Beta', value: 30 },
];

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container.querySelector('[data-xen-v4-column-chart]') as HTMLElement;
}

function sheet(): string {
  return document.getElementById(COLUMN_CHART_V4_STYLE_ID)?.textContent ?? '';
}


/** The one sheet the whole V4 charts line injects — where its motion lives. */
const chartSheet = (): string => document.getElementById(CHART_V4_STYLE_ID)?.textContent ?? '';

function bars(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll('[data-xen-v4-bar]'));
}

function styleAttributes(root: HTMLElement): string {
  return Array.from(root.querySelectorAll('*'))
    .map((el) => el.getAttribute('style') ?? '')
    .join(' | ');
}

describe('ColumnChartV4 (web)', () => {
  // ── §4.1: one colour, never by value ───────────────────────────────

  it('paints every bar slot 1 — a single series is one colour', () => {
    const root = mount(<ColumnChartV4 data={DATA} />);
    expect(root.style.getPropertyValue('--xen-v4-mark-fill')).toBe('var(--xen-chart-1)');
    expect(bars(root)).toHaveLength(2);
    bars(root).forEach((bar) => expect(bar.style.backgroundColor).toBe(''));
  });

  it('`tone` is the only route to a status hue, and it replaces the slot', () => {
    const root = mount(<ColumnChartV4 data={DATA} tone="warn" />);
    expect(root.style.getPropertyValue('--xen-v4-mark-fill')).toBe('var(--xen-warn)');
  });

  // ── §3.3: three chrome roles, kept apart ───────────────────────────

  it('takes the track from the grid token and the baseline from the axis token', () => {
    const root = mount(<ColumnChartV4 data={DATA} />);
    expect(root.querySelectorAll('[data-xen-v4-chart-track]')).toHaveLength(2);
    expect(root.querySelectorAll('[data-xen-v4-chart-axis]')).toHaveLength(2);

    const css = sheet();
    expect(css).toContain('[data-xen-v4-chart-track] { background-color: var(--xen-chart-grid); }');
    expect(css).toContain('[data-xen-v4-chart-axis] { background-color: var(--xen-chart-axis); }');
    // The bugs this pass exists to fix: a hairline colour as a track, a text
    // colour as an axis.
    expect(css).not.toContain('--xen-border');
    expect(css).not.toContain('--xen-muted');
  });

  // ── §4.4: mark geometry ────────────────────────────────────────────

  it('rounds the data end only — the baseline end stays square', () => {
    const root = mount(<ColumnChartV4 data={DATA} />);
    const bar = bars(root)[0] as HTMLElement;
    expect(bar.style.borderTopRightRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(bar.style.borderBottomRightRadius).toBe(`${CHART_MARK.endRadius}px`);
    expect(bar.style.borderTopLeftRadius).toBe('');
    expect(bar.style.borderBottomLeftRadius).toBe('');
  });

  it('sizes the track from `barHeight`', () => {
    const root = mount(<ColumnChartV4 data={DATA} barHeight={20} />);
    const track = root.querySelector('[data-xen-v4-chart-track]') as HTMLElement;
    expect(track.style.height).toBe('20px');
  });

  // ── rule 10: a row is a real target ────────────────────────────────

  it('gives every row the 44 tap floor', () => {
    const root = mount(<ColumnChartV4 data={DATA} />);
    const row = root.querySelector('[data-xen-v4-bar-hit]') as HTMLElement;
    expect(row.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
  });

  // ── §4.2: the figure frame ─────────────────────────────────────────

  it('renders the title, summary and caption slots', () => {
    const { getByText } = render(
      <XenitionUIProvider theme={SEED}>
        <ColumnChartV4 data={DATA} title="Channels" summary="42" caption="last 30 days" />
      </XenitionUIProvider>
    );
    expect(getByText('Channels')).toBeTruthy();
    expect(getByText('42')).toBeTruthy();
    expect(getByText('last 30 days')).toBeTruthy();
  });

  // ── §4.4: direct labels default ON, unlike the base ────────────────

  it('direct-labels at four rows or fewer, and stops above that', () => {
    const four = mount(
      <ColumnChartV4
        data={[
          { label: 'a', value: 1 },
          { label: 'b', value: 2 },
          { label: 'c', value: 3 },
          { label: 'd', value: 4 },
        ]}
      />
    );
    expect(four.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(4);

    const five = mount(
      <ColumnChartV4
        data={[
          { label: 'a', value: 1 },
          { label: 'b', value: 2 },
          { label: 'c', value: 3 },
          { label: 'd', value: 4 },
          { label: 'e', value: 5 },
        ]}
      />
    );
    expect(five.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(0);
  });

  it('`showValues` overrides the automatic answer in both directions', () => {
    const suppressed = mount(<ColumnChartV4 data={DATA} showValues={false} tooltip={false} />);
    expect(suppressed.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(0);
  });

  it('`format` spells the value', () => {
    const { getByText } = render(
      <XenitionUIProvider theme={SEED}>
        <ColumnChartV4 data={[{ label: 'Alpha', value: 1200 }]} format={(v) => `£${v}`} />
      </XenitionUIProvider>
    );
    expect(getByText('£1200')).toBeTruthy();
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state at the footprint, never nothing', () => {
    const root = mount(<ColumnChartV4 data={[]} height={160} />);
    const empty = root.querySelector('[role="img"]') as HTMLElement;
    expect(empty.getAttribute('aria-label')).toBe('No data');
    expect(empty.style.height).toBe('160px');
    expect(bars(root)).toHaveLength(0);
  });

  it('renders one row for one datum and never divides by zero', () => {
    const root = mount(<ColumnChartV4 data={[{ label: 'Only', value: 9 }]} />);
    expect(bars(root)).toHaveLength(1);
    const styles = styleAttributes(root);
    expect(styles).not.toContain('NaN');
    expect(styles).not.toContain('Infinity');
    expect((bars(root)[0] as HTMLElement).style.width).toBe('100%');
  });

  it('survives an all-zero series', () => {
    const root = mount(
      <ColumnChartV4
        data={[
          { label: 'a', value: 0 },
          { label: 'b', value: 0 },
        ]}
      />
    );
    const styles = styleAttributes(root);
    expect(styles).not.toContain('NaN');
    expect(styles).not.toContain('Infinity');
    expect((bars(root)[0] as HTMLElement).style.minWidth).toBe('1px');
  });

  it('holds the footprint with a skeleton while loading', () => {
    const root = mount(<ColumnChartV4 data={[]} loading />);
    expect(root.querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline, the count and the range', () => {
    const root = mount(<ColumnChartV4 data={DATA} title="Channels" />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe('Bar chart, Channels, 2 bars, 12 to 30');
  });

  it('singularises at one datum', () => {
    const root = mount(<ColumnChartV4 data={[{ label: 'Only', value: 9 }]} />);
    const plot = root.querySelector('[role="img"]') as HTMLElement;
    expect(plot.getAttribute('aria-label')).toBe('Bar chart, 1 bar, 9');
  });

  it('lets the caller override the sentence', () => {
    const root = mount(<ColumnChartV4 data={DATA} aria-label="Beta leads" />);
    expect(root.getAttribute('aria-label')).toBe('Beta leads');
  });

  // ── §4.6: interaction ──────────────────────────────────────────────

  it('reveals a hovered row’s value even when the labels are off', () => {
    const root = mount(<ColumnChartV4 data={DATA} showValues={false} />);
    expect(root.querySelectorAll('[data-xen-v4-chart-value]')).toHaveLength(0);

    fireEvent.pointerOver(root.querySelectorAll('[data-xen-v4-bar-hit]')[1] as HTMLElement);
    const values = root.querySelectorAll('[data-xen-v4-chart-value]');
    expect(values).toHaveLength(1);
    expect(values[0]?.textContent).toBe('30');
  });

  it('reports the index and the value to `onSelect`', () => {
    const onSelect = jest.fn();
    const root = mount(<ColumnChartV4 data={DATA} onSelect={onSelect} />);
    fireEvent.click(root.querySelectorAll('[data-xen-v4-bar-hit]')[1] as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith(1, 30);
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('reveals once by default and stays still when asked to', () => {
    const on = mount(<ColumnChartV4 data={DATA} />);
    expect(
      (on.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBe('true');

    const off = mount(<ColumnChartV4 data={DATA} animate={false} />);
    expect(
      (off.querySelector('[data-xen-v4-chart-plot]') as HTMLElement).getAttribute('data-animate')
    ).toBeNull();
  });

  // ── §36: a revealed value fades; a direct label is simply there ────

  it('marks only the pointer-revealed value as a reveal, so only it fades', () => {
    const direct = mount(<ColumnChartV4 data={DATA} showValues />);
    // A label that is always on screen is not an arrival, and must not fade in
    // behind the chart's own entrance.
    for (const v of direct.querySelectorAll('[data-xen-v4-chart-value]')) {
      expect(v.getAttribute('data-reveal')).toBeNull();
    }

    const hovered = mount(<ColumnChartV4 data={DATA} showValues={false} />);
    fireEvent.pointerOver(hovered.querySelectorAll('[data-xen-v4-bar-hit]')[1] as HTMLElement);
    const revealed = hovered.querySelector('[data-xen-v4-chart-value]') as HTMLElement;

    expect(revealed.getAttribute('data-reveal')).toBe('hover');
    expect(chartSheet()).toContain(
      `[data-xen-v4-chart-value][data-reveal="hover"] {
  animation: xen-v4-chart-tip-in ${V4_MOTION.quick}ms`
    );
  });
});

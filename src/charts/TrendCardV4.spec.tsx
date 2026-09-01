/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { TREND_CARD_V4_STYLE_ID, TrendCardV4 } from './TrendCardV4';

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

function card(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-trend-card]') as HTMLElement;
}

function delta(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-trend-delta]') as HTMLElement;
}

/** The sheet this component injects — where the `card` ground override lives. */
function sheet(): string {
  return document.getElementById(TREND_CARD_V4_STYLE_ID)?.textContent ?? '';
}

describe('TrendCardV4 (web)', () => {
  // ── §3.2 / layout §4.2: the card ground ─────────────────────────────

  it('paints `card`, not the page colour — the pass’s headline fix', () => {
    const c = mount(<TrendCardV4 label="Revenue" value="£48,210" />);
    // It really is a `CardV4` — the recipe is composed, not re-rolled.
    expect(card(c).hasAttribute('data-xen-v4-card')).toBe(true);
    // …and the ground is overridden by specificity rather than class order.
    expect(sheet()).toContain('[data-xen-v4-card][data-xen-v4-trend-card]');
    expect(sheet()).toContain('background-color: var(--xen-card)');
    expect(sheet()).toContain('color: var(--xen-on-card)');
    expect(sheet()).not.toContain('var(--xen-surface)');
  });

  it('raises by default and goes flat inside another card (never a shadow in a shadow)', () => {
    expect(card(mount(<TrendCardV4 label="A" value="1" />)).getAttribute('data-raised')).toBe(
      'true'
    );
    const flat = mount(<TrendCardV4 label="A" value="1" raised={false} />);
    expect(card(flat).getAttribute('data-raised')).not.toBe('true');
  });

  // ── the type ramp ───────────────────────────────────────────────────

  it('sets the value as the loudest thing in the block, in tabular figures', () => {
    const c = mount(<TrendCardV4 label="Revenue" value="£48,210" />);
    const value = c.querySelector('.text-3xl') as HTMLElement;
    expect(value.textContent).toBe('£48,210');
    expect(value.className).toContain('font-bold');
    expect(value.className).toContain('text-on-card');
    expect(value.className).toContain('[font-variant-numeric:tabular-nums]');
    // `2xl` ties the page title, and a KPI that ties the page title has none.
    expect(c.querySelector('.text-2xl')).toBeNull();
  });

  it('runs label → value → delta → caption → sparkline, in that order', () => {
    const c = mount(
      <TrendCardV4
        label="Revenue"
        value="£48,210"
        delta="+12.4%"
        trend="up"
        caption="vs last month"
        data={[1, 3, 2, 5]}
      />
    );
    const text = card(c).textContent ?? '';
    expect(text.indexOf('Revenue')).toBeLessThan(text.indexOf('£48,210'));
    expect(text.indexOf('£48,210')).toBeLessThan(text.indexOf('+12.4%'));
    expect(text.indexOf('+12.4%')).toBeLessThan(text.indexOf('vs last month'));
    // …and the plot is last, after all four lines.
    const plot = c.querySelector('[data-xen-v4-chart-line]') as Element;
    expect(
      (delta(c).compareDocumentPosition(plot) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
    ).toBe(true);
  });

  // ── §5 Group A: the delta ink, and never colour alone ───────────────

  it('inks the delta from the `*Text` slots, never from the fills', () => {
    expect(delta(mount(<TrendCardV4 label="A" value="1" delta="+1%" trend="up" />)).className).toContain(
      'text-success-text'
    );
    expect(
      delta(mount(<TrendCardV4 label="A" value="1" delta="-1%" trend="down" />)).className
    ).toContain('text-danger-text');
    // `flat` is the value the base had no word for.
    expect(delta(mount(<TrendCardV4 label="A" value="1" delta="0.0%" />)).className).toContain(
      'text-muted-text'
    );
    // Never the fill: `text-success` carries no contrast promise as ink.
    expect(
      delta(mount(<TrendCardV4 label="A" value="1" delta="+1%" trend="up" />)).className.split(' ')
    ).not.toContain('text-success');
  });

  it('pairs the ink with a direction glyph, so colour is never the whole signal', () => {
    const up = mount(<TrendCardV4 label="A" value="1" delta="+1%" trend="up" />);
    expect(delta(up).querySelector('[data-xen-v4-icon]')).not.toBeNull();
    // The glyph inherits the delta's `*Text` ink rather than being tinted with
    // a fill — the rule `IconV4`'s ten colour slots cannot express.
    expect(sheet()).toContain('[data-xen-v4-trend-delta] [data-xen-v4-icon]');
    expect(sheet()).toContain('color: inherit');
  });

  // ── §1 rule 8: a V4 composite composes V4 children ──────────────────

  it('composes SparklineV4, so the mark is on the derived palette', () => {
    const c = mount(<TrendCardV4 label="A" value="1" data={[1, 4, 2]} />);
    const line = c.querySelector('[data-xen-v4-chart-line]');
    expect(line?.getAttribute('stroke')).toBe('var(--xen-chart-1)');
  });

  it('keeps the trend and the series on two different channels', () => {
    // The delta went down; the plot keeps its slot. A line that changes colour
    // when the last point moves is the identity break the palette forbids.
    const c = mount(
      <TrendCardV4 label="A" value="1" delta="-8%" trend="down" data={[5, 3, 1]} />
    );
    expect(c.querySelector('[data-xen-v4-chart-line]')?.getAttribute('stroke')).toBe(
      'var(--xen-chart-1)'
    );
    expect(delta(c).className).toContain('text-danger-text');
  });

  it('lets the plot take a status hue only through `tone`', () => {
    const c = mount(<TrendCardV4 label="Errors" value="12" data={[1, 4, 9]} tone="danger" />);
    expect(c.querySelector('[data-xen-v4-chart-line]')?.getAttribute('stroke')).toBe(
      'var(--xen-danger)'
    );
  });

  it('takes another slot for the plot', () => {
    const c = mount(<TrendCardV4 label="A" value="1" data={[1, 2]} slot={1} />);
    expect(c.querySelector('[data-xen-v4-chart-line]')?.getAttribute('stroke')).toBe(
      'var(--xen-chart-2)'
    );
  });

  // ── §4.5: empty, single datum, loading ──────────────────────────────

  it('renders nothing at all when it has neither a label nor a value', () => {
    const c = mount(<TrendCardV4 label="" value="" />);
    expect(card(c)).toBeNull();
  });

  it('renders the card without a plot when the series is empty', () => {
    const c = mount(<TrendCardV4 label="Revenue" value="£0" data={[]} />);
    expect(card(c)).not.toBeNull();
    expect(c.querySelector('svg')).toBeNull();
    // …and never a bare bordered box: the label and the value are still there.
    expect(card(c).textContent).toContain('Revenue');
  });

  it('draws a single datum as a centred dot rather than dividing by zero', () => {
    const c = mount(<TrendCardV4 label="Revenue" value="£1" data={[42]} width={100} />);
    const dump = Array.from(c.querySelectorAll('*'))
      .flatMap((el) => Array.from(el.attributes).map((a) => a.value))
      .join(' ');
    expect(dump).not.toMatch(/NaN|Infinity/);
    expect(c.querySelector('[data-xen-v4-mark-ring]')).not.toBeNull();
    expect(c.querySelector('[data-xen-v4-chart-line]')).toBeNull();
  });

  it('shows skeletons for both the text block and the plot while loading', () => {
    const c = mount(<TrendCardV4 label="Revenue" value="£1" data={[1, 2]} loading />);
    expect(c.querySelectorAll('[data-xen-v4-skeleton]').length).toBeGreaterThan(1);
    expect(c.querySelector('[data-xen-v4-chart-line]')).toBeNull();
    // The card itself keeps its footprint rather than disappearing.
    expect(card(c)).not.toBeNull();
  });

  // ── §1 rule 6: it says its value in words ───────────────────────────

  it('derives one sentence carrying the label, value, delta and caption', () => {
    const c = mount(
      <TrendCardV4
        label="Revenue"
        value="£48,210"
        delta="+12.4%"
        trend="up"
        caption="vs last month"
      />
    );
    expect(card(c).getAttribute('aria-label')).toBe(
      'Revenue, £48,210, +12.4%, vs last month'
    );
  });

  it('lets the caller override the sentence', () => {
    const c = mount(
      <TrendCardV4 label="Revenue" value="£1" aria-label="Revenue is up this month" />
    );
    expect(card(c).getAttribute('aria-label')).toBe('Revenue is up this month');
  });
});

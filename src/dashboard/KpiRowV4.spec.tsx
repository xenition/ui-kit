/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { KpiRowV4 } from './KpiRowV4';
import type { StatCardV4Props } from './StatCardV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ITEMS: StatCardV4Props[] = [
  { label: 'Revenue', value: '$12.4k', delta: '+12%', trend: 'up' },
  { label: 'Orders', value: 128, delta: '-3%', trend: 'down' },
  { label: 'Refunds', value: 4 },
];

/** The first item, named so the specs can reach it without an index. */
const REVENUE: StatCardV4Props = ITEMS[0] as StatCardV4Props;

function row(ui: ReactElement): { root: HTMLElement | null; container: HTMLElement } {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { root: container.querySelector('[data-xen-v4-kpi-row]'), container };
}

function cards(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll('[data-xen-v4-stat-card]'));
}

describe('KpiRowV4 (web)', () => {
  // ── the literal that had to go ─────────────────────────────────────

  it('lays the strip out as a grid — `basis-[44%]` is gone', () => {
    const { root } = row(<KpiRowV4 items={ITEMS.slice(0, 2)} />);
    const el = root as HTMLElement;
    expect(el.hasAttribute('data-xen-v4-grid')).toBe(true);
    expect(el.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
    expect(el.outerHTML).not.toContain('44%');
    // §4.1's grid / KPI gutter, from the scale.
    expect(el.className).toContain('gap-[var(--xen-space-md)]');
  });

  it('is two-up by default and caps at three — four across a phone is the admin look', () => {
    expect((row(<KpiRowV4 items={ITEMS} />).root as HTMLElement).style.gridTemplateColumns).toBe(
      'repeat(2, minmax(0, 1fr))'
    );
    expect(
      (row(<KpiRowV4 items={ITEMS} columns={3} />).root as HTMLElement).style.gridTemplateColumns
    ).toBe('repeat(3, minmax(0, 1fr))');
    // A JavaScript caller the `2 | 3` type cannot reach still gets the cap.
    const forced = row(
      <KpiRowV4 items={ITEMS} columns={6 as unknown as 3} />
    ).root as HTMLElement;
    expect(forced.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
  });

  it('fits as many columns as the container holds when `minItemWidth` is set', () => {
    const el = row(<KpiRowV4 items={ITEMS} minItemWidth={200} />).root as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(200px, 1fr))');
  });

  // ── §4.5: the empty case ───────────────────────────────────────────

  it('renders NOTHING for an empty strip — not an empty flex box with a gutter', () => {
    const { root, container } = row(<KpiRowV4 items={[]} />);
    expect(root).toBeNull();
    // Not even the grid box: the guard is before `GridV4`, so the page's own
    // rhythm closes up instead of leaving a gutter where nothing is.
    expect(container.querySelector('[data-xen-v4-grid]')).toBeNull();
    expect(container.querySelector('[data-xen-v4-stat-card]')).toBeNull();
  });

  // ── the cards it lays out ──────────────────────────────────────────

  it('lays out `StatCardV4`s, so the `card` ground arrives by composition', () => {
    const el = row(<KpiRowV4 items={ITEMS} />).root as HTMLElement;
    const list = cards(el);
    expect(list).toHaveLength(3);
    expect(list.every((c) => c.hasAttribute('data-xen-v4-card'))).toBe(true);
    const first = list[0] as HTMLElement;
    expect(first.textContent).toContain('Revenue');
    expect(first.textContent).toContain('$12.4k');
  });

  it('raises the cards on the page by default and flattens them inside a card', () => {
    const onPage = row(<KpiRowV4 items={ITEMS} />).root as HTMLElement;
    expect(cards(onPage).every((c) => c.getAttribute('data-raised') === 'true')).toBe(true);

    const inCard = row(<KpiRowV4 items={ITEMS} raised={false} />).root as HTMLElement;
    expect(cards(inCard).every((c) => c.getAttribute('data-raised') === 'false')).toBe(true);
  });

  it('lets one item override the strip’s elevation', () => {
    const el = row(
      <KpiRowV4 items={[{ label: 'Flat', value: 1, raised: false }, REVENUE]} />
    ).root as HTMLElement;
    const [first, second] = cards(el) as [HTMLElement, HTMLElement];
    expect(first.getAttribute('data-raised')).toBe('false');
    expect(second.getAttribute('data-raised')).toBe('true');
  });

  it('gives every card the full track height so a row of them is not ragged', () => {
    const el = row(<KpiRowV4 items={ITEMS} />).root as HTMLElement;
    expect(cards(el).every((c) => c.className.includes('h-full'))).toBe(true);
    // …and an item's own className still lands.
    const custom = row(
      <KpiRowV4 items={[{ label: 'a', value: 1, className: 'row-span-2' }]} />
    ).root as HTMLElement;
    expect((cards(custom)[0] as HTMLElement).className).toContain('row-span-2');
  });

  it('drops a card with nothing in it rather than laying out a blank box', () => {
    const el = row(<KpiRowV4 items={[{ label: '', value: '' }, REVENUE]} />).root as HTMLElement;
    expect(cards(el)).toHaveLength(1);
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a className and forwards the rest of its props', () => {
    const el = row(<KpiRowV4 items={ITEMS} className="mb-xl" id="kpis" />).root as HTMLElement;
    expect(el.className).toContain('mb-xl');
    expect(el.id).toBe('kpis');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = row(<KpiRowV4 items={ITEMS} />).root as HTMLElement;
    // `CardV4` stamps the compiled `elevation.card` shadow as inline custom
    // properties — that IS the theme, not a literal.
    const markup = el.outerHTML.replace(/--xen-v4-shadow-[ld]: [^;]+;/g, '');
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});

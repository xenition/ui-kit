import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { KpiRowV4 } from './KpiRowV4';
import type { StatCardV4Props } from './StatCardV4';

/** Flatten a possibly-nested RN `style` into one object. */
function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

const ITEMS: StatCardV4Props[] = [
  { label: 'Revenue', value: '$12.4k', delta: '+12%', trend: 'up' },
  { label: 'Orders', value: '128', delta: '-3%', trend: 'down' },
  { label: 'Refunds', value: '4' },
];

/** The first item, named so the specs can reach it without an index. */
const REVENUE: StatCardV4Props = ITEMS[0] as StatCardV4Props;

/** The grid cells — one per card, each a percentage of the row. */
function cellWidths(root: ReactTestInstance): unknown[] {
  return root
    .findAll((n) => typeof n.type === 'string' && typeof flat(n.props?.style).width === 'string')
    .map((n) => flat(n.props.style).width);
}

/** Every card the strip laid out, found by the label each one announces. */
function cardNodes(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll(
    (n) => typeof n.type === 'string' && typeof n.props?.accessibilityLabel === 'string'
  );
}

describe('KpiRowV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  // ── the literal that had to go ─────────────────────────────────────

  it('lays the strip out as a grid — `flexBasis: "44%"` is gone', () => {
    const { root } = renderThemed(<KpiRowV4 items={ITEMS.slice(0, 2)} />, SEED_LIGHT);
    const widths = cellWidths(root);
    expect(widths).toHaveLength(2);
    widths.forEach((w) => expect(w).toBe('50%'));
    expect(widths).not.toContain('44%');
    // Nothing in the strip flexes to a magic percentage any more.
    root.findAll(() => true).forEach((n) => {
      expect(flat(n.props?.style).flexBasis).toBeUndefined();
    });
  });

  it('is two-up by default and caps at three — four across a phone is the admin look', () => {
    const three = renderThemed(<KpiRowV4 items={ITEMS} columns={3} />, SEED_LIGHT);
    cellWidths(three.root).forEach((w) => expect(w).toBe(`${100 / 3}%`));
    // A JavaScript caller the `2 | 3` type cannot reach still gets the cap.
    const forced = renderThemed(
      <KpiRowV4 items={ITEMS} columns={6 as unknown as 3} />,
      SEED_LIGHT
    );
    cellWidths(forced.root).forEach((w) => expect(w).toBe('50%'));
  });

  it('accepts `minItemWidth` for parity and leaves the native layout untouched', () => {
    const plain = renderThemed(<KpiRowV4 items={ITEMS} />, SEED_LIGHT);
    const measured = renderThemed(<KpiRowV4 items={ITEMS} minItemWidth={200} />, SEED_LIGHT);
    expect(cellWidths(measured.root)).toEqual(cellWidths(plain.root));
  });

  it('uses §4.1’s `md` grid gutter, from the scale', () => {
    const { root } = renderThemed(<KpiRowV4 items={ITEMS} />, SEED_LIGHT);
    const cell = root.findAll(
      (n) => typeof n.type === 'string' && flat(n.props?.style).width === '50%'
    )[0] as ReactTestInstance;
    // The classic gutter technique: half the gap on each cell, half cancelled
    // on the container.
    expect(flat(cell.props.style).paddingHorizontal).toBe(theme.spacing.md / 2);
  });

  // ── §4.5: the empty case ───────────────────────────────────────────

  it('renders NOTHING for an empty strip — not an empty flex box with a gutter', () => {
    expect(renderThemed(<KpiRowV4 items={[]} />, SEED_LIGHT).toJSON()).toBeNull();
  });

  // ── the cards it lays out ──────────────────────────────────────────

  it('lays out `StatCardV4`s, so the `card` ground arrives by composition', () => {
    const { root, getByText } = renderThemed(<KpiRowV4 items={ITEMS} />, SEED_LIGHT);
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$12.4k')).toBeTruthy();
    const cards = cardNodes(root);
    expect(cards).toHaveLength(3);
    cards.forEach((c) => expect(flat(c.props.style).backgroundColor).toBe(theme.light.card));
  });

  it('raises the cards on the page by default and flattens them inside a card', () => {
    const onPage = renderThemed(<KpiRowV4 items={ITEMS} />, SEED_LIGHT);
    cardNodes(onPage.root).forEach((c) =>
      expect(flat(c.props.style).shadowOpacity).toBe(theme.lightElevation.card.opacity)
    );
    const inCard = renderThemed(<KpiRowV4 items={ITEMS} raised={false} />, SEED_LIGHT);
    cardNodes(inCard.root).forEach((c) =>
      expect(flat(c.props.style).shadowOpacity).toBeUndefined()
    );
  });

  it('lets one item override the strip’s elevation', () => {
    const { root } = renderThemed(
      <KpiRowV4 items={[{ label: 'Flat', value: '1', raised: false }, REVENUE]} />,
      SEED_LIGHT
    );
    const [first, second] = cardNodes(root) as [ReactTestInstance, ReactTestInstance];
    expect(flat(first.props.style).shadowOpacity).toBeUndefined();
    expect(flat(second.props.style).shadowOpacity).toBe(theme.lightElevation.card.opacity);
  });

  it('drops a card with nothing in it rather than laying out a blank box', () => {
    const { root } = renderThemed(
      <KpiRowV4 items={[{ label: '', value: '' }, REVENUE]} />,
      SEED_LIGHT
    );
    expect(cardNodes(root)).toHaveLength(1);
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a style override on the row itself', () => {
    const { root } = renderThemed(
      <KpiRowV4 items={ITEMS} style={{ marginBottom: 32 }} />,
      SEED_LIGHT
    );
    const row = root.findAll(
      (n) => typeof n.type === 'string' && flat(n.props?.style).flexWrap === 'wrap'
    )[0] as ReactTestInstance;
    expect(flat(row.props.style).marginBottom).toBe(32);
  });

  it('paints nothing with a literal — every colour traces to a token', () => {
    const { root } = renderThemed(<KpiRowV4 items={ITEMS} />, SEED_LIGHT);
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

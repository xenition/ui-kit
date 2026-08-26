import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_BOTH, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { RULE_MIX, ZEBRA_MIX } from '../../primitives/internal/v4-data';
import { TableV4 } from './TableV4';

interface Row {
  name: string;
  amount: string;
  ref: string;
}

const ROWS: Row[] = [
  { name: 'Ada', amount: '$1,204.50', ref: 'Order #A12' },
  { name: 'Grace', amount: '$88.00', ref: 'Order #B7' },
  { name: 'Alan', amount: '-$12.25', ref: 'Order #C3' },
];

const COLUMNS = [
  { key: 'name', header: 'Name' },
  { key: 'amount', header: 'Amount' },
  { key: 'ref', header: 'Reference' },
];

/** Flatten a node's style array into one object. */
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

/**
 * Every HOST view whose flattened style sets `flexDirection: 'row'`. Host only
 * — the test renderer keeps the composite `View` alongside its host node, and
 * counting both would double every row.
 */
function rowViews(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll((n) => {
    if (typeof n.type !== 'string') return false;
    if (n.props?.style === undefined) return false;
    return flat(n.props.style).flexDirection === 'row';
  });
}

describe('TableV4 (native)', () => {
  it('renders the rows inside one bordered container', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getByText } = renderThemed(
      <TableV4 columns={COLUMNS} rows={ROWS} />,
      SEED_LIGHT
    );
    expect(getByText('Ada')).toBeTruthy();
    const outer = flat(root.findAll((n) => n.props?.style !== undefined)[0]?.props?.style);
    expect(outer.borderWidth).toBe(1);
    expect(outer.borderColor).toBe(theme.light.border);
    expect(outer.backgroundColor).toBe(theme.light.surface);
    expect(outer.borderRadius).toBe(theme.radius.md);
  });

  it('keeps ONE rule — the header carries it, no data row does', () => {
    const theme = compileTheme(SEED_LIGHT);
    const rule = mixToken(theme.light.surface, theme.light.onSurface, RULE_MIX);
    const { root } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    const rowsFound = rowViews(root).map((n) => flat(n.props.style));
    expect(rowsFound).toHaveLength(4); // header + three data rows
    expect(rowsFound[0]?.borderBottomWidth).toBe(1);
    expect(rowsFound[0]?.borderColor).toBe(rule);
    rowsFound.slice(1).forEach((s) => {
      expect(s.borderBottomWidth).toBeUndefined();
      expect(s.borderTopWidth).toBeUndefined();
    });
  });

  it('never lifts a data row — depth marks a layer, not a row', () => {
    const { root } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    rowViews(root).forEach((n) => {
      const s = flat(n.props.style);
      expect(s.shadowOpacity).toBeUndefined();
      expect(s.elevation).toBeUndefined();
    });
  });

  it('bands alternate rows from a mix of the two scheme-resolved neutral slots', () => {
    const theme = compileTheme(SEED_LIGHT);
    const zebra = mixToken(theme.light.surface, theme.light.onSurface, ZEBRA_MIX);
    const { root } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    const bodyRows = rowViews(root).slice(1).map((n) => flat(n.props.style));
    expect(bodyRows[0]?.backgroundColor).toBe(theme.light.surface);
    expect(bodyRows[1]?.backgroundColor).toBe(zebra);
    expect(bodyRows[2]?.backgroundColor).toBe(theme.light.surface);
  });

  it('inverts the band with the scheme instead of reading the light-oriented ramps', () => {
    const theme = compileTheme(SEED_BOTH);
    const light = rowViews(
      renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, SEED_BOTH, 'light').root
    ).slice(1).map((n) => flat(n.props.style));
    const dark = rowViews(
      renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, SEED_BOTH, 'dark').root
    ).slice(1).map((n) => flat(n.props.style));

    expect(light[1]?.backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.onSurface, ZEBRA_MIX)
    );
    expect(dark[1]?.backgroundColor).toBe(
      mixToken(theme.dark.surface, theme.dark.onSurface, ZEBRA_MIX)
    );
    expect(light[1]?.backgroundColor).not.toBe(dark[1]?.backgroundColor);
    // The wrong reach: ramps.neutral[50] is a near-white in BOTH schemes.
    expect(dark[1]?.backgroundColor).not.toBe(theme.ramps.neutral[50]);
  });

  it('right-aligns a column that is entirely quantities, in tabular figures', () => {
    const { getByText } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    const amount = flat(getByText('$1,204.50').props.style);
    expect(amount.textAlign).toBe('right');
    expect(amount.fontVariant).toEqual(['tabular-nums']);
    // The header of that column goes with it, or the column reads crooked.
    expect(flat(getByText('Amount').props.style).textAlign).toBe('right');
    // A label column is left alone.
    expect(flat(getByText('Ada').props.style).textAlign).toBeUndefined();
  });

  it('does not mistake an id that ends in digits for a quantity', () => {
    const { getByText } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    expect(flat(getByText('Order #A12').props.style).textAlign).toBeUndefined();
    expect(flat(getByText('Reference').props.style).textAlign).toBeUndefined();
  });

  it('lets a column with a custom render opt out of alignment guessing', () => {
    const cols = [
      { key: 'name', header: 'Name' },
      { key: 'amount', header: 'Amount', render: (r: Row) => <Text>{r.amount}</Text> },
    ];
    const { getByText } = renderThemed(<TableV4 columns={cols} rows={ROWS} />, SEED_LIGHT);
    expect(flat(getByText('Amount').props.style).textAlign).toBeUndefined();
  });

  it('gives every row the same minimum height so the baseline is steady', () => {
    const theme = compileTheme(SEED_LIGHT);
    const expected = theme.spacing.xl + theme.spacing.xs;
    const { root } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    rowViews(root).forEach((n) => {
      expect(flat(n.props.style).minHeight).toBe(expected);
    });
  });

  it('renders the guiding two-line empty state, and honours an override', () => {
    const { getByText } = renderThemed(<TableV4 columns={COLUMNS} rows={[]} />, SEED_LIGHT);
    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(getByText('Rows will appear once data is added.')).toBeTruthy();

    const custom = renderThemed(
      <TableV4 columns={COLUMNS} rows={[]} empty="all clear" />,
      SEED_LIGHT
    );
    expect(custom.getByText('all clear')).toBeTruthy();
  });
});

import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_BOTH, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { RULE_MIX, ZEBRA_MIX } from '../../primitives/internal/v4-data';
import { DataTableV4 } from './DataTableV4';

interface Row {
  name: string;
  amount: string;
}

const ROWS: Row[] = Array.from({ length: 12 }, (_, i) => ({
  name: `Person ${String.fromCharCode(65 + i)}`,
  amount: `$${(i + 1) * 10}.00`,
}));

const COLUMNS = [
  { key: 'name', header: 'Name', sortable: true },
  {
    key: 'amount',
    header: 'Amount',
    sortable: true,
    accessor: (r: Row) => Number(r.amount.slice(1, -3)),
  },
];

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

/** Host views that lay a row out; `flexDirection: 'row'` and a row height. */
function bodyRows(root: ReactTestInstance, rowHeight: number): Record<string, unknown>[] {
  return root
    .findAll((n) => {
      if (typeof n.type !== 'string' || n.props?.style === undefined) return false;
      const s = flat(n.props.style);
      return s.flexDirection === 'row' && s.minHeight === rowHeight;
    })
    .map((n) => flat(n.props.style))
    .filter((s) => s.borderBottomWidth === undefined);
}

describe('DataTableV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);
  const rowHeight = theme.spacing.xl + theme.spacing.xs;

  it('paginates and shows the range only once it says something', () => {
    const { queryByText } = renderThemed(
      <DataTableV4 columns={COLUMNS} rows={ROWS} />,
      SEED_LIGHT
    );
    expect(queryByText('1–10 of 12')).toBeTruthy();

    // Nine unfiltered rows on one page: a count read back to someone who can
    // already see all nine is the container §11 refuses to let exist.
    const short = renderThemed(
      <DataTableV4 columns={COLUMNS} rows={ROWS.slice(0, 9)} />,
      SEED_LIGHT
    );
    expect(short.queryByText(/of 9$/)).toBeNull();
  });

  it('shows the range once a search narrows an unpaginated table', () => {
    const { getByLabelText, queryByText } = renderThemed(
      <DataTableV4 columns={COLUMNS} rows={ROWS.slice(0, 9)} searchable />,
      SEED_LIGHT
    );
    expect(queryByText(/of 9$/)).toBeNull();
    fireEvent.changeText(getByLabelText('Search'), 'Person A');
    expect(queryByText('1–1 of 1')).toBeTruthy();
  });

  it('promotes the sorted header instead of decorating it', () => {
    const { getAllByText, getByText } = renderThemed(
      <DataTableV4 columns={COLUMNS} rows={ROWS} />,
      SEED_LIGHT
    );
    expect(flat(getByText('Name').props.style).color).toBe(theme.light.muted);
    fireEvent.press(getAllByText('⇅')[0] as ReactTestInstance);
    const promoted = flat(getByText('Name').props.style);
    expect(promoted.color).toBe(theme.light.onSurface);
    expect(promoted.fontWeight).toBe('700');
    // The other sortable column stays quiet.
    expect(flat(getByText('Amount').props.style).color).toBe(theme.light.muted);
    expect(getByText('↑')).toBeTruthy();
  });

  it('cycles asc → desc → none on a sortable header', () => {
    const { getAllByText, queryByText } = renderThemed(
      <DataTableV4 columns={COLUMNS} rows={ROWS} />,
      SEED_LIGHT
    );
    fireEvent.press(getAllByText('⇅')[0] as ReactTestInstance);
    expect(queryByText('↑')).toBeTruthy();
    fireEvent.press(queryByText('↑') as ReactTestInstance);
    expect(queryByText('↓')).toBeTruthy();
    fireEvent.press(queryByText('↓') as ReactTestInstance);
    expect(queryByText('↑')).toBeNull();
    expect(queryByText('↓')).toBeNull();
  });

  it('right-aligns the quantity column, header included', () => {
    const { getByText } = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    expect(flat(getByText('Amount').props.style).textAlign).toBe('right');
    // The column has an `accessor`, so the fallback cell text is its number.
    expect(flat(getByText('10').props.style).fontVariant).toEqual(['tabular-nums']);
    expect(flat(getByText('Name').props.style).textAlign).toBeUndefined();
  });

  it('keeps ONE rule and never lifts a row', () => {
    const { root } = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    const rule = mixToken(theme.light.surface, theme.light.onSurface, RULE_MIX);
    const header = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .find((s) => s.borderBottomWidth === 1 && s.flexDirection === 'row');
    expect(header?.borderColor).toBe(rule);
    bodyRows(root, rowHeight).forEach((s) => {
      expect(s.borderBottomWidth).toBeUndefined();
      expect(s.shadowOpacity).toBeUndefined();
      expect(s.elevation).toBeUndefined();
    });
  });

  it('bands alternate rows from a mix that follows the scheme', () => {
    const both = compileTheme(SEED_BOTH);
    const height = both.spacing.xl + both.spacing.xs;
    const light = bodyRows(
      renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />, SEED_BOTH, 'light').root,
      height
    );
    const dark = bodyRows(
      renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />, SEED_BOTH, 'dark').root,
      height
    );
    expect(light[1]?.backgroundColor).toBe(
      mixToken(both.light.surface, both.light.onSurface, ZEBRA_MIX)
    );
    expect(dark[1]?.backgroundColor).toBe(
      mixToken(both.dark.surface, both.dark.onSurface, ZEBRA_MIX)
    );
    // The wrong reach: ramps.neutral[50] is a near-white in BOTH schemes.
    expect(dark[1]?.backgroundColor).not.toBe(both.ramps.neutral[50]);
  });

  it('fires onRowClick when a row is pressed', () => {
    const seen: string[] = [];
    const { getByText } = renderThemed(
      <DataTableV4 columns={COLUMNS} rows={ROWS} onRowClick={(r) => seen.push(r.name)} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Person A'));
    expect(seen).toEqual(['Person A']);
  });

  it('renders the guiding two-line empty state', () => {
    const { getByText } = renderThemed(<DataTableV4 columns={COLUMNS} rows={[]} />, SEED_LIGHT);
    expect(getByText('Nothing here yet')).toBeTruthy();
  });
});

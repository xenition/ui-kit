/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import type { ThemeSeed } from '../theme/types';
import { TableV4 } from './TableV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const FLAT_SEED: ThemeSeed = { ...SEED, depth: 'flat' };

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

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  const result = render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
  const el = result.container.querySelector('[data-xen-v4-table]') as HTMLElement;
  return { ...result, el };
}

describe('TableV4 (web)', () => {
  it('renders the rows inside one bordered container', () => {
    const { el, getByText } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    expect(getByText('Ada')).toBeTruthy();
    expect(el.className).toContain('border border-border');
    expect(el.className).toContain('bg-surface');
  });

  it('keeps ONE rule — no border on any row', () => {
    const { el } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    el.querySelectorAll('tbody tr').forEach((tr) => {
      expect(tr.className).not.toContain('border-b');
    });
    const css = document.getElementById('xen-v4-table-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-table] thead th');
    expect(css).toContain('border-bottom: 1px solid var(--xen-v4-rule)');
  });

  it('derives the zebra from the two scheme-resolved neutral slots, not a ramp step', () => {
    renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    const css = document.getElementById('xen-v4-table-styles')?.textContent ?? '';
    expect(css).toContain('--xen-v4-zebra: color-mix(in srgb, var(--xen-on-surface) 4%, var(--xen-surface))');
    // `--xen-neutral-*` carries the LIGHT orientation in both schemes.
    expect(css).not.toContain('--xen-neutral-');
    expect(css).toContain('tbody tr:nth-child(even)');
  });

  it('right-aligns a column that is entirely quantities, header included', () => {
    const { el } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    const headers = Array.from(el.querySelectorAll('th'));
    expect(headers.map((h) => h.getAttribute('data-numeric'))).toEqual(['false', 'true', 'false']);
    const firstRow = el.querySelectorAll('tbody tr')[0] as HTMLElement;
    const cells = Array.from(within(firstRow).getAllByRole('cell'));
    expect(cells.map((c) => c.getAttribute('data-numeric'))).toEqual(['false', 'true', 'false']);
  });

  it('does not mistake an id that ends in digits for a quantity', () => {
    const { el } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    const ref = el.querySelectorAll('th')[2] as HTMLElement;
    expect(ref.getAttribute('data-numeric')).toBe('false');
  });

  it('lets a column with a custom render opt out of alignment guessing', () => {
    const cols = [
      { key: 'name', header: 'Name' },
      { key: 'amount', header: 'Amount', render: (r: Row) => <b>{r.amount}</b> },
    ];
    const { el } = renderThemed(<TableV4 columns={cols} rows={ROWS} />);
    expect((el.querySelectorAll('th')[1] as HTMLElement).getAttribute('data-numeric')).toBe('false');
  });

  it('lifts only the header, with elevation.card', () => {
    const theme = compileTheme(SEED);
    const { el } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    expect(el.style.getPropertyValue('--xen-v4-lift-l')).toContain(
      `${theme.lightElevation.card.offsetY}px`
    );
    // A dark page needs MORE shadow, not less.
    expect(el.style.getPropertyValue('--xen-v4-lift-d')).not.toBe(
      el.style.getPropertyValue('--xen-v4-lift-l')
    );
    const css = document.getElementById('xen-v4-table-styles')?.textContent ?? '';
    expect(css).toContain('position: sticky');
    // No row-level shadow anywhere: depth marks a layer, not a row.
    expect(css).not.toContain('tbody tr { box-shadow');
  });

  it("falls flat for a depth:'flat' seed without branching on depth", () => {
    const { el } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />, FLAT_SEED);
    expect(el.style.getPropertyValue('--xen-v4-lift-l')).toContain('/ 0)');
  });

  it('renders the guiding two-line empty state, and honours an override', () => {
    const { getByText } = renderThemed(<TableV4 columns={COLUMNS} rows={[]} />);
    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(getByText('Rows will appear once data is added.')).toBeTruthy();
    const custom = renderThemed(<TableV4 columns={COLUMNS} rows={[]} empty={<i>none</i>} />);
    expect(custom.getByText('none')).toBeTruthy();
  });

  it('uses getRowKey when given', () => {
    const seen: string[] = [];
    renderThemed(
      <TableV4
        columns={COLUMNS}
        rows={ROWS}
        getRowKey={(r) => {
          seen.push(r.name);
          return r.name;
        }}
      />
    );
    expect(seen).toEqual(['Ada', 'Grace', 'Alan']);
  });

  it('names no literal colour — every value is a token or a mix of two', () => {
    const { el } = renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    const css = document.getElementById('xen-v4-table-styles')?.textContent ?? '';
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('injects its sheet once', () => {
    renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    renderThemed(<TableV4 columns={COLUMNS} rows={ROWS} />);
    expect(document.querySelectorAll('#xen-v4-table-styles')).toHaveLength(1);
  });
});

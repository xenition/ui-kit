/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { DataTableV4 } from './DataTableV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

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
  { key: 'amount', header: 'Amount', sortable: true, accessor: (r: Row) => Number(r.amount.slice(1, -3)) },
];

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  const result = render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
  const el = result.container.querySelector('[data-xen-v4-table]') as HTMLElement;
  return { ...result, el };
}

describe('DataTableV4 (web)', () => {
  it('paginates and shows the range only once it says something', () => {
    const { container } = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />);
    expect(container.querySelector('[data-xen-v4-range]')?.textContent).toBe('1–10 of 12');

    // Nine unfiltered rows on one page: the count would be read back to
    // someone who can already see all nine (§11).
    const short = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS.slice(0, 9)} />);
    expect(short.container.querySelector('[data-xen-v4-range]')).toBeNull();
  });

  it('shows the range once a search narrows an unpaginated table', () => {
    const { container, getByLabelText } = renderThemed(
      <DataTableV4 columns={COLUMNS} rows={ROWS.slice(0, 9)} searchable />
    );
    expect(container.querySelector('[data-xen-v4-range]')).toBeNull();
    fireEvent.change(getByLabelText('Search'), { target: { value: 'Person A' } });
    expect(container.querySelector('[data-xen-v4-range]')?.textContent).toBe('1–1 of 1');
  });

  it('promotes the sorted header instead of decorating it', () => {
    const { el } = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />);
    const [name, amount] = Array.from(el.querySelectorAll('th'));
    expect(name?.className).toContain('text-muted');
    expect(name?.getAttribute('aria-sort')).toBeNull();

    fireEvent.click(name as HTMLElement);
    const [sortedName, stillMuted] = Array.from(el.querySelectorAll('th'));
    expect(sortedName?.className).toContain('font-bold');
    expect(sortedName?.className).toContain('text-on-surface');
    expect(sortedName?.getAttribute('aria-sort')).toBe('ascending');
    expect(stillMuted?.className).toContain('text-muted');
    expect(amount).toBeDefined();
  });

  it('cycles asc → desc → none on a sortable header', () => {
    const { el } = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />);
    const name = el.querySelectorAll('th')[0] as HTMLElement;
    fireEvent.click(name);
    expect(el.querySelectorAll('th')[0]?.getAttribute('aria-sort')).toBe('ascending');
    fireEvent.click(el.querySelectorAll('th')[0] as HTMLElement);
    expect(el.querySelectorAll('th')[0]?.getAttribute('aria-sort')).toBe('descending');
    fireEvent.click(el.querySelectorAll('th')[0] as HTMLElement);
    expect(el.querySelectorAll('th')[0]?.getAttribute('aria-sort')).toBeNull();
  });

  it('right-aligns the quantity column, header included', () => {
    const { el } = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />);
    expect(Array.from(el.querySelectorAll('th')).map((h) => h.getAttribute('data-numeric'))).toEqual(
      ['false', 'true']
    );
  });

  it('makes a clickable row reachable without a mouse', () => {
    const seen: string[] = [];
    const { el } = renderThemed(
      <DataTableV4 columns={COLUMNS} rows={ROWS} onRowClick={(r) => seen.push(r.name)} />
    );
    const row = el.querySelector('tbody tr') as HTMLElement;
    expect(row.getAttribute('role')).toBe('button');
    expect(row.getAttribute('tabIndex')).toBe('0');
    expect(row.getAttribute('data-clickable')).toBe('true');
    fireEvent.keyDown(row, { key: 'Enter' });
    fireEvent.keyDown(row, { key: ' ' });
    fireEvent.click(row);
    expect(seen).toHaveLength(3);
  });

  it('leaves a non-clickable row inert', () => {
    const { el } = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />);
    const row = el.querySelector('tbody tr') as HTMLElement;
    expect(row.getAttribute('role')).toBeNull();
    expect(row.getAttribute('data-clickable')).toBe('false');
  });

  it('tints a hovered row rather than lifting it', () => {
    renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} onRowClick={() => {}} />);
    const css = document.getElementById('xen-v4-table-styles')?.textContent ?? '';
    expect(css).toContain('tr[data-clickable="true"]:hover');
    expect(css).toContain('--xen-v4-hover: color-mix(in srgb, var(--xen-on-surface) 8%');
    expect(css).not.toMatch(/tbody tr[^{]*\{[^}]*box-shadow/);
  });

  it('carries no row border and no ramp step', () => {
    const { el } = renderThemed(<DataTableV4 columns={COLUMNS} rows={ROWS} />);
    el.querySelectorAll('tbody tr').forEach((tr) => {
      expect(tr.className).not.toContain('border');
    });
    const css = document.getElementById('xen-v4-table-styles')?.textContent ?? '';
    expect(css).not.toContain('--xen-neutral-');
  });

  it('renders the guiding two-line empty state', () => {
    const { getByText } = renderThemed(<DataTableV4 columns={COLUMNS} rows={[]} />);
    expect(getByText('Nothing here yet')).toBeTruthy();
  });
});

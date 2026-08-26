/** @jest-environment jsdom */
import { fireEvent, render, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CrudTableV4 } from './CrudTableV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

interface Row {
  id: string;
  name: string;
  amount: string;
}

const ROWS: Row[] = [
  { id: '1', name: 'Ada', amount: '120' },
  { id: '2', name: 'Grace', amount: '340' },
];

const COLUMNS = [
  { key: 'name', header: 'Name' },
  { key: 'amount', header: 'Amount' },
];

const FIELDS = [
  { name: 'name', label: 'Name', required: true },
  { name: 'amount', label: 'Amount', type: 'number' as const },
];

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

function crud(props: Partial<React.ComponentProps<typeof CrudTableV4<Row>>> = {}) {
  return (
    <CrudTableV4<Row>
      title="Customers"
      columns={COLUMNS}
      rows={ROWS}
      fields={FIELDS}
      getId={(r) => r.id}
      onCreate={() => {}}
      onUpdate={() => {}}
      onDelete={() => {}}
      {...props}
    />
  );
}

describe('CrudTableV4 (web)', () => {
  it('renders the title as typography, not a container', () => {
    const { getByText } = renderThemed(crud());
    const heading = getByText('Customers');
    expect(heading.tagName).toBe('H2');
    expect(heading.className).toContain('font-heading');
    expect(heading.className).toContain('text-xl');
    // §11 — no card wraps the header.
    expect(heading.parentElement?.className).not.toContain('border');
  });

  it('shrinks the row-actions column instead of giving it a data column share', () => {
    const { container } = renderThemed(crud());
    const headers = Array.from(container.querySelectorAll('th'));
    const actions = headers[headers.length - 1] as HTMLElement;
    expect(actions.className).toContain('w-px');
    expect(actions.className).toContain('whitespace-nowrap');
    // The data columns do not get it.
    expect((headers[0] as HTMLElement).className).not.toContain('w-px');
  });

  it('states the consequence of deleting, not just the question', () => {
    const { getAllByText, getByText } = renderThemed(crud());
    fireEvent.click(getAllByText('Delete')[0] as HTMLElement);
    expect(getByText('Delete this item? This cannot be undone.')).toBeTruthy();
  });

  it('keeps a table-sized frame while loading so the page does not collapse', () => {
    const { container } = renderThemed(crud({ loading: true }));
    const frame = container.querySelector('[data-xen-v4-crud-loading]') as HTMLElement;
    expect(frame).toBeTruthy();
    expect(frame.className).toContain('min-h-[calc((var(--xen-space-xl)_+_var(--xen-space-xs))_*_4)]');
    expect(container.querySelector('table')).toBeNull();
  });

  it('opens the create form and validates a required field before calling onCreate', async () => {
    const created: Record<string, string>[] = [];
    const { getByText, getByLabelText } = renderThemed(crud({ onCreate: (v) => { created.push(v); } }));
    fireEvent.click(getByText('New'));
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(getByText('Name is required')).toBeTruthy());
    expect(created).toHaveLength(0);

    fireEvent.change(getByLabelText(/^Name/), { target: { value: 'Alan' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(created).toHaveLength(1));
    expect(created[0]?.name).toBe('Alan');
  });

  it('edits through the same form, pre-filled from the row', async () => {
    const updated: [string, Record<string, string>][] = [];
    const { getAllByText, getByLabelText } = renderThemed(
      crud({ onUpdate: (id, v) => { updated.push([id, v]); } })
    );
    fireEvent.click(getAllByText('Edit')[0] as HTMLElement);
    expect((getByLabelText(/^Name/) as HTMLInputElement).value).toBe('Ada');
    fireEvent.change(getByLabelText(/^Name/), { target: { value: 'Ada L' } });
    fireEvent.click(getAllByText('Save')[0] as HTMLElement);
    await waitFor(() => expect(updated).toHaveLength(1));
    expect(updated[0]?.[0]).toBe('1');
  });

  it('surfaces an error through the V4 alert', () => {
    const { getByText } = renderThemed(crud({ error: 'Could not load' }));
    expect(getByText('Could not load')).toBeTruthy();
  });

  it('inherits the V4 table: one rule, no ramp step, aligned quantities', () => {
    const { container } = renderThemed(crud());
    expect(container.querySelector('[data-xen-v4-table]')).toBeTruthy();
    container.querySelectorAll('tbody tr').forEach((tr) => {
      expect(tr.className).not.toContain('border');
    });
    const headers = Array.from(container.querySelectorAll('th'));
    expect((headers[1] as HTMLElement).getAttribute('data-numeric')).toBe('true');
    const css = document.getElementById('xen-v4-table-styles')?.textContent ?? '';
    expect(css).not.toContain('--xen-neutral-');
  });
});

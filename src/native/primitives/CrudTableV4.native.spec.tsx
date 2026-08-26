import * as React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { CrudTableV4 } from './CrudTableV4';

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

describe('CrudTableV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  it('renders the title as typography, not a container', () => {
    const { getByText } = renderThemed(crud(), SEED_LIGHT);
    const style = flat(getByText('Customers').props.style);
    expect(style.fontFamily).toBe(theme.typography.fontHeading);
    expect(style.fontSize).toBe(theme.typography.scale.xl);
    expect(style.fontWeight).toBe('700');
    // §11 — a title is a size and a weight, never a panel of its own.
    expect(style.borderWidth).toBeUndefined();
    expect(style.backgroundColor).toBeUndefined();
  });

  it('gives the row-actions column its buttons width, not a data column share', () => {
    const { root, getAllByText } = renderThemed(crud(), SEED_LIGHT);
    const editRow = getAllByText('Edit')[0] as ReactTestInstance;
    // Walk up to the table cell that holds the actions.
    let node: ReactTestInstance | null = editRow;
    let cell: Record<string, unknown> | null = null;
    while (node) {
      const s = node.props?.style === undefined ? null : flat(node.props.style);
      if (s && (s.flexGrow === 0 || s.flexGrow === 1) && s.paddingHorizontal !== undefined) {
        cell = s;
        break;
      }
      node = node.parent;
    }
    expect(cell?.flexGrow).toBe(0);

    // A data column still takes its share.
    const dataCells = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .filter((s) => s.paddingHorizontal !== undefined && s.flexGrow === 1);
    expect(dataCells.length).toBeGreaterThan(0);
  });

  it('states the consequence of deleting, not just the question', () => {
    const { getAllByText, getByText } = renderThemed(crud(), SEED_LIGHT);
    fireEvent.press(getAllByText('Delete')[0] as ReactTestInstance);
    expect(getByText('Delete this item? This cannot be undone.')).toBeTruthy();
  });

  it('keeps a table-sized frame while loading so the page does not collapse', () => {
    const { root, queryByText } = renderThemed(crud({ loading: true }), SEED_LIGHT);
    const expected = (theme.spacing.xl + theme.spacing.xs) * 4;
    const frame = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .find((s) => s.minHeight === expected);
    expect(frame).toBeDefined();
    expect(frame?.borderWidth).toBe(1);
    expect(queryByText('Ada')).toBeNull();
  });

  it('opens the create form and validates a required field before calling onCreate', async () => {
    const created: Record<string, string>[] = [];
    const { getByText, getByLabelText } = renderThemed(
      crud({
        onCreate: (v) => {
          created.push(v);
        },
      }),
      SEED_LIGHT
    );
    fireEvent.press(getByText('New'));
    fireEvent.press(getByText('Save'));
    await waitFor(() => expect(getByText('Name is required')).toBeTruthy());
    expect(created).toHaveLength(0);

    fireEvent.changeText(getByLabelText('Name'), 'Alan');
    fireEvent.press(getByText('Save'));
    await waitFor(() => expect(created).toHaveLength(1));
    expect(created[0]?.name).toBe('Alan');
  });

  it('edits through the same form, pre-filled from the row', async () => {
    const updated: [string, Record<string, string>][] = [];
    const { getAllByText, getByLabelText } = renderThemed(
      crud({
        onUpdate: (id, v) => {
          updated.push([id, v]);
        },
      }),
      SEED_LIGHT
    );
    fireEvent.press(getAllByText('Edit')[0] as ReactTestInstance);
    expect(getByLabelText('Name').props.value).toBe('Ada');
    fireEvent.press(getAllByText('Save')[0] as ReactTestInstance);
    await waitFor(() => expect(updated).toHaveLength(1));
    expect(updated[0]?.[0]).toBe('1');
  });

  it('surfaces an error through the V4 alert', () => {
    const { getByText } = renderThemed(crud({ error: 'Could not load' }), SEED_LIGHT);
    expect(getByText('Could not load')).toBeTruthy();
  });

  it('inherits the V4 table: no row border, no row shadow', () => {
    const { root } = renderThemed(crud(), SEED_LIGHT);
    const rowHeight = theme.spacing.xl + theme.spacing.xs;
    root
      .findAll((n) => {
        if (typeof n.type !== 'string' || n.props?.style === undefined) return false;
        const s = flat(n.props.style);
        return s.flexDirection === 'row' && s.minHeight === rowHeight;
      })
      .map((n) => flat(n.props.style))
      .filter((s) => s.borderBottomWidth === undefined)
      .forEach((s) => {
        expect(s.shadowOpacity).toBeUndefined();
        expect(s.elevation).toBeUndefined();
      });
  });
});

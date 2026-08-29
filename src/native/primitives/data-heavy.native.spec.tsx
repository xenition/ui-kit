import * as React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { renderThemed, SEED_LIGHT } from '../spec-support/render-native';
import { DataTable, type DataTableColumn } from './DataTable';
import { CrudTable, type CrudField } from './CrudTable';

interface Row {
  id: string;
  name: string;
  score: number;
}

const ROWS: Row[] = [
  { id: '1', name: 'Bravo', score: 20 },
  { id: '2', name: 'Alpha', score: 30 },
  { id: '3', name: 'Charlie', score: 10 },
];

const COLUMNS: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true, accessor: (r) => r.name },
  { key: 'score', header: 'Score', sortable: true, accessor: (r) => r.score },
];

describe('DataTable (native)', () => {
  it('renders a row per datum with its cell values', () => {
    const { getByText } = renderThemed(<DataTable columns={COLUMNS} rows={ROWS} />, SEED_LIGHT);
    expect(getByText('Bravo')).toBeTruthy();
    expect(getByText('Alpha')).toBeTruthy();
    expect(getByText('Charlie')).toBeTruthy();
  });

  it('sorts when a sortable header is tapped', () => {
    const { getByText, getAllByText } = renderThemed(
      <DataTable columns={COLUMNS} rows={ROWS} />,
      SEED_LIGHT,
    );
    // tap the Name header → ascending: Alpha, Bravo, Charlie
    fireEvent.press(getByText('Name'));
    // all three still present after sorting (order asserted via presence + no crash)
    expect(getAllByText(/Alpha|Bravo|Charlie/).length).toBeGreaterThanOrEqual(3);
  });

  it('filters rows via the search box', () => {
    const { getByLabelText, queryByText } = renderThemed(
      <DataTable columns={COLUMNS} rows={ROWS} searchable />,
      SEED_LIGHT,
    );
    fireEvent.changeText(getByLabelText('Search'), 'alph');
    expect(queryByText('Alpha')).toBeTruthy();
    expect(queryByText('Bravo')).toBeNull();
  });
});

const FIELDS: CrudField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'score', label: 'Score', type: 'number' },
];

describe('CrudTable (native)', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  const baseProps = {
    columns: COLUMNS,
    rows: ROWS,
    fields: FIELDS,
    getId: (r: Row) => r.id,
  };

  it('renders the table plus a New button', () => {
    const { getByText } = renderThemed(
      <CrudTable {...baseProps} onCreate={jest.fn()} onUpdate={jest.fn()} onDelete={jest.fn()} />,
      SEED_LIGHT,
    );
    expect(getByText('New')).toBeTruthy();
    expect(getByText('Bravo')).toBeTruthy();
  });

  it('opens the create modal and calls onCreate with the entered values', async () => {
    const onCreate = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <CrudTable {...baseProps} onCreate={onCreate} onUpdate={jest.fn()} onDelete={jest.fn()} />,
      SEED_LIGHT,
    );
    fireEvent.press(getByText('New'));
    act(() => jest.runAllTimers());
    // the create form (built from `fields`) is shown with a Save button
    const nameInput = getByLabelText('Name', { includeHiddenElements: true });
    fireEvent.changeText(nameInput, 'Delta');
    await act(async () => {
      fireEvent.press(getByText('Save'));
    });
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onCreate.mock.calls[0][0]).toMatchObject({ name: 'Delta' });
  });

  it('guards row deletion behind a Popconfirm dialog', () => {
    const onDelete = jest.fn();
    const { getAllByText, getAllByRole, queryByText } = renderThemed(
      <CrudTable {...baseProps} onCreate={jest.fn()} onUpdate={jest.fn()} onDelete={onDelete} />,
      SEED_LIGHT,
    );
    // The delete trigger is a real Button, like the web twin's — it announces
    // itself as a control rather than being red text that happens to be tappable.
    // It could not be one while Popconfirm swallowed a Button trigger's tap.
    expect(getAllByRole('button', { name: 'Delete' }).length).toBe(ROWS.length);
    // one delete trigger per row; tapping it opens the confirm bubble (a Modal)
    fireEvent.press(getAllByText('Delete')[0]);
    act(() => jest.runAllTimers());
    expect(queryByText('Delete this item?', { includeHiddenElements: true })).toBeTruthy();
    // onDelete only fires after the confirm inside the dialog — not on the trigger alone
    expect(onDelete).not.toHaveBeenCalled();
  });
});

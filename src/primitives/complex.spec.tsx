/** @jest-environment jsdom */
import { render, fireEvent, waitFor } from '@testing-library/react';
import { DataTable, type DataTableColumn } from './DataTable';
import { CrudTable } from './CrudTable';
import { Combobox } from './Combobox';
import { Upload } from './Upload';
import { DatePicker } from './DatePicker';

interface Row {
  id: string;
  name: string;
  age: number;
}
const rows: Row[] = [
  { id: '1', name: 'Bea', age: 30 },
  { id: '2', name: 'Ada', age: 25 },
  { id: '3', name: 'Cy', age: 40 },
];
const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true, accessor: (r) => r.age },
];

describe('DataTable', () => {
  it('sorts on header click and searches', () => {
    const { getByText, getAllByRole, getByPlaceholderText, queryByText } = render(
      <DataTable columns={columns} rows={rows} searchable pageSize={10} />
    );
    // sort by name asc
    fireEvent.click(getByText('Name'));
    const cells = getAllByRole('cell').filter((c) => /Ada|Bea|Cy/.test(c.textContent || ''));
    expect(cells[0]!.textContent).toBe('Ada');
    // search
    fireEvent.change(getByPlaceholderText('Search…'), { target: { value: 'ad' } });
    expect(getByText('Ada')).toBeTruthy();
    expect(queryByText('Cy')).toBeNull();
  });
});

describe('CrudTable', () => {
  it('opens create modal and calls onCreate', async () => {
    const onCreate = jest.fn().mockResolvedValue(undefined);
    const { getByText, getByPlaceholderText } = render(
      <CrudTable
        title="People"
        columns={columns}
        rows={rows}
        fields={[{ name: 'name', label: 'Name', required: true, placeholder: 'Full name' }]}
        getId={(r) => r.id}
        onCreate={onCreate}
        onUpdate={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    fireEvent.click(getByText('New'));
    fireEvent.change(getByPlaceholderText('Full name'), { target: { value: 'Zed' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(onCreate).toHaveBeenCalledWith({ name: 'Zed' }));
  });
});

describe('Combobox / Upload / DatePicker', () => {
  it('Combobox filters and selects', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Combobox
        value=""
        onChange={onChange}
        options={[
          { label: 'Apple', value: 'a' },
          { label: 'Banana', value: 'b' },
        ]}
      />
    );
    fireEvent.focus(getByPlaceholderText('Search…'));
    fireEvent.change(getByPlaceholderText('Search…'), { target: { value: 'ban' } });
    fireEvent.click(getByText('Banana'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('Upload emits dropped files', () => {
    const onFiles = jest.fn();
    const { getByText } = render(<Upload onFiles={onFiles} />);
    const zone = getByText(/Drag files/).parentElement!;
    const file = new File(['x'], 'x.txt', { type: 'text/plain' });
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).toHaveBeenCalledTimes(1);
  });

  it('DatePicker emits value', () => {
    const onChange = jest.fn();
    const { container } = render(<DatePicker value="" onChange={onChange} />);
    fireEvent.change(container.querySelector('input')!, { target: { value: '2026-07-10' } });
    expect(onChange).toHaveBeenCalledWith('2026-07-10');
  });
});

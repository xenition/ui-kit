import * as React from 'react';
import { DataTable, type DataTableColumn } from './DataTable';
import { Modal } from './Modal';
import { Form } from './Form';
import { Field } from './Field';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Button } from './Button';
import { Alert } from './Alert';
import { Popconfirm } from './Popconfirm';
import { StatusMessage } from './StatusMessage';

export type CrudFieldType = 'text' | 'textarea' | 'number' | 'select';

export interface CrudField {
  name: string;
  label: string;
  type?: CrudFieldType;
  /** Options for `type: 'select'`. */
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
}

export interface CrudTableProps<T> {
  title?: React.ReactNode;
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Form fields used for create + edit. */
  fields: CrudField[];
  getId: (row: T) => string;
  onCreate: (values: Record<string, string>) => void | Promise<void>;
  onUpdate: (id: string, values: Record<string, string>) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  /** Map a row → form values for editing (defaults to reading `field.name` off the row). */
  toFormValues?: (row: T) => Record<string, string>;
  loading?: boolean;
  error?: string | null;
  searchable?: boolean;
  pageSize?: number;
  createLabel?: string;
}

/**
 * Full CRUD admin block in one component: a searchable/sortable/paginated
 * {@link DataTable} + a "New" button + a create/edit `Modal` form (built from
 * `fields`) + per-row Edit and delete-with-confirm. SDK-agnostic — wire
 * `onCreate/onUpdate/onDelete` to `@xenition/sdk` (or anything). Themed.
 */
export function CrudTable<T>({
  title,
  columns,
  rows,
  fields,
  getId,
  onCreate,
  onUpdate,
  onDelete,
  toFormValues,
  loading = false,
  error = null,
  searchable = true,
  pageSize = 10,
  createLabel = 'New',
}: CrudTableProps<T>): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [saving, setSaving] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const emptyValues = (): Record<string, string> =>
    Object.fromEntries(fields.map((f) => [f.name, ''])) as Record<string, string>;
  const rowToValues = (row: T): Record<string, string> =>
    toFormValues
      ? toFormValues(row)
      : (Object.fromEntries(
          fields.map((f) => [f.name, String((row as Record<string, unknown>)[f.name] ?? '')])
        ) as Record<string, string>);

  const openCreate = () => {
    setEditingId(null);
    setValues(emptyValues());
    setFormError(null);
    setOpen(true);
  };
  const openEdit = (row: T) => {
    setEditingId(getId(row));
    setValues(rowToValues(row));
    setFormError(null);
    setOpen(true);
  };
  const setField = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing = fields.find((f) => f.required && !(values[f.name] ?? '').trim());
    if (missing) {
      setFormError(`${missing.label} is required`);
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      if (editingId) await onUpdate(editingId, values);
      else await onCreate(values);
      setOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const actionsCol: DataTableColumn<T> = {
    key: '__actions',
    header: '',
    render: (row) => (
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={() => openEdit(row)}>
          Edit
        </Button>
        <Popconfirm
          trigger={
            <Button size="sm" variant="ghost">
              Delete
            </Button>
          }
          message="Delete this item?"
          confirmLabel="Delete"
          onConfirm={() => onDelete(getId(row))}
        />
      </div>
    ),
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {title != null && <h2 className="text-lg font-semibold text-on-surface">{title}</h2>}
        <Button onClick={openCreate}>{createLabel}</Button>
      </div>

      {error && <Alert tone="danger">{error}</Alert>}

      {loading ? (
        <StatusMessage state="loading" />
      ) : (
        <DataTable
          columns={[...columns, actionsCol]}
          rows={rows}
          searchable={searchable}
          pageSize={pageSize}
          getRowKey={(r) => getId(r)}
        />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? 'Edit' : createLabel}>
        <Form onSubmit={submit}>
          {formError && <Alert tone="danger">{formError}</Alert>}
          {fields.map((f) => (
            <Field key={f.name} label={f.label} required={f.required}>
              {f.type === 'textarea' ? (
                <Textarea
                  value={values[f.name] ?? ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                  placeholder={f.placeholder}
                />
              ) : f.type === 'select' ? (
                <Select value={values[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)}>
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={values[f.name] ?? ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                  placeholder={f.placeholder}
                />
              )}
            </Field>
          ))}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

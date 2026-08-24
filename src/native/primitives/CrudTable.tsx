import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
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
 * Full CRUD admin block in one component — the native mirror of the web
 * `CrudTable`: a searchable/sortable/paginated `DataTable` + a "New" button + a
 * create/edit `Modal` form (built from `fields`) + per-row Edit and
 * delete-with-`Popconfirm`. SDK-agnostic — wire `onCreate/onUpdate/onDelete` to
 * `@xenition/sdk` (or anything); no hardcoded endpoints. Themed, no literal
 * colors.
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
  const { colors, tokens } = useXenitionTheme();
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

  const openCreate = (): void => {
    setEditingId(null);
    setValues(emptyValues());
    setFormError(null);
    setOpen(true);
  };
  const openEdit = (row: T): void => {
    setEditingId(getId(row));
    setValues(rowToValues(row));
    setFormError(null);
    setOpen(true);
  };
  const setField = (name: string, v: string): void => setValues((s) => ({ ...s, [name]: v }));

  const submit = async (): Promise<void> => {
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
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.sm }}>
        <Button size="sm" variant="ghost" onPress={() => openEdit(row)}>
          Edit
        </Button>
        <Popconfirm
          trigger={
            <Text
              style={{
                color: colors.dangerText,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
              }}
            >
              Delete
            </Text>
          }
          message="Delete this item?"
          confirmLabel="Delete"
          onConfirm={() => onDelete(getId(row))}
        />
      </View>
    ),
  };

  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
        }}
      >
        {title != null ? (
          typeof title === 'string' ? (
            <Text
              style={{
                fontSize: tokens.typography.scale.lg,
                fontWeight: '600',
                color: colors.onSurface,
              }}
            >
              {title}
            </Text>
          ) : (
            title
          )
        ) : (
          <View />
        )}
        <Button onPress={openCreate}>{createLabel}</Button>
      </View>

      {error ? <Alert tone="danger">{error}</Alert> : null}

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
        <Form>
          {formError ? <Alert tone="danger">{formError}</Alert> : null}
          {fields.map((f) => (
            <Field key={f.name} label={f.label} required={f.required}>
              {f.type === 'textarea' ? (
                <Textarea
                  value={values[f.name] ?? ''}
                  onChangeText={(t) => setField(f.name, t)}
                  placeholder={f.placeholder}
                  accessibilityLabel={f.label}
                />
              ) : f.type === 'select' ? (
                <Select
                  value={values[f.name] ?? ''}
                  onValueChange={(v) => setField(f.name, v)}
                  options={f.options ?? []}
                  placeholder={f.placeholder ?? 'Select…'}
                  accessibilityLabel={f.label}
                />
              ) : (
                <Input
                  value={values[f.name] ?? ''}
                  onChangeText={(t) => setField(f.name, t)}
                  placeholder={f.placeholder}
                  keyboardType={f.type === 'number' ? 'numeric' : 'default'}
                  accessibilityLabel={f.label}
                />
              )}
            </Field>
          ))}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.sm }}>
            <Button variant="ghost" onPress={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onPress={submit} disabled={saving} loading={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </View>
        </Form>
      </Modal>
    </View>
  );
}

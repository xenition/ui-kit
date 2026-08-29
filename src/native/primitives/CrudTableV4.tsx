import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { DataTableV4 } from './DataTableV4';
import type { DataTableColumn } from './DataTable';
import { ModalV4 } from './ModalV4';
import { Form } from './Form';
import { Field } from './Field';
import { InputV4 } from './InputV4';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { ButtonV4 } from './ButtonV4';
import { AlertV4 } from './AlertV4';
import { Popconfirm } from './Popconfirm';
import { StatusMessage } from './StatusMessage';
import type { CrudField, CrudFieldType, CrudTableProps } from './CrudTable';

export type { CrudTableProps as CrudTableV4Props, CrudField, CrudFieldType };

/**
 * **V4 CRUD table** — same props as {@link CrudTable}, a different design line.
 *
 * A CRUD screen is the densest thing this kit ships: a table, a search box, a
 * pager, two buttons on every row, a header action and a modal form. §34 says
 * density should match the product and this product IS dense, so V4 does not
 * try to make it airy. It makes it **legible**, and it does that by taking
 * three things away and adding almost nothing.
 *
 * 1. **The row-actions column stops eating the table.** The base hands
 *    `__actions` the same `flex: 1` as Name and Amount, so a four-column table
 *    spends a quarter of its width on two ghost buttons while the data the
 *    reader came for gets squeezed. `DataTableV4` now sizes an unlabelled
 *    column of rendered controls to its contents — derived from the column
 *    definition, not from a new prop.
 * 2. **The whole screen is one design line.** `DataTableV4`, `ButtonV4`,
 *    `InputV4`, `ModalV4`, `AlertV4`. The base mixed a V1 table with V1
 *    buttons, which was consistent; what it could not do was stay consistent
 *    inside a V4 app. Nothing here re-styles a control locally — that is the
 *    drift V4 exists to stop.
 * 3. **The heading is typography, not a container.** `fontHeading` at `xl`
 *    against a `lg` gap. §10 asks for size, weight and spacing before a card,
 *    and a CRUD page that wraps its title in a panel is §8's "cards inside
 *    cards inside cards" starting at the top of the page.
 *
 * Two behavioural repairs the design line paid for:
 *
 * - **Deleting says what it costs.** "Delete this item? This cannot be
 *    undone." §26 asks that a destructive consequence be explained, and the
 *    base said only the first half.
 * - **Loading no longer collapses the page.** The base swapped the table for a
 *    one-line spinner, so the New button jumped up the screen and back. The V4
 *    loading state keeps a table-sized frame — §14, design states rather than
 *    screenshots.
 *
 * **No card wraps anything.** Not the header, not a row, not the form. The one
 * bordered container on the screen is the table itself, which is a single
 * object and earns it (§11).
 */
export function CrudTableV4<T>({
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
    // No header and a rendered cell: `DataTableV4` reads that as a control
    // column and gives it the width its buttons need, not a data column's
    // share.
    header: '',
    render: (row) => (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.sm }}>
        <ButtonV4 size="sm" variant="ghost" onPress={() => openEdit(row)}>
          Edit
        </ButtonV4>
        <Popconfirm
          trigger={
            <ButtonV4 size="sm" variant="ghost" tone="danger">
              Delete
            </ButtonV4>
          }
          // §26 — a destructive action states its consequence, not just its
          // name. The base stopped after the question.
          message="Delete this item? This cannot be undone."
          confirmLabel="Delete"
          onConfirm={() => onDelete(getId(row))}
        />
      </View>
    ),
  };

  // A table-sized frame while the rows are in flight, so the header action
  // does not jump up the screen and back (§14).
  const loadingHeight = (tokens.spacing.xl + tokens.spacing.xs) * 4;

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
                // Typography before containers (§10): the page title is a size
                // and a weight, not a panel.
                fontFamily: tokens.typography.fontHeading,
                fontSize: tokens.typography.scale.xl,
                fontWeight: '700',
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
        <ButtonV4 onPress={openCreate}>{createLabel}</ButtonV4>
      </View>

      {error ? <AlertV4 tone="danger">{error}</AlertV4> : null}

      {loading ? (
        <View
          style={{
            minHeight: loadingHeight,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
          }}
        >
          <StatusMessage state="loading" />
        </View>
      ) : (
        <DataTableV4
          columns={[...columns, actionsCol]}
          rows={rows}
          searchable={searchable}
          pageSize={pageSize}
          getRowKey={(r) => getId(r)}
        />
      )}

      <ModalV4 open={open} onClose={() => setOpen(false)} title={editingId ? 'Edit' : createLabel}>
        <Form>
          {formError ? <AlertV4 tone="danger">{formError}</AlertV4> : null}
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
                <InputV4
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
            <ButtonV4 variant="ghost" onPress={() => setOpen(false)}>
              Cancel
            </ButtonV4>
            <ButtonV4 onPress={submit} disabled={saving} loading={saving}>
              {saving ? 'Saving…' : 'Save'}
            </ButtonV4>
          </View>
        </Form>
      </ModalV4>
    </View>
  );
}

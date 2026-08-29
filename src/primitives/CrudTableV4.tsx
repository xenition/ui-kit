import * as React from 'react';
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
 * **V4 CRUD table** — the web twin of the native `CrudTableV4`, same props as
 * {@link CrudTable}, a different design line.
 *
 * A CRUD screen is the densest thing this kit ships: a table, a search box, a
 * pager, two buttons on every row, a header action and a modal form. §34 says
 * density should match the product and this product IS dense, so V4 does not
 * try to make it airy. It makes it **legible**, and it does that by taking
 * three things away and adding almost nothing.
 *
 * 1. **The row-actions column stops eating the table.** The base hands
 *    `__actions` a `<td>` like any other and lets the browser share the width
 *    out; `DataTableV4` now sizes an unlabelled column of rendered controls to
 *    its contents, so the data columns get the space back. Derived from the
 *    column definition, not from a new prop.
 * 2. **The whole screen is one design line.** `DataTableV4`, `ButtonV4`,
 *    `InputV4`, `ModalV4`, `AlertV4`. The base mixed a V1 table with V1
 *    buttons, which was consistent; what it could not do was stay consistent
 *    inside a V4 app. Nothing here re-styles a control locally — that is the
 *    drift V4 exists to stop.
 * 3. **The heading is typography, not a container.** `font-heading` at `xl`
 *    against a `lg` gap. §10 asks for size, weight and spacing before a card,
 *    and a CRUD page that wraps its title in a panel is §8's "cards inside
 *    cards inside cards" starting at the top of the page.
 *
 * Two behavioural repairs the design line paid for:
 *
 * - **Deleting says what it costs.** "Delete this item? This cannot be
 *   undone." §26 asks that a destructive consequence be explained, and the
 *   base said only the first half.
 * - **A form label points at its control.** The base rendered a `<Label>` with
 *   no `htmlFor` and an input with no `id`, so the text was there and the
 *   association was not: a screen reader announced an unlabelled box and a
 *   click on the label did nothing.
 * - **Loading no longer collapses the page.** The base swapped the table for a
 *   one-line spinner, so the New button jumped up the screen and back. The V4
 *   loading state keeps a table-sized frame — §14, design states rather than
 *   screenshots.
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
  // One id prefix per mounted table, so two CRUD screens on a page cannot
  // collide on `name` and steal each other's labels.
  const uid = React.useId();
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

  const submit = async (e: React.FormEvent): Promise<void> => {
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
    // No header and a rendered cell: `DataTableV4` reads that as a control
    // column and gives it the width its buttons need, not a data column's
    // share.
    header: '',
    render: (row) => (
      <div className="flex justify-end gap-[var(--xen-space-sm)]">
        <ButtonV4 size="sm" variant="ghost" onClick={() => openEdit(row)}>
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
      </div>
    ),
  };

  return (
    <div className="flex flex-col gap-[var(--xen-space-lg)]">
      <div className="flex items-center justify-between gap-[var(--xen-space-md)]">
        {title != null && (
          // Typography before containers (§10): the page title is a size and a
          // weight, not a panel.
          <h2 className="font-heading text-xl font-bold text-on-surface">{title}</h2>
        )}
        <ButtonV4 onClick={openCreate}>{createLabel}</ButtonV4>
      </div>

      {error && <AlertV4 tone="danger">{error}</AlertV4>}

      {loading ? (
        // A table-sized frame while the rows are in flight, so the New button
        // does not jump up the screen and back (§14).
        <div
          data-xen-v4-crud-loading=""
          className="flex min-h-[calc((var(--xen-space-xl)_+_var(--xen-space-xs))_*_4)] items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-surface"
        >
          <StatusMessage state="loading" />
        </div>
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
        <Form onSubmit={submit}>
          {formError && <AlertV4 tone="danger">{formError}</AlertV4>}
          {fields.map((f) => (
            <Field
              key={f.name}
              label={f.label}
              required={f.required}
              // The base rendered a `<Label>` pointing at nothing: the text was
              // there, the association was not, so a screen reader announced an
              // unlabelled box and a click on the label did nothing. §46 puts
              // that ahead of the design line.
              htmlFor={`${uid}-${f.name}`}
            >
              {f.type === 'textarea' ? (
                <Textarea
                  id={`${uid}-${f.name}`}
                  value={values[f.name] ?? ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                  placeholder={f.placeholder}
                />
              ) : f.type === 'select' ? (
                <Select
                  id={`${uid}-${f.name}`}
                  value={values[f.name] ?? ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <InputV4
                  id={`${uid}-${f.name}`}
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={values[f.name] ?? ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                  placeholder={f.placeholder}
                />
              )}
            </Field>
          ))}
          <div className="flex justify-end gap-[var(--xen-space-sm)]">
            <ButtonV4 type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </ButtonV4>
            <ButtonV4 type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </ButtonV4>
          </div>
        </Form>
      </ModalV4>
    </div>
  );
}

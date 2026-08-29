import * as React from 'react';
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
export declare function CrudTableV4<T>({ title, columns, rows, fields, getId, onCreate, onUpdate, onDelete, toFormValues, loading, error, searchable, pageSize, createLabel, }: CrudTableProps<T>): React.ReactElement;
//# sourceMappingURL=CrudTableV4.d.ts.map
import * as React from 'react';
import { type DataTableColumn } from './DataTable';
export type CrudFieldType = 'text' | 'textarea' | 'number' | 'select';
export interface CrudField {
    name: string;
    label: string;
    type?: CrudFieldType;
    /** Options for `type: 'select'`. */
    options?: {
        label: string;
        value: string;
    }[];
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
export declare function CrudTable<T>({ title, columns, rows, fields, getId, onCreate, onUpdate, onDelete, toFormValues, loading, error, searchable, pageSize, createLabel, }: CrudTableProps<T>): React.ReactElement;
//# sourceMappingURL=CrudTable.d.ts.map
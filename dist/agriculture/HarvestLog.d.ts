import * as React from 'react';
/** A single harvest record. */
export interface HarvestEntry {
    /** Stable key for list rendering. */
    id: string;
    /** Crop harvested (e.g. "Wheat"). */
    crop: string;
    /** Yield magnitude (e.g. `4.2`). Rendered with `unit`. */
    quantity: number | string;
    /** Yield unit (e.g. "t", "kg", "crates"). */
    unit?: string;
    /** When it was logged (pre-formatted, e.g. "Aug 12"). */
    date?: string;
    /** Field / plot it came from. */
    field?: string;
    /** Quality grade chip (e.g. "A", "Premium"). */
    grade?: string;
}
export interface HarvestLogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Harvest records, newest first. Empty → empty state. Guarded indexing. */
    entries: HarvestEntry[];
    /** Card title. Default "Harvest log". */
    title?: string;
    /** Pre-formatted period total shown in the header (e.g. "18.6 t"). */
    total?: string;
    /** Max rows to render before truncating (rest summarized). Default all. */
    maxRows?: number;
    /** Empty-state title. */
    emptyTitle?: string;
    /** Empty-state description. */
    emptyDescription?: string;
}
/**
 * A harvest log — a titled {@link Card} listing recent harvest records (crop,
 * quantity + unit, date, field, optional grade chip). The header can show a
 * period `total`. When `entries` is empty an {@link EmptyState} stands in for
 * the list. Rows are keyed and indexed defensively, and `maxRows` truncates a
 * long log to a "+N more" summary. Token-bound throughout — no literal colors.
 */
export declare const HarvestLog: React.ForwardRefExoticComponent<HarvestLogProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HarvestLog.d.ts.map
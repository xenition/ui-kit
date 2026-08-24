import * as React from 'react';
/** School-calendar item type. Drives the icon + type chip. */
export type SchoolEventType = 'holiday' | 'exam' | 'meeting' | 'trip' | 'activity' | 'deadline' | 'other';
export interface SchoolEventRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Event title, e.g. "Parent-teacher conference". */
    title: string;
    /** Event type; drives the icon + type chip. */
    type?: SchoolEventType;
    /** Date label, e.g. "Mon, Sep 4". */
    date?: string;
    /** Time label, e.g. "3:00 PM". */
    time?: string;
    /** Location, e.g. "Room 12". */
    location?: string;
    /** Which child this concerns. */
    childName?: string;
    /** Fires when the row is activated. */
    onClick?: () => void;
}
/**
 * A row for a school-calendar item: a type icon, title, a date/time/location
 * line, and a type chip. When `onClick` is set the row is an accessible
 * `role="button"` with keyboard activation. Type is conveyed by glyph + label +
 * chip, not color alone. Token-bound throughout — no literal colors.
 */
export declare const SchoolEventRow: React.ForwardRefExoticComponent<SchoolEventRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SchoolEventRow.d.ts.map
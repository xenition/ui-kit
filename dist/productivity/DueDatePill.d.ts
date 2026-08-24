import * as React from 'react';
/** Relative due-date urgency. */
export type DueDateTone = 'overdue' | 'today' | 'upcoming';
export interface DueDatePillProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Pre-formatted date label (e.g. `'Aug 24'`, `'Tomorrow'`). */
    label: string;
    /** Urgency tone; drives the semantic color. */
    tone?: DueDateTone;
    /** Optional leading glyph override (default a calendar/clock per tone). */
    glyph?: string;
}
/**
 * Compact due-date pill — a token-bound background/foreground keyed off the
 * urgency `tone`, with a leading glyph. For deadlines on task rows and cards.
 * Web parity of the native `DueDatePill`. Every color traces to an `--xen-*`
 * token class. No literal colors.
 */
export declare const DueDatePill: React.ForwardRefExoticComponent<DueDatePillProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=DueDatePill.d.ts.map
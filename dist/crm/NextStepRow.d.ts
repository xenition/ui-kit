import * as React from 'react';
export type NextStepPriority = 'low' | 'normal' | 'high';
export interface NextStepRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The action to take (e.g. "Send proposal"). */
    title: string;
    /** Pre-formatted due date. */
    dueDate?: string;
    /** Marks the step past due — shown as an "Overdue" word + ⚠ glyph. */
    overdue?: boolean;
    /** Completed state — checkbox fills, title strikes through. */
    done?: boolean;
    /** Who owns the step. */
    assignee?: string;
    /** Priority — a leading glyph + label, not color-only. */
    priority?: NextStepPriority;
    /** Fired with the next `done` value when the checkbox is toggled. */
    onToggle?: (done: boolean) => void;
    /** Fired when the row body (not the checkbox) is activated. */
    onClick?: () => void;
}
/**
 * A single "next step" / task row for a deal or contact: a toggleable checkbox,
 * the action title (struck through when `done`), and a meta line of assignee,
 * priority (glyph + label) and due date. `overdue` is surfaced as the word
 * "Overdue" plus a ⚠ glyph in the `text-danger` tone — never color alone. The
 * checkbox reports the next state via `onToggle`. All colors are `--xen-*` token
 * classes.
 */
export declare const NextStepRow: React.ForwardRefExoticComponent<NextStepRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NextStepRow.d.ts.map
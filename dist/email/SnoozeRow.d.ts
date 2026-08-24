import * as React from 'react';
export interface SnoozeRowProps {
    /** Preset name (e.g. "Later today", "Tomorrow", "Next week"). */
    label: string;
    /** Resolved time shown on the trailing side (e.g. "6:00 PM"). */
    when?: string;
    /** Leading glyph. Default a clock. */
    glyph?: string;
    /** Selected preset — tinted + check. */
    selected?: boolean;
    /** Choose this preset. */
    onClick?: () => void;
    className?: string;
}
/**
 * A single snooze-preset option row — glyph, preset name, and the resolved time
 * it maps to. A real `<button>` used to build the snooze picker sheet. The
 * `selected` state tints the row and shows a check, and reports `aria-pressed`
 * to assistive tech (not by color only). No literal colors.
 */
export declare const SnoozeRow: React.ForwardRefExoticComponent<SnoozeRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=SnoozeRow.d.ts.map
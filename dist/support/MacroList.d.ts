import * as React from 'react';
export interface Macro {
    /** Stable id, returned to `onApply`. */
    id: string;
    /** Macro name (e.g. "Close + notify"). */
    name: string;
    /** Optional one-line description of what it does. */
    description?: string;
    /** Optional count of actions the macro runs. */
    actionCount?: number;
    /** Optional glyph/emoji leading the row. */
    glyph?: string;
    /** Mark unavailable (rendered dimmed, non-tappable). */
    disabled?: boolean;
}
export interface MacroListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The macros to list. */
    macros: Macro[];
    /** Fires with the macro when a row is activated. */
    onApply?: (macro: Macro) => void;
    /** Loading state (renders placeholder rows). */
    loading?: boolean;
    /** Text shown when the list is empty. */
    emptyText?: string;
}
/**
 * A list of agent macros (bundled actions that mutate a ticket) rendered as a
 * `menu` of native `<button>` `menuitem`s (click + keyboard for free). Each row
 * shows a glyph, name, optional description, and an action-count hint; activating
 * reports the macro via `onApply`. Handles `loading` (placeholder rows) and empty
 * (`EmptyState`) states, and disables `disabled` macros. Indexing is guarded and
 * colors come from token classes only.
 */
export declare const MacroList: React.ForwardRefExoticComponent<MacroListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MacroList.d.ts.map
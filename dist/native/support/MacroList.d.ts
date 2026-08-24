import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface MacroListProps {
    /** The macros to list. */
    macros: Macro[];
    /** Fires with the macro when a row is tapped. */
    onApply?: (macro: Macro) => void;
    /** Loading state (renders placeholder rows). */
    loading?: boolean;
    /** Text shown when the list is empty. */
    emptyText?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A tappable list of agent macros (bundled actions that mutate a ticket). Each
 * row shows a glyph, name, optional description, and an action-count hint;
 * tapping a row reports the macro via `onApply`. Handles `loading` (placeholder
 * rows) and empty states, and skips `disabled` macros with a dimmed,
 * non-interactive row. Indexing is guarded and colors come from tokens only.
 */
export declare function MacroList({ macros, onApply, loading, emptyText, style, }: MacroListProps): React.ReactElement;
//# sourceMappingURL=MacroList.d.ts.map
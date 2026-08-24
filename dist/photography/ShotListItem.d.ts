import * as React from 'react';
/** Priority of a shot-list entry. */
export type ShotPriority = 'must' | 'nice' | 'optional';
export interface ShotListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The shot description (e.g. "Bride & groom first look"). */
    title: string;
    /** Notes / setup line (pose, lens, lighting). */
    notes?: string;
    /** Whether the shot has been captured. */
    done?: boolean;
    /** Priority tag (shown as a labelled badge). */
    priority?: ShotPriority;
    /** Toggles the captured state when the row is pressed. */
    onToggle?: () => void;
}
/**
 * A shot-list checklist row — a check affordance, the shot title (struck when
 * `done`), an optional notes line, and a priority `Badge`. The whole row is a
 * keyboard-operable `checkbox` when `onToggle` is provided: its captured state
 * is announced via `aria-checked` and a ✓ glyph, never color alone. Composes
 * `Icon` and `Badge`. Token-only colors.
 */
export declare const ShotListItem: React.ForwardRefExoticComponent<ShotListItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShotListItem.d.ts.map
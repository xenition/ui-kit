import * as React from 'react';
export type SwipeActionTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface SwipeAction {
    id: string;
    /** Glyph rendered above the label. */
    glyph: string;
    /** Short label (e.g. "Archive", "Delete"). */
    label: string;
    /** Color tone of the action panel. Default `'neutral'`. */
    tone?: SwipeActionTone;
    onClick?: () => void;
}
export interface MailSwipeActionsProps {
    /** Action panels to render (leading or trailing swipe reveal). */
    actions: SwipeAction[];
    /** Which edge these belong to — affects fill direction. Default `'trailing'`. */
    side?: 'leading' | 'trailing';
    className?: string;
}
/**
 * The revealed action panels behind a swipeable mail row (this is the static
 * action rail — the host supplies the gesture/animation). Each action is a
 * full-height, toned real `<button>` with a glyph + label; tones map to
 * semantic slots (danger for delete, warn for snooze, etc). The container is a
 * `role="toolbar"`. Renders nothing when `actions` is empty. No literal colors.
 */
export declare const MailSwipeActions: React.ForwardRefExoticComponent<MailSwipeActionsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MailSwipeActions.d.ts.map
import * as React from 'react';
/** The swipe/deck actions a user can take on a profile. */
export type SwipeAction = 'rewind' | 'pass' | 'superlike' | 'like' | 'boost';
export type LikePassSize = 'sm' | 'md' | 'lg';
export interface LikePassButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Which actions to show, left→right. Defaults to pass · superlike · like. */
    actions?: SwipeAction[];
    /** Fires with the clicked action. */
    onAction?: (action: SwipeAction) => void;
    /** Per-action disable set (e.g. rewind with nothing to undo). */
    disabledActions?: SwipeAction[];
    /** Button scale. Defaults to `md`. */
    size?: LikePassSize;
}
/**
 * The circular action row under a swipe deck — the web parity of the native
 * like/pass controls. Each action is a round, real `<button>` carrying a glyph
 * AND an `aria-label`, so it is never identified by color alone. `onAction`
 * reports which control was clicked. Token color classes only — no literal colors.
 */
export declare const LikePassButtons: React.ForwardRefExoticComponent<LikePassButtonsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LikePassButtons.d.ts.map
import * as React from 'react';
export interface Reaction {
    /** Stable key for the reaction type (e.g. `'like'`, `'love'`). */
    key: string;
    /** Emoji/glyph shown for the reaction. */
    emoji: string;
    /** Count for this reaction. */
    count?: number;
    /** Whether the viewer has selected this reaction. */
    reacted?: boolean;
    /** Accessible label (e.g. `'Love'`). Falls back to `key`. */
    label?: string;
}
export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The reaction tallies to render. */
    reactions: ReadonlyArray<Reaction>;
    /** Fires with the reaction key when a pill is clicked. */
    onReact?: (key: string) => void;
    /** Renders a trailing `+` add-reaction affordance. */
    onAddReaction?: () => void;
    /** Message shown when `reactions` is empty and there's no add affordance. */
    emptyLabel?: string;
}
/**
 * A wrap of emoji reaction pills, each with a count and a selected state.
 * Selected pills fill with the primary color; the rest read on-surface. An
 * optional `+` opens a fuller picker upstream. Handles the empty tally too.
 * Web parity of the native `ReactionBar`; token-only, `aria-pressed` per pill.
 */
export declare const ReactionBar: React.ForwardRefExoticComponent<ReactionBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReactionBar.d.ts.map
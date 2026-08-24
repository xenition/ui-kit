import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface ReactionBarProps {
    /** The reaction tallies to render. */
    reactions: ReadonlyArray<Reaction>;
    /** Fires with the reaction key when a pill is tapped. */
    onReact?: (key: string) => void;
    /** Renders a trailing `+` add-reaction affordance. */
    onAddReaction?: () => void;
    /** Message shown when `reactions` is empty and there's no add affordance. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A wrap of emoji reaction pills, each with a count and a selected state.
 * Selected pills fill with the primary color; the rest read on-surface. An
 * optional `+` opens a fuller picker upstream. Handles the empty tally too.
 * Token-only.
 */
export declare function ReactionBar({ reactions, onReact, onAddReaction, emptyLabel, style, }: ReactionBarProps): React.ReactElement;
//# sourceMappingURL=ReactionBar.d.ts.map
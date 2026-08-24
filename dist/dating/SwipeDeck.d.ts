import * as React from 'react';
import { type SwipeCardProfile } from './SwipeCard';
/** The three swipe decisions the deck emits. */
export type SwipeDecision = 'like' | 'pass' | 'superlike';
export interface SwipeDeckProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Profiles to swipe through (top of the stack = index 0). */
    profiles?: SwipeCardProfile[];
    /** Custom card renderer; defaults to {@link SwipeCard}. */
    renderCard?: (profile: SwipeCardProfile, index: number) => React.ReactNode;
    /** Fires with the decision + profile whenever a card leaves the stack. */
    onSwipe?: (decision: SwipeDecision, profile: SwipeCardProfile) => void;
    /** Convenience: right swipe. */
    onSwipeRight?: (profile: SwipeCardProfile) => void;
    /** Convenience: left swipe. */
    onSwipeLeft?: (profile: SwipeCardProfile) => void;
    /** Convenience: up swipe (super like). */
    onSwipeUp?: (profile: SwipeCardProfile) => void;
    /** Fires when the last card has been swiped away. */
    onEmpty?: () => void;
    /** Show the built-in pass/super/like button row. Defaults to true. */
    showButtons?: boolean;
    /** Horizontal drag (px) needed to commit a like/pass. Defaults to 120. */
    threshold?: number;
    /** Loading skeleton. */
    loading?: boolean;
    /** Empty-state title. */
    emptyTitle?: string;
    /** Empty-state subtitle. */
    emptySubtitle?: string;
}
/**
 * The swipeable card stack — the web parity of the native dating deck. Unlike the
 * native pan-gesture deck, swipes here are driven by the built-in, fully
 * accessible {@link LikePassButtons} row (keyboard + screen-reader friendly) and
 * an optional pointer drag on the top card: dragging past `threshold` right = like,
 * left = pass, up = super like. Each committed swipe advances the stack and reports
 * through `onSwipe` (+ the directional convenience callbacks). LIKE / NOPE / SUPER
 * stamps fade in with drag progress. Shows an explicit {@link EmptyState} once the
 * stack is exhausted. Token classes only — no literal colors.
 */
export declare const SwipeDeck: React.ForwardRefExoticComponent<SwipeDeckProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwipeDeck.d.ts.map
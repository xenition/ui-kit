import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SwipeCardProfile } from './SwipeCard';
/** The three swipe decisions the deck emits. */
export type SwipeDecision = 'like' | 'pass' | 'superlike';
export interface SwipeDeckProps {
    /** Profiles to swipe through (top of the stack = index 0). */
    profiles?: SwipeCardProfile[];
    /** Custom card renderer; defaults to `SwipeCard`. */
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
    style?: StyleProp<ViewStyle>;
}
/**
 * The swipeable card stack — the native dating deck. The top card is draggable
 * via `PanResponder`: dragging past `threshold` right = like, left = pass, up =
 * super like, and each committed swipe animates the card off-screen, advances
 * the stack, and reports through `onSwipe` (+ the directional convenience
 * callbacks). LIKE / NOPE / SUPER stamps fade in with drag progress. A built-in,
 * fully-accessible `LikePassButtons` row drives the same swipes for keyboard /
 * screen-reader users. Shows an explicit empty state once the stack is
 * exhausted. Colors derive from theme tokens via `withAlpha` — no literal
 * colors.
 */
export declare function SwipeDeck({ profiles, renderCard, onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, showButtons, threshold, loading, emptyTitle, emptySubtitle, style, }: SwipeDeckProps): React.ReactElement;
//# sourceMappingURL=SwipeDeck.d.ts.map
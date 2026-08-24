import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** The swipe/deck actions a user can take on a profile. */
export type SwipeAction = 'rewind' | 'pass' | 'superlike' | 'like' | 'boost';
export type LikePassSize = 'sm' | 'md' | 'lg';
export interface LikePassButtonsProps {
    /** Which actions to show, left→right. Defaults to pass · superlike · like. */
    actions?: SwipeAction[];
    /** Fires with the tapped action. */
    onAction?: (action: SwipeAction) => void;
    /** Per-action disable set (e.g. rewind with nothing to undo). */
    disabledActions?: SwipeAction[];
    /** Button scale. Defaults to `md`. */
    size?: LikePassSize;
    style?: StyleProp<ViewStyle>;
}
/**
 * The circular action row under a swipe deck — the native like/pass controls.
 * Each action is a round, token-tinted button with a glyph AND an
 * `accessibilityLabel`, so it is never identified by color alone. `onAction`
 * reports which control was pressed. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors.
 */
export declare function LikePassButtons({ actions, onAction, disabledActions, size, style, }: LikePassButtonsProps): React.ReactElement;
//# sourceMappingURL=LikePassButtons.d.ts.map
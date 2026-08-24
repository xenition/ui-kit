import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SwipeActionTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface SwipeAction {
    id: string;
    /** Glyph rendered above the label. */
    glyph: string;
    /** Short label (e.g. "Archive", "Delete"). */
    label: string;
    /** Color tone of the action panel. Default `'neutral'`. */
    tone?: SwipeActionTone;
    onPress?: () => void;
}
export interface MailSwipeActionsProps {
    /** Action panels to render (leading or trailing swipe reveal). */
    actions: SwipeAction[];
    /** Which edge these belong to — affects fill direction. Default `'trailing'`. */
    side?: 'leading' | 'trailing';
    style?: StyleProp<ViewStyle>;
}
/**
 * The revealed action panels behind a swipeable mail row (this is the static
 * action rail — the host supplies the gesture/animation). Each action is a
 * full-height, toned button with a glyph + label; tones map to semantic slots
 * (danger for delete, warn for snooze, etc). Renders nothing when `actions` is
 * empty. No literal colors.
 */
export declare function MailSwipeActions({ actions, side, style, }: MailSwipeActionsProps): React.ReactElement | null;
//# sourceMappingURL=MailSwipeActions.d.ts.map
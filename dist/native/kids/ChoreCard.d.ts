import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ChoreStatus = 'todo' | 'in-progress' | 'done' | 'skipped';
export interface ChoreCardProps {
    /** Chore title, e.g. "Make the bed". */
    title: string;
    /** Who the chore is assigned to. */
    assignee?: string;
    /** Reward points for completing the chore. */
    points?: number;
    /** Due label already formatted, e.g. "Today" or "Fri 5pm". */
    due?: string;
    /** Emoji/glyph shown as the chore icon. */
    icon?: string;
    /** Completion status; drives the chip + whether the action shows. */
    status?: ChoreStatus;
    /** Loading placeholder state. */
    loading?: boolean;
    /** Fires when the "Mark done" action is pressed (only shown when not done). */
    onComplete?: () => void;
    /** Fires when the card body is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single chore: an icon, title, assignee + due line, a reward-points chip, a
 * status chip, and a "Mark done" button. Status is conveyed by glyph + text +
 * a11y label (never color alone). Renders a muted skeleton while `loading`.
 * Token-only colors.
 */
export declare function ChoreCard({ title, assignee, points, due, icon, status, loading, onComplete, onPress, style, }: ChoreCardProps): React.ReactElement;
//# sourceMappingURL=ChoreCard.d.ts.map
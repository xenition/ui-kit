import * as React from 'react';
/** Completion state of a chore. Drives the status chip + whether the action shows. */
export type ChoreStatus = 'todo' | 'in-progress' | 'done' | 'skipped';
export interface ChoreCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
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
    /** Fires when the card body is activated. */
    onClick?: () => void;
}
/**
 * A single chore: an icon, title, assignee + due line, a reward-points chip, a
 * status chip, and a "Mark done" button. Status is conveyed by glyph + text +
 * a11y label (never color alone). The action stops propagation so it never
 * triggers the card's `onClick`. Renders a muted skeleton while `loading`.
 * Token-bound throughout — no literal colors.
 */
export declare const ChoreCard: React.ForwardRefExoticComponent<ChoreCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChoreCard.d.ts.map
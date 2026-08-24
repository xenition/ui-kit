import * as React from 'react';
/** Developmental category. Drives the icon + label. */
export type MilestoneCategory = 'physical' | 'cognitive' | 'social' | 'language' | 'emotional' | 'other';
export interface MilestoneCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Milestone title, e.g. "First steps". */
    title: string;
    /** Developmental category; drives the icon + label. */
    category?: MilestoneCategory;
    /** Date the milestone was reached (or is expected). */
    date?: string;
    /** Typical age band, e.g. "12–15 mo". */
    ageLabel?: string;
    /** Free-text description / note. */
    description?: string;
    /** Whether the milestone has been achieved. */
    achieved?: boolean;
    /** Loading placeholder state. */
    loading?: boolean;
    /** Fires when the card is activated. */
    onClick?: () => void;
}
/**
 * A developmental milestone: a category icon, title, date/age band, an optional
 * note, and an achieved/upcoming chip. State is conveyed by glyph + text + a11y
 * label (never color alone). When `onClick` is set the card is an accessible
 * `role="button"` with keyboard activation; renders a muted skeleton while
 * `loading`. Token-bound throughout — no literal colors.
 */
export declare const MilestoneCard: React.ForwardRefExoticComponent<MilestoneCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MilestoneCard.d.ts.map
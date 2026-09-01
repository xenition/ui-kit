import * as React from 'react';
export interface CourseCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Program title. */
    title: string;
    /** Secondary line — a short description. */
    subtitle?: string;
    /** Small uppercase category kicker. */
    category?: string;
    /** Total number of days in the program. */
    totalDays: number;
    /** Days completed so far. Default `0`. */
    completedDays?: number;
    /** Glyph shown on the gradient cover tile. Default `'🌿'`. */
    coverGlyph?: string;
    /** Fires when the card is tapped; the card is a button only when set. */
    onPress?: () => void;
    className?: string;
}
/**
 * CourseCard (web parity) — a multi-day program on a calm, clean surface card. A
 * single small gradient cover tile and a slim gradient progress fill are the
 * only color; the rest stays on the neutral surface with `on-surface`/`muted`
 * type, in the spirit of restraint. Progress is stated in words ("Day 3 of 10")
 * as well as the bar (`bg-neutral-200` track, gradient fill via inline width %),
 * so it never depends on color alone. Token-only colors.
 */
export declare const CourseCard: React.ForwardRefExoticComponent<CourseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CourseCard.d.ts.map
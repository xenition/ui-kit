import * as React from 'react';
export interface SessionCompleteCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Headline for the celebration. Default `'Session complete'`. */
    title?: string;
    /** A supporting, encouraging line. */
    message?: string;
    /** Minutes practiced this session; shown as a frosted chip when set. */
    minutes?: number;
    /** Current streak in days; shown as a frosted chip when set. */
    streakDays?: number;
    /** Fires when the primary "Done" pill is tapped; the pill renders only when set. */
    onDone?: () => void;
    /** Fires when the ghost "Reflect" button is tapped; renders only when set. */
    onReflect?: () => void;
    className?: string;
}
/**
 * SessionCompleteCard (web parity) — the peak moment after a practice: a festive
 * brand gradient ground, a big frosted `bg-primary-500` check badge, and frosted
 * stat chips (minutes, streak). `Done` is a near-white `bg-on-primary
 * text-primary` pill; `Reflect` is a bordered ghost. Each action renders only
 * when its handler is set. Near-white ink and the gradient derive from the brand
 * ramp — token-only colors. The one screen allowed to feel like a reward.
 */
export declare const SessionCompleteCard: React.ForwardRefExoticComponent<SessionCompleteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SessionCompleteCard.d.ts.map
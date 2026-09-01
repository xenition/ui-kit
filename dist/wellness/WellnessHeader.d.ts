import * as React from 'react';
export interface WellnessHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Time-of-day greeting, e.g. `'Good morning'`. */
    greeting?: string;
    /** The person's name. */
    name?: string;
    /** A subtitle line (e.g. a date or an encouraging note). */
    subtitle?: string;
    /** Current practice streak in days; shown as a frosted chip when set. */
    streakDays?: number;
    /** Minutes practiced today; shown as a frosted chip when set. */
    minutes?: number;
    /** Optional avatar glyph/emoji for the profile button. Default `'🧘'`. */
    avatarGlyph?: string;
    /** Fires when the profile avatar is tapped. */
    onProfile?: () => void;
    className?: string;
}
/**
 * WellnessHeader (web parity) — the home-screen header: a soft brand gradient
 * ground with a greeting and name, an optional profile avatar, and frosted
 * "glass" stat chips (streak, minutes today). Near-white ink (`text-on-primary`
 * / `text-primary-100`) and the gradient both derive from the brand ramp; the
 * frosted chips are `bg-primary-500`. Token-only colors, the single vivid
 * surface on the screen.
 */
export declare const WellnessHeader: React.ForwardRefExoticComponent<WellnessHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WellnessHeader.d.ts.map
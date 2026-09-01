import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SessionCompleteCardProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * SessionCompleteCard — the peak moment after a practice: a festive two-hue
 * "dawn" gradient ground, a big frosted check badge, and frosted stat chips
 * (minutes, streak). The `Done`/`Reflect` actions each appear only when their
 * handler is set. Near-white ink and the gradient both derive from the brand
 * ramp — no literal colors, so the celebration restyles from the seed in light
 * and dark. Deliberately more saturated than the resting surfaces: this is the
 * one screen allowed to feel like a reward.
 */
export declare function SessionCompleteCard({ title, message, minutes, streakDays, onDone, onReflect, style, }: SessionCompleteCardProps): React.ReactElement;
//# sourceMappingURL=SessionCompleteCard.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CountdownProps {
    /** Target date/time to count down to. */
    to: Date | string;
    /** Fired once when the countdown reaches zero. */
    onComplete?: () => void;
    /** Labels for the four boxes. */
    labels?: {
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
    };
    style?: StyleProp<ViewStyle>;
}
/**
 * Counts down to a target date/time in days/hours/mins/secs boxes — the native
 * mirror of the web `Countdown`. A 1s `setInterval` ticks the display and is
 * cleaned up on unmount. The time text is information (not motion), so the
 * interval still runs under reduced motion — only decorative animation would be
 * gated. Token-only — box surface/border/text all trace to theme tokens.
 */
export declare function Countdown({ to, onComplete, labels, style, }: CountdownProps): React.ReactElement;
//# sourceMappingURL=Countdown.d.ts.map
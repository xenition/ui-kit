import * as React from 'react';
export interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/** Counts down to a target date/time in days/hours/mins/secs boxes; cleans up its interval on unmount. */
export declare const Countdown: React.ForwardRefExoticComponent<CountdownProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Countdown.d.ts.map
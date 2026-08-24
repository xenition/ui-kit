import * as React from 'react';
export type StatBarProps = React.HTMLAttributes<HTMLDivElement>;
/** Horizontal row of `Stat`s — counts up as it scrolls into view. */
export declare const StatBar: React.ForwardRefExoticComponent<StatBarProps & React.RefAttributes<HTMLDivElement>>;
export interface StatProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix'> {
    /** Final value the counter reaches. */
    to: number;
    /** Label under the number. */
    label: React.ReactNode;
    /** Rendered before the number (e.g. `$`). */
    prefix?: React.ReactNode;
    /** Rendered after the number (e.g. `+`, `%`). */
    suffix?: React.ReactNode;
    /** Count duration in ms. */
    duration?: number;
    /** Formats the animated value. */
    format?: (value: number) => string;
}
/** One statistic: an `AnimatedCounter` with prefix/suffix and a label. */
export declare const Stat: React.ForwardRefExoticComponent<StatProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatBar.d.ts.map
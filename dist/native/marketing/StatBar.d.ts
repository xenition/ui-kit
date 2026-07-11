import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface StatItem {
    /** Final value the counter reaches (web calls this `to`). */
    value: number;
    /** Alias for `value` to match the web `Stat` prop name. */
    to?: number;
    /** Label under the number. */
    label: string;
    /** Rendered before the number (e.g. `$`). */
    prefix?: string;
    /** Rendered after the number (e.g. `+`, `%`). */
    suffix?: string;
    /** Count duration in ms (default 1200). */
    duration?: number;
    /** Formats the animated value (default: locale integer). */
    format?: (value: number) => string;
}
export interface StatBarProps {
    /** The statistics to render (mirrors the web `Stat` children). */
    stats: StatItem[];
    style?: StyleProp<ViewStyle>;
}
/**
 * One statistic with a count-up number and a label — the native mirror of the
 * web `Stat`. The web `AnimatedCounter` starts when scrolled into view; native
 * has no IntersectionObserver, so the count-up runs once on mount via
 * `Animated.timing` (simplification). Token-only.
 */
export declare function Stat({ value, to, label, prefix, suffix, duration, format, }: StatItem): React.ReactElement;
/**
 * Horizontal row of `Stat`s — the native mirror of the web `StatBar`. The web
 * version composes children; native takes a `stats` data array and wraps them
 * in a centered flex row. Token-only.
 */
export declare function StatBar({ stats, style }: StatBarProps): React.ReactElement;
//# sourceMappingURL=StatBar.d.ts.map
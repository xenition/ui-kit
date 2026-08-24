import * as React from 'react';
export interface SunriseSunsetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
    /** Sunrise time label (e.g. `'6:42 AM'`). */
    sunrise?: string;
    /** Sunset time label (e.g. `'7:58 PM'`). */
    sunset?: string;
    /**
     * Daylight progress 0–1 (fraction of the day elapsed between sunrise and
     * sunset). Positions the sun marker on the arc. Default `0.5`.
     */
    progress?: number;
    /** Height of the arc area in px. Default `72`. */
    arcHeight?: number;
    /** Message shown when both times are absent. */
    emptyLabel?: string;
}
/**
 * Sunrise / sunset card with a static daylight arc (web parity of the native
 * `SunriseSunset`). The arc is a dependency-free row of token-tinted dots forming
 * a dome; the sun marker sits at `progress` along it. Sunrise and sunset are
 * labelled with glyphs + times, so the info never relies on the arc alone.
 * Renders a muted empty state when both times are absent. All colors come from
 * the `--xen-*` tokens via Tailwind classes — no literal colors, no SVG deps.
 */
export declare const SunriseSunset: React.ForwardRefExoticComponent<SunriseSunsetProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SunriseSunset.d.ts.map
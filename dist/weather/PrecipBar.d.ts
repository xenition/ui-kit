import * as React from 'react';
export interface PrecipSlot {
    /** Period label (e.g. `'9a'`, `'Mon'`). */
    label: string;
    /** Chance of precipitation, 0–100. */
    chance: number;
    /** Optional accumulation caption (e.g. `'0.2"'`). */
    amount?: string;
}
export interface PrecipBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Per-period precipitation chances, rendered as a bar column each. */
    slots: PrecipSlot[];
    /** Bar column height in px. Default `96`. */
    height?: number;
    /** Show the numeric % above each bar. Default `false`. */
    showValues?: boolean;
    /** Message shown when `slots` is empty. */
    emptyLabel?: string;
}
/**
 * Precipitation-probability bars (web parity of the native `PrecipBar`): one
 * token-filled column per period, its height proportional to the chance (0–100).
 * The fill uses a `primary` token plus a droplet glyph header, so the metric
 * reads without color alone. Values are guarded/clamped to 0–100. Renders an
 * `EmptyState` when `slots` is empty. All colors come from the `--xen-*` tokens
 * via Tailwind classes — no literal colors, no chart deps.
 */
export declare const PrecipBar: React.ForwardRefExoticComponent<PrecipBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PrecipBar.d.ts.map
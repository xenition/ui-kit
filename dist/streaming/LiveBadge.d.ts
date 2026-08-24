import * as React from 'react';
export type LiveBadgeVariant = 'solid' | 'outline' | 'dot';
export interface LiveBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * - `solid`   — filled `danger` pill with on-danger text (default).
     * - `outline` — `danger` border + text on a transparent surface.
     * - `dot`     — just the dot + label, no pill chrome.
     */
    variant?: LiveBadgeVariant;
    /** Label text (default `'LIVE'`). */
    label?: string;
    /** Optional concurrent viewer count, appended after the label when set. */
    viewers?: number;
}
/**
 * A "LIVE" indicator for streams (web) — a `danger`-toned pill with a leading
 * dot. Three variants (`solid` / `outline` / `dot`) and an optional viewer
 * count. Presentational only; every color resolves from the `--xen-*` danger /
 * on-danger / muted tokens — no literal hex. The combined text (label +
 * viewers) is exposed as the element's `aria-label` for a single announcement.
 */
export declare const LiveBadge: React.ForwardRefExoticComponent<LiveBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=LiveBadge.d.ts.map
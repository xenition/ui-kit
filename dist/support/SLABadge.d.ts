import * as React from 'react';
/** The three SLA health states. */
export type SLAState = 'on-track' | 'at-risk' | 'breached';
export type SLABadgeSize = 'sm' | 'md';
export interface SLABadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** SLA health. Drives glyph + label + tone — never color alone. */
    state: SLAState;
    /**
     * Optional right-hand hint (e.g. a remaining-time string like `"2h left"`
     * or `"12m over"`). Rendered after the state label.
     */
    hint?: string;
    /** Size scale (default `md`). */
    size?: SLABadgeSize;
    /** Override the visible state label (defaults to a humanized state). */
    label?: string;
}
/**
 * SLA health pill for a helpdesk ticket. Encodes `on-track` / `at-risk` /
 * `breached` with a semantic tone **and** a distinct glyph + text label, so the
 * state is legible without relying on color (colorblind-safe / screen-reader
 * announced). Colors come only from the `--xen-*` token classes
 * (`text-success`/`text-warn`/`text-danger`) — no literal hex. Presentational.
 */
export declare const SLABadge: React.ForwardRefExoticComponent<SLABadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=SLABadge.d.ts.map
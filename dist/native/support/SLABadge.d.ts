import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** The three SLA health states. */
export type SLAState = 'on-track' | 'at-risk' | 'breached';
export type SLABadgeSize = 'sm' | 'md';
export interface SLABadgeProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * SLA health pill for a helpdesk ticket. Encodes `on-track` / `at-risk` /
 * `breached` with a semantic tint **and** a distinct glyph + text label, so the
 * state is legible without relying on color (colorblind-safe / screen-reader
 * announced). Colors come only from `SemanticColors` (`success`/`warn`/`danger`)
 * via a token-derived soft tint — no literal hex. Purely presentational.
 */
export declare function SLABadge({ state, hint, size, label, style, }: SLABadgeProps): React.ReactElement;
//# sourceMappingURL=SLABadge.d.ts.map
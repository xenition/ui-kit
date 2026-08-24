import * as React from 'react';
/** Emergency-severity levels, 1 (most acute) → 5 (least). */
export type TriageLevelValue = 1 | 2 | 3 | 4 | 5;
export interface TriageLevelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Severity level 1–5. Out-of-range values are clamped into 1–5. */
    level: TriageLevelValue;
    /** Overrides the default level label. */
    label?: string;
    /** Overrides the default descriptive hint. */
    description?: string;
    /** Compact chip form (no description block). */
    compact?: boolean;
}
/**
 * A triage acuity indicator (1 = immediate … 5 = non-urgent) — the web mirror
 * of the native `TriageLevel`. The level is always conveyed by the number + a
 * text label + a glyph, so severity never relies on the color fill alone (the
 * token color is a supporting cue only). Renders a full card with a guidance
 * hint, or a `compact` chip. Token-only colors. Informational UI only — not a
 * medical device.
 */
export declare const TriageLevel: React.ForwardRefExoticComponent<TriageLevelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TriageLevel.d.ts.map
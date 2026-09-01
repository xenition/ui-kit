import * as React from 'react';
import type { TriageLevelProps } from './TriageLevel';
/** Drop-in for {@link TriageLevelProps} — same props, the V4 "clinic" design. */
export type TriageLevelV4Props = TriageLevelProps;
/**
 * TriageLevel — **V4** "clinic" design. The calm, clinical acuity indicator
 * (1 = Immediate/resuscitation … 5 = Non-urgent): a big legible **tabular-nums**
 * number in a soft-tone well, a text label, and a glyph, so severity is always
 * number + label + glyph + supporting tone — never a color fill alone (no
 * gradient — clinical surfaces stay clean). Renders an elevated rounded card with
 * a guidance hint, or a `compact` chip. Identical props/behavior to
 * {@link TriageLevelProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
export declare function TriageLevelV4({ level, label, description, compact, style, }: TriageLevelV4Props): React.ReactElement;
//# sourceMappingURL=TriageLevelV4.d.ts.map
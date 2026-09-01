import * as React from 'react';
import type { VisitSummaryProps } from './VisitSummary';
/** Drop-in for {@link VisitSummaryProps} — same props, the V4 "clinic" design. */
export type VisitSummaryV4Props = VisitSummaryProps;
/**
 * VisitSummary — **V4** "clinic" design (native twin of the web V4). The calm,
 * clinical take on a visit / encounter summary, and the ONE reserved gradient
 * moment of the medical V4 "clinic" line: the header (visit title, provider,
 * visit date) rides a rounded, overflow-hidden `GradientSurface` on the brand
 * gradient (`clinicGradient`) in near-white ink (`clinicInk`/`clinicInkSoft`),
 * with the diagnosis carried as a frosted glass chip (`clinicTile` +
 * `clinicBorder`). The body — the structured note sections — stays on the plain
 * surface with clear labelled rows. Renders loading and empty states. Identical
 * props/behavior to {@link VisitSummaryProps}. Token-only colors via
 * `useXenitionTheme()` + the clinic ramp helpers, dark-mode safe. Informational
 * UI only — not a medical device.
 */
export declare function VisitSummaryV4({ title, provider, date, diagnosis, sections, loading, emptyLabel, style, }: VisitSummaryV4Props): React.ReactElement;
//# sourceMappingURL=VisitSummaryV4.d.ts.map
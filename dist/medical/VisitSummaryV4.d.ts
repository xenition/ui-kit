import * as React from 'react';
import type { VisitSummaryProps } from './VisitSummary';
/** Drop-in for {@link VisitSummaryProps} — same props, the V4 "clinic" design. */
export type VisitSummaryV4Props = VisitSummaryProps;
/**
 * VisitSummary — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a visit / encounter summary, and the ONE reserved
 * gradient moment of the medical V4 "clinic" line: the header (visit title,
 * provider, visit date) rides a brand-gradient ground
 * (`bg-gradient-to-br from-primary-500 to-primary-700`) in near-white ink
 * (`text-primary-50`/`text-primary-100`), with the diagnosis carried as a
 * frosted glass chip (`bg-primary-50/15 border border-primary-50/30`). The body
 * — the structured note sections — stays on the plain surface with clear
 * labelled rows. Renders loading and empty (`EmptyState`) states. Identical
 * props/behavior to {@link VisitSummaryProps}. Token-only colors (`--xen-*` /
 * gradient utilities), no literals. Informational UI only — not a medical
 * device.
 */
export declare const VisitSummaryV4: React.ForwardRefExoticComponent<VisitSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VisitSummaryV4.d.ts.map
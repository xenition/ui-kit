import * as React from 'react';
import type { ResponseSummaryProps } from './ResponseSummary';
/** Drop-in for {@link ResponseSummaryProps} — same props, the V4 "focus" design. */
export type ResponseSummaryV4Props = ResponseSummaryProps;
/**
 * ResponseSummary — **V4** "focus" design. The calm, legible read-back of the
 * respondent's answers before submit: a titled list of airy rows where the
 * question sits small and muted above its bold on-surface answer. Skipped
 * answers render muted and italic with a spoken, explicit "Skipped" marker (not
 * color-only), and each row can expose a primary `Edit` affordance when `onEdit`
 * is supplied. An empty `answers` array renders a muted {@link EmptyState}. One
 * accent (primary), no gradients. Same props/behavior as
 * {@link ResponseSummaryProps}; all colors from `--xen-*` token classes (no
 * literal colors).
 */
export declare const ResponseSummaryV4: React.ForwardRefExoticComponent<ResponseSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ResponseSummaryV4.d.ts.map
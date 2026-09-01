import * as React from 'react';
import type { ResponseSummaryProps } from './ResponseSummary';
/** Drop-in for {@link ResponseSummaryProps} — same props, the V4 "focus" design. */
export type ResponseSummaryV4Props = ResponseSummaryProps;
/**
 * ResponseSummary — **V4** "focus" design. The calm, legible read-back of the
 * respondent's answers before submit: a titled list of airy rows where the
 * question sits small and muted above its bold on-surface answer. Skipped
 * answers render muted and italic with an explicit, spoken "Skipped" marker (not
 * color-only), and each row can expose a primary `Edit` affordance when `onEdit`
 * is supplied. An empty `answers` array renders a muted empty state. One accent
 * (primary), no gradients. Same props/behavior as {@link ResponseSummaryProps};
 * token-only colors via `useXenitionTheme()` + `withAlpha`.
 */
export declare function ResponseSummaryV4({ answers, title, onEdit, editLabel, emptyText, style, }: ResponseSummaryV4Props): React.ReactElement;
//# sourceMappingURL=ResponseSummaryV4.d.ts.map
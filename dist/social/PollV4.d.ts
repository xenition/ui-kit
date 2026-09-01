import * as React from 'react';
import type { PollProps } from './Poll';
/** Drop-in for {@link PollProps} — same props, the V4 "feed" design. */
export type PollV4Props = PollProps;
/**
 * Poll — **V4** "feed" design (web parity of the native V4). Clean and airy with
 * a single primary accent: before voting, big (≥44px) tappable option rows;
 * after voting or when `closed`, each row becomes a soft-primary fill bar showing
 * the `%`, with the viewer's pick and the leading option emphasized in primary.
 * Keeps the total-votes + expiry caption and guards an all-zero tally. Same
 * props/behavior as {@link PollProps}; token-only, `role="radiogroup"`/
 * `role="radio"` semantics.
 */
export declare const PollV4: React.ForwardRefExoticComponent<PollProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PollV4.d.ts.map
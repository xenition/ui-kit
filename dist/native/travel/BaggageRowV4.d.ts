import * as React from 'react';
import type { BaggageRowProps } from './BaggageRow';
/** Drop-in for {@link BaggageRowProps} — same props, the V4 "journey" design. */
export type BaggageRowV4Props = BaggageRowProps;
/**
 * BaggageRow — **V4** "journey" design. The boarding-pass take on a
 * baggage-allowance line: the baggage-kind glyph sits in a small brand-gradient
 * disc (the signature V4 touch), followed by the title and the allowance detail,
 * then a trailing status — an "Included" success badge when the allowance is in
 * the fare, otherwise the fare add-on price via `PriceTag` (or a muted "Not
 * available"). `included` drives both the badge text and the announcement, so
 * meaning never rides on color alone. Same props/behavior as
 * {@link BaggageRowProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function BaggageRowV4({ kind, label, allowance, included, priceCents, currency, style, }: BaggageRowV4Props): React.ReactElement;
//# sourceMappingURL=BaggageRowV4.d.ts.map
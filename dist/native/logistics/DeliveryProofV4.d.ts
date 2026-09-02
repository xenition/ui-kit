import * as React from 'react';
import type { DeliveryProofProps } from './DeliveryProof';
/** Drop-in for {@link DeliveryProofProps} — same props, the V4 "dispatch" design. */
export type DeliveryProofV4Props = DeliveryProofProps;
/**
 * DeliveryProof — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a proof-of-delivery record: an elevated
 * rounded card with a soft shadow, a captured-media placeholder (a soft-primary
 * panel stands in for the signature/photo — no media dependency), a labelled
 * glyph + word outcome badge (never color alone), the recipient, drop location
 * and timestamp, and an optional driver note. Tappable when `onPress` is set.
 * Empty (`hasMedia={false}`) and loading states supported. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function DeliveryProofV4({ kind, outcome, recipient, time, location, note, hasMedia, loading, onPress, testID, style, }: DeliveryProofV4Props): React.ReactElement;
//# sourceMappingURL=DeliveryProofV4.d.ts.map
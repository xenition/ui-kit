import * as React from 'react';
import type { DriverCardProps } from './DriverCard';
/**
 * Alternate design (v3) of {@link DriverCard} — a drop-in with the **same
 * props**. The *compact single row*: a small avatar with an online status dot,
 * the name + inline star rating, the plate chip, the ETA pinned to the trailing
 * edge, and a single call icon-tap. Availability is spelled out in the a11y
 * label (never color alone). Token-pure: semantic slots and `withAlpha` only.
 */
export type DriverCardV3Props = DriverCardProps;
export declare function DriverCardV3({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, onCall, onPress, loading, style, }: DriverCardV3Props): React.ReactElement;
//# sourceMappingURL=DriverCardV3.d.ts.map
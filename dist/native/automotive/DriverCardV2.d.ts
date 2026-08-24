import * as React from 'react';
import type { DriverCardProps } from './DriverCard';
/**
 * Alternate design (v2) of {@link DriverCard} — a drop-in with the **same
 * props**. Where the original is a left-aligned row, V2 is a *centered profile
 * card*: an elevated surface, a large **ringed avatar** with an online status
 * dot, the name and rating stacked centrally, the vehicle + plate as centered
 * chips, a hero'd **ETA block**, and full-width call / message actions.
 * Availability is a text-labelled badge (not color alone). Token-pure: semantic
 * slots and `withAlpha` tints only.
 */
export type DriverCardV2Props = DriverCardProps;
export declare function DriverCardV2({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, onMessage, onCall, onPress, loading, style, }: DriverCardV2Props): React.ReactElement;
//# sourceMappingURL=DriverCardV2.d.ts.map
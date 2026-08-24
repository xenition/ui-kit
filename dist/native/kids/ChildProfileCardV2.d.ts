import * as React from 'react';
import type { ChildProfileCardProps } from './ChildProfileCard';
/** Same public contract as {@link ChildProfileCard} — a drop-in alternate design. */
export type ChildProfileCardV2Props = ChildProfileCardProps;
/**
 * ChildProfileCard, redesigned (v2): a **playful profile banner**. A soft
 * primary-tinted banner band tops the card; a large avatar overlaps it, centered
 * above a big name, a pill-shaped mood chip, and a centered wrap of interest
 * chips. Lifted with a shadow and a gentle mount-fade. Reads as a warm "hero"
 * card — clearly distinct from v1's flat left-aligned row. Same props.
 */
export declare function ChildProfileCardV2({ name, photoUrl, age, grade, birthday, mood, interests, loading, onPress, style, }: ChildProfileCardV2Props): React.ReactElement;
//# sourceMappingURL=ChildProfileCardV2.d.ts.map
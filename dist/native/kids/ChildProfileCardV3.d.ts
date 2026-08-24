import * as React from 'react';
import type { ChildProfileCardProps } from './ChildProfileCard';
/** Same public contract as {@link ChildProfileCard} — a drop-in alternate design. */
export type ChildProfileCardV3Props = ChildProfileCardProps;
/**
 * ChildProfileCard, redesigned (v3): a **compact list row**. A small avatar, the
 * name with a single age·grade subline, and the mood as a trailing glyph — one
 * dense line suited to a roster or picker. Deliberately the opposite of v2's tall
 * hero banner. Same props.
 */
export declare function ChildProfileCardV3({ name, photoUrl, age, grade, birthday, mood, interests, loading, onPress, style, }: ChildProfileCardV3Props): React.ReactElement;
//# sourceMappingURL=ChildProfileCardV3.d.ts.map
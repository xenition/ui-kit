import * as React from 'react';
import type { ChildProfileCardProps } from './ChildProfileCard';
/** Same public contract as {@link ChildProfileCard} — a drop-in alternate design. */
export type ChildProfileCardV3Props = ChildProfileCardProps;
/**
 * ChildProfileCard, redesigned (v3): a **compact borderless roster row**. A small
 * avatar, the name over an age·grade·interests summary line, and the mood as a
 * trailing glyph — a hairline underline lets many stack as a family list. The
 * opposite of v2's banner hero. Same props, token-only.
 */
export declare const ChildProfileCardV3: React.ForwardRefExoticComponent<ChildProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChildProfileCardV3.d.ts.map
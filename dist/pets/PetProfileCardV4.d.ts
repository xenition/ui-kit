import * as React from 'react';
import type { PetProfileCardProps } from './PetProfileCard';
/** Drop-in for {@link PetProfileCardProps} — same props, the V4 "companion" design. */
export type PetProfileCardV4Props = PetProfileCardProps;
/**
 * PetProfileCard — **V4** "companion" profile hero (web parity of the native
 * V4). This is the pets line's ONE reserved gradient moment: the pet header sits
 * on the brand gradient ground (`from-primary-500 to-primary-700`) with near-white
 * `primary-50`/`primary-100` ink, a frosted-ring avatar, an age/sex/weight strip
 * rendered as frosted glass tiles, and spay/microchip facts as frosted chips
 * (never color alone — each carries a glyph + label). Same props/behavior as
 * {@link PetProfileCardProps}; `species` drives the glyph + fallback label.
 * `loading` renders a frosted skeleton on the gradient. All colors from `--xen-*`
 * token classes (no literals); the whole card is a keyboard-activatable button
 * when `onClick` is set.
 */
export declare const PetProfileCardV4: React.ForwardRefExoticComponent<PetProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PetProfileCardV4.d.ts.map
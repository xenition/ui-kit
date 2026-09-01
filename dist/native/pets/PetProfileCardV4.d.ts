import * as React from 'react';
import type { PetProfileCardProps } from './PetProfileCard';
/** Drop-in for {@link PetProfileCardProps} — same props, the V4 "companion" design. */
export type PetProfileCardV4Props = PetProfileCardProps;
/**
 * PetProfileCard — **V4** "companion" profile hero (native twin of the web V4).
 * This is the pets line's ONE reserved gradient moment: the pet header sits on
 * the brand gradient ground (`companionGradient`) drawn as an absolute-fill
 * `GradientSurface` inside a rounded, overflow-hidden container, with near-white
 * `companionInk`/`companionInkSoft` text, a frosted-ring avatar, an
 * age/sex/weight strip rendered as frosted glass tiles (`companionTile` +
 * `companionBorder`), and spay/microchip facts as frosted chips (never color
 * alone — each carries a glyph + label). Same props/behavior as
 * {@link PetProfileCardProps}; `species` drives the glyph + fallback label.
 * `loading` renders a frosted skeleton on the gradient. Token-only colors via
 * `useXenitionTheme()` + the companion ramp helpers; the whole card is pressable
 * when `onPress` is set.
 */
export declare function PetProfileCardV4({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading, onPress, style, }: PetProfileCardV4Props): React.ReactElement;
//# sourceMappingURL=PetProfileCardV4.d.ts.map
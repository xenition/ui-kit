import * as React from 'react';
import type { ProfileCardProps } from './ProfileCard';
export interface ProfileCardV4Props extends ProfileCardProps {
    /** Name for the loading card. Default `'Loading profile'`. */
    loadingLabel?: string;
}
/**
 * **V4 profile card** — the web twin of the native `ProfileCardV4`, same props
 * as {@link ProfileCard} plus `loadingLabel`.
 *
 * `onClickInterest` is the web spelling of native's `onPressInterest`; that is
 * the one permitted split in the twin contract, and both names mean the same
 * callback with the same argument.
 *
 * ## Four changes
 *
 * 1. **A card nobody can press does not look pressable.** Every state used the
 *    same `Card`, and the two twins picked different variants for it, so a
 *    static profile summary carried a hover raise and an affordance it had no
 *    handler for. The variant follows the presence of a click handler, and the
 *    component does not fabricate a `role="button"` around a `<div>` to make up
 *    the difference — a caller who wants a pressable profile wraps it in one.
 * 2. **The name is a heading.** A profile card is the top of a page's content
 *    far more often than it is a row, and its name was an anonymous `<span>`,
 *    so the card had no structure a reader could jump to.
 * 3. **Loading and empty are announced and shaped.** The skeleton was three
 *    `bg-neutral-200` blocks — a ramp step, a near-white slab in dark mode —
 *    with nothing telling assistive tech that anything was happening; empty was
 *    an emoji and a line of `muted`, a decorative slot used as text.
 * 4. **Its parts are the V4 parts**, so the interest chips clear 44 (they were
 *    rendered here at `sm`, around 22px, which is where most of the module's
 *    undersized targets actually lived), the distance badge honours its
 *    `variant`, the meter reports a value and the photo pager has visible
 *    controls. The compact thumbnail asks for `showControls={false}` — chevrons
 *    on a 64px square are decoration, and the row is not a pager.
 */
export declare const ProfileCardV4: React.ForwardRefExoticComponent<ProfileCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileCardV4.d.ts.map
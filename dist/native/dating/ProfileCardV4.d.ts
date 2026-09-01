import * as React from 'react';
import type { ProfileCardProps } from './ProfileCard';
export interface ProfileCardV4Props extends ProfileCardProps {
    /** Announced while the card loads. Default `'Loading profile'`. */
    loadingLabel?: string;
}
/**
 * **V4 profile card** — same props as {@link ProfileCard} plus
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A card nobody can press does not look pressable.** The `compact`
 *    variant wore `Card variant="interactive"` — the raise the kit uses to say
 *    "tap me" — on a component with no press handler in its props at all. Each
 *    state now has one variant and it means what it draws: `outlined` while
 *    loading, empty and compact, `elevated` for the full card.
 * 2. **The name is a heading.** It is the one thing a reader needs to jump
 *    between when a screen stacks several profiles, and it was plain text.
 *    The verified mark and the presence word travel with it as one spoken
 *    line rather than as three loose stops.
 * 3. **The photos are not double-rounded.** The full card set `padding="none"`
 *    and dropped a carousel with its own `radius.lg` inside a card with the
 *    same radius — two arcs a pixel or two apart along the top edge, which is
 *    the kind of thing that reads as "unfinished" without anyone being able to
 *    say why. The card clips, the carousel is square.
 * 4. **Loading looks like the card it is about to be, and says so.** The base
 *    drew two `border`-coloured rectangles under a `border`-coloured block —
 *    `border` is a hairline token, and a skeleton built from a translucent or
 *    ramp-step colour is a different grey on every ground. `loadingLabel`
 *    gives the state a name.
 * 5. **The interest chips are hittable.** Every one of them renders at `sm`,
 *    which was about 22px tall; through `IcebreakerChipV4` they clear 44.
 *
 * `onPressInterest` is the native spelling of the web twin's
 * `onClickInterest` — the one permitted press/click split, inherited from the
 * base on both sides.
 */
export declare function ProfileCardV4({ profile, variant, showActions, onAction, onPressInterest, loading, emptyLabel, loadingLabel, style, }: ProfileCardV4Props): React.ReactElement;
//# sourceMappingURL=ProfileCardV4.d.ts.map
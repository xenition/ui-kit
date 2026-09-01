import * as React from 'react';
import { type ToneV4 } from './internal/profile-v4';
import type { LikePassButtonsProps, SwipeAction } from './LikePassButtons';
/**
 * The deck's five actions, under the name the V4 spec uses for them.
 *
 * A pure alias of the base's `SwipeAction` — the same five strings — so
 * `SwipeDeckV4`'s `actions` prop and this component's `actionLabels` can be
 * spelled the way the spec spells them without renaming anything the base
 * already exports.
 */
export type LikePassAction = SwipeAction;
export interface LikePassButtonsV4Props extends LikePassButtonsProps {
    /**
     * Override the five action names. Five English strings lived inside the
     * component, on the only controls in the deck a screen-reader user has.
     */
    actionLabels?: Partial<Record<LikePassAction, string>>;
}
/**
 * The skin an action's tone wears, shared with `SwipeCardV4`'s decision stamps
 * so a LIKE button and a LIKE stamp are demonstrably the same colour.
 *
 * **An opaque 12% tint with a 1px ring**, which is the shape the native twin
 * already drew and the shape the web twin did not: web painted a bare
 * `surface` circle with a 2px coloured border, so one control was two
 * different objects on the two platforms. The tint is *mixed* rather than
 * layered because a translucent wash over an unknown ground is a different
 * colour on a card, on the page and over a photo — and this row sits on all
 * three.
 *
 * `ground` is the same value as `fill`, spelled as a raw CSS expression rather
 * than a Tailwind arbitrary value, because the state layer needs it as a
 * custom property and a class cannot be read back out of one.
 */
export interface ActionSkinV4 {
    /** The opaque tint, as a Tailwind arbitrary value. */
    fill: string;
    /** The same colour as a raw CSS expression, for {@link stateGroundVars}. */
    ground: string;
    /** The 1px ring around the disc. */
    ring: string;
    /** The tone's own fill as a custom property — the state layer's ink. */
    mix: string;
}
export declare const ACTION_SKIN: Record<ToneV4, ActionSkinV4>;
/**
 * **V4 like/pass buttons** — the web twin of the native `LikePassButtonsV4`,
 * same props as {@link LikePassButtons} plus `actionLabels`.
 *
 * ## Five changes
 *
 * 1. **Passing on someone is no longer an error.** The row spent four *status*
 *    slots on five *identities* — `rewind → warn`, `pass → danger`,
 *    `like → success` — so a toolbar of ordinary, non-destructive choices was
 *    painted in the two colours that mean something has gone wrong. `ACTION_TONE`
 *    gives them identity tones and the glyph carries which action it is.
 * 2. **The row is one control on both platforms.** Web drew a bare `surface`
 *    circle with a 2px coloured border, native a 12% tint with a 1px border,
 *    and `lg` was 64 on one and 68 on the other. See {@link ACTION_SKIN} and
 *    {@link DIAMETER}.
 * 3. **`role="toolbar"` now means what it says.** The base claimed the role and
 *    left five separate tab stops behind it, so a keyboard user got the
 *    announcement of arrow-key navigation and none of the behaviour. Focus is
 *    roving: one tab stop for the row, arrows between the buttons, and a
 *    disabled action is stepped over rather than focused into.
 * 4. **Press is a state layer, not a dim.** `hover:bg-neutral-100` is a
 *    light-oriented ramp step that paints a near-white disc on a dark page, and
 *    `disabled:opacity-40` is not M3's 0.38 disabled band.
 * 5. **The five names are props.** They were English string literals on the
 *    only controls in the deck a screen-reader user can reach.
 */
export declare const LikePassButtonsV4: React.ForwardRefExoticComponent<LikePassButtonsV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LikePassButtonsV4.d.ts.map
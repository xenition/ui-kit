import * as React from 'react';
import type { XenitionNativeTheme } from '../theme';
import { type ToneV4 } from './internal/profile-v4';
import type { LikePassButtonsProps, SwipeAction } from './LikePassButtons';
export interface LikePassButtonsV4Props extends LikePassButtonsProps {
    /** Per-action names. Defaults `Rewind` / `Pass` / `Super like` / `Like` / `Boost`. */
    actionLabels?: Partial<Record<SwipeAction, string>>;
}
/**
 * How a deck action is painted: an opaque 12% tint of its tone with a 1px ring
 * of the tone itself.
 *
 * This is the native treatment, and the web twin has moved onto it — the two
 * platforms drew the same control two ways, a 12% tint with a 1px border here
 * and a `surface` circle with a 2px border there. The tint is **mixed** rather
 * than layered because a translucent wash over an unknown ground is a
 * different colour on a card, on the page and over a photo, and this row sits
 * on all three.
 *
 * It lives in this file rather than in `internal/` because `SwipeCardV4` and
 * `BoostBannerV4` both need it, and one exported definition beats three
 * copies.
 */
export interface ActionSkinV4 {
    /** The opaque tint behind the glyph. */
    ground: string;
    /** The 1px ring around the disc. */
    ring: string;
    /** The tone's own fill — what a state layer over this skin is mixed from. */
    mix: string;
}
export declare function ACTION_SKIN(theme: XenitionNativeTheme, tone: ToneV4): ActionSkinV4;
/**
 * **V4 like/pass row** — same props as {@link LikePassButtons} plus
 * `actionLabels`.
 *
 * ## Five changes
 *
 * 1. **Passing on someone is not an error.** The row typed `rewind → warn`,
 *    `pass → danger`, `like → success` — four status slots spent on five
 *    identities, sitting side by side in one toolbar, so the palette that is
 *    supposed to mean "something has gone wrong" meant "this is the left-hand
 *    button". `ACTION_TONE` gives pass and rewind a neutral identity and
 *    leaves the glyph to say which is which.
 * 2. **One control, one size, one skin.** `lg` was 64 on the web and 68 here,
 *    and the two platforms painted the disc differently besides. See
 *    {@link ACTION_SKIN} and {@link diameter}.
 * 3. **The row does not claim keyboard navigation it does not have.** The base
 *    set `accessibilityRole="toolbar"`, which promises arrow-key movement
 *    between the controls; nothing implemented it, and React Native has no
 *    contract to implement it *with* — the web twin has real roving focus, and
 *    here each button is simply its own reachable control.
 * 4. **Press is a state layer and disabled is 0.38.** The base drew press as
 *    `opacity: 0.85` and disabled as `0.4` — two numbers in the same band, so
 *    a pressed button and an unavailable one looked alike.
 * 5. **The row clears the home indicator.** This is the deck's pinned action
 *    row and it read no safe-area inset, so on a notched phone the like button
 *    sat under the home bar. It pays `insets.bottom` now; a caller embedding
 *    the row inside a card (as `ProfileCardV4` does) passes
 *    `style={{ paddingBottom: 0 }}` to take it back.
 *
 * The base's `emphasis` field is not carried over: every action was `'ghost'`
 * and nothing ever read it.
 */
export declare function LikePassButtonsV4({ actions, onAction, disabledActions, size, actionLabels, style, }: LikePassButtonsV4Props): React.ReactElement;
//# sourceMappingURL=LikePassButtonsV4.d.ts.map
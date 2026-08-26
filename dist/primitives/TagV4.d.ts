import * as React from 'react';
import type { TagProps, TagSize, TagTone, TagVariant } from './Tag';
export type { TagProps as TagV4Props, TagSize, TagTone, TagVariant };
/**
 * **V4 tag** — the web twin of the native `TagV4`, same props as {@link Tag},
 * a different design line.
 *
 * A tag is the badge's interactive sibling — a filter you can drop, a keyword
 * you can take off — and it inherited the badge's ground problem plus one of
 * its own.
 *
 * **The ground.** `variant="solid"` was not solid: `neutral` and `primary`
 * painted `bg-neutral-100` / `bg-primary-50`, a soft tint wearing the solid
 * name and a different tag from its native twin. `soft` mixed three tones onto
 * a neutral chip because "success/warn/danger have no `-50` ramp", so a soft
 * success and a soft neutral were the same colour. `outline` had no fill at
 * all, leaving its label's contrast measured against a page it might not be
 * on. V4 fills `solid` with the tone and its guaranteed on-pair, composites
 * `soft` into `surface` with `color-mix` so the result is an opaque colour the
 * tag owns, and paints `surface` behind `outline`.
 *
 * **The target.** The remove affordance was a bare `×` in a `<button>` with no
 * size at all — roughly 12px square, on a control whose entire purpose is
 * being clicked, and a miss on any touch screen. V4 keeps the glyph exactly as
 * small and lays a 44px target over it with a pseudo-element, so the chip looks
 * identical and stops being a miss. It also gains a visible focus ring, which
 * a keyboard user needs to know the × is reachable at all.
 *
 * The corner stays `radius.sm` — the brand's own. A tag is a word, and §8 lists
 * excessive pill-shaped controls among the tells of generic AI UI. The remove
 * glyph comes from the kit's named icon set (`close`), so it cannot drift from
 * the `×` on the next screen.
 */
export declare const TagV4: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=TagV4.d.ts.map
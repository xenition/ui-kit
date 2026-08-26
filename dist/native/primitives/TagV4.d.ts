import * as React from 'react';
import type { TagProps, TagSize, TagTone, TagVariant } from './Tag';
export type { TagProps as TagV4Props, TagSize, TagTone, TagVariant };
/**
 * **V4 tag** — same props as {@link Tag}, a different design line.
 *
 * A tag is the badge's interactive sibling — a filter you can drop, a keyword
 * you can take off — and it inherits the badge's ground problem plus one of
 * its own.
 *
 * **The ground.** `soft` tinted at 14% *alpha*, so it was a different colour on
 * the page, on a filled card and on glass, while its label carried a contrast
 * guarantee measured against exactly one of the three. `outline` had no fill at
 * all. V4 tags own their ground the way `BadgeV4` does: `soft` composites the
 * same tint into `surface` **opaquely**, `outline` paints `surface` behind its
 * ring, and every label is re-run through `ensureContrast` against the fill the
 * tag actually painted.
 *
 * **The target.** The remove affordance was a 12px `×` with 8px of hit slop —
 * about 28px square, well under the 44px a finger needs, on a control whose
 * entire purpose is to be tapped. V4 keeps the glyph exactly as small (a chip
 * that grows to 44px is not a chip any more) and grows only the *touch* area,
 * so the tag looks identical and stops being a miss.
 *
 * The corner stays `radius.sm` — the brand's own. A tag is a word, and §8 lists
 * excessive pill-shaped controls among the tells of generic AI UI; a `sharp`
 * seed gets square tags rather than capsules. The remove glyph comes from the
 * kit's named icon set (`close`), so it cannot drift from the `×` on the next
 * screen.
 */
export declare function TagV4({ tone, variant, size, removable, dot, onRemove, style, children, }: TagProps): React.ReactElement;
//# sourceMappingURL=TagV4.d.ts.map
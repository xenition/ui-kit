import * as React from 'react';
import type { DirectoryRowProps } from './DirectoryRow';
export interface DirectoryRowV4Props extends DirectoryRowProps {
    /** Name for the trailing message button. Default `` `Message ${name}` ``. */
    messageLabel?: string;
}
/**
 * **V4 directory row** — same props as {@link DirectoryRow} plus
 * `messageLabel`.
 *
 * ## Five changes
 *
 * 1. **The message button is reachable.** It sat inside the row's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it into a single leaf carrying the row's name — so VoiceOver could
 *    open the person's profile and had no way at all to message them. The row
 *    container is a plain `View` now; the activation wraps only the avatar and
 *    the text, and the message button is its sibling.
 * 2. **The button is a target.** `hitSlop={8}` on a glyph is not a 44pt target
 *    — the conventions call that out by name — and it left the visible tap area
 *    at roughly 20pt in the corner of a scrolling list. It is `minTap` square.
 * 3. **Presence is drawn once.** The base rendered it twice: as a coloured dot
 *    on the avatar (colour alone, no word) *and* as a glyph beside a `muted`
 *    word, so the row said the same thing in two places and one of them said it
 *    in a way a colour-blind user could not read. One glyph-and-word pill
 *    remains, and `away` steps down from `warn` to neutral — stepping away from
 *    a desk is not a caution.
 * 4. **Press is a state layer.** The message glyph faded to `opacity: 0.6` on
 *    press, which is inside M3's *disabled* band, so a tapped button looked
 *    unavailable.
 * 5. **The row announces itself whole** — name, title, department, presence,
 *    email and phone as one sentence, rather than "Open Ada" followed by five
 *    text nodes the reader has to walk.
 *
 * **Renders nothing without a `name`.**
 */
export declare function DirectoryRowV4({ name, title, department, avatarUrl, email, phone, presence, variant, messageLabel, onPress, onMessage, testID, style, }: DirectoryRowV4Props): React.ReactElement | null;
//# sourceMappingURL=DirectoryRowV4.d.ts.map
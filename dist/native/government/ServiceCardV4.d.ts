import * as React from 'react';
import type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';
export interface ServiceCardV4Props extends ServiceCardProps {
    /** Override the eight category words (`'Licensing'`, `'Permits'`, …). */
    categoryLabels?: Partial<Record<ServiceCategory, string>>;
    /** Override the four channel words (`'Online'`, `'Unavailable'`, …). */
    channelLabels?: Partial<Record<ServiceChannel, string>>;
}
/**
 * **V4 service tile** — same props as {@link ServiceCard} plus
 * `categoryLabels` and `channelLabels`.
 *
 * ## Four changes
 *
 * 1. **"Start" is a sibling of the card's activation, not a child of it.** The
 *    base wrapped the whole card — Start included — in one `Pressable` that is
 *    `accessible` by default and carries the card's own name, so VoiceOver
 *    flattened the tile to a single leaf and the button was not a focus stop at
 *    all. It could not be reached, let alone pressed. The card is a plain
 *    surface now; the activation wraps only the glyph-and-text region and
 *    carries the spoken name, and Start sits beside it with a name of its own.
 * 2. **"Unavailable" joins the name.** The tile announced
 *    `` `${title}, ${category}` `` and stopped, so a service that cannot be
 *    used today announced as an ordinary, startable one — with a live Start
 *    button under it.
 * 3. **The press is a state layer.** `opacity: pressed ? 0.85 : 1` fades the
 *    tile's own content, which is the signal M3 spends on *disabled*; the
 *    pressed tile now tints its container and leaves the content alone.
 * 4. **Start clears 44.** `size="sm"` renders about 34 on this platform, and
 *    neither `Button` primitive sets a floor. The category disc drops its
 *    duplicate label — the category is already written under the title —
 *    stops wearing `primary`, because a category is identity and not a state,
 *    and takes a tint composited opaquely rather than washed over whatever is
 *    behind it.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function ServiceCardV4({ category, title, description, channel, estimatedTime, actionLabel, onStart, onPress, categoryLabels, channelLabels, style, }: ServiceCardV4Props): React.ReactElement | null;
//# sourceMappingURL=ServiceCardV4.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface EntityCardMedia {
    /** Image URL; when present an `Image` is drawn. */
    imageUrl?: string;
    /** Stable seed for the {@link GenerativeCover} fallback (defaults to the title). */
    seed?: string;
    /** width / height aspect ratio of the media box (default 1.6). */
    aspect?: number;
}
export interface EntityCardProps {
    /** Primary heading. */
    title: string;
    /** Small kicker above the title (category, company, …). */
    eyebrow?: string;
    /** Body copy under the title. */
    description?: string;
    /** Compact trailing detail line (date, price · duration, talk, …). */
    meta?: string;
    /** Media descriptor; an image or a seeded generative cover. Omit for no media. */
    media?: EntityCardMedia;
    /** Corner overlay content (a `StatusDot`, a "Featured" pill, …). */
    badge?: React.ReactNode;
    /** Footer slot (actions, tags, author row, …). */
    footer?: React.ReactNode;
    /** Press handler for the whole card (native equivalent of the web `href`). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A generic content/entity card — the native mirror of the web marketing
 * `EntityCard`, collapsing the templates' bespoke `PostCard` / `ServiceCard` /
 * `SpeakerCard` / `ListingCard` / `ProgramCard` into props. Composes the native
 * `Card` with an inset media frame (an `Image` when `media.imageUrl` is set,
 * else a seeded {@link GenerativeCover}), an optional `Eyebrow`, the `title`
 * heading, an optional `description`, a `meta` line, an optional corner `badge`,
 * and a `footer` slot. `onPress` is native's `href`. Token-only.
 */
export declare function EntityCard({ title, eyebrow, description, meta, media, badge, footer, onPress, style, }: EntityCardProps): React.ReactElement;
//# sourceMappingURL=EntityCard.d.ts.map
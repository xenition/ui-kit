import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Layout variants for the gallery header. */
export type GalleryHeaderVariant = 'hero' | 'compact';
export interface GalleryHeaderProps {
    /** Gallery / shoot title. */
    title: string;
    /** Supporting subtitle (client, date, or event). */
    subtitle?: string;
    /** Photo count shown as a small meta pill. */
    photoCount?: number;
    /** Full-bleed cover image URL (`hero` variant). */
    coverUrl?: string;
    /** Layout variant (default `hero`). */
    variant?: GalleryHeaderVariant;
    /** Action slot (e.g. a share / download button row). */
    actions?: React.ReactNode;
    /** Word for the count meta (default `photos`). */
    countLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * The masthead for a client gallery — a title with an optional subtitle, a
 * photo-count meta pill, and an `actions` slot. The `hero` variant lays the
 * text over a full-bleed cover image (with a token scrim for legibility); the
 * `compact` variant is a plain titled band. The title is an accessibility
 * `header`. Token-only — the scrim and surfaces trace to theme tokens.
 */
export declare function GalleryHeader({ title, subtitle, photoCount, coverUrl, variant, actions, countLabel, style, }: GalleryHeaderProps): React.ReactElement;
//# sourceMappingURL=GalleryHeader.d.ts.map
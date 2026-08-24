import * as React from 'react';
import { type CoverColorRole, type CoverForm } from './GenerativeCover';
export interface EntityCardMedia {
    /** Image URL; when present an `<img>` is drawn. */
    imageUrl?: string;
    /** Stable seed for the {@link GenerativeCover} fallback (defaults to the title). */
    seed?: string;
    /** width / height aspect ratio of the media box (default 1.6). */
    aspect?: number;
    /** Composition of the seeded generative cover (ignored when `imageUrl` is set). */
    form?: CoverForm;
    /** Ink color role for the generative cover (token role, e.g. `primary-700`). */
    ink?: CoverColorRole;
    /** Paper color role for the generative cover (token role, e.g. `neutral-100`). */
    paper?: CoverColorRole;
}
export interface EntityCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
    /** If given, the media and title link here. */
    href?: string;
}
/**
 * A generic content/entity card — the single component that collapses the
 * templates' bespoke `PostCard` / `ServiceCard` / `SpeakerCard` /
 * `ListingCard` / `ProgramCard` into props. Composes the kit `Card` with an
 * inset media frame (an `<img>` when `media.imageUrl` is set, else a seeded
 * {@link GenerativeCover}), an optional `Eyebrow`, the `title` heading, an
 * optional `description`, a `meta` line, an optional corner `badge`, and a
 * `footer` slot. Token-only; the same card expresses a blog post, a service, a
 * speaker, a listing, or a program by props alone.
 */
export declare const EntityCard: React.ForwardRefExoticComponent<EntityCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EntityCard.d.ts.map
import * as React from 'react';
import type { EntityCardProps } from './EntityCard';
/** Drop-in for {@link EntityCardProps} — same props, the V4 "showcase" design. */
export type EntityCardV4Props = EntityCardProps;
/**
 * EntityCard — **V4** "showcase" design (web parity of the native V4). The
 * generic content/entity card re-skinned as an image-forward showcase card: a
 * floating rounded media frame (an `<img>` when `media.imageUrl` is set, else a
 * seeded {@link GenerativeCover}; a soft-primary well with a glyph when no media
 * is given at all), the `eyebrow` as a soft-primary chip, a bold tight-tracked
 * `title`, muted `description`, an emphasized `meta` line, a corner `badge`, and
 * a `footer` slot — all on a clean elevated surface (NO brand gradient). The
 * base's `href` still stretches a link across the whole card. Honors every base
 * prop; token-only colors, no literals.
 */
export declare const EntityCardV4: React.ForwardRefExoticComponent<EntityCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EntityCardV4.d.ts.map
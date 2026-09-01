import * as React from 'react';
import type { EntityCardProps } from './EntityCard';
/** Drop-in for {@link EntityCardProps} — same props, the V4 "showcase" design. */
export type EntityCardV4Props = EntityCardProps;
/**
 * EntityCard — **V4** "showcase" design (native mirror of the web V4). The
 * generic content/entity card re-skinned as an image-forward showcase card: a
 * floating rounded media frame (an `Image` when `media.imageUrl` is set, else a
 * seeded {@link GenerativeCover}; a soft-primary well with a glyph when no media
 * is given at all), the `eyebrow` as a soft-primary chip, a bold tight-tracked
 * `title`, muted `description`, an emphasized `meta` line, a corner `badge`, and
 * a `footer` slot — all on a clean elevated card (`colors.card` + border + soft
 * shadow; NO gradient). `onPress` is native's `href` (wraps the whole card in a
 * Pressable). Honors every base prop; token-only colors, no literals.
 */
export declare function EntityCardV4({ title, eyebrow, description, meta, media, badge, footer, onPress, style, }: EntityCardV4Props): React.ReactElement;
//# sourceMappingURL=EntityCardV4.d.ts.map
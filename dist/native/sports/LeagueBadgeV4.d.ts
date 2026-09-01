import * as React from 'react';
import type { LeagueBadgeProps } from './LeagueBadge';
/** Drop-in for {@link LeagueBadgeProps} — same props, the V4 "broadcast" design. */
export type LeagueBadgeV4Props = LeagueBadgeProps;
/**
 * LeagueBadge — **V4** "broadcast" design. A polished league / competition
 * emblem: the crest glyph (or derived initials) sits in a soft-primary tinted
 * disc beside the name label. `variant` recolors from the single `primary`
 * accent — `solid` fills, `soft` tints, `outline` hairlines. Same props/behavior
 * as {@link LeagueBadgeProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha` — no literals. Purely presentational.
 */
export declare function LeagueBadgeV4({ name, crest, label, size, variant, style, }: LeagueBadgeV4Props): React.ReactElement;
//# sourceMappingURL=LeagueBadgeV4.d.ts.map
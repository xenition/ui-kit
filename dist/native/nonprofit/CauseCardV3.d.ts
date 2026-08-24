import * as React from 'react';
import type { CauseCardProps } from './CauseCard';
/** Drop-in alternate of {@link CauseCardProps} — identical prop contract. */
export type CauseCardV3Props = CauseCardProps;
/**
 * CauseCard — design variant **V3**: a **horizontal media-left row**. A square
 * cover thumbnail on the left, the category badge, title, blurb, and a compact
 * raised/goal line on the right — a dense list row instead of a stacked card.
 * When a goal is present a slim bar (sized via `goalPct`, divide-by-zero guarded)
 * appears with a printed percent, so progress never rests on color alone. Same
 * props as {@link CauseCardProps}. Token-only; money is integer cents.
 */
export declare function CauseCardV3({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency, variant, onPress, loading, style, }: CauseCardV3Props): React.ReactElement;
//# sourceMappingURL=CauseCardV3.d.ts.map
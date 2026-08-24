import * as React from 'react';
import type { CauseCardProps } from './CauseCard';
/** Drop-in alternate of {@link CauseCardProps} — identical prop contract. */
export type CauseCardV2Props = CauseCardProps;
/**
 * CauseCard — design variant **V2**: a **full-bleed cover hero**. The cover fills
 * the whole tile; a token-tinted scrim sits over its lower half so the category
 * badge, title, blurb, and a slim progress overlay read in light ink regardless
 * of the photo. Progress is sized to `raised/goal` (divide-by-zero guarded via
 * `goalPct`) and always paired with a printed percent — never color alone.
 * Pressable cards get a press-scale spring (reduced-motion aware). Same props as
 * {@link CauseCardProps}. Token-only; money is integer cents.
 */
export declare function CauseCardV2({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency, variant, onPress, loading, style, }: CauseCardV2Props): React.ReactElement;
//# sourceMappingURL=CauseCardV2.d.ts.map
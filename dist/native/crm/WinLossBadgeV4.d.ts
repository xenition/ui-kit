import * as React from 'react';
import { type DealOutcome } from './internal';
import type { WinLossBadgeProps } from './WinLossBadge';
export interface WinLossBadgeV4Props extends WinLossBadgeProps {
    /** Override the outcome words (`Open` / `Won` / `Lost` / `Pending`). */
    outcomeLabels?: Partial<Record<DealOutcome, string>>;
}
/**
 * **V4 win/loss badge** — same props as {@link WinLossBadge} plus
 * `outcomeLabels`.
 *
 * ## Four changes
 *
 * 1. **`size` is honoured in the `badge` variant.** On web it was destructured
 *    and read only in the `inline` branch, never forwarded to `Badge` — so
 *    `DealCard` passing `size="sm"` got an `sm` badge on native and an `md`
 *    one on web, from identical props. It is forwarded on both, over the
 *    shared `BADGE_V4` shape.
 * 2. **One pill on both platforms.** Web took `Badge`'s `solid` default while
 *    native passed `variant="soft"`, so a won deal was a saturated green pill
 *    on one platform and a tinted chip on the other — the module's single most
 *    repeated element, drawn two ways (rule C).
 * 3. **The `inline` variant is one reader stop.** The glyph and the label were
 *    two sibling `Text` nodes under a label on a `View` that was not backed by
 *    `accessible`, so the badge announced twice or not at all.
 * 4. **The glyph scales with Dynamic Type.** It carried
 *    `allowFontScaling={false}` while the word beside it scaled, so at large
 *    text sizes the pair came apart.
 */
export declare function WinLossBadgeV4({ outcome, variant, size, hideLabel, outcomeLabels, style, }: WinLossBadgeV4Props): React.ReactElement;
//# sourceMappingURL=WinLossBadgeV4.d.ts.map
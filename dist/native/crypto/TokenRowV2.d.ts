import * as React from 'react';
import type { TokenRowProps } from './TokenRow';
/** Same public contract as {@link TokenRow} — a drop-in alternate design. */
export type TokenRowV2Props = TokenRowProps;
/**
 * TokenRow, redesigned (v2): an **elevated card** with a tinted token disc, a
 * derived {@link Sparkline}, and a toned change pill. The sparkline shape is
 * synthesized from `changePct` (it slopes up for gains, down for losses — no new
 * data needed), tinted with the semantic fill slot; the 24h change reads in the
 * contrast-safe `successText`/`dangerText` slots with a ▲/▼ glyph so it is never
 * color-only. Fiat runs through {@link MoneyAmount} (integer cents — no drift).
 * Distinct at a glance from v1's flat list line. Same props.
 */
export declare function TokenRowV2({ symbol, name, amount, decimals, valueCents, currency, changePct, icon, iconColor, onPress, style, }: TokenRowV2Props): React.ReactElement;
//# sourceMappingURL=TokenRowV2.d.ts.map
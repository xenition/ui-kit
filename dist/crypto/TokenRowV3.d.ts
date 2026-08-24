import * as React from 'react';
import type { TokenRowProps } from './TokenRow';
/** Same public contract as {@link TokenRow} — a drop-in alternate design. */
export type TokenRowV3Props = TokenRowProps;
/**
 * TokenRow, redesigned (v3): a **dense one-line quote**. A bold ticker leads, the
 * held quantity fills the middle (fixed precision — no float drift), and the 24h
 * change is pinned right in the `text-success`/`text-danger` slot with a ▲/▼ glyph
 * so it is never color-only. No disc, no card, no sparkline — a compact ticker
 * line that packs many rows on screen. Distinct at a glance from the base's
 * 40px-disc list and v2's card. Same props.
 */
export declare const TokenRowV3: React.ForwardRefExoticComponent<TokenRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TokenRowV3.d.ts.map
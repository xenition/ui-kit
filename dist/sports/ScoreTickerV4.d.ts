import * as React from 'react';
import type { ScoreTickerProps } from './ScoreTicker';
/** Drop-in for {@link ScoreTickerProps} — same props, the V4 "broadcast" design. */
export type ScoreTickerV4Props = ScoreTickerProps;
/**
 * ScoreTicker — **V4** "broadcast" design (web parity of the native V4). A
 * horizontally-scrolling strip of mini score cards, each a compact matchup with
 * a soft-tint status pill (a pulsing `danger` dot reinforces "LIVE" — never
 * color alone) and bold numerals; live tiles are subtly emphasised with a
 * `primary` ring. One accent: `primary`. Same props/behavior as
 * {@link ScoreTickerProps} (drop-in) — keeps the horizontal scroll, per-match
 * `onSelect`, loading and empty states. All colors from `--xen-*` token classes
 * (no literals).
 */
export declare const ScoreTickerV4: React.ForwardRefExoticComponent<ScoreTickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScoreTickerV4.d.ts.map
import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Drop-in replacement for {@link PlayerStatCardProps} — identical shape. */
export type PlayerStatCardV2Props = PlayerStatCardProps;
/**
 * PlayerStatCard, design variant 2 — a **profile card**. A large ringed avatar
 * sits centered above the shirt number, name, and position/team caption, with
 * an availability chip (glyph + text, never color alone) and a bordered stat
 * grid below. Highlighted stats draw in the primary text accent. Same props as
 * `PlayerStatCard`; token-pure (`shadow`, `withAlpha`), reduced-motion aware.
 */
export declare function PlayerStatCardV2({ name, position, number, photo, team, stats, status, loading, onPress, style, }: PlayerStatCardV2Props): React.ReactElement;
//# sourceMappingURL=PlayerStatCardV2.d.ts.map
import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Drop-in for {@link PlayerStatCardProps} — same props, the V4 "broadcast" design. */
export type PlayerStatCardV4Props = PlayerStatCardProps;
/**
 * PlayerStatCard — **V4** "broadcast" design. The matchday take on a player
 * profile: an elevated card with a shirt-number chip in a soft-primary tint,
 * name/position/team, an availability pill that reads by glyph + text (never color
 * alone), and the key stats as big bold numerals over muted labels — the leading
 * `highlight` stat sits on a soft-primary tile. Same props/behavior as
 * {@link PlayerStatCardProps}; token-only colors via `useXenitionTheme()`.
 * `loading` swaps in a token skeleton.
 */
export declare function PlayerStatCardV4({ name, position, number, photo, team, stats, variant, status, loading, onPress, style, }: PlayerStatCardV4Props): React.ReactElement;
//# sourceMappingURL=PlayerStatCardV4.d.ts.map
import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Drop-in for {@link PlayerStatCardProps} — same props, the V4 "broadcast" design. */
export type PlayerStatCardV4Props = PlayerStatCardProps;
/**
 * PlayerStatCard — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a player profile: an elevated card with a shirt-number chip in
 * a soft-primary tint, name/position/team, an availability pill that reads by
 * glyph + text (never color alone), and the key stats as big bold numerals over
 * muted labels — the leading `highlight` stat sits on a soft-primary tile. Same
 * props/behavior as {@link PlayerStatCardProps}; all colors from `--xen-*` token
 * classes (no literals). `loading` swaps in a token skeleton.
 */
export declare const PlayerStatCardV4: React.ForwardRefExoticComponent<PlayerStatCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlayerStatCardV4.d.ts.map
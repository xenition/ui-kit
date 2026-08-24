import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Drop-in replacement for {@link PlayerStatCardProps} — identical shape. */
export type PlayerStatCardV3Props = PlayerStatCardProps;
/**
 * PlayerStatCard, design variant 3 — a **dense stat row**. A small avatar leads,
 * then shirt number + name + position stacked, and the stat cells run inline on
 * the right as tight value / label pairs. Availability is a leading glyph on the
 * name (glyph + a11y label, never color alone). Sized for tables and roster
 * lists. Same props as `PlayerStatCard`; token-pure, reduced-motion press scale.
 */
export declare function PlayerStatCardV3({ name, position, number, photo, team, stats, status, loading, onPress, style, }: PlayerStatCardV3Props): React.ReactElement;
//# sourceMappingURL=PlayerStatCardV3.d.ts.map
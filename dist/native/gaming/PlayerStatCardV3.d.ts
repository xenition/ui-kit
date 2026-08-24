import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Drop-in alternate of {@link PlayerStatCardProps} — identical prop contract. */
export type PlayerStatCardV3Props = PlayerStatCardProps;
/**
 * PlayerStatCard — design variant **V3**: a **single compact row with inline
 * stats**. A small avatar and the handle · rank on the left, then the headline
 * stats pushed to the right as tight `value / label` pairs — a scan-friendly
 * roster line rather than V1's card or V2's portrait passport. Same props as
 * {@link PlayerStatCardProps}; the (removed) variant switch is ignored and up to
 * three inline stats are shown. Token-only, minimal (hairline underline, no box).
 */
export declare function PlayerStatCardV3({ player, online, onPress, style, }: PlayerStatCardV3Props): React.ReactElement;
//# sourceMappingURL=PlayerStatCardV3.d.ts.map
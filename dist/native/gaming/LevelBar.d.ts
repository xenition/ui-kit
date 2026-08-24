import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type LevelBarVariant = 'default' | 'compact';
export interface LevelBarProps {
    /** Current level number, shown in the level chip. */
    level: number;
    /** XP earned toward the next level. */
    xp: number;
    /** XP required to reach the next level. */
    xpMax: number;
    /** Variant — `compact` hides the numeric `xp / xpMax` readout. */
    variant?: LevelBarVariant;
    /** Progress fill tone (default `primary`). */
    tone?: 'primary' | 'success' | 'warn' | 'danger';
    style?: StyleProp<ViewStyle>;
}
/**
 * An XP / level progress bar — a circular level chip beside a token `Progress`
 * fill sized to `xp / xpMax`, with an optional `xp / xpMax` readout. Guards a
 * zero/negative `xpMax` (renders an empty, non-`NaN` bar) and clamps `xp` into
 * range. The bar carries an `accessibilityValue` so the fraction is announced,
 * not conveyed by color alone. Composes `Progress`. Token-only.
 */
export declare function LevelBar({ level, xp, xpMax, variant, tone, style, }: LevelBarProps): React.ReactElement;
//# sourceMappingURL=LevelBar.d.ts.map
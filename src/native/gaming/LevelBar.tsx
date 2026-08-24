import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Progress, useXenitionTheme } from '../primitives';
import { clamp, formatCount } from './types';

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
export function LevelBar({
  level,
  xp,
  xpMax,
  variant = 'default',
  tone = 'primary',
  style,
}: LevelBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const max = Number.isFinite(xpMax) && xpMax > 0 ? xpMax : 0;
  const value = max > 0 ? clamp(xp, 0, max) : 0;
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  const chip = compact ? 30 : 40;

  return (
    <View
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style]}
      accessible
      accessibilityLabel={`Level ${level}, ${pct}% to next level`}
    >
      <View
        style={{
          width: chip,
          height: chip,
          borderRadius: chip / 2,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {level}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Progress value={value} max={max || 1} tone={tone} size={compact ? 'sm' : 'md'} />
        {!compact ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {`${formatCount(value)} / ${formatCount(max)} XP`}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {`${pct}%`}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

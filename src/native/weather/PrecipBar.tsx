import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';

export interface PrecipSlot {
  /** Period label (e.g. `'9a'`, `'Mon'`). */
  label: string;
  /** Chance of precipitation, 0–100. */
  chance: number;
  /** Optional accumulation caption (e.g. `'0.2"'`). */
  amount?: string;
}

export interface PrecipBarProps {
  /** Per-period precipitation chances, rendered as a bar column each. */
  slots: PrecipSlot[];
  /** Bar column height in px. Default `96`. */
  height?: number;
  /** Show the numeric % above each bar. Default `false`. */
  showValues?: boolean;
  /** Message shown when `slots` is empty. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Precipitation-probability bars: one token-filled column per period, its height
 * proportional to the chance (0–100). The fill uses a `primary` token tint plus
 * a droplet glyph header, so the metric reads without color alone. Values are
 * guarded/clamped to 0–100. Renders a muted empty state when `slots` is empty.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors, no chart deps.
 */
export function PrecipBar({
  slots,
  height = 96,
  showValues = false,
  emptyLabel = 'No precipitation data',
  style,
}: PrecipBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (slots.length === 0) {
    return (
      <Card variant="outlined" style={style} accessibilityRole="summary">
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {emptyLabel}
        </Text>
      </Card>
    );
  }

  const track = clamp(height, 32, 320);

  return (
    <Card variant="outlined" padding="sm" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="💧" size="sm" accessibilityLabel="Precipitation" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          Precipitation
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: tokens.spacing.xs,
          marginTop: tokens.spacing.sm,
        }}
      >
        {slots.map((slot, index) => {
          const pct = clamp(slot.chance, 0, 100);
          return (
            <View
              key={`${slot.label}-${index}`}
              accessibilityRole="text"
              accessibilityLabel={`${slot.label}, ${pct} percent chance${
                slot.amount ? `, ${slot.amount}` : ''
              }`}
              style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}
            >
              {showValues ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {pct}%
                </Text>
              ) : null}
              <View
                style={{
                  width: '70%',
                  height: track,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: withAlpha(colors.primary, 0.12),
                  justifyContent: 'flex-end',
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: `${pct}%`,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: colors.primary,
                  }}
                />
              </View>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {slot.label}
              </Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

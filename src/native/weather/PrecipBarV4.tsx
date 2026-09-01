import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';
import type { PrecipBarProps } from './PrecipBar';

/** Drop-in for {@link PrecipBarProps} — same props, a different design. */
export type PrecipBarV4Props = PrecipBarProps;

/**
 * PrecipBar — **elevated white card** design (v4). Precipitation-probability
 * bars: one token-filled column per period, its height proportional to the
 * chance (0–100). The fill uses a `primary` token on a soft `onSurface` track,
 * with a droplet glyph header, so the metric reads without color alone. Values
 * are guarded/clamped to 0–100 and optionally shown via `showValues`. Renders a
 * muted empty state when `slots` is empty. All colors/sizes come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors, no chart
 * deps. Same props as {@link PrecipBarProps}.
 */
export function PrecipBarV4({
  slots,
  height = 96,
  showValues = false,
  emptyLabel = 'No precipitation data',
  style,
}: PrecipBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  if (slots.length === 0) {
    return (
      <View style={[card, style]} accessibilityRole="summary">
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.base }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const track = clamp(height, 32, 320);

  return (
    <View style={[card, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="💧" size="base" accessibilityLabel="Precipitation" />
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '700',
          }}
        >
          Precipitation
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          marginTop: tokens.spacing.md,
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
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                  }}
                >
                  {pct}%
                </Text>
              ) : null}
              <View
                style={{
                  width: '70%',
                  height: track,
                  borderRadius: tokens.radius.md,
                  backgroundColor: withAlpha(colors.onSurface, 0.08),
                  justifyContent: 'flex-end',
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: `${pct}%`,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.primary,
                  }}
                />
              </View>
              <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
                {slot.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

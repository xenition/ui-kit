import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { LikertScaleProps } from './LikertScale';

/** Same Props as {@link LikertScale} — a drop-in alternate design. */
export type LikertScaleV3Props = LikertScaleProps;

/**
 * LikertScale, design V3 — a **compact segmented bar**. The points are joined
 * edge-to-edge in one bordered track (hairline dividers between, no gaps),
 * reading as a single control rather than the original's separate dots. The
 * selected segment fills with the primary token; anchor labels sit beneath the
 * extremes. `radiogroup`/`radio` with selection announced (never color-alone).
 * Low-profile for dense forms. Token-pure.
 */
export function LikertScaleV3({
  points = 5,
  value,
  onChange,
  minLabel,
  maxLabel,
  accessibilityLabel = 'Agreement scale',
  disabled = false,
  style,
}: LikertScaleV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = Math.max(2, Math.floor(points));

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{
          flexDirection: 'row',
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          backgroundColor: colors.surface,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {Array.from({ length: count }, (_, i) => {
          const point = i + 1;
          const selected = value === point;
          return (
            <Pressable
              key={point}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled }}
              accessibilityLabel={`Point ${point} of ${count}`}
              disabled={disabled}
              onPress={() => onChange?.(point)}
              style={({ pressed }) => ({
                flex: 1,
                minHeight: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftWidth: i === 0 ? 0 : 1,
                borderLeftColor: colors.border,
                backgroundColor: selected
                  ? colors.primary
                  : pressed
                    ? withAlpha(colors.primary, 0.1)
                    : 'transparent',
              })}
            >
              <Text
                style={{
                  color: selected ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '700',
                }}
              >
                {point}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {minLabel || maxLabel ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }}>
            {minLabel ?? ''}
          </Text>
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
              flexShrink: 1,
              textAlign: 'right',
            }}
          >
            {maxLabel ?? ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

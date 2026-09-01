import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { LikertScaleProps } from './LikertScale';

/** Drop-in for {@link LikertScaleProps} — same props, the V4 "focus" design. */
export type LikertScaleV4Props = LikertScaleProps;

/**
 * LikertScale — **V4** "clean form / focus" design. A calm, legible agreement
 * scale: the N points render as a row of big, tappable pills (min height 44) that
 * wrap responsively. The selected pill is a solid **primary** fill with
 * on-primary text; unselected pills sit on `surface` with a `border` hairline and
 * a soft primary tint on press. One accent, generous 8-pt air. Same
 * props/behavior as {@link LikertScaleProps} — the `radiogroup`/`radio` roles,
 * `accessibilityState`, anchor labels and `onChange` are all preserved;
 * token-only colors via `useXenitionTheme()` (no literal colors).
 */
export function LikertScaleV4({
  points = 5,
  value,
  onChange,
  minLabel,
  maxLabel,
  accessibilityLabel = 'Agreement scale',
  variant = 'dots',
  disabled = false,
  style,
}: LikertScaleV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = Math.max(2, Math.floor(points));

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}
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
                minWidth: 44,
                minHeight: 44,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected
                  ? colors.primary
                  : pressed
                    ? withAlpha(colors.primary, 0.12)
                    : colors.surface,
                opacity: disabled ? 0.5 : 1,
              })}
            >
              {variant === 'numbered' ? (
                <Text
                  style={{
                    color: selected ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                  }}
                >
                  {point}
                </Text>
              ) : null}
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

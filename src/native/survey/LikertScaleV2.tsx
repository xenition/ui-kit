import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { LikertScaleProps } from './LikertScale';

/** Same Props as {@link LikertScale} — a drop-in alternate design. */
export type LikertScaleV2Props = LikertScaleProps;

interface PillProps {
  point: number;
  count: number;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}

/** One tall, rounded-full pill in the V2 row — its own press-scale spring. */
function LikertPill({ point, count, selected, disabled, onPress }: PillProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  return (
    <Animated.View style={{ flex: 1, transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected, disabled }}
        accessibilityLabel={`Point ${point} of ${count}`}
        disabled={disabled}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={{
          minHeight: 52,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.full,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? colors.primary : withAlpha(colors.primary, 0.04),
          paddingVertical: tokens.spacing.sm,
          opacity: disabled ? 0.5 : 1,
          ...(selected ? shadow('sm', tokens) : null),
        }}
      >
        <Text
          style={{
            color: selected ? colors.onPrimary : colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '800',
          }}
        >
          {point}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

/**
 * LikertScale, design V2 — a row of **big labeled pills**. Each agreement point
 * is a tall, rounded-full pill (a faint primary tint at rest, a solid primary
 * fill with a lift when selected) that always prints its ordinal, in place of
 * the original's small circular dots. Anchor labels sit under the extremes.
 * `radiogroup`/`radio` with selection announced (never color-alone); each pill
 * springs on press. Token-pure.
 */
export function LikertScaleV2({
  points = 5,
  value,
  onChange,
  minLabel,
  maxLabel,
  accessibilityLabel = 'Agreement scale',
  disabled = false,
  style,
}: LikertScaleV2Props): React.ReactElement {
  const { tokens, colors } = useXenitionTheme();
  const count = Math.max(2, Math.floor(points));

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{ flexDirection: 'row', gap: tokens.spacing.xs }}
      >
        {Array.from({ length: count }, (_, i) => {
          const point = i + 1;
          return (
            <LikertPill
              key={point}
              point={point}
              count={count}
              selected={value === point}
              disabled={disabled}
              onPress={() => onChange?.(point)}
            />
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

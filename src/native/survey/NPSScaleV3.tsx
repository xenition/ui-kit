import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { npsBucket, type NPSScaleProps } from './NPSScale';

/** Same Props as {@link NPSScale} — a drop-in alternate design. */
export type NPSScaleV3Props = NPSScaleProps;

/**
 * NPSScale, design V3 — the 0–10 scale as a **slider-style horizontal track**.
 * Eleven tick cells sit on one continuous rail; the rail fills with the primary
 * token up to the selected score and drops a thumb on it, so the answer reads as
 * a position on a line rather than a grid of buttons. A readout above names the
 * current score and its bucket (detractor / passive / promoter), so meaning is
 * never color-alone. `radiogroup`/`radio` with each tick announced; tapping a
 * tick selects it. Token-pure.
 */
export function NPSScaleV3({
  value,
  onChange,
  minLabel = 'Not at all likely',
  maxLabel = 'Extremely likely',
  colorByBucket = false,
  accessibilityLabel = 'Likelihood to recommend, 0 to 10',
  disabled = false,
  style,
}: NPSScaleV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasValue = value != null;
  const bucket = hasValue ? npsBucket(value) : null;
  const railTint = withAlpha(colors.primary, 0.14);

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ minHeight: tokens.typography.scale.xl, justifyContent: 'center' }}>
        {hasValue ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
              {value}
            </Text>
            {`  ·  ${bucket}`}
          </Text>
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Tap a point to rate</Text>
        )}
      </View>

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{ flexDirection: 'row', opacity: disabled ? 0.5 : 1 }}
      >
        {Array.from({ length: 11 }, (_, score) => {
          const selected = value === score;
          const filled = hasValue && score <= value;
          const isFirst = score === 0;
          const isLast = score === 10;
          void colorByBucket; // palette intentionally primary-driven in the slider treatment
          return (
            <Pressable
              key={score}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled }}
              accessibilityLabel={`${score}, ${npsBucket(score)}`}
              disabled={disabled}
              onPress={() => onChange?.(score)}
              style={{ flex: 1, minHeight: 44, justifyContent: 'center' }}
            >
              <View
                style={{
                  height: 8,
                  backgroundColor: filled ? colors.primary : railTint,
                  borderTopLeftRadius: isFirst ? tokens.radius.full : 0,
                  borderBottomLeftRadius: isFirst ? tokens.radius.full : 0,
                  borderTopRightRadius: isLast ? tokens.radius.full : 0,
                  borderBottomRightRadius: isLast ? tokens.radius.full : 0,
                }}
              />
              {selected ? (
                <View
                  pointerEvents="none"
                  style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}
                >
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: tokens.radius.full,
                      backgroundColor: colors.surface,
                      borderWidth: 3,
                      borderColor: colors.primary,
                      ...shadow('sm', tokens),
                    }}
                  />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }}>{minLabel}</Text>
        <Text
          style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1, textAlign: 'right' }}
        >
          {maxLabel}
        </Text>
      </View>
    </View>
  );
}

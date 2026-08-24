import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import { npsBucket, type NPSBucket, type NPSScaleProps } from './NPSScale';

/** Same Props as {@link NPSScale} — a drop-in alternate design. */
export type NPSScaleV2Props = NPSScaleProps;

const BASE: Record<NPSBucket, keyof SemanticColors> = {
  detractor: 'danger',
  passive: 'warn',
  promoter: 'success',
};
const ON: Record<NPSBucket, keyof SemanticColors> = {
  detractor: 'onDanger',
  passive: 'onWarn',
  promoter: 'onSuccess',
};
const TEXT: Record<NPSBucket, keyof SemanticColors> = {
  detractor: 'dangerText',
  passive: 'warnText',
  promoter: 'successText',
};

const LEGEND: { bucket: NPSBucket; label: string }[] = [
  { bucket: 'detractor', label: 'Detractors 0–6' },
  { bucket: 'passive', label: 'Passives 7–8' },
  { bucket: 'promoter', label: 'Promoters 9–10' },
];

interface CellProps {
  score: number;
  selected: boolean;
  disabled: boolean;
  colorByBucket: boolean;
  onPress: () => void;
}

function NPSCell({ score, selected, disabled, colorByBucket, onPress }: CellProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const bucket = npsBucket(score);
  const base = colorByBucket ? colors[BASE[bucket]] : colors.primary;
  const on = colorByBucket ? colors[ON[bucket]] : colors.onPrimary;
  const restText = colorByBucket ? colors[TEXT[bucket]] : colors.onSurface;

  return (
    <Animated.View style={{ flexBasis: '18%', flexGrow: 1, transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected, disabled }}
        accessibilityLabel={`${score}, ${bucket}`}
        disabled={disabled}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={{
          minHeight: 56,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.md,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? base : withAlpha(base, 0.35),
          backgroundColor: selected ? base : withAlpha(base, 0.08),
          opacity: disabled ? 0.5 : 1,
          ...(selected ? shadow('sm', tokens) : null),
        }}
      >
        <Text style={{ color: selected ? on : restText, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
          {score}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

/**
 * NPSScale, design V2 — the 0–10 scale as a **grid of numbered cards with bucket
 * coloring baked in**. Every card carries a faint tint of its bucket color
 * (detractor / passive / promoter) at rest and fills solid with a lift when
 * selected, and a labeled legend spells out each band so the meaning is never
 * color-alone. `colorByBucket` drives the palette; otherwise all cards read as
 * primary. `radiogroup`/`radio` with each cell's bucket announced; cards spring
 * on press. Token-pure.
 */
export function NPSScaleV2({
  value,
  onChange,
  minLabel = 'Not at all likely',
  maxLabel = 'Extremely likely',
  colorByBucket = false,
  accessibilityLabel = 'Likelihood to recommend, 0 to 10',
  disabled = false,
  style,
}: NPSScaleV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}
      >
        {Array.from({ length: 11 }, (_, score) => (
          <NPSCell
            key={score}
            score={score}
            selected={value === score}
            disabled={disabled}
            colorByBucket={colorByBucket}
            onPress={() => onChange?.(score)}
          />
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }}>{minLabel}</Text>
        <Text
          style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1, textAlign: 'right' }}
        >
          {maxLabel}
        </Text>
      </View>

      {colorByBucket ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }}>
          {LEGEND.map(({ bucket, label }) => (
            <View key={bucket} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: colors[BASE[bucket]],
                }}
              />
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {label}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

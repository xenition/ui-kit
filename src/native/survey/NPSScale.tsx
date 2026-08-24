import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** NPS bucket for a 0-10 score. */
export type NPSBucket = 'detractor' | 'passive' | 'promoter';

/** Classify a 0-10 score into its Net Promoter bucket. */
export function npsBucket(score: number): NPSBucket {
  if (score <= 6) return 'detractor';
  if (score <= 8) return 'passive';
  return 'promoter';
}

export interface NPSScaleProps {
  /** Selected score 0-10. `null`/`undefined` → nothing selected. */
  value?: number | null;
  /** Fires with the chosen 0-10 score. */
  onChange?: (value: number) => void;
  /** Anchor under the 0 end. Default `'Not at all likely'`. */
  minLabel?: string;
  /** Anchor under the 10 end. Default `'Extremely likely'`. */
  maxLabel?: string;
  /**
   * Color each cell by its NPS bucket (detractor=danger, passive=warn,
   * promoter=success) instead of the flat primary fill. Default `false`.
   */
  colorByBucket?: boolean;
  /** Accessible name for the scale. Default `'Likelihood to recommend, 0 to 10'`. */
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const BUCKET_ON: Record<NPSBucket, keyof SemanticColors> = {
  detractor: 'onDanger',
  passive: 'onWarn',
  promoter: 'onSuccess',
};
const BUCKET_BASE: Record<NPSBucket, keyof SemanticColors> = {
  detractor: 'danger',
  passive: 'warn',
  promoter: 'success',
};

/**
 * The 0-10 Net Promoter Score picker — eleven `radio` cells in a `radiogroup`
 * with anchor labels under the extremes. Each cell announces its bucket
 * (detractor / passive / promoter) so the meaning is never conveyed by color
 * alone; `colorByBucket` additionally tints selected cells by bucket using the
 * danger / warn / success tokens. Selection uses the primary token otherwise.
 * No literal colors.
 */
export function NPSScale({
  value,
  onChange,
  minLabel = 'Not at all likely',
  maxLabel = 'Extremely likely',
  colorByBucket = false,
  accessibilityLabel = 'Likelihood to recommend, 0 to 10',
  disabled = false,
  style,
}: NPSScaleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}
      >
        {Array.from({ length: 11 }, (_, score) => {
          const selected = value === score;
          const bucket = npsBucket(score);
          const baseColor = colorByBucket ? colors[BUCKET_BASE[bucket]] : colors.primary;
          const onColor = colorByBucket ? colors[BUCKET_ON[bucket]] : colors.onPrimary;
          return (
            <Pressable
              key={score}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled }}
              accessibilityLabel={`${score}, ${bucket}`}
              disabled={disabled}
              onPress={() => onChange?.(score)}
              style={{
                width: 34,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.sm,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? baseColor : colors.border,
                backgroundColor: selected ? baseColor : colors.surface,
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <Text
                style={{
                  color: selected ? onColor : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '700',
                }}
              >
                {score}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }}>
          {minLabel}
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            flexShrink: 1,
            textAlign: 'right',
          }}
        >
          {maxLabel}
        </Text>
      </View>
    </View>
  );
}

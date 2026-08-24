import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface OnboardingStep {
  label: string;
  done: boolean;
  /** Optional supporting line under the label. */
  description?: string;
  /** Fires when the row is pressed (e.g. to jump into that step). */
  onPress?: () => void;
}

export interface OnboardingChecklistProps {
  steps: OnboardingStep[];
  /** Heading; defaults to "Get started". */
  title?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A getting-started checklist with a completion meter (design.md §42): a
 * progress bar + "N of M" count over a list of steps, each showing a check when
 * done. Completed steps are struck-through and muted. Token-only.
 */
export function OnboardingChecklist({
  steps,
  title = 'Get started',
  style,
}: OnboardingChecklistProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = steps.length;
  const doneCount = steps.filter((s) => s.done).length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ gap: tokens.spacing.xs }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            accessibilityRole="header"
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.lg,
              fontWeight: '700',
            }}
          >
            {title}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {doneCount} of {total}
          </Text>
        </View>
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: pct }}
          style={{
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${pct}%`,
              height: '100%',
              backgroundColor: colors.primary,
            }}
          />
        </View>
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        {steps.map((step, i) => {
          const row = (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
              }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: step.done ? 0 : 1,
                  borderColor: colors.border,
                  backgroundColor: step.done ? colors.success : colors.surface,
                }}
              >
                {step.done ? (
                  <Text
                    style={{
                      color: colors.onSuccess,
                      fontSize: tokens.typography.scale.sm,
                      fontWeight: '700',
                    }}
                  >
                    ✓
                  </Text>
                ) : null}
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    color: step.done ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                    textDecorationLine: step.done ? 'line-through' : 'none',
                  }}
                >
                  {step.label}
                </Text>
                {step.description ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                    {step.description}
                  </Text>
                ) : null}
              </View>
            </View>
          );

          if (!step.onPress) {
            return (
              <View
                key={`${step.label}-${i}`}
                accessibilityLabel={`${step.label}, ${step.done ? 'completed' : 'not completed'}`}
              >
                {row}
              </View>
            );
          }
          return (
            <Pressable
              key={`${step.label}-${i}`}
              accessibilityRole="button"
              accessibilityLabel={`${step.label}, ${step.done ? 'completed' : 'not completed'}`}
              onPress={step.onPress}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              {row}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

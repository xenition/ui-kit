import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';
import { ProgressRing } from '../charts';

/** One tracked step/module in the course path. */
export interface ProgressStep {
  /** Stable id / key. */
  id: string;
  /** Step label, e.g. module title. */
  label: string;
  /** Whether the learner has completed it. */
  completed?: boolean;
}

/** Layout: a horizontal bar summary or a circular ring. */
export type ProgressTrackerVariant = 'bar' | 'ring';

export interface ProgressTrackerProps {
  /** Ordered steps; completion is derived from `step.completed`. */
  steps: ProgressStep[];
  /** Visual style. */
  variant?: ProgressTrackerVariant;
  /** Heading label (default "Your progress"). */
  title?: string;
  /** Copy shown when `steps` is empty. */
  emptyLabel?: string;
  /** Show the per-step checklist under the summary. */
  showList?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Course-completion tracker: a percentage summary (bar or ring) over a set of
 * steps, with an optional per-step checklist. Completion is counted from each
 * `step.completed` flag and guarded against an empty list, which renders a muted
 * empty state instead. Token-only colors.
 */
export function ProgressTracker({
  steps,
  variant = 'bar',
  title = 'Your progress',
  emptyLabel = 'No modules yet',
  showList = false,
  style,
}: ProgressTrackerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (steps.length === 0) {
    return (
      <View
        accessibilityLabel={emptyLabel}
        style={[
          {
            padding: tokens.spacing.lg,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
          },
          style,
        ]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const done = steps.filter((s) => s.completed).length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <View
      accessibilityLabel={`${title}: ${done} of ${steps.length} complete, ${pct}%`}
      style={[
        {
          gap: tokens.spacing.md,
          padding: tokens.spacing.lg,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>

      {variant === 'ring' ? (
        <View style={{ alignItems: 'center' }}>
          <ProgressRing value={done} max={steps.length} size={100} color="primary" />
        </View>
      ) : (
        <View style={{ gap: 4 }}>
          <Progress value={done} max={steps.length} tone="primary" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {done} of {steps.length} complete ({pct}%)
          </Text>
        </View>
      )}

      {showList ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {steps.map((step) => (
            <View key={step.id} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Text
                allowFontScaling={false}
                style={{ color: step.completed ? colors.success : colors.muted, fontSize: tokens.typography.scale.sm }}
              >
                {step.completed ? '✓' : '○'}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  color: step.completed ? colors.onSurface : colors.muted,
                  fontSize: tokens.typography.scale.sm,
                }}
              >
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Progress } from '../primitives';
import { ProgressRing } from '../charts';
import type { ProgressTrackerProps } from './ProgressTracker';

/** Drop-in for {@link ProgressTrackerProps} — same props, the V4 "campus" design. */
export type ProgressTrackerV4Props = ProgressTrackerProps;

/**
 * ProgressTracker — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow holding a course-completion summary (a
 * bar or a circular ring) with a big legible **tabular-nums** percentage, and an
 * optional per-step checklist. Guards an empty list with a muted empty state.
 * Reuses the base `variant` (`bar` / `ring`). Token-only colors via
 * `useXenitionTheme()`.
 */
export function ProgressTrackerV4({ steps, variant = 'bar', title = 'Your progress', emptyLabel = 'No modules yet', showList = false, style }: ProgressTrackerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const shell: ViewStyle = {
    padding: tokens.spacing.lg,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  if (steps.length === 0) {
    return (
      <View accessibilityLabel={emptyLabel} style={[shell, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const done = steps.filter((s) => s.completed).length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <View accessibilityLabel={`${title}: ${done} of ${steps.length} complete, ${pct}%`} style={[shell, { gap: tokens.spacing.md }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{pct}%</Text>
      </View>

      {variant === 'ring' ? (
        <View style={{ alignItems: 'center' }}>
          <ProgressRing value={done} max={steps.length} size={100} color="primary" />
        </View>
      ) : (
        <View style={{ gap: 4 }}>
          <Progress value={done} max={steps.length} tone="primary" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>{done} of {steps.length} complete ({pct}%)</Text>
        </View>
      )}

      {showList ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {steps.map((step) => (
            <View key={step.id} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: step.completed ? withAlpha(colors.success, 0.12) : withAlpha(colors.onSurface, 0.06) }}>
                <Text allowFontScaling={false} style={{ color: step.completed ? colors.success : colors.muted, fontSize: tokens.typography.scale.xs }}>{step.completed ? '✓' : '○'}</Text>
              </View>
              <Text numberOfLines={1} style={{ flex: 1, color: step.completed ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.sm }}>{step.label}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

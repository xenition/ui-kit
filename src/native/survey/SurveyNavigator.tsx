import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Button } from '../primitives';

export interface SurveyNavigatorProps {
  /** Current step, 1-based. */
  step: number;
  /** Total number of steps. */
  total: number;
  /** Fires on Back. The Back button is hidden when unset or on step 1. */
  onBack?: () => void;
  /** Fires on Next (steps before the last). */
  onNext?: () => void;
  /** Fires on Submit (the last step). Falls back to `onNext` when unset. */
  onSubmit?: () => void;
  /** Back button label. Default `'Back'`. */
  backLabel?: string;
  /** Next button label. Default `'Next'`. */
  nextLabel?: string;
  /** Submit button label, shown on the last step. Default `'Submit'`. */
  submitLabel?: string;
  /** Disable the Next/Submit action (e.g. a required answer is missing). */
  nextDisabled?: boolean;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * SurveyNavigator — the survey flow's **footer** (V4 "focus" line). A calm,
 * non-gradient bar: a slim primary progress track with a `Step N of M` caption
 * (exposed as a `progressbar`), a ghost Back button and a primary Next button.
 * On the final step Next becomes Submit (still primary, routed to `onSubmit` and
 * falling back to `onNext`). Both actions are big ≥44px thumb-zone `Button`
 * primitives. Presentational only (step index + callbacks). Token-only colors
 * via `useXenitionTheme()` (no literals), dark-mode safe.
 */
export function SurveyNavigator({
  step,
  total,
  onBack,
  onNext,
  onSubmit,
  backLabel = 'Back',
  nextLabel = 'Next',
  submitLabel = 'Submit',
  nextDisabled = false,
  style,
}: SurveyNavigatorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const safeTotal = Math.max(1, Math.trunc(total));
  const current = Math.min(Math.max(1, Math.trunc(step)), safeTotal);
  const pct = Math.round((current / safeTotal) * 100);
  const isLast = current >= safeTotal;
  const showBack = onBack != null && current > 1;
  const advance = isLast ? onSubmit ?? onNext : onNext;
  const advanceLabel = isLast ? submitLabel : nextLabel;

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {/* Inline progress — slim primary track + spoken step caption. */}
      <View style={{ gap: tokens.spacing.xs }}>
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 1, max: safeTotal, now: current }}
          accessibilityLabel={`Step ${current} of ${safeTotal}`}
          style={{
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.onSurface, 0.1),
            overflow: 'hidden',
          }}
        >
          <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.primary }} />
        </View>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {`Step ${current} of ${safeTotal}`}
        </Text>
      </View>

      {/* Actions — ghost Back + primary Next/Submit in the thumb zone. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {showBack ? (
          <Button
            variant="ghost"
            size="lg"
            accessibilityLabel={backLabel}
            onPress={onBack}
            style={{ flex: 1, minHeight: 44 }}
          >
            {backLabel}
          </Button>
        ) : null}
        <Button
          variant="primary"
          size="lg"
          accessibilityLabel={advanceLabel}
          onPress={advance}
          disabled={nextDisabled}
          style={{ flex: 1, minHeight: 44 }}
        >
          {advanceLabel}
        </Button>
      </View>
    </View>
  );
}

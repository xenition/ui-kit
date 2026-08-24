import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Steps, Badge, type BadgeTone } from '../primitives';
import type { ApplicationStage } from './types';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';

export type StatusPipelineVariant = 'full' | 'compact';

export interface StatusPipelineProps {
  /** The stage the application currently sits at. */
  stage: ApplicationStage;
  /** When true, the pipeline ended in rejection at `stage`. */
  rejected?: boolean;
  /**
   * `full` (default) renders the primitive `Steps` track with a labeled marker
   * per stage; `compact` renders a single stage `Badge` with an `n / total`
   * position — for dense rows.
   */
  variant?: StatusPipelineVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * Hiring-funnel progress: applied → screening → interview → offer → hired.
 * Built on the primitive `Steps`, so each stage carries a numbered/checked
 * marker AND its text label — stage is never conveyed by color alone (an
 * explicit accessibility summary states "Stage n of m: <label>", and rejection
 * is announced as text, not just a danger hue). Presentational; pass `stage`.
 */
export function StatusPipeline({
  stage,
  rejected = false,
  variant = 'full',
  style,
}: StatusPipelineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Guard the lookup: an unknown stage resolves to the first step, never -1.
  const idx = Math.max(0, APPLICATION_STAGES.indexOf(stage));
  const total = APPLICATION_STAGES.length;
  const label = STAGE_LABEL[stage] ?? APPLICATION_STAGES[0];
  const position = `${idx + 1} of ${total}`;
  const summary = rejected
    ? `Rejected at stage ${position}: ${label}`
    : `Stage ${position}: ${label}`;

  if (variant === 'compact') {
    const tone: BadgeTone = rejected ? 'danger' : stage === 'hired' ? 'success' : 'primary';
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={summary}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}
      >
        <Badge tone={tone}>{rejected ? `${label} · Rejected` : label}</Badge>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{position}</Text>
      </View>
    );
  }

  return (
    <View accessibilityLabel={summary} style={[{ gap: tokens.spacing.sm }, style]}>
      <Steps steps={APPLICATION_STAGES.map((s) => ({ title: STAGE_LABEL[s] }))} current={idx} />
      {rejected ? (
        <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {`✕ Rejected at ${label}`}
        </Text>
      ) : null}
    </View>
  );
}

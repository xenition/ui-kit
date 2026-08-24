import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { StatusPipelineProps } from './StatusPipeline';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';

/** Drop-in alternate: identical props to {@link StatusPipelineProps}. */
export type StatusPipelineV3Props = StatusPipelineProps;

/**
 * StatusPipeline — design V3. A minimal, dense read-out: the current stage
 * word (with a ✓/✕ glyph so meaning survives without color) and an `n / total`
 * position on one line, above a thin segmented bar that fills to the current
 * stage. Rejection tints the filled segments danger AND is stated as the word,
 * never color alone. `variant` is accepted for parity but ignored. Token-pure.
 */
export function StatusPipelineV3({
  stage,
  rejected = false,
  style,
}: StatusPipelineV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Guarded indexing: an unknown stage resolves to the first step, never -1.
  const idx = Math.max(0, APPLICATION_STAGES.indexOf(stage));
  const total = APPLICATION_STAGES.length;
  const label = STAGE_LABEL[stage] ?? STAGE_LABEL[APPLICATION_STAGES[0]!];
  const position = `${idx + 1} of ${total}`;
  const summary = rejected
    ? `Rejected at stage ${position}: ${label}`
    : `Stage ${position}: ${label}`;

  const hired = stage === 'hired';
  const wordColor = rejected ? colors.dangerText : hired ? colors.successText : colors.primaryText;
  const word = rejected ? `✕ ${label} · Rejected` : hired ? `✓ ${label}` : label;

  return (
    <View accessibilityLabel={summary} style={[{ gap: tokens.spacing.xs }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: wordColor, fontWeight: '700', fontSize: tokens.typography.scale.sm }}
        >
          {word}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{position}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 3 }}>
        {APPLICATION_STAGES.map((s, i) => {
          const filled = i <= idx;
          const barColor = rejected
            ? filled
              ? colors.danger
              : colors.border
            : filled
              ? colors.primary
              : colors.border;
          return (
            <View
              key={s}
              style={{ flex: 1, height: 6, borderRadius: tokens.radius.full, backgroundColor: barColor }}
            />
          );
        })}
      </View>
    </View>
  );
}

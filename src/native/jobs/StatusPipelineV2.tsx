import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { StatusPipelineProps } from './StatusPipeline';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';

/** Drop-in alternate: identical props to {@link StatusPipelineProps}. */
export type StatusPipelineV2Props = StatusPipelineProps;

/**
 * StatusPipeline — design V2. A big, celebratory funnel: large numbered
 * circles joined by connector rails, each with its stage word underneath.
 * Completed circles fill primary with a ✓, the current one is ringed, future
 * ones are muted. Rejection is spelled out as text (✕ glyph + `*Text` token),
 * never color alone. The `variant` prop is accepted for drop-in parity but the
 * layout is fixed — this file *is* the design. Token-pure.
 */
export function StatusPipelineV2({
  stage,
  rejected = false,
  style,
}: StatusPipelineV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Guarded indexing: an unknown stage resolves to the first step, never -1.
  const idx = Math.max(0, APPLICATION_STAGES.indexOf(stage));
  const total = APPLICATION_STAGES.length;
  const label = STAGE_LABEL[stage] ?? STAGE_LABEL[APPLICATION_STAGES[0]!];
  const position = `${idx + 1} of ${total}`;
  const summary = rejected
    ? `Rejected at stage ${position}: ${label}`
    : `Stage ${position}: ${label}`;

  return (
    <View accessibilityLabel={summary} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {APPLICATION_STAGES.map((s, i) => {
          const done = i < idx;
          const current = i === idx;
          const rejectHere = rejected && current;
          const circleBg = done ? colors.primary : rejectHere ? colors.danger : 'transparent';
          const ringColor = current ? (rejectHere ? colors.danger : colors.primary) : colors.border;
          const glyph = done ? '✓' : rejectHere ? '✕' : String(i + 1);
          const glyphColor = done
            ? colors.onPrimary
            : rejectHere
              ? colors.onDanger
              : current
                ? colors.primaryText
                : colors.muted;
          return (
            <View key={s} style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }}>
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: i > 0 ? (i <= idx ? colors.primary : colors.border) : 'transparent',
                  }}
                />
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: circleBg,
                    borderWidth: done ? 0 : 2,
                    borderColor: ringColor,
                  }}
                >
                  <Text style={{ color: glyphColor, fontWeight: '700', fontSize: tokens.typography.scale.sm }}>
                    {glyph}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor:
                      i < total - 1 ? (i < idx ? colors.primary : colors.border) : 'transparent',
                  }}
                />
              </View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: current ? '700' : '500',
                  color: current || done ? colors.onSurface : colors.muted,
                }}
              >
                {STAGE_LABEL[s]}
              </Text>
            </View>
          );
        })}
      </View>
      {rejected ? (
        <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
          {`✕ Rejected at ${label}`}
        </Text>
      ) : null}
    </View>
  );
}

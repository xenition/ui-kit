import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BarChart } from '../charts';
import { formatMoney } from '../commerce/money';
import type { PipelineBoardProps } from './PipelineBoard';

/** V3 accepts the exact same props as {@link PipelineBoard} — a drop-in replacement. */
export type PipelineBoardV3Props = PipelineBoardProps;

/**
 * PipelineBoard **design V3** — no columns at all. A *horizontal stage-total
 * strip* (a token `BarChart` of each stage's summed value) sits above a flat,
 * vertically stacked *list* of every stage and its deals — a single-column,
 * no-horizontal-scroll layout for phones. Same props as {@link PipelineBoard}:
 * `onDealPress` taps a deal line, `onMoveDeal` adds guarded `← →` nudges
 * disabled at the pipeline ends. Empty board shows `emptyLabel`; empty stages
 * show a muted placeholder. Token-pure.
 */
export function PipelineBoardV3({
  stages,
  currency = 'USD',
  onDealPress,
  onMoveDeal,
  emptyLabel = 'No stages in this pipeline yet',
  style,
}: PipelineBoardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (stages.length === 0) {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={emptyLabel}
        style={[
          {
            padding: tokens.spacing.xl,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
          },
          style,
        ]}
      >
        <Text style={{ fontSize: tokens.typography.scale.xl, color: colors.muted }}>▤</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const totals = stages.map((s) => s.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0));
  const labels = stages.map((s) => s.name);
  const grandTotal = totals.reduce((a, b) => a + b, 0);

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>Pipeline total</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {formatMoney(grandTotal, currency)}
          </Text>
        </View>
        <BarChart
          data={totals}
          labels={labels}
          height={80}
          color="primary"
          accessibilityLabel={`Stage totals across ${stages.length} stages`}
        />
      </View>

      <View style={{ gap: tokens.spacing.md }}>
        {stages.map((stage, stageIndex) => {
          const canBack = stageIndex > 0;
          const canForward = stageIndex < stages.length - 1;
          return (
            <View key={stage.id} style={{ gap: tokens.spacing.xs }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
                <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                  {stage.name}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {`${stage.deals.length} · ${formatMoney(totals[stageIndex] ?? 0, currency)}`}
                </Text>
              </View>

              {stage.deals.length === 0 ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, paddingVertical: tokens.spacing.xs }}>
                  No deals
                </Text>
              ) : (
                stage.deals.map((deal) => {
                  const dotColor =
                    deal.outcome === 'won' ? colors.success : deal.outcome === 'lost' ? colors.danger : colors.primary;
                  const line = (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.sm,
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.sm,
                        borderRadius: tokens.radius.sm,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: colors.surface,
                      }}
                    >
                      <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor }} />
                      <View style={{ flex: 1, gap: 1 }}>
                        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                          {deal.name}
                        </Text>
                        {deal.company ? (
                          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                            {deal.company}
                          </Text>
                        ) : null}
                      </View>
                      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                        {formatMoney(deal.valueCents, currency)}
                      </Text>
                      {onMoveDeal ? (
                        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs / 2 }}>
                          <MoveButton
                            label={`Move ${deal.name} back`}
                            glyph="←"
                            disabled={!canBack}
                            onPress={canBack ? () => onMoveDeal(deal, stage, 'back') : undefined}
                          />
                          <MoveButton
                            label={`Move ${deal.name} forward`}
                            glyph="→"
                            disabled={!canForward}
                            onPress={canForward ? () => onMoveDeal(deal, stage, 'forward') : undefined}
                          />
                        </View>
                      ) : null}
                    </View>
                  );
                  return onDealPress ? (
                    <Pressable
                      key={deal.id}
                      accessibilityRole="button"
                      accessibilityLabel={`Deal ${deal.name}`}
                      onPress={() => onDealPress(deal, stage)}
                    >
                      {line}
                    </Pressable>
                  ) : (
                    <View key={deal.id}>{line}</View>
                  );
                })
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

interface MoveButtonProps {
  label: string;
  glyph: string;
  disabled: boolean;
  onPress?: () => void;
}

function MoveButton({ label, glyph, disabled, onPress }: MoveButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={6}
      style={{
        width: 28,
        alignItems: 'center',
        paddingVertical: tokens.spacing.xs / 2,
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{glyph}</Text>
    </Pressable>
  );
}

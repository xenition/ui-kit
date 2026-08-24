import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from '../commerce/money';
import type { PipelineBoardProps, PipelineDeal, PipelineStage } from './PipelineBoard';

/** V2 accepts the exact same props as {@link PipelineBoard} — a drop-in replacement. */
export type PipelineBoardV2Props = PipelineBoardProps;

/** Tone slots cycled across the stage headers (all real SemanticColors keys). */
const HEADER_TONES: Array<keyof SemanticColors> = ['primary', 'accent', 'warn', 'success', 'danger'];

/**
 * PipelineBoard **design V2** — columns, but each stage header wears a *colored*
 * tone band (cycled across the pipeline) with the stage name, deal count and
 * summed value, and every deal renders as a *compact chip* (name + right-aligned
 * value) instead of a full card. Denser and more colorful than the original
 * board. Same props as {@link PipelineBoard}: `onDealPress` taps a chip,
 * `onMoveDeal` adds guarded `← →` nudges disabled at the pipeline ends. Empty
 * board shows `emptyLabel`; empty stages show a muted placeholder. Token-pure.
 */
export function PipelineBoardV2({
  stages,
  currency = 'USD',
  onDealPress,
  onMoveDeal,
  columnWidth = 268,
  emptyLabel = 'No stages in this pipeline yet',
  style,
}: PipelineBoardV2Props): React.ReactElement {
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

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
        {stages.map((stage, stageIndex) => {
          const total = stage.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0);
          const toneKey = HEADER_TONES[stageIndex % HEADER_TONES.length] ?? 'primary';
          const tone = colors[toneKey];
          const canBack = stageIndex > 0;
          const canForward = stageIndex < stages.length - 1;
          return (
            <View
              key={stage.id}
              style={{
                width: columnWidth,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                overflow: 'hidden',
                gap: tokens.spacing.sm,
                paddingBottom: tokens.spacing.sm,
              }}
            >
              <View
                style={{
                  backgroundColor: withAlpha(tone, 0.12),
                  borderLeftWidth: 3,
                  borderLeftColor: tone,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.sm,
                  gap: 2,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
                  <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                    {stage.name}
                  </Text>
                  <View
                    style={{
                      minWidth: tokens.spacing.lg,
                      alignItems: 'center',
                      paddingHorizontal: tokens.spacing.xs,
                      paddingVertical: 1,
                      borderRadius: tokens.radius.full,
                      backgroundColor: withAlpha(tone, 0.24),
                    }}
                  >
                    <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                      {stage.deals.length}
                    </Text>
                  </View>
                </View>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {formatMoney(total, currency)}
                </Text>
              </View>

              <View style={{ paddingHorizontal: tokens.spacing.sm, gap: tokens.spacing.xs }}>
                {stage.deals.length === 0 ? (
                  <View style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }}>
                    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No deals</Text>
                  </View>
                ) : (
                  stage.deals.map((deal) => (
                    <DealChip
                      key={deal.id}
                      deal={deal}
                      currency={currency}
                      accent={tone}
                      onPress={onDealPress ? () => onDealPress(deal, stage) : undefined}
                      onBack={onMoveDeal && canBack ? () => onMoveDeal(deal, stage, 'back') : undefined}
                      onForward={onMoveDeal && canForward ? () => onMoveDeal(deal, stage, 'forward') : undefined}
                      showMoves={!!onMoveDeal}
                      canBack={canBack}
                      canForward={canForward}
                    />
                  ))
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

interface DealChipProps {
  deal: PipelineDeal;
  currency: string;
  accent: string;
  onPress?: () => void;
  onBack?: () => void;
  onForward?: () => void;
  showMoves: boolean;
  canBack: boolean;
  canForward: boolean;
}

function DealChip({ deal, currency, accent, onPress, onBack, onForward, showMoves, canBack, canForward }: DealChipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const outcomeColor =
    deal.outcome === 'won' ? colors.success : deal.outcome === 'lost' ? colors.danger : accent;

  const inner = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      <View style={{ width: 6, height: 6, borderRadius: tokens.radius.full, backgroundColor: outcomeColor }} />
      <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {deal.name}
      </Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
        {formatMoney(deal.valueCents, currency)}
      </Text>
    </View>
  );

  return (
    <View style={{ gap: tokens.spacing.xs / 2 }}>
      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Deal ${deal.name}`} onPress={onPress}>
          {inner}
        </Pressable>
      ) : (
        inner
      )}
      {showMoves ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
          <MoveButton label={`Move ${deal.name} back`} glyph="←" disabled={!canBack} onPress={onBack} />
          <MoveButton label={`Move ${deal.name} forward`} glyph="→" disabled={!canForward} onPress={onForward} />
        </View>
      ) : null}
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
        flex: 1,
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

import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney } from '../commerce/money';
import { DealCard } from './DealCard';
import type { DealOutcome, DealOwner } from './DealCard';

export interface PipelineDeal {
  id: string;
  name: string;
  company?: string;
  valueCents: number;
  probability?: number;
  outcome?: DealOutcome;
  owner?: DealOwner;
}

export interface PipelineStage {
  id: string;
  name: string;
  deals: PipelineDeal[];
}

export type MoveDirection = 'forward' | 'back';

export interface PipelineBoardProps {
  /** Ordered pipeline stages, each holding its deals. */
  stages: PipelineStage[];
  /** ISO 4217 currency for the stage totals + deal values (default USD). */
  currency?: string;
  /** Fired when a deal card is tapped. */
  onDealPress?: (deal: PipelineDeal, stage: PipelineStage) => void;
  /**
   * Fired when a deal is nudged to the previous/next stage via the arrow
   * affordances. Arrows are auto-disabled at the ends of the pipeline.
   */
  onMoveDeal?: (deal: PipelineDeal, stage: PipelineStage, direction: MoveDirection) => void;
  /** Column width in px (default 268). */
  columnWidth?: number;
  /** Placeholder message when there are no stages at all. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontally scrolling sales pipeline: one column per stage, each headed by
 * the stage name, a deal count, and the summed stage value (integer cents via
 * `formatMoney`). Deals render as compact {@link DealCard}s; when `onMoveDeal`
 * is set, each card gains `←/→` affordances that advance or regress it a stage
 * (disabled at the pipeline ends, so indexing is always guarded). An empty
 * stage shows a muted placeholder; a board with **no stages** shows
 * `emptyLabel`. Non-drag — wire a gesture layer separately if you need it. All
 * colors are theme tokens.
 */
export function PipelineBoard({
  stages,
  currency = 'USD',
  onDealPress,
  onMoveDeal,
  columnWidth = 268,
  emptyLabel = 'No stages in this pipeline yet',
  style,
}: PipelineBoardProps): React.ReactElement {
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
                padding: tokens.spacing.sm,
                gap: tokens.spacing.sm,
              }}
            >
              <View style={{ gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
                      backgroundColor: colors.muted,
                    }}
                  >
                    <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                      {stage.deals.length}
                    </Text>
                  </View>
                </View>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {formatMoney(total, currency)}
                </Text>
              </View>

              {stage.deals.length === 0 ? (
                <View style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }}>
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No deals</Text>
                </View>
              ) : (
                stage.deals.map((deal) => (
                  <View key={deal.id} style={{ gap: tokens.spacing.xs }}>
                    <DealCard
                      name={deal.name}
                      company={deal.company}
                      valueCents={deal.valueCents}
                      currency={currency}
                      probability={deal.probability}
                      outcome={deal.outcome}
                      owner={deal.owner}
                      variant="compact"
                      onPress={onDealPress ? () => onDealPress(deal, stage) : undefined}
                    />
                    {onMoveDeal ? (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
                        <MoveButton
                          label={`Move ${deal.name} back`}
                          glyph="←"
                          disabled={!canBack}
                          onPress={() => onMoveDeal(deal, stage, 'back')}
                        />
                        <MoveButton
                          label={`Move ${deal.name} forward`}
                          glyph="→"
                          disabled={!canForward}
                          onPress={() => onMoveDeal(deal, stage, 'forward')}
                        />
                      </View>
                    ) : null}
                  </View>
                ))
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

interface MoveButtonProps {
  label: string;
  glyph: string;
  disabled: boolean;
  onPress: () => void;
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
        paddingVertical: tokens.spacing.xs,
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

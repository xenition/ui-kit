import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney } from '../commerce/money';
import { DealCardV4 } from './DealCardV4';
import { BADGE_V4, spokenLine, TABULAR } from './internal/crm-v4';
import type { PipelineBoardProps } from './PipelineBoard';

export interface PipelineBoardV4Props extends PipelineBoardProps {
  /** Placeholder inside a stage that holds no deals. Default `'No deals'`. */
  stageEmptyLabel?: string;
  /** How a stage's deal count is spelled. Default `'3 deals'`. */
  formatStageCount?: (count: number) => string;
}

/**
 * **V4 pipeline board** — same props as {@link PipelineBoard} plus
 * `stageEmptyLabel` and `formatStageCount`.
 *
 * ## Six changes
 *
 * 1. **The stage count is a real `Badge` on both twins.** Native hand-rolled a
 *    chip filled with `colors.muted` — a **text** token — and inked with
 *    `colors.surface`, which is not the pair for anything. Web already used a
 *    badge, so the same count was two objects.
 * 2. **The move buttons clear 44.** They were roughly 28px with a `hitSlop`,
 *    which is a hit area, not a target: nothing on screen tells a user where
 *    to aim.
 * 3. **They disable at 0.38**, M3's disabled-content band, rather than an
 *    invented `0.4` — and they finally acknowledge a press.
 * 4. **A stage column is a group.** Native exposed no grouping at all, so a
 *    reader walking the board never learned which stage a deal was in; each
 *    column's deals are now a named list.
 * 5. **Empty is the shared `EmptyState`** — for the whole board and for a
 *    single empty stage, which was one muted line in a blank region.
 * 6. **The count carries a unit and the stage totals are tabular**, so a row
 *    of columns lines its figures up.
 */
export function PipelineBoardV4({
  stages,
  currency = 'USD',
  onDealPress,
  onMoveDeal,
  columnWidth = 268,
  emptyLabel = 'No stages in this pipeline yet',
  stageEmptyLabel = 'No deals',
  formatStageCount,
  style,
}: PipelineBoardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const countLabel = formatStageCount ?? ((n: number) => `${n} deals`);

  if (stages.length === 0) {
    return (
      <EmptyStateV4
        icon={
          <TextV4 size="xl" tone="mutedText">
            ▤
          </TextV4>
        }
        title={emptyLabel}
        style={style}
      />
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
        {stages.map((stage, stageIndex) => {
          const total = stage.deals.reduce(
            (sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0),
            0
          );
          const canBack = stageIndex > 0;
          const canForward = stageIndex < stages.length - 1;
          const totalLabel = formatMoney(total, currency);
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
              <View
                accessible
                accessibilityRole="header"
                accessibilityLabel={spokenLine([
                  stage.name,
                  countLabel(stage.deals.length),
                  totalLabel,
                ])}
                style={{ gap: tokens.spacing.xs / 2 }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    justifyContent: 'space-between',
                  }}
                >
                  <TextV4
                    size="sm"
                    weight="bold"
                    tone="onSurface"
                    numberOfLines={1}
                    style={{ flex: 1 }}
                  >
                    {stage.name}
                  </TextV4>
                  <BadgeV4 {...BADGE_V4} tone="neutral">
                    {`${stage.deals.length}`}
                  </BadgeV4>
                </View>
                <TextV4 size="xs" weight="semibold" tone="mutedText" style={TABULAR}>
                  {totalLabel}
                </TextV4>
              </View>

              {stage.deals.length === 0 ? (
                <EmptyStateV4 title={stageEmptyLabel} />
              ) : (
                <View
                  // Grouping, so a reader learns which stage a deal sits in.
                  accessibilityRole="list"
                  accessibilityLabel={spokenLine([stage.name, countLabel(stage.deals.length)])}
                  style={{ gap: tokens.spacing.sm }}
                >
                  {stage.deals.map((deal) => (
                    <View key={deal.id} style={{ gap: tokens.spacing.xs }}>
                      <DealCardV4
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
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.xs,
                          }}
                        >
                          <MoveButtonV4
                            label={`Move ${deal.name} back`}
                            glyph="←"
                            disabled={!canBack}
                            onPress={() => onMoveDeal(deal, stage, 'back')}
                          />
                          <MoveButtonV4
                            label={`Move ${deal.name} forward`}
                            glyph="→"
                            disabled={!canForward}
                            onPress={() => onMoveDeal(deal, stage, 'forward')}
                          />
                        </View>
                      ) : null}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

interface MoveButtonV4Props {
  label: string;
  glyph: string;
  disabled: boolean;
  onPress: () => void;
}

function MoveButtonV4({ label, glyph, disabled, onPress }: MoveButtonV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // A real target, not a `hitSlop` around a 28px glyph.
        minHeight: minTap(tokens.spacing),
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: pressed
          ? pressOver(theme, colors.surface, colors.onSurface)
          : 'transparent',
        opacity: disabledOpacity(theme.state, disabled),
      })}
    >
      <TextV4 size="sm" weight="bold" tone="onSurface">
        {glyph}
      </TextV4>
    </Pressable>
  );
}

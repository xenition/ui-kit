import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney } from '../commerce/money';
import { WinLossBadgeV4 } from './WinLossBadgeV4';
import { clampPercent, skeletonFill, spokenLine, TABULAR } from './internal/crm-v4';
import type { DealCardProps } from './DealCard';

export interface DealCardV4Props extends DealCardProps {
  /** Name of the probability meter. Default `'Probability'`. */
  probabilityLabel?: string;
  /** Announced while the skeleton is up. Default `'Loading deal'`. */
  loadingLabel?: string;
}

/** The meter's own thickness — a bar, not a hairline. */
const METER = 6;

/**
 * **V4 deal card** — same props as {@link DealCard} plus `probabilityLabel`
 * and `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **The probability meter has a name.** Both twins gave it
 *    `accessibilityRole="progressbar"` and a value with **no label**, leaving
 *    the visible word "Probability" as a detached sibling — so a reader heard
 *    "60 percent" of nothing. The word and the meter are now one control.
 * 2. **The card announces everything it shows** — deal, account, value, stage,
 *    probability, owner and close date. `Deal Acme, Acme Inc` replaced the
 *    whole subtree, so the money was silent (rule A).
 * 3. **Money and the percentage are tabular**, so a column of deal cards has
 *    its figures on one grid instead of jittering per digit.
 * 4. **The owner avatar is `sm` on both twins.** Native drew `xs`; the same
 *    card was two different densities per platform.
 * 5. **The skeleton is the shared opaque placeholder** rather than
 *    `colors.border`, and its bar heights come off the spacing scale — the
 *    base sized a box with a **type-scale** token, which is a font size.
 * 6. **`highlighted` is a ring, not a translucent wash.** A wash makes the
 *    card's ink pair depend on whatever is behind it; the card keeps
 *    `card`/`onCard` and gains a `primary` edge. Plus rules B and C.
 *
 * **Renders nothing without a `name`.**
 */
export function DealCardV4({
  name,
  company,
  valueCents,
  currency = 'USD',
  stage,
  probability,
  owner,
  closeDate,
  outcome = 'open',
  variant = 'default',
  loading = false,
  probabilityLabel = 'Probability',
  loadingLabel = 'Loading deal',
  onPress,
  testID,
  style,
}: DealCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const compact = variant === 'compact';
  const highlighted = variant === 'highlighted';
  const pct = Math.round(clampPercent(probability) ?? 0);
  const showMeter = !compact && probability != null;
  const money = formatMoney(valueCents, currency);

  const cardStyle = [
    highlighted ? { borderWidth: 1, borderColor: colors.primary } : null,
    { gap: tokens.spacing.sm },
    style,
  ];

  if (loading) {
    return (
      <CardV4
        variant={highlighted ? 'elevated' : 'outlined'}
        padding={compact ? 'sm' : 'md'}
        testID={testID}
        style={cardStyle}
      >
        <View accessible accessibilityLabel={loadingLabel} style={{ gap: tokens.spacing.sm }}>
          <View
            style={{
              height: tokens.spacing.md + tokens.spacing.xs,
              width: '70%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View
            style={{
              height: tokens.spacing.sm + tokens.spacing.xs,
              width: '40%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        </View>
      </CardV4>
    );
  }

  const body = (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={2}>
            {name}
          </TextV4>
          {company ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {company}
            </TextV4>
          ) : null}
        </View>
        <WinLossBadgeV4 outcome={outcome} size="sm" />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <TextV4 size="lg" weight="bold" tone="onCard" style={TABULAR}>
          {money}
        </TextV4>
        {stage ? (
          <TextV4 size="xs" weight="semibold" tone="mutedText" numberOfLines={1}>
            {stage}
          </TextV4>
        ) : null}
      </View>

      {showMeter ? (
        <View style={{ gap: tokens.spacing.xs / 2 }}>
          {/* The visible pair is decoration: the meter below carries both the
              name and the value, so a reader hears them together. */}
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextV4 size="xs" tone="mutedText">
              {probabilityLabel}
            </TextV4>
            <TextV4 size="xs" weight="semibold" tone="mutedText" style={TABULAR}>
              {`${pct}%`}
            </TextV4>
          </View>
          <View
            accessibilityRole="progressbar"
            accessibilityLabel={probabilityLabel}
            accessibilityValue={{ min: 0, max: 100, now: pct, text: `${pct}%` }}
            style={{
              height: METER,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.selected,
              overflow: 'hidden',
            }}
          >
            <View style={{ width: `${pct}%`, height: '100%', backgroundColor: colors.primary }} />
          </View>
        </View>
      ) : null}

      {!compact && (owner || closeDate) ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          {owner ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <AvatarV4 size="sm" name={owner.name} src={owner.avatarUrl} />
              {owner.name ? (
                <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                  {owner.name}
                </TextV4>
              ) : null}
            </View>
          ) : (
            <View />
          )}
          {closeDate ? (
            <TextV4 size="xs" tone="mutedText" style={TABULAR}>
              {closeDate}
            </TextV4>
          ) : null}
        </View>
      ) : null}
    </>
  );

  const name_ = spokenLine([
    name,
    company,
    money,
    stage,
    showMeter ? `${probabilityLabel} ${pct}%` : null,
    owner?.name,
    closeDate,
  ]);

  if (!onPress) {
    return (
      <CardV4
        variant={highlighted ? 'elevated' : 'outlined'}
        padding={compact ? 'sm' : 'md'}
        accessible
        accessibilityLabel={name_}
        testID={testID}
        style={cardStyle}
      >
        {body}
      </CardV4>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name_}
      onPress={onPress}
      testID={testID}
      style={{ borderRadius: tokens.radius.lg, minHeight: minTap(tokens.spacing) }}
    >
      {({ pressed }) => (
        <CardV4
          variant={highlighted ? 'elevated' : 'outlined'}
          padding={compact ? 'sm' : 'md'}
          style={[
            ...cardStyle,
            pressed ? { backgroundColor: pressOver(theme, colors.card, colors.onCard) } : null,
          ]}
        >
          {body}
        </CardV4>
      )}
    </Pressable>
  );
}

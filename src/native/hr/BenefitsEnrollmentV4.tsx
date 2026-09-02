import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney as defaultFormatMoney, type MoneyFormatter } from '../../commerce/money';
import { StatusPillV4 } from './StatusPillV4';
import { BENEFIT_STATUS_V4, BENEFIT_TYPE_V4, chipStyle, spokenLine } from './internal/tone-v4';
import type { BenefitsEnrollmentProps } from './BenefitsEnrollment';

export interface BenefitsEnrollmentV4Props extends BenefitsEnrollmentProps {
  /** Name of the enroll action. Default `'Enroll'` / `'Complete enrollment'`. */
  enrollLabel?: string;
  /** Money formatter, for a locale the default cannot reach. */
  formatMoney?: MoneyFormatter;
  /** Build the deadline line. Default `` `Enroll by ${date}` ``. */
  formatEnrollBy?: (date: string) => string;
}

/**
 * **V4 benefits enrollment** — same props as {@link BenefitsEnrollment} plus
 * `enrollLabel`, `formatMoney` and `formatEnrollBy`.
 *
 * ## Five changes
 *
 * 1. **Enroll is reachable.** It was a `Button` inside the card's own
 *    `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Benefit PPO Gold, Eligible" — so during open
 *    enrollment the one action with a deadline on it was not a focus stop. The
 *    card is a plain `CardV4`; the activation wraps only the plan region and
 *    the button is its sibling.
 * 2. **Benefit type stops being a status.** `retirement` was toned `success`,
 *    `health` and `vision` `primary`, `dental` `accent` — four kinds of plan
 *    wearing four semantic colours, so a benefits screen used up green before
 *    anything was actually enrolled. A type is identity: glyph, word, neutral
 *    chip.
 * 3. **Money takes a formatter.** `formatMoney`'s third `locale` argument was
 *    unreachable, so a per-period premium printed in the runtime's default
 *    locale regardless of where the employee is paid.
 * 4. **The copy is props.** "Enroll", "Complete enrollment" and "Enroll by"
 *    were hard-coded English on a deadline the employee must not miss.
 * 5. **The card announces the whole plan** — name, type, coverage, cost,
 *    deadline and status — where the base said "Benefit PPO Gold, Eligible".
 *
 * The enroll button is `variant="soft"` on **both** twins; the web base spelled
 * it `secondary`, so the same call to action carried a different weight per
 * platform.
 *
 * **Renders nothing without a `planName`.**
 */
export function BenefitsEnrollmentV4({
  planName,
  type,
  status,
  coverage,
  costCents,
  costPeriod = '/mo',
  currency = 'USD',
  enrollBy,
  actionable = false,
  variant = 'default',
  enrollLabel,
  formatMoney = defaultFormatMoney,
  formatEnrollBy,
  onEnroll,
  onPress,
  testID,
  style,
}: BenefitsEnrollmentV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!planName) return null;

  const compact = variant === 'compact';
  const typeMeta = BENEFIT_TYPE_V4[type];
  const statusMeta = BENEFIT_STATUS_V4[status];
  /*
    A status pill that sits BESIDE the activation is hidden from the reader when
    the row is interactive — the activation's own name already carries the
    status word, and hearing "Denied" twice in a row is worse than hearing it
    once. On a static row there is no activation to carry it, so the pill speaks
    for itself and the name leaves it out. Same rule on both twins.
  */
  const interactive = onPress != null;

  const showAction = actionable && (status === 'eligible' || status === 'pending');
  const enrolled = status === 'enrolled';
  const tap = minTap(tokens.spacing);

  const cost = costCents != null ? formatMoney(costCents, currency) : null;
  const deadline =
    !compact && enrollBy && !enrolled
      ? (formatEnrollBy ?? ((d: string) => `Enroll by ${d}`))(enrollBy)
      : null;
  const action = enrollLabel ?? (status === 'pending' ? 'Complete enrollment' : 'Enroll');

  const spoken = spokenLine([
    planName,
    typeMeta.label,
    coverage,
    cost ? `${cost}${costPeriod}` : null,
    interactive ? statusMeta.label : null,
    deadline,
  ]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minHeight: tap,
        justifyContent: 'center',
        gap: tokens.spacing.xs / 2,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <TextV4 size="base" tone="onCard">
          {typeMeta.glyph}
        </TextV4>
        <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1} style={{ flexShrink: 1 }}>
          {planName}
        </TextV4>
      </View>
      {/* A kind, not a state — see change 2. */}
      <View style={chipStyle(theme)}>
        <TextV4 size="xs" weight="semibold" tone="onCard">
          {typeMeta.label}
        </TextV4>
      </View>
    </View>
  );

  return (
    <CardV4
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spoken}
            onPress={onPress}
            style={{ flex: 1, borderRadius: tokens.radius.md }}
          >
            {({ pressed }) => identity(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={spoken} style={{ flex: 1 }}>
            {identity(false)}
          </View>
        )}
        <StatusPillV4 meta={statusMeta} size="sm" decorative={interactive} />
      </View>

      {!compact && coverage ? (
        <TextV4 size="sm" tone="mutedText">
          {coverage}
        </TextV4>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        {cost ? (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs / 2 }}>
            <TextV4 size="lg" weight="bold" tone="onCard" numeric="tabular">
              {cost}
            </TextV4>
            <TextV4 size="xs" tone="mutedText">
              {costPeriod}
            </TextV4>
          </View>
        ) : (
          <View />
        )}
        {deadline ? (
          <TextV4 size="xs" tone="mutedText">
            {deadline}
          </TextV4>
        ) : null}
      </View>

      {/* A sibling of the card's activation, never a descendant — change 1. */}
      {showAction ? (
        <ButtonV4
          size="sm"
          variant="soft"
          onPress={onEnroll}
          accessibilityLabel={`${action}: ${planName}`}
          style={{ minHeight: tap }}
        >
          {action}
        </ButtonV4>
      ) : null}
    </CardV4>
  );
}

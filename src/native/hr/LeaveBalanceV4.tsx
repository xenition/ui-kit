import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { pluralizeCount } from '../../hr/workforce-v4';
import { LEAVE_TYPE_V4, chipStyle, spokenLine } from './internal/tone-v4';
import type { LeaveType } from './internal';

export type LeaveBalanceV4Variant = 'default' | 'compact';

export interface LeaveBalanceV4Props {
  /** Which entitlement this is. Supplies the glyph and, unless overridden, the name. */
  type?: LeaveType;
  /** Name for the balance. Default: the leave type's own word. */
  label?: string;
  /** Days earned this period, before anything was taken. */
  accruedDays: number;
  /** Days already used. */
  takenDays: number;
  /** Days brought forward. Counts toward the entitlement. */
  carryoverDays?: number;
  /** Which period the balance covers, pre-formatted (e.g. `'2026'`). */
  periodLabel?: string;
  /** Density. `compact` drops the breakdown row. */
  variant?: LeaveBalanceV4Variant;
  /** Build a day count. Default `'12 days'` / `'1 day'`. */
  formatDays?: (days: number) => string;
  /** Caption for the accrued figure. Default `'Accrued'`. */
  accruedLabel?: string;
  /** Caption for the used figure. Default `'Taken'`. */
  takenLabel?: string;
  /** Caption for the available figure. Default `'Remaining'`. */
  remainingLabel?: string;
  /** Caption for the carried-forward figure. Default `'Carryover'`. */
  carryoverLabel?: string;
  /**
   * The word an over-drawn balance shows in place of a negative figure.
   * Default `'Over entitlement'`.
   */
  overdrawnLabel?: string;
  /** Tap handler for the balance. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The default for {@link LeaveBalanceV4Props.overdrawnLabel} — what an
 * over-drawn balance says instead of a negative number.
 *
 * A balance that has gone past its entitlement is the one figure here a person
 * acts on, and "−2 days" is arithmetic rather than an answer: it reads as a
 * quantity of leave the employee has, spelled oddly. The remaining figure
 * becomes this word, and the meter is already full.
 */
const OVERDRAWN = 'Over entitlement';

/** A figure that is not a finite, non-negative number is not a balance. */
function days(value: number | undefined): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : 0;
}

/**
 * **V4 leave balance** — a new component. There is no base to extend, so the
 * props are plain `LeaveBalanceV4Props`.
 *
 * ## Why it exists
 *
 * `LeaveRequest` asks the employee for a number of `days` and there is no
 * entitlement context anywhere in the module — not on the request, not on the
 * approval card, not in the directory. So the one number the requester needs
 * before deciding whether to ask for a fortnight ("how much do I actually
 * have?") is the one number the module could not draw, and the one an approver
 * has to open another system to check.
 *
 * ## What it does that the rest of the module did not
 *
 * 1. **The meter is a real meter, and it is a sibling.** The group carries
 *    `accessibilityRole="progressbar"` with a value, so a reader is told
 *    "Taken, 13 days of 25" rather than handed four loose numerals — and it
 *    sits **beside** the card's activation rather than under it, because a
 *    `progressbar` inside a `Pressable` has its value flattened away.
 * 2. **An over-drawn balance is a word.** Taken can exceed the entitlement —
 *    unpaid days, an advance, a correction — and the honest rendering of that
 *    is not a negative number in a field labelled "Remaining". Remaining floors
 *    at zero and the overage says
 *    {@link LeaveBalanceV4Props.overdrawnLabel}.
 * 3. **Every figure is validated.** A negative or non-finite accrual is bad
 *    data rather than a small entitlement.
 * 4. **The leave type is identity.** Glyph, word, neutral chip, from the same
 *    table `LeaveRequestV4` reads — and deliberately no tone: `sick` is not
 *    `danger` and `parental` is not `success`.
 * 5. **Every visible string is a prop**, and the day count goes through
 *    `pluralizeCount` rather than an appended `'s'`. That now includes the
 *    overage word, which used to be the one English string in the file a
 *    caller could not reach.
 * 6. **A balance with nothing to name draws nothing.** With neither `type` nor
 *    `label`, this used to invent an English heading of its own — "Leave
 *    balance" — and meter an entitlement nobody had said the name of. It
 *    returns `null` instead, as the web twin already did.
 */
export function LeaveBalanceV4({
  type,
  label,
  accruedDays,
  takenDays,
  carryoverDays = 0,
  periodLabel,
  variant = 'default',
  formatDays,
  accruedLabel = 'Accrued',
  takenLabel = 'Taken',
  remainingLabel = 'Remaining',
  carryoverLabel = 'Carryover',
  overdrawnLabel = OVERDRAWN,
  onPress,
  testID,
  style,
}: LeaveBalanceV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const compact = variant === 'compact';
  const tap = minTap(tokens.spacing);
  const typeMeta = type ? LEAVE_TYPE_V4[type] : undefined;
  const heading = label ?? typeMeta?.label;

  // A balance with nothing to name is a meter measuring an unlabelled thing.
  if (!heading) return null;

  const accrued = days(accruedDays);
  const taken = days(takenDays);
  const carryover = days(carryoverDays);
  const entitlement = accrued + carryover;
  const overdrawn = taken > entitlement;
  const remaining = Math.max(0, entitlement - taken);
  const metered = Math.min(taken, entitlement);

  const fmt = formatDays ?? ((n: number) => pluralizeCount(n, 'day'));
  const remainingText = overdrawn ? overdrawnLabel : fmt(remaining);
  /*
    The meter reads how much of the entitlement is gone, which is the question
    a balance is asked; the remaining figure beside it is the same fact stated
    the other way round, in words.
  */
  const meterName = `${takenLabel}, ${fmt(metered)} of ${fmt(entitlement)}`;

  const figures: Array<{ key: string; label: string; value: string }> = [
    { key: 'accrued', label: accruedLabel, value: fmt(accrued) },
    { key: 'carryover', label: carryoverLabel, value: fmt(carryover) },
    { key: 'taken', label: takenLabel, value: fmt(taken) },
    { key: 'remaining', label: remainingLabel, value: remainingText },
  ];

  const spoken = spokenLine([heading, periodLabel, `${remainingLabel} ${remainingText}`]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        minHeight: tap,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1} style={{ flexShrink: 1 }}>
        {heading}
      </TextV4>
      {periodLabel ? (
        <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
          {periodLabel}
        </TextV4>
      ) : null}
    </View>
  );

  return (
    <CardV4
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
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
        {/* A kind, not a state — the same neutral chip the request card wears. */}
        {typeMeta ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={chipStyle(theme)}
          >
            <TextV4 size="xs" tone="onCard">
              {typeMeta.glyph}
            </TextV4>
            <TextV4 size="xs" weight="semibold" tone="onCard">
              {typeMeta.label}
            </TextV4>
          </View>
        ) : null}
      </View>

      {/* A meter, beside the activation rather than inside it — change 1. */}
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={meterName}
        accessibilityValue={{ min: 0, max: entitlement, now: metered }}
        style={{ gap: tokens.spacing.xs / 2 }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextV4 size="xs" tone="mutedText">
            {takenLabel}
          </TextV4>
          <TextV4 size="xs" weight="semibold" tone="onCard" numeric="tabular">
            {`${fmt(metered)} / ${fmt(entitlement)}`}
          </TextV4>
        </View>
        <ProgressV4
          value={metered}
          max={Math.max(entitlement, 1)}
          tone={overdrawn ? 'warn' : 'primary'}
          size="sm"
        />
      </View>

      {!compact ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }}>
          {figures.map((f) => (
            <View key={f.key} accessible accessibilityLabel={`${f.label}, ${f.value}`}>
              <TextV4 size="xs" tone="mutedText">
                {f.label}
              </TextV4>
              <TextV4
                size="sm"
                weight="semibold"
                numeric="tabular"
                style={{
                  color: f.key === 'remaining' && overdrawn ? colors.warnText : colors.onCard,
                }}
              >
                {f.value}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}
    </CardV4>
  );
}

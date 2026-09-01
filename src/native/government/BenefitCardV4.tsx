import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  isAdverse,
  labelledId,
  spokenLine,
  tintGround,
  tintInk,
  type ToneV4,
} from './internal/civic-v4';
import { formatMoney } from './internal/format';
import type { BenefitCardProps, BenefitStatus, BenefitType } from './BenefitCard';

export interface BenefitCardV4Props extends BenefitCardProps {
  /** Why the case was denied or suspended. Rendered when the status is adverse. */
  reason?: string;
  /** Override the seven programme words (`'Food assistance'`, `'Housing'`, …). */
  typeLabels?: Partial<Record<BenefitType, string>>;
  /** Override the six status words (`'Suspended'`, `'Expiring soon'`, …). */
  statusLabels?: Partial<Record<BenefitStatus, string>>;
  /** What the next-payment date is called. Default `'Next'`. */
  nextLabel?: string;
}

/** What the case number identifies. */
const CASE_LABEL = 'Case';

const TYPE_V4: Record<BenefitType, { label: string; glyph: string }> = {
  food: { label: 'Food assistance', glyph: '🥫' },
  unemployment: { label: 'Unemployment', glyph: '💼' },
  housing: { label: 'Housing', glyph: '🏘️' },
  medical: { label: 'Medical', glyph: '⚕️' },
  disability: { label: 'Disability', glyph: '♿' },
  family: { label: 'Family support', glyph: '👪' },
  other: { label: 'Benefit', glyph: '🤝' },
};

const STATUS_V4: Record<BenefitStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  expiring: { label: 'Expiring soon', glyph: '⚠️', tone: 'warn' },
  expired: { label: 'Expired', glyph: '✕', tone: 'neutral' },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
  suspended: { label: 'Suspended', glyph: '!', tone: 'danger' },
};

/**
 * **V4 benefit case card** — same props as {@link BenefitCard} plus `reason`,
 * `typeLabels`, `statusLabels` and `nextLabel`.
 *
 * ## Four changes
 *
 * 1. **A denied or suspended case says why.** The status that stops someone's
 *    food assistance was a pill with no field behind it — the card could say
 *    "Suspended" and nothing else, on the screen a claimant opens to find out
 *    what happened. `isAdverse()` gates the `reason`, which is an assertive
 *    live region.
 * 2. **The card's own controls are reachable.** The base wrapped the whole
 *    card in one `Pressable`, which is `accessible` by default and carries the
 *    card's name, so the status pill and the amount were flattened out of the
 *    tree. The activation now wraps only the glyph-and-text region; the pill
 *    sits beside it.
 * 3. **The case number is not glued to the programme name.** It was
 *    `` `${type} · ${caseNumber}` `` on one truncating line, so a long
 *    programme name took the number off the end of the card — and it was
 *    unlabelled, and it never reached the spoken name along with the next
 *    payment date.
 * 4. **The amount takes the contrast-corrected ink**, not the `primary` fill
 *    slot drawn as text; the programme disc stops wearing `primary` too,
 *    because which programme this is is identity rather than a state; and the
 *    press is a state layer rather than `opacity: 0.85`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function BenefitCardV4({
  name,
  benefitType,
  status = 'active',
  amountCents,
  cadence = '/mo',
  caseNumber,
  nextDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  reason,
  typeLabels,
  statusLabels,
  nextLabel = 'Next',
  onPress,
  style,
}: BenefitCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const bt = TYPE_V4[benefitType] ?? TYPE_V4.other;
  const typeWord = typeLabels?.[benefitType] ?? bt.label;
  const sd = STATUS_V4[status] ?? STATUS_V4.active;
  const statusWord = statusLabels?.[status] ?? sd.label;
  const adverse = isAdverse(status);
  const showReason = adverse && Boolean(reason);
  const idLine = labelledId(CASE_LABEL, caseNumber);
  const disc = tokens.spacing['2xl'];

  const amount = amountCents != null ? format(Math.max(0, Math.trunc(amountCents)), currency) : undefined;
  const nextLine = nextDate ? `${nextLabel}: ${nextDate}` : undefined;

  const spoken = spokenLine([
    name,
    typeWord,
    statusWord,
    idLine,
    amount != null ? `${amount}${cadence}` : null,
    nextLine,
    showReason ? reason : null,
  ]);

  const head = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.surface, colors.onSurface) : 'transparent',
      }}
    >
      <View
        style={{
          width: disc,
          height: disc,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tintGround(theme, IDENTITY_TONE),
        }}
      >
        {/* Decorative: the programme is written under the name. */}
        <IconV4 glyph={bt.glyph} size="xl" />
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="lg" weight="bold" tone="onSurface" numberOfLines={1}>
          {name}
        </TextV4>
        <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
          {typeWord}
        </TextV4>
        {idLine ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {idLine}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <CardV4 variant={CARD_V4} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spoken}
            onPress={onPress}
            style={{ flex: 1, minWidth: 0 }}
          >
            {({ pressed }) => head(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={spoken} style={{ flex: 1, minWidth: 0 }}>
            {head(false)}
          </View>
        )}
        <BadgeV4 tone={sd.tone} {...BADGE_V4}>
          {`${sd.glyph} ${statusWord}`}
        </BadgeV4>
      </View>

      {showReason ? (
        <TextV4
          size="sm"
          accessibilityLiveRegion="assertive"
          style={{ marginTop: tokens.spacing.sm, color: tintInk(theme, sd.tone) }}
        >
          {reason}
        </TextV4>
      ) : null}

      {amount != null || nextLine != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: tokens.spacing.sm,
          }}
        >
          {amount != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
              {/* `primaryText`, not `primary`: this is a numeral, and the fill
                  slot carries no contrast promise as text. */}
              <TextV4
                size="xl"
                weight="bold"
                numeric="tabular"
                style={{ color: tintInk(theme, 'primary') }}
              >
                {amount}
              </TextV4>
              <TextV4 size="xs" tone="mutedText">
                {cadence}
              </TextV4>
            </View>
          ) : (
            <View />
          )}
          {nextLine != null ? (
            <TextV4 size="xs" tone="mutedText">
              {nextLine}
            </TextV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}

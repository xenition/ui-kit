import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney } from '../../commerce/money';
import { isAdverse } from '../../insurance/coverage-v4';
import {
  DECORATIVE,
  POLICY_LINE_V4,
  POLICY_STATUS_V4,
  chipGround,
  metaLine,
  pillStyle,
  spokenLine,
  toneInk,
} from './internal/tone-v4';
import type { PolicyCardProps, PremiumCadence } from './PolicyCard';

/** The four captions a policy card draws over its figures. */
export interface PolicyCardV4Labels {
  /** Precedes the named insured. Default `'Insured'`. */
  insured?: string;
  /** Caption over the coverage figure. Default `'Coverage'`. */
  coverage?: string;
  /** Caption over the premium figure. Default `'Premium'`. */
  premium?: string;
  /** Precedes the renewal date. Default `'Renews'`. */
  renews?: string;
}

export interface PolicyCardV4Props extends PolicyCardProps {
  /**
   * Why the policy is in the state it is in — shown for `lapsed` and
   * `cancelled`, which the base rendered with no reason at all.
   */
  statusReason?: string;
  /** When the status took effect, already formatted by the caller. */
  statusDate?: string;
  /** Override the four English captions. */
  labels?: PolicyCardV4Labels;
}

const DEFAULT_LABELS: Required<PolicyCardV4Labels> = {
  insured: 'Insured',
  coverage: 'Coverage',
  premium: 'Premium',
  renews: 'Renews',
};

const CADENCE_SUFFIX: Record<PremiumCadence, string> = {
  monthly: '/mo',
  quarterly: '/qtr',
  annual: '/yr',
};

/**
 * **V4 policy card** — same props as {@link PolicyCard} plus `statusReason`,
 * `statusDate` and `labels` (`formatMoney` is already on the base).
 *
 * ## Six changes
 *
 * 1. **A lapsed policy says why, when, and that the coverage is not in
 *    force.** `lapsed` and `cancelled` had nowhere to put a reason, no date and
 *    no next step — and directly underneath, the card kept drawing the full
 *    coverage amount at full weight, in the same ink an active policy uses. A
 *    policyholder whose cover lapsed for non-payment saw a red pill and
 *    "$500,000.00". The reason and the date are props now, and on an adverse
 *    status the coverage figure is drawn muted with the status word beside its
 *    caption, so the number can no longer be read as money that is available.
 * 2. **The card announces its money.** The base named the whole `Pressable`
 *    `"Premier Auto, Auto policy, Active"` and then rendered the coverage, the
 *    premium and the renewal date as children of it. ARIA — and, on native, a
 *    `Pressable`'s default `accessible` flattening — replaces the contents with
 *    the name, so the card announced a status and no figures whatsoever. Every
 *    figure is folded into the spoken name.
 * 3. **The status pill is a sibling of the activation, not a descendant.**
 *    Wrapping the whole card meant the pill, the reason and the renewal line
 *    were all inside one leaf. The card is a plain `CardV4` now; the press
 *    wraps the glyph-and-title region only.
 * 4. **Press is a state layer.** `opacity: pressed ? 0.85 : 1` dimmed the
 *    card's own content, which is the signal M3 spends on *disabled*.
 * 5. **A negative coverage is shown.** `Math.max(0, …)` printed `$0.00` for
 *    `coverageCents={-1}`, indistinguishable from a policy with no benefit.
 * 6. **Ink stops being fill.** `colors.muted` drew every caption and
 *    `colors.primary` drew the premium — both are fill slots with no contrast
 *    promise as text; a rendered audit measured `primary` as low as 1.32:1.
 *    They are `mutedText` and `primaryText` now, and the leading disc's
 *    `withAlpha(primary, 0.12)` is an opaque composite instead of a wash that
 *    changed colour with whatever was behind the card.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function PolicyCardV4({
  variant,
  name,
  policyNumber,
  coverageCents,
  premiumCents,
  cadence = 'monthly',
  status = 'active',
  holder,
  renewalDate,
  currency = 'USD',
  statusReason,
  statusDate,
  labels,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: PolicyCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const copy = { ...DEFAULT_LABELS, ...labels };
  const line = POLICY_LINE_V4[variant] ?? POLICY_LINE_V4.auto;
  const meta = POLICY_STATUS_V4[status] ?? POLICY_STATUS_V4.active;
  const adverse = isAdverse(status);
  const disc = minTap(tokens.spacing);

  const coverage = format(Math.trunc(Number.isFinite(coverageCents) ? coverageCents : 0), currency);
  const premium =
    typeof premiumCents === 'number' && Number.isFinite(premiumCents)
      ? format(Math.trunc(premiumCents), currency)
      : null;

  const spoken = spokenLine([
    name,
    line.label,
    policyNumber,
    meta.label,
    adverse ? statusReason : null,
    adverse ? statusDate : null,
    `${copy.coverage} ${coverage}`,
    premium ? `${copy.premium} ${premium}${CADENCE_SUFFIX[cadence]}` : null,
    holder ? `${copy.insured} ${holder}` : null,
    renewalDate ? `${copy.renews} ${renewalDate}` : null,
  ]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        minHeight: disc,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <View
        {...DECORATIVE}
        style={{
          width: disc,
          height: disc,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: chipGround(theme),
        }}
      >
        <TextV4 size="xl" tone="onCard">
          {line.glyph}
        </TextV4>
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="lg" weight="bold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
          {metaLine([line.label, policyNumber])}
        </TextV4>
      </View>
    </View>
  );

  return (
    <CardV4 variant="elevated" style={[{ gap: tokens.spacing.md }, style]}>
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
        {/* Beside the activation, never inside it — and hidden from the
            reader, because the card's one spoken name already carries the
            status word and hearing "Lapsed" twice is worse than once. */}
        <View {...DECORATIVE} style={pillStyle(theme, meta.tone)}>
          <TextV4 size="xs" style={{ color: toneInk(theme, meta.tone) }}>
            {meta.glyph}
          </TextV4>
          <TextV4 size="xs" weight="semibold" style={{ color: toneInk(theme, meta.tone) }}>
            {meta.label}
          </TextV4>
        </View>
      </View>

      {/* An adverse status owes the reader a reason and a date — change 1. */}
      {adverse && (statusReason || statusDate) ? (
        <View {...DECORATIVE} style={{ gap: tokens.spacing.xs / 2 }}>
          {statusReason ? (
            <TextV4 size="sm" weight="semibold" style={{ color: toneInk(theme, meta.tone) }}>
              {statusReason}
            </TextV4>
          ) : null}
          {statusDate ? (
            <TextV4 size="xs" tone="mutedText">
              {statusDate}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      {holder ? (
        <TextV4 {...DECORATIVE} size="xs" tone="mutedText" numberOfLines={1}>
          {`${copy.insured}: ${holder}`}
        </TextV4>
      ) : null}

      <View
        {...DECORATIVE}
        style={{
          paddingTop: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="xs" tone="mutedText">
            {adverse ? metaLine([copy.coverage, meta.label]) : copy.coverage}
          </TextV4>
          {/* Muted on an adverse status: this is not money that is available. */}
          <TextV4
            size="xl"
            weight="bold"
            tone={adverse ? 'mutedText' : 'onCard'}
            numeric="tabular"
          >
            {coverage}
          </TextV4>
        </View>
        {premium ? (
          <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
            <TextV4 size="xs" tone="mutedText">
              {copy.premium}
            </TextV4>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
              <TextV4
                size="base"
                weight="bold"
                tone={adverse ? 'mutedText' : 'primaryText'}
                numeric="tabular"
              >
                {premium}
              </TextV4>
              <TextV4 size="xs" tone="mutedText">
                {CADENCE_SUFFIX[cadence]}
              </TextV4>
            </View>
          </View>
        ) : null}
      </View>

      {renewalDate ? (
        <TextV4 {...DECORATIVE} size="xs" tone="mutedText">
          {`${copy.renews} ${renewalDate}`}
        </TextV4>
      ) : null}
    </CardV4>
  );
}

import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { isAdverse } from '../../jobs/hiring-v4';
import { formatShortDate } from './format';
import type { Salary } from './types';
import { cardSurfaceStyle, salaryText, spokenName, type ToneV4 } from './internal/tone-v4';

/** Where an offer stands. `ApplicationStage` ends at `hired` and says nothing about this. */
export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'expired';

/** An offer of employment. */
export interface OfferV4 {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string;
  /** What is being offered. */
  salary?: Salary;
  /** When the role starts (ISO-8601). */
  startsAt?: string;
  /** When the offer lapses (ISO-8601). */
  respondBy?: string;
  /** Default `'pending'`. */
  status?: OfferStatus;
}

export interface OfferCardV4Props {
  /** The offer to render. */
  offer: OfferV4;
  /** Fired when the card body is pressed (open the full offer). */
  onPress?: (offer: OfferV4) => void;
  /** Fired when the offer is accepted. */
  onAccept?: (offer: OfferV4) => void;
  /** Fired when the offer is declined. */
  onDecline?: (offer: OfferV4) => void;
  /** Copy on the accept action. Default `'Accept offer'`. */
  acceptLabel?: string;
  /** Copy on the decline action. Default `'Decline'`. */
  declineLabel?: string;
  /** Caption on the start date. Default `'Starts'`. */
  startLabel?: string;
  /** Caption on the response deadline. Default `'Respond by'`. */
  deadlineLabel?: string;
  /** Re-word the statuses. Defaults Pending / Accepted / Declined / Expired. */
  statusLabels?: Partial<Record<OfferStatus, string>>;
  /** Render a date. Default a localized short date, e.g. `'Jun 15'`. */
  formatDate?: (iso: string) => string;
  /** Render one salary bound. Default the module's compact money formatter. */
  formatMoney?: (amount: number, currency?: string) => string;
  /** Cadence suffixes. Default `/yr`, `/hr`, `/mo`. */
  periodLabels?: { year?: string; hour?: string; month?: string };
  style?: StyleProp<ViewStyle>;
}

/** Status → its default word. Never carried by hue alone. */
const STATUS_LABEL: Record<OfferStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  declined: 'Declined',
  expired: 'Expired',
};

/**
 * **V4 offer card** — a new component. There is no base to extend, so the
 * props are plain `OfferCardV4Props`.
 *
 * ## Why it exists
 *
 * `ApplicationStage` ends at `'offer' | 'hired'` and **nothing in the module
 * renders an offer.** The decision screen of the whole funnel — the pay being
 * offered, the start date, the date the offer lapses, and the two buttons that
 * end the process one way or the other — had no component, so an app either
 * built it by hand or dropped the applicant onto a `StatusPipeline` reading
 * "Stage 4 of 5" with nothing to act on.
 *
 * ## What it takes from the pass
 *
 * - **The sibling rule.** Accept and Decline are siblings of the card's
 *   activation, never children of it. This is the one card in the module where
 *   getting that wrong is unrecoverable: on native the outer `Pressable` would
 *   flatten both buttons out of existence for a screen-reader user, and on web
 *   Enter on Accept would fire the card instead — which is not "the wrong
 *   navigation", it is a life decision made by a keyboard user who could not
 *   reach the control.
 * - **The salary goes through `salaryParts`.** An offer with a broken band
 *   says so rather than printing `From $NaN/yr` at the moment it matters most.
 * - **The deadline is a fact, not a colour.** An expired offer is `danger`
 *   *and* the word "Expired"; the countdown itself is plain text, because
 *   colouring a date orange as it approaches is the kind of urgency the reader
 *   cannot hear.
 * - **Nothing is decided twice.** The two buttons appear only while the offer
 *   is `pending`; a decided offer states its outcome instead of offering a
 *   choice that no longer exists.
 *
 * **Renders nothing without a job title** (§4.5).
 */
export function OfferCardV4({
  offer,
  onPress,
  onAccept,
  onDecline,
  acceptLabel = 'Accept offer',
  declineLabel = 'Decline',
  startLabel = 'Starts',
  deadlineLabel = 'Respond by',
  statusLabels,
  formatDate,
  formatMoney,
  periodLabels,
  style,
}: OfferCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!offer?.jobTitle) return null;

  const status: OfferStatus = offer.status ?? 'pending';
  const statusWord = statusLabels?.[status] ?? STATUS_LABEL[status];
  // The shared predicate, not a second list of bad words: `declined` and
  // `expired` are adverse everywhere in the module or they are adverse nowhere.
  const statusTone: ToneV4 = isAdverse(status)
    ? 'danger'
    : status === 'accepted'
      ? 'success'
      : 'primary';
  const date = formatDate ?? formatShortDate;

  const pay = salaryText(offer.salary, { formatMoney, periodLabels });
  const starts = offer.startsAt ? date(offer.startsAt) : '';
  const deadline = offer.respondBy ? date(offer.respondBy) : '';

  const facts: Array<[string, string]> = [];
  if (starts) facts.push([startLabel, starts]);
  if (deadline) facts.push([deadlineLabel, deadline]);

  const name = spokenName([
    offer.jobTitle,
    offer.companyName,
    statusWord,
    pay.text,
    ...facts.map(([caption, value]) => `${caption} ${value}`),
  ]);

  // A decision that has been made is not offered again.
  const decidable = status === 'pending' && (onAccept != null || onDecline != null);
  const tap = minTap(tokens.spacing);

  const body = (
    <>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
        <AvatarV4 src={offer.companyLogoUrl} name={offer.companyName} size="lg" />
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          <TextV4 size="lg" weight="semibold" tone="onCard" numberOfLines={2}>
            {offer.jobTitle}
          </TextV4>
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {offer.companyName}
          </TextV4>
        </View>
        <BadgeV4 tone={statusTone} variant="soft" size="sm">
          {statusWord}
        </BadgeV4>
      </View>

      <TextV4 size="xl" weight="bold" tone={pay.text ? 'onCard' : 'mutedText'} numeric="tabular">
        {pay.text ?? (pay.broken ? 'Salary range unavailable' : 'Salary not disclosed')}
      </TextV4>

      {facts.length > 0 ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.lg, flexWrap: 'wrap' }}>
          {facts.map(([caption, value]) => (
            <View key={caption} style={{ gap: tokens.spacing.xs }}>
              <TextV4 size="xs" tone="mutedText">
                {caption}
              </TextV4>
              <TextV4 size="sm" weight="semibold" tone="onCard" numeric="tabular">
                {value}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}
    </>
  );

  return (
    <View style={[cardSurfaceStyle(theme), style]}>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={() => onPress(offer)}
          style={({ pressed }) => ({
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
          })}
        >
          {body}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name} style={{ gap: tokens.spacing.md }}>
          {body}
        </View>
      )}

      {/* Siblings of the activation — see the docblock. */}
      {decidable ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onDecline ? (
            <ButtonV4
              variant="outline"
              tone="danger"
              size="md"
              onPress={() => onDecline(offer)}
              accessibilityLabel={spokenName([declineLabel, offer.jobTitle, offer.companyName])}
              style={{ flex: 1, minHeight: tap }}
            >
              {declineLabel}
            </ButtonV4>
          ) : null}
          {onAccept ? (
            <ButtonV4
              variant="primary"
              size="md"
              onPress={() => onAccept(offer)}
              accessibilityLabel={spokenName([acceptLabel, offer.jobTitle, offer.companyName])}
              style={{ flex: 1, minHeight: tap }}
            >
              {acceptLabel}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { formatTimeInTz } from '../../booking/datetime';
import type { BookingSummaryProps } from './BookingSummary';

/** The row labels, all overridable — the base hard-coded five English words. */
export interface BookingSummaryLabels {
  resource?: string;
  date?: string;
  time?: string;
  duration?: string;
  timezone?: string;
  price?: string;
  /** Shown when neither a resource nor a slot has been chosen. */
  empty?: string;
}

export interface BookingSummaryV4Props extends BookingSummaryProps {
  /**
   * What the booking costs, already formatted (e.g. `'$48.00'`).
   *
   * The base listed who, when and how long, and never what it costs — which is
   * the line a confirmation screen exists to show, and the one a user checks
   * before pressing the button underneath it. Pre-formatted, not cents: the
   * currency and its rounding are the host's decision, and a component that
   * formats money itself will eventually disagree with the invoice.
   */
  price?: string;
  /** A caption under the price — `'Charged at the appointment'`, a tax note. */
  priceNote?: string;
  /** Override any row label. */
  labels?: BookingSummaryLabels;
  /** Render the duration. Default `(min) => `${min} min``. */
  formatDuration?: (minutes: number) => string;
}

const DEFAULT_LABELS: Required<Omit<BookingSummaryLabels, 'empty'>> & { empty: string } = {
  resource: 'With',
  date: 'Date',
  time: 'Time',
  duration: 'Duration',
  timezone: 'Timezone',
  price: 'Total',
  empty: 'Nothing selected yet.',
};

/**
 * A long date, in the booking's timezone. Kept identical to the base's default
 * so a caller that never passes `formatDate` sees no change.
 */
function defaultFormatDate(iso: string, timeZone?: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * **V4 booking summary** — same props as {@link BookingSummary} plus `price`,
 * `priceNote`, `labels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **It can show the price.** See `price`. It is the last row, separated by
 *    a hairline and set a step up in the display face, because a total is the
 *    figure the eye goes to and the base had no way to say it at all.
 * 2. **Every label is a prop.** `With` / `Date` / `Time` / `Duration` /
 *    `Timezone` / `Nothing selected yet.` were English constants inside the
 *    component, unreachable from a host that localizes.
 * 3. **The rows are `TextV4`, and the labels take `mutedText`.** The base
 *    hand-wrote `color: colors.muted` with a literal font size on a raw
 *    `<Text>`, which is both the wrong token and the wrong layer.
 * 4. **The card is `CardV4`'s raised ground.** A summary sits on top of a
 *    booking flow, and on a dark page the base's `surface` ground made it
 *    disappear into the page with only its border to separate it.
 *
 * The empty state — no resource, no slot — is a message, not a bordered blank.
 */
export function BookingSummaryV4({
  resource,
  slot,
  timeZone,
  formatDate,
  formatTime,
  formatDuration,
  action,
  title = 'Your booking',
  price,
  priceNote,
  labels,
  style,
}: BookingSummaryV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const tz = timeZone ?? resource?.timezone;
  const fmtDate = formatDate ?? ((iso: string) => defaultFormatDate(iso, tz));
  const fmtTime = formatTime ?? ((iso: string) => formatTimeInTz(iso, tz));
  const fmtDuration = formatDuration ?? ((minutes: number) => `${minutes} min`);
  const copy = { ...DEFAULT_LABELS, ...labels };

  const line = (label: string, value: React.ReactNode, key: string): React.ReactElement => (
    <View
      key={key}
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: tokens.spacing.md,
      }}
    >
      <TextV4 size="sm" tone="mutedText">
        {label}
      </TextV4>
      <TextV4 size="sm" tone="onCard" align="right" style={{ flexShrink: 1 }}>
        {value}
      </TextV4>
    </View>
  );

  return (
    <CardV4 style={[{ gap: tokens.spacing.md }, style]}>
      {title ? (
        <TextV4 accessibilityRole="header" size="base" weight="semibold" tone="onCard">
          {title}
        </TextV4>
      ) : null}

      <View style={{ gap: tokens.spacing.sm }}>
        {resource ? line(copy.resource, resource.name, 'resource') : null}
        {slot ? line(copy.date, fmtDate(slot.startsAt), 'date') : null}
        {slot
          ? line(copy.time, `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`, 'time')
          : null}
        {resource?.slotMinutes
          ? line(copy.duration, fmtDuration(resource.slotMinutes), 'duration')
          : null}
        {tz ? line(copy.timezone, tz, 'tz') : null}
        {!slot && !resource ? (
          <TextV4 size="sm" tone="mutedText">
            {copy.empty}
          </TextV4>
        ) : null}
      </View>

      {price ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingTop: tokens.spacing.md,
            gap: tokens.spacing.xs,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: tokens.spacing.md,
            }}
          >
            <TextV4 size="base" weight="semibold" tone="onCard">
              {copy.price}
            </TextV4>
            <TextV4 face="heading" size="lg" weight="bold" tone="onCard" numeric="tabular">
              {price}
            </TextV4>
          </View>
          {priceNote ? (
            <TextV4 size="xs" tone="mutedText" align="right">
              {priceNote}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      {action ? <View>{action}</View> : null}
    </CardV4>
  );
}

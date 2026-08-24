import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatTimeInTz } from '../../booking/datetime';
import type { BookingSummaryProps } from './BookingSummary';

/** Drop-in alternate of {@link BookingSummaryProps} — identical prop contract. */
export type BookingSummaryV3Props = BookingSummaryProps;

const defaultFormatDate = (iso: string, timeZone?: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
};

/**
 * BookingSummary — design variant **V3**: **minimal, headline-first**. Where V1
 * is a bordered card of evenly-weighted label/value rows, V3 drops the chrome
 * and leads with the appointment itself — a large date over a bold time range —
 * then trails the supporting facts (resource · duration · timezone) as a single
 * muted, dot-separated line. No border, no fill: separation comes from type
 * scale and spacing alone. Same
 * `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/`action`/`title`
 * contract as {@link BookingSummaryProps}. Token-only.
 */
export function BookingSummaryV3({
  resource,
  slot,
  timeZone,
  formatDate,
  formatTime,
  action,
  title = 'Your booking',
  style,
}: BookingSummaryV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const tz = timeZone ?? resource?.timezone;
  const fmtDate = formatDate ?? ((iso: string) => defaultFormatDate(iso, tz));
  const fmtTime = formatTime ?? ((iso: string) => formatTimeInTz(iso, tz));

  const facts = [resource?.name, resource?.slotMinutes ? `${resource.slotMinutes} min` : null, tz].filter(
    (v): v is string => Boolean(v)
  );

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <Text
        accessibilityRole="header"
        style={{
          color: colors.muted,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '700',
          letterSpacing: 0.6,
        }}
      >
        {typeof title === 'string' ? title.toUpperCase() : title}
      </Text>

      {slot ? (
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600' }}>
            {fmtDate(slot.startsAt)}
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
            {`${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`}
          </Text>
        </View>
      ) : null}

      {facts.length > 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {facts.join('  ·  ')}
        </Text>
      ) : null}

      {!slot && facts.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          Nothing selected yet.
        </Text>
      ) : null}

      {action ? <View style={{ marginTop: tokens.spacing.xs }}>{action}</View> : null}
    </View>
  );
}

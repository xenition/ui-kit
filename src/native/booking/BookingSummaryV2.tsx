import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatTimeInTz } from '../../booking/datetime';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { BookingSummaryProps } from './BookingSummary';

/** Drop-in alternate of {@link BookingSummaryProps} — identical prop contract. */
export type BookingSummaryV2Props = BookingSummaryProps;

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
 * BookingSummary — design variant **V2**: an **elevated, receipt-style card**
 * with a highlighted appointment band. Where V1 is a flat bordered card of
 * label/value rows, V2 floats on a shadow with a dashed rule separating the
 * meta rows (With / Duration / Timezone) from a primary-tinted "band" that
 * frames the chosen date and time range like the total on a receipt — the one
 * line the eye should land on. Same
 * `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/`action`/`title`
 * contract as {@link BookingSummaryProps}. Token-only.
 */
export function BookingSummaryV2({
  resource,
  slot,
  timeZone,
  formatDate,
  formatTime,
  action,
  title = 'Your booking',
  style,
}: BookingSummaryV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });

  const tz = timeZone ?? resource?.timezone;
  const fmtDate = formatDate ?? ((iso: string) => defaultFormatDate(iso, tz));
  const fmtTime = formatTime ?? ((iso: string) => formatTimeInTz(iso, tz));

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
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      <Text
        style={{
          flexShrink: 1,
          textAlign: 'right',
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '500',
        }}
      >
        {value}
      </Text>
    </View>
  );

  const metaRows = [
    resource ? line('With', resource.name, 'resource') : null,
    resource?.slotMinutes ? line('Duration', `${resource.slotMinutes} min`, 'duration') : null,
    tz ? line('Timezone', tz, 'tz') : null,
  ].filter(Boolean);

  return (
    <Animated.View
      style={[
        { opacity: enter.opacity, transform: enter.transform },
        {
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 0,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      <Text
        accessibilityRole="header"
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '700',
        }}
      >
        {title}
      </Text>

      {metaRows.length > 0 ? <View style={{ gap: tokens.spacing.sm }}>{metaRows}</View> : null}

      {/* Dashed receipt rule between the meta rows and the headline band. */}
      {metaRows.length > 0 && slot ? (
        <View style={{ borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.border }} />
      ) : null}

      {slot ? (
        <View
          style={{
            gap: 2,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, 0.08),
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.md,
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.5 }}>
            APPOINTMENT
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {fmtDate(slot.startsAt)}
          </Text>
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {`${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`}
          </Text>
        </View>
      ) : null}

      {!slot && !resource ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          Nothing selected yet.
        </Text>
      ) : null}

      {action ? <View>{action}</View> : null}
    </Animated.View>
  );
}

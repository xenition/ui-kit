import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { journeyBorder, journeyGradient, journeyInk, journeyInkSoft, journeyTile } from './internal/journey';

/** Flight lifecycle state — drives the banner tint, glyph and pill tone. */
export type FlightStatus = 'on-time' | 'boarding' | 'delayed' | 'cancelled' | 'landed';

export interface FlightStatusBannerProps {
  /** Flight lifecycle state — colors the banner via semantic tokens (never color alone). */
  status: FlightStatus;
  /** Flight number / identifier (e.g. "XN 482"). */
  flightNumber: string;
  /** Departure gate (shown as a small field when set). */
  gate?: string;
  /** Assigned seat (shown as a small field when set). */
  seat?: string;
  /** Localized boarding time string (shown as a small field when set). */
  boardingTime?: string;
  /** Longer status remark (e.g. "New departure 4:15 PM"). */
  remark?: string;
  style?: StyleProp<ViewStyle>;
}

interface StatusMeta {
  /** Human-readable status label. */
  label: string;
  /** Leading status glyph. */
  glyph: string;
  /** Semantic `Badge`/tint tone for this status. */
  tone: Extract<BadgeTone, 'success' | 'warn' | 'danger' | 'primary'>;
  /** When true the banner rides the brand gradient (the boarding "peak" moment). */
  peak?: boolean;
}

const STATUS: Record<FlightStatus, StatusMeta> = {
  'on-time': { label: 'On time', glyph: '✓', tone: 'success' },
  boarding: { label: 'Boarding', glyph: '🛫', tone: 'primary', peak: true },
  delayed: { label: 'Delayed', glyph: '⏳', tone: 'warn' },
  cancelled: { label: 'Cancelled', glyph: '⛔', tone: 'danger' },
  landed: { label: 'Landed', glyph: '🛬', tone: 'success' },
};

/**
 * FlightStatusBanner — a **V4** "journey" status strip. Announces where a flight
 * is in its lifecycle: on-time / landed read as a success tint, delayed as warn,
 * cancelled as danger, and boarding rides the brand gradient (the boarding "peak"
 * moment) in near-white ink. Severity is always carried by **glyph + label + a
 * tint that traces to a semantic token slot**, never color alone; the state is
 * pilled with a `Badge`. Gate / seat / boarding surface as small fields.
 * Token-only colors via `useXenitionTheme()`; dark-mode safe.
 */
export function FlightStatusBanner({
  status,
  flightNumber,
  gate,
  seat,
  boardingTime,
  remark,
  style,
}: FlightStatusBannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const meta = STATUS[status];
  const peak = meta.peak === true;
  const tint = colors[meta.tone];

  const fields: Array<{ label: string; value: string }> = [
    gate ? { label: 'Gate', value: gate } : null,
    seat ? { label: 'Seat', value: seat } : null,
    boardingTime ? { label: 'Boarding', value: boardingTime } : null,
  ].filter((f): f is { label: string; value: string } => f != null);

  const Field = ({ label, value }: { label: string; value: string }) => (
    <View
      style={{
        gap: 2,
        minWidth: 64,
        flexGrow: 1,
        flexBasis: 0,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: peak ? journeyBorder(r) : colors.border,
        backgroundColor: peak ? journeyTile(r) : colors.surface,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.xs,
      }}
    >
      <Text style={{ color: peak ? journeyInkSoft(r) : colors.muted, fontSize: tokens.typography.scale.xs }}>
        {label}
      </Text>
      <Text style={{ color: peak ? journeyInk(r) : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
        {value}
      </Text>
    </View>
  );

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {meta.glyph}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: peak ? journeyInk(r) : colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {meta.label}
          </Text>
          <Text style={{ color: peak ? journeyInkSoft(r) : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {flightNumber}
          </Text>
          {remark != null ? (
            <Text style={{ marginTop: 2, color: peak ? journeyInkSoft(r) : colors.onSurface, fontSize: tokens.typography.scale.sm }}>
              {remark}
            </Text>
          ) : null}
        </View>
      </View>
      {peak ? (
        <View
          style={{
            borderRadius: tokens.radius.full,
            backgroundColor: journeyTile(r),
            borderWidth: 1,
            borderColor: journeyBorder(r),
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {meta.label}
          </Text>
        </View>
      ) : (
        <Badge tone={meta.tone} variant="soft" dot>
          {meta.label}
        </Badge>
      )}
    </View>
  );

  const inner = (
    <>
      {header}
      {fields.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {fields.map((f) => (
            <Field key={f.label} label={f.label} value={f.value} />
          ))}
        </View>
      ) : null}
    </>
  );

  if (peak) {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={`Flight ${flightNumber} ${meta.label}${remark != null ? `, ${remark}` : ''}`}
        style={[{ borderRadius: tokens.radius.lg }, style]}
      >
        <GradientSurface
          colors={journeyGradient(r)}
          style={{ borderRadius: tokens.radius.lg, overflow: 'hidden', padding: tokens.spacing.lg, gap: tokens.spacing.md }}
        >
          {inner}
        </GradientSurface>
      </View>
    );
  }

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Flight ${flightNumber} ${meta.label}${remark != null ? `, ${remark}` : ''}`}
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: withAlpha(tint, 0.4),
          backgroundColor: withAlpha(tint, 0.1),
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      {inner}
    </View>
  );
}

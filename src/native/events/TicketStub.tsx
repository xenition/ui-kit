import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';

/** Emphasis of a {@link TicketStub}. */
export type TicketStubVariant = 'default' | 'compact';

export interface TicketStubField {
  /** Small uppercase caption, e.g. `SECTION`. */
  label: string;
  /** The value, e.g. `A`. */
  value: string;
}

export interface TicketStubProps {
  /** Event name printed across the top of the stub. */
  eventTitle: string;
  /** Ticket holder name. */
  holderName?: string;
  /** Pre-formatted date/time line. */
  dateLabel?: string;
  /** Structured fields rendered in a row (section / row / seat / gate …). */
  fields?: TicketStubField[];
  /**
   * The ticket identifier. Its characters deterministically seed the widths of
   * the placeholder "barcode" bars — this ships NO scan/barcode dependency, it
   * is a purely visual token-drawn placeholder.
   */
  code: string;
  /** Short status/tier tag, e.g. `VIP`. */
  tier?: string;
  /** Density. `compact` hides the field row. */
  variant?: TicketStubVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tear-off ticket stub. The lower band is a placeholder "barcode" — a row of
 * vertical bars whose widths are derived deterministically from the ticket
 * `code` characters and drawn purely from theme tokens (`onSurface` / `muted`).
 * There is no barcode or scanning dependency; this is a visual stand-in only.
 * All colors come from the compiled theme tokens — no literal colors.
 */
export function TicketStub({
  eventTitle,
  holderName,
  dateLabel,
  fields = [],
  code,
  tier,
  variant = 'default',
  style,
}: TicketStubProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Deterministic bar widths from the code characters (guarded, token-colored).
  const chars = code.length > 0 ? code.split('') : ['0'];
  const bars = Array.from({ length: 28 }, (_, i) => {
    const ch = chars[i % chars.length] ?? '0';
    const magnitude = (ch.charCodeAt(0) % 3) + 1; // 1..3
    const dark = ch.charCodeAt(0) % 2 === 0;
    return { width: magnitude, dark };
  });

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`Ticket for ${eventTitle}, code ${code}`}
      style={[
        {
          overflow: 'hidden',
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={2}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {eventTitle}
          </Text>
          {tier ? <Badge tone="primary">{tier}</Badge> : null}
        </View>
        {holderName ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{holderName}</Text>
        ) : null}
        {dateLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{dateLabel}</Text>
        ) : null}

        {variant !== 'compact' && fields.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg, marginTop: tokens.spacing.xs }}>
            {fields.map((f, i) => (
              <View key={`${f.label}-${i}`} style={{ gap: 2 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 1 }}>
                  {f.label.toUpperCase()}
                </Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                  {f.value}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {/* Perforation-style divider + placeholder barcode band. */}
      <View style={{ height: 1, backgroundColor: colors.border }} />
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 2,
          height: tokens.spacing['2xl'],
          paddingVertical: tokens.spacing.sm,
          backgroundColor: tokens.ramps.neutral[50],
        }}
      >
        {bars.map((b, i) => (
          <View
            key={i}
            style={{
              width: b.width,
              height: '100%',
              backgroundColor: b.dark ? colors.onSurface : colors.muted,
            }}
          />
        ))}
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: colors.muted,
          fontSize: tokens.typography.scale.xs,
          letterSpacing: 2,
          paddingBottom: tokens.spacing.sm,
        }}
      >
        {code}
      </Text>
    </View>
  );
}

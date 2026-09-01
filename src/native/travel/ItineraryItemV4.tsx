import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge } from '../primitives';
import type { BadgeTone } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk } from './internal/journey';
import type { ItineraryItemProps, ItineraryKind, ItineraryStatus } from './ItineraryItem';

/** Drop-in for {@link ItineraryItemProps} — same props, the V4 "journey" design. */
export type ItineraryItemV4Props = ItineraryItemProps;

const KIND_GLYPH: Record<ItineraryKind, string> = {
  flight: '✈',
  hotel: '🏨',
  activity: '🎟',
  transfer: '🚕',
  meal: '🍽',
};

/** Status → pill copy, glyph and Badge tone (announced, never color-alone). */
const STATUS_PILL: Record<ItineraryStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  upcoming: { label: 'Upcoming', glyph: '○', tone: 'neutral' },
  active: { label: 'Now', glyph: '●', tone: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success' },
};

/**
 * ItineraryItem — **V4** "journey" design. One boarding-pass timeline row: the
 * kind glyph rides a small brand-gradient disc (the signature V4 touch) sitting
 * on a token connector rail, with the time, title and detail line beside it and
 * a status pill (`Badge`) — done→success, active→warn, upcoming→neutral. Same
 * props/behavior as {@link ItineraryItemProps}; token-only colors via
 * `useXenitionTheme()`. Set `showConnector={false}` on the final row.
 */
export function ItineraryItemV4({
  kind = 'activity',
  glyph,
  time,
  title,
  subtitle,
  status = 'upcoming',
  showConnector = true,
  onPress,
  style,
}: ItineraryItemV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const mark = glyph ?? KIND_GLYPH[kind];
  const pill = STATUS_PILL[status];

  const body = (
    <View style={[{ flexDirection: 'row', gap: tokens.spacing.md }, style]}>
      {/* Gradient kind-disc on a token connector rail */}
      <View style={{ alignItems: 'center', width: 32 }}>
        <GradientSurface
          colors={journeyDisc(r)}
          style={{
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.sm, color: journeyInk(r) }}>{mark}</Text>
        </GradientSurface>
        {showConnector ? (
          <View style={{ flex: 1, width: 2, marginTop: 2, backgroundColor: colors.border }} />
        ) : null}
      </View>

      <View style={{ flex: 1, paddingBottom: showConnector ? tokens.spacing.lg : 0, gap: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: tokens.spacing.sm }}>
          {time ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {time}
            </Text>
          ) : (
            <View />
          )}
          <Badge tone={pill.tone} variant="soft" size="sm">
            {`${pill.glyph} ${pill.label}`}
          </Badge>
        </View>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );

  const a11yLabel = `${title}${time ? `, ${time}` : ''}, ${status}`;

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={a11yLabel}>
        {body}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}

import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { OpenHouseBadgeProps, OpenHouseStatus } from './OpenHouseBadge';

/** Drop-in for {@link OpenHouseBadgeProps} — same props, the V4 "listing" design. */
export type OpenHouseBadgeV4Props = OpenHouseBadgeProps;

const STATUS: Record<OpenHouseStatus, { glyph: string; prefix: string }> = {
  upcoming: { glyph: '📅', prefix: 'Open house' },
  live: { glyph: '🟢', prefix: 'Open now' },
  ended: { glyph: '✓', prefix: 'Ended' },
};

/**
 * OpenHouseBadge — **V4** "listing" design. The editorial take on the
 * open-house indicator: a calendar glyph and the date/time window inside a
 * soft-primary tinted pill, promoting to a success-toned "open now" pill for the
 * live state. Same props/behavior as {@link OpenHouseBadgeProps}; still pure
 * presentation (strings in, no callbacks). The full window is announced as a
 * single phrase, and status is conveyed by icon + label, not color alone.
 * Token-only colors via `useXenitionTheme()` + `withAlpha`.
 */
export function OpenHouseBadgeV4({
  dateLabel,
  startTime,
  endTime,
  status = 'upcoming',
  style,
}: OpenHouseBadgeV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { glyph, prefix } = STATUS[status];
  const window = [startTime, endTime].filter(Boolean).join('–');
  const label = `${prefix} · ${dateLabel}${window ? ` ${window}` : ''}`;

  // ONE accent = primary; the live state promotes to the success token. Status
  // is carried by icon + label, tint only reinforces it.
  const accent = status === 'live' ? colors.success : status === 'ended' ? colors.onSurface : colors.primary;
  const tintAlpha = status === 'live' ? 0.15 : status === 'ended' ? 0.05 : 0.1;
  const borderAlpha = status === 'ended' ? 0.2 : 0.25;
  const textColor = status === 'ended' ? colors.muted : colors.onSurface;

  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          borderColor: withAlpha(accent, borderAlpha),
          backgroundColor: withAlpha(accent, tintAlpha),
        },
        style,
      ]}
    >
      <Text style={{ fontSize: tokens.typography.scale.sm }}>{glyph}</Text>
      <Text style={{ color: textColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{prefix}</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>·</Text>
      <Text style={{ color: textColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{dateLabel}</Text>
      {window ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{window}</Text>
      ) : null}
    </View>
  );
}

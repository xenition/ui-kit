import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';

export interface TimezoneRowProps {
  /** IANA timezone id, e.g. `America/New_York`. */
  timezone: string;
  /** Optional human label; falls back to the id with underscores replaced. */
  label?: string;
  /** Optional current-offset / abbreviation caption, e.g. `GMT-4 · EDT`. */
  offsetLabel?: string;
  /** Leading row title (default "Time zone"). */
  title?: string;
  /**
   * `row` (default) is a tappable settings row that defers to a host picker;
   * `inline` is a static, non-interactive display line.
   */
  variant?: 'row' | 'inline';
  /** Fires when the row is tapped (row variant). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function prettifyZone(id: string): string {
  const tail = id.split('/').slice(-1)[0] ?? id;
  return tail.replace(/_/g, ' ');
}

/**
 * A timezone display/select row for an event form. `row` renders a tappable
 * settings line (globe icon, title, current zone, chevron) that hands off to a
 * host-owned picker; `inline` is a static caption. No date math is done here —
 * offset text is passed in. Token colors only.
 */
export function TimezoneRow({
  timezone,
  label,
  offsetLabel,
  title = 'Time zone',
  variant = 'row',
  onPress,
  style,
}: TimezoneRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const zoneLabel = label ?? prettifyZone(timezone);

  if (variant === 'inline') {
    return (
      <View accessibilityRole="text" style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
        <Icon glyph="🌐" size="sm" color="muted" />
        <Text style={{ marginLeft: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {offsetLabel ? `${zoneLabel} · ${offsetLabel}` : zoneLabel}
        </Text>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${zoneLabel}${offsetLabel ? `, ${offsetLabel}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => [
        { flexDirection: 'row', alignItems: 'center', paddingVertical: tokens.spacing.sm, opacity: pressed ? 0.7 : 1 },
        style,
      ]}
    >
      <Icon glyph="🌐" size="sm" color="muted" />
      <Text style={{ marginLeft: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
        {title}
      </Text>
      <View style={{ flex: 1 }} />
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{zoneLabel}</Text>
        {offsetLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{offsetLabel}</Text>
        ) : null}
      </View>
      <Text style={{ marginLeft: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.base }}>›</Text>
    </Pressable>
  );
}

import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Switch, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { ScheduleRowProps } from './ScheduleRow';

/** Drop-in for {@link ScheduleRowProps} — same props, the V4 "ambient" design. */
export type ScheduleRowV4Props = ScheduleRowProps;

/**
 * ScheduleRow — **V4** "ambient" design. The control-panel take on a schedule
 * row: an **enabled schedule glows** — when on the row takes a soft
 * `primary`-tinted wash, a primary border, and a glowing clock disc; disabled
 * schedules stay calm and muted. The **time reads big and legible**, active
 * weekday pills carry a soft-`primary` tint, and the scene / action label sits
 * alongside. The enable state is carried by the {@link Switch}'s `checked` a11y
 * state (not color alone). Same props/behavior as {@link ScheduleRowProps};
 * token-only colors via `useXenitionTheme()`.
 */
export function ScheduleRowV4({
  label,
  time,
  days,
  icon = '⏰',
  enabled = false,
  onToggle,
  last = false,
  style,
}: ScheduleRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dayList = Array.isArray(days) ? days.filter((d) => d != null && d !== '') : [];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          padding: tokens.spacing.md,
          marginBottom: last ? 0 : tokens.spacing.sm,
          opacity: enabled ? 1 : 0.7,
          backgroundColor: enabled ? withAlpha(colors.primary, 0.08) : colors.card,
          borderColor: enabled ? withAlpha(colors.primary, 0.5) : colors.border,
          ...(enabled
            ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : {}),
        },
        style,
      ]}
    >
      {/* Glowing clock disc — the ambient signature. */}
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: enabled ? withAlpha(colors.primary, 0.16) : withAlpha(colors.onSurface, 0.05),
          borderWidth: 1,
          borderColor: enabled ? withAlpha(colors.primary, 0.4) : colors.border,
        }}
      >
        <Icon glyph={icon} color={enabled ? 'primary' : 'muted'} size="lg" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          {time != null ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
              {time}
            </Text>
          ) : null}
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {label}
          </Text>
        </View>
        {dayList.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
            {dayList.map((day, i) => (
              <Badge key={`${day}-${i}`} tone={enabled ? 'primary' : 'neutral'} variant="soft" size="sm">
                {day}
              </Badge>
            ))}
          </View>
        ) : null}
      </View>
      <Switch checked={enabled} onCheckedChange={onToggle} accessibilityLabel={`${label} schedule`} />
    </View>
  );
}

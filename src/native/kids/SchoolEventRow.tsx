import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import type { BadgeTone } from '../primitives';

export type SchoolEventType =
  | 'holiday'
  | 'exam'
  | 'meeting'
  | 'trip'
  | 'activity'
  | 'deadline'
  | 'other';

interface TypeMeta {
  glyph: string;
  label: string;
  tone: BadgeTone;
}

const TYPE_META: Record<SchoolEventType, TypeMeta> = {
  holiday: { glyph: '🏖️', label: 'Holiday', tone: 'success' },
  exam: { glyph: '📝', label: 'Exam', tone: 'danger' },
  meeting: { glyph: '👥', label: 'Meeting', tone: 'primary' },
  trip: { glyph: '🚌', label: 'Trip', tone: 'accent' },
  activity: { glyph: '⚽', label: 'Activity', tone: 'primary' },
  deadline: { glyph: '⏳', label: 'Deadline', tone: 'warn' },
  other: { glyph: '🏫', label: 'Event', tone: 'neutral' },
};

export interface SchoolEventRowProps {
  /** Event title, e.g. "Parent-teacher conference". */
  title: string;
  /** Event type; drives the icon + type chip. */
  type?: SchoolEventType;
  /** Date label, e.g. "Mon, Sep 4". */
  date?: string;
  /** Time label, e.g. "3:00 PM". */
  time?: string;
  /** Location, e.g. "Room 12". */
  location?: string;
  /** Which child this concerns. */
  childName?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A row for a school-calendar item: a type icon, title, a date/time/location
 * line, and a type chip. Pressable when `onPress` is set. Type is conveyed by
 * glyph + label + chip, not color alone. Token-only colors.
 */
export function SchoolEventRow({
  title,
  type = 'other',
  date,
  time,
  location,
  childName,
  onPress,
  style,
}: SchoolEventRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TYPE_META[type] ?? TYPE_META.other;

  const metaParts = [date, time, location].filter(Boolean) as string[];

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
        {meta.glyph}
      </Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
        {metaParts.length > 0 ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {metaParts.join(' · ')}
          </Text>
        ) : null}
        {childName ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            👶 {childName}
          </Text>
        ) : null}
      </View>
      <Badge tone={meta.tone} variant="soft" size="sm">
        {meta.label}
      </Badge>
    </View>
  );

  const a11y = `${meta.label}: ${title}${date ? `, ${date}` : ''}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}

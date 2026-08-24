import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { AvatarGroup } from '../primitives/AvatarGroup';
import { Icon } from '../primitives/Icon';

/** Emphasis of a {@link SessionCard}. */
export type SessionCardVariant = 'default' | 'highlight';

export interface SessionSpeaker {
  name: string;
  avatarUrl?: string;
}

export interface SessionCardProps {
  /** Session title. */
  title: string;
  /** Pre-formatted time range, e.g. `14:00 – 14:45`. */
  time?: string;
  /** Room / stage. */
  room?: string;
  /** Track label, rendered as a badge. */
  track?: string;
  /** Short abstract. */
  abstract?: string;
  /** Speakers, shown as an avatar cluster + names. */
  speakers?: SessionSpeaker[];
  /** Capacity, for a `seatsTaken / capacity` meter. */
  capacity?: number;
  /** Seats already taken. */
  seatsTaken?: number;
  /** Whether the session is bookmarked. */
  bookmarked?: boolean;
  /** Fires with the desired next bookmark state. */
  onBookmark?: (next: boolean) => void;
  /** Press handler for the card. */
  onPress?: () => void;
  /** `highlight` adds a primary rail for keynotes/featured sessions. */
  variant?: SessionCardVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A rich conference session card: track badge, title, time / room meta, an
 * abstract, a speaker cluster, an optional seat-capacity meter, and a bookmark
 * toggle. `highlight` adds a primary left rail for keynotes. The bookmark state
 * uses a filled/outline glyph plus `accessibilityState`. Colors come from the
 * compiled theme tokens; no literal colors.
 */
export function SessionCard({
  title,
  time,
  room,
  track,
  abstract,
  speakers = [],
  capacity,
  seatsTaken,
  bookmarked = false,
  onBookmark,
  onPress,
  variant = 'default',
  style,
}: SessionCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isHighlight = variant === 'highlight';

  const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
  const fillRatio = hasMeter ? Math.max(0, Math.min(1, (seatsTaken as number) / (capacity as number))) : 0;
  const isFull = hasMeter && (seatsTaken as number) >= (capacity as number);

  const speakerNames = speakers.map((s) => s.name).join(', ');
  const metaLine = [time, room].filter(Boolean).join(' · ');

  const content = (
    <View style={{ flexDirection: 'row' }}>
      {isHighlight ? <View style={{ width: 4, backgroundColor: colors.primary }} /> : null}
      <View style={{ flex: 1, gap: tokens.spacing.sm, padding: tokens.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            {track ? <Badge tone={isHighlight ? 'primary' : 'neutral'}>{track}</Badge> : null}
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{title}</Text>
            {metaLine ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{metaLine}</Text>
            ) : null}
          </View>
          {onBookmark ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: bookmarked }}
              accessibilityLabel={bookmarked ? 'Remove bookmark' : 'Bookmark session'}
              onPress={() => onBookmark(!bookmarked)}
              hitSlop={8}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: tokens.spacing.xs })}
            >
              <Icon glyph={bookmarked ? '★' : '☆'} size="lg" color={bookmarked ? 'accent' : 'muted'} />
            </Pressable>
          ) : null}
        </View>

        {abstract ? (
          <Text numberOfLines={3} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
            {abstract}
          </Text>
        ) : null}

        {speakers.length > 0 ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <AvatarGroup
              avatars={speakers.map((s) => ({ src: s.avatarUrl, name: s.name }))}
              size="sm"
              max={3}
            />
            <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {speakerNames}
            </Text>
          </View>
        ) : null}

        {hasMeter ? (
          <View style={{ gap: tokens.spacing.xs }}>
            <View style={{ height: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200], overflow: 'hidden' }}>
              <View style={{ width: `${Math.round(fillRatio * 100)}%`, height: '100%', backgroundColor: isFull ? colors.danger : colors.primary }} />
            </View>
            <Text style={{ color: isFull ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {isFull ? 'Session full' : `${seatsTaken} / ${capacity} seats taken`}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: isHighlight ? colors.primary : colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.95 : 1 }]}
      >
        {content}
      </Pressable>
    );
  }
  return <View style={containerStyle}>{content}</View>;
}

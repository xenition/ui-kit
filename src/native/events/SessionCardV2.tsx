import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { AvatarGroup } from '../primitives/AvatarGroup';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { SessionCardProps } from './SessionCard';

/**
 * Alternate design (V2) for {@link SessionCard}. Same props — a drop-in swap.
 *
 * A **timeline card**: a fixed left gutter renders the session time above a
 * node dot and a vertical connector, so a stack of these reads as an agenda
 * rail. The elevated body on the right keeps the track badge, title, room, an
 * abstract, a speaker cluster and the seat-capacity meter. `highlight` fills
 * the node and rail with the primary token. Token-pure.
 */
export type SessionCardV2Props = SessionCardProps;

export function SessionCardV2({
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
}: SessionCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const isHighlight = variant === 'highlight';

  const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
  const fillRatio = hasMeter ? Math.max(0, Math.min(1, (seatsTaken as number) / (capacity as number))) : 0;
  const isFull = hasMeter && (seatsTaken as number) >= (capacity as number);
  const speakerNames = speakers.map((s) => s.name).join(', ');
  const nodeColor = isHighlight ? colors.primary : colors.border;

  const content = (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
      {/* Timeline gutter: time, node dot, connector. */}
      <View style={{ width: 64, alignItems: 'center' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', textAlign: 'center' }}>
          {time ?? '—'}
        </Text>
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: tokens.radius.full,
            marginTop: tokens.spacing.sm,
            backgroundColor: isHighlight ? colors.primary : colors.surface,
            borderWidth: 2,
            borderColor: nodeColor,
          }}
        />
        <View style={{ flex: 1, width: 2, marginTop: tokens.spacing.xs, backgroundColor: colors.border }} />
      </View>

      {/* Elevated body. */}
      <View
        style={{
          flex: 1,
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: isHighlight ? withAlpha(colors.primary, 0.06) : colors.surface,
          ...shadow('sm', tokens),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            {track ? <Badge tone={isHighlight ? 'primary' : 'neutral'}>{track}</Badge> : null}
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{title}</Text>
            {room ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{room}</Text> : null}
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
          <Text numberOfLines={3} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{abstract}</Text>
        ) : null}

        {speakers.length > 0 ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <AvatarGroup avatars={speakers.map((s) => ({ src: s.avatarUrl, name: s.name }))} size="sm" max={3} />
            <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>{speakerNames}</Text>
          </View>
        ) : null}

        {hasMeter ? (
          <View style={{ gap: tokens.spacing.xs }}>
            <View style={{ height: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200], overflow: 'hidden' }}>
              <View style={{ width: `${Math.round(fillRatio * 100)}%`, height: '100%', backgroundColor: isFull ? colors.danger : colors.primary }} />
            </View>
            <Text style={{ color: isFull ? colors.dangerText : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {isFull ? 'Session full' : `${seatsTaken} / ${capacity} seats taken`}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  const containerStyle: StyleProp<ViewStyle> = [{ backgroundColor: 'transparent' }, style];

  if (onPress) {
    return (
      <Animated.View style={[containerStyle, { opacity: enter.opacity, transform: enter.transform }]}>
        <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.95 : 1 })}>
          {content}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[containerStyle, { opacity: enter.opacity, transform: enter.transform }]}>{content}</Animated.View>
  );
}

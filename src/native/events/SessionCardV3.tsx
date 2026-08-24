import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { AvatarGroup } from '../primitives/AvatarGroup';
import { Icon } from '../primitives/Icon';
import { useEnter } from '../primitives/internal/motion';
import type { SessionCardProps } from './SessionCard';

/**
 * Alternate design (V3) for {@link SessionCard}. Same props — a drop-in swap.
 *
 * A **dense schedule line**: the time leads a single compact row, then the
 * title with an inline track badge, a small speaker cluster, a terse
 * `taken/cap` seat count, and the bookmark star at the trailing edge — one or
 * two lines total, no abstract, no meter bar. Sized for a packed agenda list;
 * `highlight` adds a thin primary left rail. Token-pure.
 */
export type SessionCardV3Props = SessionCardProps;

export function SessionCardV3({
  title,
  time,
  room,
  track,
  speakers = [],
  capacity,
  seatsTaken,
  bookmarked = false,
  onBookmark,
  onPress,
  variant = 'default',
  style,
}: SessionCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 4 });
  const isHighlight = variant === 'highlight';

  const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
  const isFull = hasMeter && (seatsTaken as number) >= (capacity as number);
  const metaLine = [time, room].filter(Boolean).join('  ·  ');

  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {isHighlight ? <View style={{ width: 3, alignSelf: 'stretch', backgroundColor: colors.primary }} /> : null}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }}>
        <View style={{ width: 52 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>{time ?? '—'}</Text>
        </View>

        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
            {track ? <Badge tone={isHighlight ? 'primary' : 'neutral'} size="sm">{track}</Badge> : null}
          </View>
          {metaLine ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{metaLine}</Text>
          ) : null}
        </View>

        {speakers.length > 0 ? <AvatarGroup avatars={speakers.map((s) => ({ src: s.avatarUrl, name: s.name }))} size="xs" max={2} /> : null}

        {hasMeter ? (
          <Text style={{ color: isFull ? colors.dangerText : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {isFull ? 'Full' : `${seatsTaken}/${capacity}`}
          </Text>
        ) : null}

        {onBookmark ? (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: bookmarked }}
            accessibilityLabel={bookmarked ? 'Remove bookmark' : 'Bookmark session'}
            onPress={() => onBookmark(!bookmarked)}
            hitSlop={8}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <Icon glyph={bookmarked ? '★' : '☆'} size="base" color={bookmarked ? 'accent' : 'muted'} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: isHighlight ? colors.primary : colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

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

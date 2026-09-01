import * as React from 'react';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, placeholderGround, spokenLine } from './internal/event-v4';
import type { EventCardProps } from './EventCard';

export interface EventCardV4Props extends EventCardProps {
  /** Announced while the skeleton is up. Default `'Loading event'`. */
  loadingLabel?: string;
}

/**
 * **V4 event card** — same props as {@link EventCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel={title}` on the
 *    pressable root replaces the whole subtree, so the date, the time, the
 *    venue, the category and the attendee count were all unreachable — the
 *    card said "Summer Fest, button" and stopped.
 * 2. **`imageAlt` reaches the placeholder path.** It was applied only to a
 *    real `<Image>`, so a card with no cover threw the caller's alt text away
 *    and drew an unnamed emoji.
 * 3. **The compact loading state keeps its row layout.** The skeleton ignored
 *    `variant`, so a `compact` card loaded as a column and then snapped
 *    sideways into a row when the data arrived.
 * 4. **The skeleton survives dark mode.** It was `tokens.ramps.neutral[100]`
 *    and `[200]`, and the native ramps keep their light orientation in both
 *    schemes — the theme's own comment says so — so every loading card was a
 *    pair of near-white slabs on a dark page.
 * 5. **A press is a state layer**, not `opacity: 0.9` — a dimmed card is how
 *    M3 spells *unavailable*.
 *
 * **Renders nothing without a `title`.**
 */
export function EventCardV4({
  title,
  date,
  time,
  location,
  imageUrl,
  imageAlt,
  category,
  attendeeCount,
  variant = 'default',
  onPress,
  loading = false,
  loadingLabel = 'Loading event',
  style,
}: EventCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      flexDirection: isCompact ? 'row' : 'column',
    },
    style,
  ];

  if (loading) {
    return (
      <View accessible accessibilityLabel={loadingLabel} style={containerStyle}>
        {!isCompact ? (
          <View
            style={{
              height: isFeatured ? tokens.spacing['2xl'] * 4 : tokens.spacing['2xl'] * 3,
              backgroundColor: placeholderGround(theme),
            }}
          />
        ) : null}
        <View style={{ flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View
            style={{
              height: tokens.spacing.lg,
              width: '70%',
              borderRadius: tokens.radius.sm,
              backgroundColor: placeholderGround(theme),
            }}
          />
          <View
            style={{
              height: tokens.spacing.md,
              width: '45%',
              borderRadius: tokens.radius.sm,
              backgroundColor: placeholderGround(theme),
            }}
          />
        </View>
      </View>
    );
  }

  if (!title) return null;

  const meta = [date, time].filter(Boolean).join(' · ');
  const goingLabel = typeof attendeeCount === 'number' ? `${attendeeCount} going` : null;

  const cover = !isCompact ? (
    <View
      style={{
        height: isFeatured ? tokens.spacing['2xl'] * 4 : tokens.spacing['2xl'] * 3,
        width: '100%',
        backgroundColor: placeholderGround(theme),
      }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          accessible
          accessibilityLabel={imageAlt ?? title}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        // Change 2: the caller's alt text names the placeholder too, instead
        // of being dropped along with the missing image.
        <View
          accessible={imageAlt != null}
          accessibilityLabel={imageAlt}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <IconV4 glyph="🎟️" size="2xl" />
        </View>
      )}
      {category ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <BadgeV4 {...BADGE_V4} tone="primary">
            {category}
          </BadgeV4>
        </View>
      ) : null}
    </View>
  ) : null;

  const line = (glyph: string, text: string): React.ReactElement => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      <IconV4 glyph={glyph} size="sm" color="mutedText" />
      <TextV4 size="sm" tone="mutedText" numberOfLines={1} style={{ flex: 1 }}>
        {text}
      </TextV4>
    </View>
  );

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }}>
      {isCompact && category ? (
        <BadgeV4 {...BADGE_V4} tone="primary">
          {category}
        </BadgeV4>
      ) : null}
      <TextV4
        size={isFeatured ? 'xl' : 'base'}
        weight="bold"
        tone="onCard"
        numberOfLines={2}
      >
        {title}
      </TextV4>
      {meta ? line('🗓️', meta) : null}
      {location ? line('📍', location) : null}
      {goingLabel ? line('👥', goingLabel) : null}
    </View>
  );

  const inner = isCompact ? (
    body
  ) : (
    <>
      {cover}
      {body}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={spokenLine([title, category, date, time, location, goingLabel])}
        onPress={onPress}
        style={({ pressed }) => [
          containerStyle,
          pressed ? { backgroundColor: pressOver(theme, colors.card, colors.onCard) } : null,
        ]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}

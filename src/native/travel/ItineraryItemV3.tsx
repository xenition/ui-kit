import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import type { ItineraryItemProps, ItineraryKind, ItineraryStatus } from './ItineraryItem';

/**
 * Drop-in alternate design for {@link ItineraryItem} — same props, new look.
 *
 * V3 is a **minimal dense line**: a fixed-width time gutter, a small status dot,
 * then title and subtitle on one tight baseline — no node ring, no rail. Built
 * for long, compact day lists. Identical `ItineraryItemProps` (`showConnector`
 * becomes a hairline divider under the row).
 */
export type ItineraryItemV3Props = ItineraryItemProps;

const KIND_GLYPH: Record<ItineraryKind, string> = {
  flight: '✈',
  hotel: '🏨',
  activity: '🎟',
  transfer: '🚕',
  meal: '🍽',
};

const STATUS_SLOT: Record<ItineraryStatus, keyof SemanticColors> = {
  upcoming: 'muted',
  active: 'primary',
  done: 'success',
};

export function ItineraryItemV3({
  kind = 'activity',
  glyph,
  time,
  title,
  subtitle,
  status = 'upcoming',
  showConnector = true,
  onPress,
  style,
}: ItineraryItemV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = colors as unknown as Record<keyof SemanticColors, string>;
  const dotColor = palette[STATUS_SLOT[status]];
  const mark = glyph ?? KIND_GLYPH[kind];
  const enter = useEnter();

  const body = (
    <Animated.View
      style={[
        { opacity: enter.opacity, transform: enter.transform },
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          borderBottomWidth: showConnector ? 1 : 0,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <Text
        numberOfLines={1}
        style={{ width: 52, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}
      >
        {time ?? ''}
      </Text>

      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: tokens.radius.full,
          backgroundColor: dotColor,
        }}
      />

      <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.muted }}>{mark}</Text>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Animated.View>
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

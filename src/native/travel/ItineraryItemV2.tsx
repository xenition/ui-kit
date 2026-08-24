import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, type SemanticColors, type BadgeTone } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';
import type { ItineraryItemProps, ItineraryKind, ItineraryStatus } from './ItineraryItem';

/**
 * Drop-in alternate design for {@link ItineraryItem} — same props, new look.
 *
 * V2 is a **timeline node card**: the status node + connecting rail stay on the
 * left, but the event content lifts into an elevated card on the right with a
 * status badge — a chunkier, scannable day-plan row. Identical `ItineraryItemProps`.
 */
export type ItineraryItemV2Props = ItineraryItemProps;

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

const STATUS_TEXT_SLOT: Record<ItineraryStatus, keyof SemanticColors> = {
  upcoming: 'muted',
  active: 'primaryText',
  done: 'successText',
};

const STATUS_TONE: Record<ItineraryStatus, BadgeTone> = {
  upcoming: 'neutral',
  active: 'primary',
  done: 'success',
};

export function ItineraryItemV2({
  kind = 'activity',
  glyph,
  time,
  title,
  subtitle,
  status = 'upcoming',
  showConnector = true,
  onPress,
  style,
}: ItineraryItemV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = colors as unknown as Record<keyof SemanticColors, string>;
  const nodeColor = palette[STATUS_SLOT[status]];
  const markColor = palette[STATUS_TEXT_SLOT[status]];
  const mark = glyph ?? KIND_GLYPH[kind];
  const enter = useEnter();

  const body = (
    <Animated.View
      style={[
        { opacity: enter.opacity, transform: enter.transform },
        { flexDirection: 'row', gap: tokens.spacing.md },
        style,
      ]}
    >
      <View style={{ alignItems: 'center', width: 36 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: nodeColor,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.base, color: markColor }}>{mark}</Text>
        </View>
        {showConnector ? (
          <View style={{ flex: 1, width: 2, marginTop: 4, backgroundColor: colors.border }} />
        ) : null}
      </View>

      <View
        style={[
          appearanceStyle('elevated', colors, tokens),
          {
            flex: 1,
            marginBottom: showConnector ? tokens.spacing.lg : 0,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
            gap: 4,
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          {time ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{time}</Text>
          ) : (
            <View />
          )}
          <Badge tone={STATUS_TONE[status]}>{status}</Badge>
        </View>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
        {subtitle ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{subtitle}</Text>
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

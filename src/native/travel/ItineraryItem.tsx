import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { useEnter } from '../primitives/internal/motion';

/** The kind of itinerary event — drives the leading glyph. */
export type ItineraryKind = 'flight' | 'hotel' | 'activity' | 'transfer' | 'meal';

/** Progress state of the event, announced and tinted from a token slot. */
export type ItineraryStatus = 'upcoming' | 'active' | 'done';

export interface ItineraryItemProps {
  /** Event kind (selects a default glyph). */
  kind?: ItineraryKind;
  /** Override the leading glyph/emoji. */
  glyph?: string;
  /** Pre-formatted time or time range (e.g. `'09:30'` or `'09:30 – 11:00'`). */
  time?: string;
  /** Primary label. */
  title: string;
  /** Secondary detail line. */
  subtitle?: string;
  /** Progress state. */
  status?: ItineraryStatus;
  /** Draw the connecting timeline rail below the node (false on the last row). */
  showConnector?: boolean;
  /** Fires when the row is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const KIND_GLYPH: Record<ItineraryKind, string> = {
  flight: '✈',
  hotel: '🏨',
  activity: '🎟',
  transfer: '🚕',
  meal: '🍽',
};

/** Node ring/rail tint (a fill/border) per status. */
const STATUS_SLOT: Record<ItineraryStatus, keyof SemanticColors> = {
  upcoming: 'muted',
  active: 'primary',
  done: 'success',
};

/** The glyph is TEXT, so it reads from the contrast-tuned `*Text` slot. */
const STATUS_TEXT_SLOT: Record<ItineraryStatus, keyof SemanticColors> = {
  upcoming: 'muted',
  active: 'primaryText',
  done: 'successText',
};

/**
 * One entry in a day-by-day trip timeline — a leading kind glyph on a token
 * rail, a time, a title, and an optional detail line. `status` tints the node
 * and is also announced (never color-alone). Set `showConnector={false}` on the
 * final row. Token-only colors.
 */
export function ItineraryItem({
  kind = 'activity',
  glyph,
  time,
  title,
  subtitle,
  status = 'upcoming',
  showConnector = true,
  onPress,
  style,
}: ItineraryItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const nodeColor = colors[STATUS_SLOT[status]];
  const markColor = colors[STATUS_TEXT_SLOT[status]];
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
      <View style={{ alignItems: 'center', width: 32 }}>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: nodeColor,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.sm, color: markColor }}>{mark}</Text>
        </View>
        {showConnector ? (
          <View style={{ flex: 1, width: 2, marginTop: 2, backgroundColor: colors.border }} />
        ) : null}
      </View>

      <View style={{ flex: 1, paddingBottom: showConnector ? tokens.spacing.lg : 0, gap: 2 }}>
        {time ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {time}
          </Text>
        ) : null}
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
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

import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar, Badge, Button, Rating } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** Presentation density for a {@link DriverCard}. */
export type DriverCardVariant = 'default' | 'compact' | 'assigned';

export interface DriverCardProps {
  /** Driver display name. */
  name: string;
  /** Optional driver avatar URL. */
  avatarUrl?: string;
  /** Driver star rating (0–5). */
  rating?: number;
  /** Number of completed trips. */
  tripCount?: number;
  /** Vehicle description, e.g. `'Toyota Prius · White'`. */
  vehicle?: string;
  /** License plate, shown as a token-chip. */
  plate?: string;
  /** ETA to pickup, pre-formatted (e.g. `'4 min'`). */
  etaLabel?: string;
  /** Whether the driver is currently online/available. */
  online?: boolean;
  /** Presentation variant. `assigned` foregrounds the ETA. */
  variant?: DriverCardVariant;
  /** Fires when the message action is pressed. */
  onMessage?: () => void;
  /** Fires when the call action is pressed. */
  onCall?: () => void;
  /** Fires when the whole card is pressed (profile). */
  onPress?: () => void;
  /** Placeholder skeleton while the driver loads. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A driver identity block — avatar, name, star rating, trip count, the assigned
 * vehicle and plate, an online/offline state, and an optional ETA. Availability
 * is conveyed by a text-labelled badge (not color alone). Data +
 * `onMessage`/`onCall`/`onPress` callbacks only; nothing fetches. Colors come
 * from semantic tokens and `withAlpha` tints — no literal colors.
 * `variant="assigned"` highlights the ETA; `variant="compact"` tightens it.
 */
export function DriverCard({
  name,
  avatarUrl,
  rating,
  tripCount,
  vehicle,
  plate,
  etaLabel,
  online,
  variant = 'default',
  onMessage,
  onCall,
  onPress,
  loading = false,
  style,
}: DriverCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const assigned = variant === 'assigned';
  const pad = compact ? tokens.spacing.md : tokens.spacing.lg;

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading driver"
        style={[
          {
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: pad,
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            alignItems: 'center',
          },
          style,
        ]}
      >
        <View style={{ width: 44, height: 44, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 16, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
          <View style={{ height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
        </View>
      </View>
    );
  }

  const statusWord = online === undefined ? undefined : online ? 'Online' : 'Offline';
  const a11y = `Driver ${name}${typeof rating === 'number' ? `, rated ${rating} stars` : ''}${
    vehicle ? `, ${vehicle}` : ''
  }${etaLabel ? `, ETA ${etaLabel}` : ''}${statusWord ? `, ${statusWord}` : ''}`;

  const Container: React.ElementType = onPress ? Pressable : View;

  return (
    <Container
      accessible
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={a11y}
      onPress={onPress}
      style={
        onPress
          ? ({ pressed }: { pressed: boolean }) => [containerStyle(), style, { opacity: pressed ? 0.92 : 1 }]
          : [containerStyle(), style]
      }
    >
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }}>
        <Avatar src={avatarUrl} name={name} size={compact ? 'sm' : 'lg'} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {name}
            </Text>
            {statusWord ? (
              <Badge tone={online ? 'success' : 'neutral'} variant="soft" size="sm" dot>
                {statusWord}
              </Badge>
            ) : null}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
            {typeof tripCount === 'number' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{tripCount.toLocaleString()} trips</Text>
            ) : null}
          </View>
        </View>
        {assigned && etaLabel ? (
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{etaLabel}</Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>ETA</Text>
          </View>
        ) : null}
      </View>

      {vehicle || plate ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          {vehicle ? (
            <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              🚗 {vehicle}
            </Text>
          ) : null}
          {plate ? (
            <View
              style={{
                borderRadius: tokens.radius.sm,
                borderWidth: 1,
                borderColor: colors.border,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.xs,
                backgroundColor: withAlpha(colors.muted, 0.1),
              }}
            >
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }}>
                {plate}
              </Text>
            </View>
          ) : null}
          {!assigned && etaLabel ? (
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>· ETA {etaLabel}</Text>
          ) : null}
        </View>
      ) : null}

      {onMessage || onCall ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onMessage ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" size="sm" onPress={onMessage} accessibilityLabel={`Message ${name}`}>
                Message
              </Button>
            </View>
          ) : null}
          {onCall ? (
            <View style={{ flex: 1 }}>
              <Button variant="soft" size="sm" onPress={onCall} accessibilityLabel={`Call ${name}`}>
                Call
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </Container>
  );

  function containerStyle(): ViewStyle {
    return {
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: pad,
      gap: compact ? tokens.spacing.sm : tokens.spacing.md,
    };
  }
}

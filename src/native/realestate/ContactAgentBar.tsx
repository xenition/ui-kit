import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar, Button, Icon } from '../primitives';

export interface ContactAgentBarProps {
  /** Optional agent name shown on the left (e.g. `'Dana Reyes'`). */
  agentName?: string;
  /** Optional agent photo URL for the avatar. Falls back to initials of `agentName`. */
  agentAvatarUrl?: string;
  /** Optional supporting line under the name (e.g. `'Listing agent · Acme Realty'`). */
  agentSubtitle?: string;
  /** Fires when the Call action is pressed. When omitted the Call button is hidden. */
  onCall?: () => void;
  /** Fires when the Message action is pressed. When omitted the Message button is hidden. */
  onMessage?: () => void;
  /** Fires when the Schedule-tour action is pressed. When omitted the primary CTA is hidden. */
  onTour?: () => void;
  /** Label for the Call action. Defaults to `'Call'`. */
  callLabel?: string;
  /** Label for the Message action. Defaults to `'Message'`. */
  messageLabel?: string;
  /** Label for the primary Schedule-tour action. Defaults to `'Tour'`. */
  tourLabel?: string;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/** Shared min-height so every CTA clears the 44px tap target. */
const CTA_MIN_HEIGHT = 44;

/**
 * ContactAgentBar — **V4** "listing" design. A sticky-style contact action bar
 * for a listing: an optional agent avatar + name/subtitle on the left, then the
 * secondary Call and Message actions and a primary Schedule-tour CTA on the
 * right. Editorial, single-accent (primary) with the tour as the only filled
 * button; every CTA is ≥44px. 8-pt spacing inside a rounded elevated bar.
 * Presentational only — data + callbacks; an action is only rendered when its
 * handler is supplied. Token-only colors via `useXenitionTheme()`, no literals;
 * dark-mode safe.
 */
export function ContactAgentBar({
  agentName,
  agentAvatarUrl,
  agentSubtitle,
  onCall,
  onMessage,
  onTour,
  callLabel = 'Call',
  messageLabel = 'Message',
  tourLabel = 'Tour',
  style,
}: ContactAgentBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const showAgent = Boolean(agentName || agentAvatarUrl);
  const cta: ViewStyle = { minHeight: CTA_MIN_HEIGHT };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: tokens.spacing.sm,
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {showAgent ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexShrink: 1, minWidth: 0 }}>
          <Avatar src={agentAvatarUrl} name={agentName} size="md" />
          <View style={{ flexShrink: 1 }}>
            {agentName ? (
              <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }}>
                {agentName}
              </Text>
            ) : null}
            {agentSubtitle ? (
              <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.mutedText }}>
                {agentSubtitle}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginLeft: showAgent ? 'auto' : 0, flexGrow: showAgent ? 0 : 1 }}>
        {onCall ? (
          <Button variant="secondary" size="md" onPress={onCall} accessibilityLabel={callLabel} style={cta}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Icon name="phone" size="base" color="primaryText" />
              <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.primaryText }}>{callLabel}</Text>
            </View>
          </Button>
        ) : null}
        {onMessage ? (
          <Button variant="secondary" size="md" onPress={onMessage} accessibilityLabel={messageLabel} style={cta}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Icon name="mail" size="base" color="primaryText" />
              <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.primaryText }}>{messageLabel}</Text>
            </View>
          </Button>
        ) : null}
        {onTour ? (
          <Button variant="primary" size="md" onPress={onTour} accessibilityLabel={tourLabel} style={[cta, { flexGrow: 1 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Icon name="calendar" size="base" color="onPrimary" />
              <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onPrimary }}>{tourLabel}</Text>
            </View>
          </Button>
        ) : null}
      </View>
    </View>
  );
}

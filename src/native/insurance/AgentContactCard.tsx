import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Avatar, Button, Icon, Badge } from '../primitives';

export interface AgentContactCardProps {
  /** Agent full name. */
  name: string;
  /** Role / title (e.g. "Licensed agent", "Claims adjuster"). */
  title?: string;
  /** Agency or brokerage name. */
  agency?: string;
  /** Phone number, already formatted by the caller. */
  phone?: string;
  /** Email address. */
  email?: string;
  /** Optional avatar image URL. */
  avatarUrl?: string;
  /** Availability flag — shows an online/offline presence dot + label. */
  available?: boolean;
  /** Fires when the call action is pressed (only shown with a `phone`). */
  onCall?: () => void;
  /** Fires when the email action is pressed (only shown with an `email`). */
  onEmail?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A contact card for the policyholder's agent / adjuster: avatar with a
 * presence dot, name/title/agency, and call + email actions. Availability is
 * shown by **text + a presence dot** (the dot's color traces to a
 * `SemanticColors` slot via `Avatar`/`Badge`) — never color alone. Call/email
 * `Button`s only render when the corresponding contact detail and handler are
 * supplied. Token-bound throughout — no literal colors.
 */
export function AgentContactCard({
  name,
  title,
  agency,
  phone,
  email,
  avatarUrl,
  available,
  onCall,
  onEmail,
  style,
}: AgentContactCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <Card style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar
          src={avatarUrl}
          name={name}
          size="lg"
          status={available == null ? undefined : available ? 'online' : 'offline'}
        />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          {title != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {title}
              {agency != null ? ` · ${agency}` : ''}
            </Text>
          ) : agency != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {agency}
            </Text>
          ) : null}
          {available != null ? (
            <Badge tone={available ? 'success' : 'neutral'} variant="soft" size="sm">
              {available ? '● Available' : '○ Offline'}
            </Badge>
          ) : null}
        </View>
      </View>

      {phone != null || email != null ? (
        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
          {phone != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Icon glyph="📞" size="sm" accessibilityLabel="Phone" />
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{phone}</Text>
            </View>
          ) : null}
          {email != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Icon glyph="✉️" size="sm" accessibilityLabel="Email" />
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                {email}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {(phone != null && onCall != null) || (email != null && onEmail != null) ? (
        <View style={{ marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }}>
          {phone != null && onCall != null ? (
            <Button variant="primary" size="sm" onPress={onCall} style={{ flex: 1 }}>
              Call
            </Button>
          ) : null}
          {email != null && onEmail != null ? (
            <Button variant="secondary" size="sm" onPress={onEmail} style={{ flex: 1 }}>
              Email
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}

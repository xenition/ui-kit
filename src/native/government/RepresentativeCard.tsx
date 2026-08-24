import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Avatar, Badge, Button, type BadgeTone } from '../primitives';

/** Party affiliation — drives a neutral, non-partisan label badge tone. */
export type Party = 'democratic' | 'republican' | 'independent' | 'green' | 'other' | 'nonpartisan';

const PARTY_LABEL: Record<Party, string> = {
  democratic: 'Democratic',
  republican: 'Republican',
  independent: 'Independent',
  green: 'Green',
  other: 'Other',
  nonpartisan: 'Nonpartisan',
};

export interface RepresentativeCardProps {
  /** Representative's full name. */
  name: string;
  /** Office / title held (e.g. "City Council · District 4"). */
  office: string;
  /** Photo URL; falls back to initials in the Avatar. */
  photoUrl?: string;
  /** Party affiliation — rendered as a neutral label badge. */
  party?: Party;
  /** District / jurisdiction served. */
  district?: string;
  /** Contact phone (already formatted). */
  phone?: string;
  /** Contact email. */
  email?: string;
  /** Localized next-election / term-end date. */
  termInfo?: string;
  /** Whether the representative is currently in office (text+glyph badge). */
  inOffice?: boolean;
  /** Fires "Call" (shown only when `phone` + handler are present). */
  onCall?: () => void;
  /** Fires "Email" (shown only when `email` + handler are present). */
  onEmail?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An elected-official / representative contact card: avatar, name, office, a
 * neutral party label, jurisdiction, and gated Call / Email actions. Party is a
 * plain label (never encoded by color alone), and an in-office flag reads as a
 * text + glyph badge. Every color traces to a `SemanticColors` slot — no
 * literals.
 */
export function RepresentativeCard({
  name,
  office,
  photoUrl,
  party,
  district,
  phone,
  email,
  termInfo,
  inOffice,
  onCall,
  onEmail,
  style,
}: RepresentativeCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const partyLabel = party ? PARTY_LABEL[party] ?? PARTY_LABEL.other : undefined;
  const showCall = onCall != null && phone != null && phone !== '';
  const showEmail = onEmail != null && email != null && email !== '';
  const officeTone: BadgeTone = inOffice ? 'success' : 'neutral';

  return (
    <Card variant="elevated" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={photoUrl} name={name} size="lg" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {office}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
            {partyLabel != null ? (
              <Badge tone="neutral" variant="outline" size="sm">
                {partyLabel}
              </Badge>
            ) : null}
            {inOffice != null ? (
              <Badge tone={officeTone} variant="soft" size="sm">
                {inOffice ? '✓ In office' : '— Former'}
              </Badge>
            ) : null}
          </View>
        </View>
      </View>

      {district != null || termInfo != null ? (
        <View style={{ marginTop: tokens.spacing.sm, gap: 2 }}>
          {district != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {district}</Text>
          ) : null}
          {termInfo != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>🗳️ {termInfo}</Text>
          ) : null}
        </View>
      ) : null}

      {showCall || showEmail ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            justifyContent: 'flex-end',
          }}
        >
          {showCall ? (
            <Button size="sm" variant="outline" onPress={onCall}>
              Call
            </Button>
          ) : null}
          {showEmail ? (
            <Button size="sm" onPress={onEmail}>
              Email
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}

import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Avatar, Badge, Button, type BadgeTone } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import type { RepresentativeCardProps, Party } from './RepresentativeCard';

/** Drop-in replacement for {@link RepresentativeCard} — identical props, distinct design. */
export type RepresentativeCardV2Props = RepresentativeCardProps;

const PARTY_LABEL: Record<Party, string> = {
  democratic: 'Democratic',
  republican: 'Republican',
  independent: 'Independent',
  green: 'Green',
  other: 'Other',
  nonpartisan: 'Nonpartisan',
};

/**
 * RepresentativeCard, alternate design **V2** — a centered profile card. A large
 * avatar is centered above the name and office, with the neutral party label and
 * an in-office flag (text + glyph badge, never color alone) on a centered badge
 * row; district / term follow, and full-width Call / Email actions anchor the
 * footer. Same `RepresentativeCardProps`; drops in for `RepresentativeCard`.
 * Token-pure.
 */
export function RepresentativeCardV2({
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
}: RepresentativeCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const partyLabel = party ? PARTY_LABEL[party] ?? PARTY_LABEL.other : undefined;
  const showCall = onCall != null && phone != null && phone !== '';
  const showEmail = onEmail != null && email != null && email !== '';
  const officeTone: BadgeTone = inOffice ? 'success' : 'neutral';
  const enter = useEnter({ translateY: 8 });

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <Card variant="elevated" style={style}>
        <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
          <Avatar src={photoUrl} name={name} size="xl" />
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}
          >
            {office}
          </Text>

          {partyLabel != null || inOffice != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap', justifyContent: 'center' }}>
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
          ) : null}

          {district != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {district}</Text>
          ) : null}
          {termInfo != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>🗳️ {termInfo}</Text>
          ) : null}
        </View>

        {showCall || showEmail ? (
          <View style={{ marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }}>
            {showCall ? (
              <Button size="sm" variant="outline" onPress={onCall} style={{ flex: 1 }}>
                Call
              </Button>
            ) : null}
            {showEmail ? (
              <Button size="sm" onPress={onEmail} style={{ flex: 1 }}>
                Email
              </Button>
            ) : null}
          </View>
        ) : null}
      </Card>
    </Animated.View>
  );
}

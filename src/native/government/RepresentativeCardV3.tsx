import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar, Badge, Button } from '../primitives';
import type { RepresentativeCardProps, Party } from './RepresentativeCard';

/** Drop-in replacement for {@link RepresentativeCard} — identical props, distinct design. */
export type RepresentativeCardV3Props = RepresentativeCardProps;

const PARTY_LABEL: Record<Party, string> = {
  democratic: 'Democratic',
  republican: 'Republican',
  independent: 'Independent',
  green: 'Green',
  other: 'Other',
  nonpartisan: 'Nonpartisan',
};

/**
 * RepresentativeCard, alternate design **V3** — a compact directory row. A small
 * avatar leads, the name and office stack in the middle beside a neutral party
 * label and an in-office glyph (text + glyph, never color alone), and compact
 * Call / Email actions close the line. Tight rhythm for a representatives list.
 * Same `RepresentativeCardProps`; drops in for `RepresentativeCard`. Token-pure.
 */
export function RepresentativeCardV3({
  name,
  office,
  photoUrl,
  party,
  phone,
  email,
  inOffice,
  onCall,
  onEmail,
  style,
}: RepresentativeCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const partyLabel = party ? PARTY_LABEL[party] ?? PARTY_LABEL.other : undefined;
  const showCall = onCall != null && phone != null && phone !== '';
  const showEmail = onEmail != null && email != null && email !== '';

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Avatar src={photoUrl} name={name} size="sm" />
      <View style={{ flex: 1, gap: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
          >
            {name}
          </Text>
          {inOffice != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {inOffice ? '✓ In office' : '— Former'}
            </Text>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {office}
          </Text>
          {partyLabel != null ? (
            <Badge tone="neutral" variant="outline" size="sm">
              {partyLabel}
            </Badge>
          ) : null}
        </View>
      </View>

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
  );
}

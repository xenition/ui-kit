import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { BADGE_V4, CARD_V4, IDENTITY_TONE, spokenLine } from './internal/civic-v4';
import type { Party, RepresentativeCardProps } from './RepresentativeCard';

/**
 * The two sides of a term, as a key. Named rather than inlined so the two
 * twins expose one shape for `officeLabels` — the web twin exports the same
 * union.
 */
export type OfficeTenure = 'inOffice' | 'former';

export interface RepresentativeCardV4Props extends RepresentativeCardProps {
  /** Override the six party words (`'Democratic'`, `'Nonpartisan'`, …). */
  partyLabels?: Partial<Record<Party, string>>;
  /** Override the two term words. Default `'In office'` / `'Former'`. */
  officeLabels?: Partial<Record<OfficeTenure, string>>;
}

const PARTY_V4: Record<Party, string> = {
  democratic: 'Democratic',
  republican: 'Republican',
  independent: 'Independent',
  green: 'Green',
  other: 'Other',
  nonpartisan: 'Nonpartisan',
};

/**
 * **V4 representative card** — same props as {@link RepresentativeCard} plus
 * `partyLabels` and `officeLabels`.
 *
 * ## Four changes
 *
 * 1. **Being in office stops being `success`.** Holding a seat is a factual
 *    attribute, not an outcome, and this is a component careful enough to keep
 *    the party badge deliberately neutral — then spent the kit's "this went
 *    well" colour on one of the two sides of a political fact. Both states are
 *    `IDENTITY_TONE` now and are told apart by their glyph and their word.
 * 2. **One badge shape.** The party badge was `outline` and the term badge
 *    `soft` in the same row, so two attributes of one person read as two
 *    different kinds of thing.
 * 3. **The card is one announced object** — name, office, party, term,
 *    district — instead of five loose text nodes, with the Call and Email
 *    buttons kept outside that name so they stay focus stops.
 * 4. **Both actions clear 44**, and the district and term lines are tested for
 *    content rather than for `!= null`, so an empty string no longer draws an
 *    empty block the web twin does not draw.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function RepresentativeCardV4({
  name,
  office,
  photoUrl,
  party,
  district,
  phone,
  email,
  termInfo,
  inOffice,
  partyLabels,
  officeLabels,
  onCall,
  onEmail,
  style,
}: RepresentativeCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!name) return null;

  const partyWord = party ? (partyLabels?.[party] ?? PARTY_V4[party] ?? PARTY_V4.other) : undefined;
  const inOfficeWord = officeLabels?.inOffice ?? 'In office';
  const formerWord = officeLabels?.former ?? 'Former';
  const termWord = inOffice == null ? undefined : inOffice ? inOfficeWord : formerWord;

  const showCall = onCall != null && phone != null && phone !== '';
  const showEmail = onEmail != null && email != null && email !== '';
  const tap = minTap(tokens.spacing);

  const spoken = spokenLine([name, office, partyWord, termWord, district, termInfo]);

  return (
    <CardV4 variant={CARD_V4} style={style}>
      <View
        accessible
        accessibilityLabel={spoken}
        style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
      >
        <AvatarV4 src={photoUrl} name={name} size="lg" />
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="lg" weight="bold" tone="onSurface" numberOfLines={1}>
            {name}
          </TextV4>
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {office}
          </TextV4>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              flexWrap: 'wrap',
            }}
          >
            {partyWord != null ? (
              <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
                {partyWord}
              </BadgeV4>
            ) : null}
            {termWord != null ? (
              <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
                {`${inOffice === true ? '✓' : '—'} ${termWord}`}
              </BadgeV4>
            ) : null}
          </View>
        </View>
      </View>

      {district || termInfo ? (
        <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.xs / 2 }}>
          {district ? (
            <TextV4 size="xs" tone="mutedText">
              {`📍 ${district}`}
            </TextV4>
          ) : null}
          {termInfo ? (
            <TextV4 size="xs" tone="mutedText">
              {`🗳️ ${termInfo}`}
            </TextV4>
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
            <ButtonV4 size="md" variant="outline" onPress={onCall} style={{ minHeight: tap }}>
              Call
            </ButtonV4>
          ) : null}
          {showEmail ? (
            <ButtonV4 size="md" onPress={onEmail} style={{ minHeight: tap }}>
              Email
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}

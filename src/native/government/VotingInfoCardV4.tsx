import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  spokenLine,
  tintGround,
  type ToneV4,
} from './internal/civic-v4';
import type { RegistrationStatus, VotingInfoCardProps } from './VotingInfoCard';

export interface VotingInfoCardV4Props extends VotingInfoCardProps {
  /** Override the four registration words (`'Registered'`, `'Not registered'`, …). */
  statusLabels?: Partial<Record<RegistrationStatus, string>>;
  /** What the upcoming election is called. Default `'Next election'`. */
  electionLabel?: string;
}

const REG_V4: Record<RegistrationStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  registered: { label: 'Registered', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  'not-registered': { label: 'Not registered', glyph: '!', tone: 'danger' },
  inactive: { label: 'Inactive', glyph: '✕', tone: 'neutral' },
};

/**
 * **V4 voting information** — same props as {@link VotingInfoCard} plus
 * `statusLabels` and `electionLabel`.
 *
 * ## Four changes
 *
 * 1. **The election date gets a relationship to its label.** "Next election"
 *    and "Municipal general · Nov 4" were two sibling text nodes with nothing
 *    tying them together, so a reader heard a heading, then a date, and had to
 *    infer the connection. Label and value are one announced pair now.
 * 2. **No empty labelled blocks.** The card rendered the election section
 *    whenever either field was non-`null` and then joined them with a filter
 *    that drops `''` — so two empty strings produced a "Next election" heading
 *    with nothing under it, where the web twin renders nothing at all. Same
 *    for the polling place.
 * 3. **Both actions clear 44.** `size="sm"` renders about 34 here, and
 *    "Register to vote" is the whole point of the card.
 * 4. **One badge shape and one card variant**, the mail-ballot badge stops
 *    being `accent` — how you vote is an arrangement, not a status — and the
 *    registration disc takes a ground composited opaquely rather than a
 *    translucent wash of a fill slot, which is a different colour on every
 *    surface it lands on.
 */
export function VotingInfoCardV4({
  registration,
  electionDate,
  electionName,
  pollingPlace,
  pollingAddress,
  mailBallot = false,
  statusLabels,
  electionLabel = 'Next election',
  onRegister,
  onFindPolling,
  style,
}: VotingInfoCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const reg = REG_V4[registration] ?? REG_V4['not-registered'];
  const statusWord = statusLabels?.[registration] ?? reg.label;
  const isRegistered = registration === 'registered';
  const election = metaLine([electionName, electionDate]);
  const tap = minTap(tokens.spacing);
  const disc = tokens.spacing['2xl'];

  return (
    <CardV4 variant={CARD_V4} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          accessible
          accessibilityLabel={spokenLine(['Voter status', statusWord])}
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
          }}
        >
          <View
            style={{
              width: disc,
              height: disc,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: tintGround(theme, reg.tone),
            }}
          >
            {/* Decorative: the block's name already says what it is. */}
            <IconV4 glyph="🗳️" size="xl" />
          </View>
          <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
            <TextV4 size="base" weight="bold" tone="onSurface">
              Voter status
            </TextV4>
            <View style={{ flexDirection: 'row' }}>
              <BadgeV4 tone={reg.tone} {...BADGE_V4}>
                {`${reg.glyph} ${statusWord}`}
              </BadgeV4>
            </View>
          </View>
        </View>
        {mailBallot ? (
          <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
            📮 Mail ballot
          </BadgeV4>
        ) : null}
      </View>

      {election !== '' ? (
        <View
          accessible
          accessibilityLabel={`${electionLabel}, ${election}`}
          style={{
            marginTop: tokens.spacing.md,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            gap: tokens.spacing.xs / 2,
          }}
        >
          <TextV4 size="xs" tone="mutedText">
            {electionLabel}
          </TextV4>
          <TextV4 size="sm" weight="semibold" tone="onSurface">
            {election}
          </TextV4>
        </View>
      ) : null}

      {pollingPlace ? (
        <View
          accessible
          accessibilityLabel={spokenLine(['Polling place', pollingPlace, pollingAddress])}
          style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.xs / 2 }}
        >
          <TextV4 size="xs" tone="mutedText">
            Polling place
          </TextV4>
          <TextV4 size="sm" tone="onSurface">
            {`📍 ${pollingPlace}`}
          </TextV4>
          {pollingAddress ? (
            <TextV4 size="xs" tone="mutedText">
              {pollingAddress}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      {onRegister != null || onFindPolling != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            justifyContent: 'flex-end',
          }}
        >
          {onFindPolling != null ? (
            <ButtonV4 size="md" variant="outline" onPress={onFindPolling} style={{ minHeight: tap }}>
              Find polling place
            </ButtonV4>
          ) : null}
          {onRegister != null ? (
            <ButtonV4 size="md" onPress={onRegister} style={{ minHeight: tap }}>
              {isRegistered ? 'Update registration' : 'Register to vote'}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}

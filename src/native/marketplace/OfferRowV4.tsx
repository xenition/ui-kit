import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import type { BadgeTone } from '../primitives/BadgeV4';
import type { IconName } from '../../primitives/icon-names';
import type { IconColor } from '../../primitives/Icon';
import type { TextTone } from '../primitives/Text';
import { formatMoney } from '../commerce/money';
import type { OfferRowProps, OfferStatus } from './OfferRow';
import {
  rowContainerStyle,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';

export type { OfferStatus };

export interface OfferRowV4Props extends OfferRowProps {
  /**
   * Draw the party's `AvatarV4` in the leading slot. Default `true`.
   *
   * §4.7 again: a list of offers on one listing is homogeneous, and a leading
   * mark on every row of one is noise. The slot itself stays either way, so the
   * titles of a list with avatars off still sit on one vertical line.
   */
  showAvatar?: boolean;
}

/**
 * Everything a lifecycle state looks like, in one table.
 *
 * Five states, five rows, and the tone, the ink, the glyph colour, the mark and
 * the word for each are decided together — because they are one decision. Split
 * across three `Record`s they drift, which is how the base ended up with a
 * `warn` chip whose label said "Pending".
 *
 * An offer's lifecycle is one of the few things in these two modules that is
 * genuinely status — accepted really is good, declined really is bad — so
 * `success` and `danger` are spent honestly here. Two changes from the base:
 *
 * - **`pending` drops `warn`.** An offer waiting for an answer is not a
 *   caution; nothing has gone wrong, and brief rule 3 reserves `warn` for
 *   things that have. It becomes `neutral`, which is what "no verdict yet"
 *   looks like.
 * - **`expired` keeps `neutral` but goes quiet in the ink.** The obvious answer
 *   was `BadgeTone: 'muted'`, and it does not exist on native — the web union
 *   has seven tones and the native one six, an undocumented twin divergence
 *   this pass found and did not deepen. So the chip stays `neutral` on both
 *   twins and the *ink* drops to `mutedText`, which is a difference both
 *   platforms can spell.
 *
 * `ink` and `glyph` name the badge's own pair explicitly rather than letting
 * the two children inherit: `IconV4` and `TextV4` both apply a colour of their
 * own, so a child that says nothing does not inherit the badge's ink — it
 * overrides it with `onSurface`. `ink` is always the contrast-corrected `*Text`
 * slot (it is text); `glyph` is the plain fill slot, which is the kit's
 * standing reading for an icon as a 1.4.11 UI mark rather than a run of text.
 */
interface StatusLook {
  tone: BadgeTone;
  ink: TextTone;
  glyph: IconColor;
  icon: IconName;
  label: string;
}

const STATUS: Record<OfferStatus, StatusLook> = {
  pending: { tone: 'neutral', ink: 'onSurface', glyph: 'onSurface', icon: 'clock', label: 'Pending' },
  accepted: { tone: 'success', ink: 'successText', glyph: 'success', icon: 'check', label: 'Accepted' },
  declined: { tone: 'danger', ink: 'dangerText', glyph: 'danger', icon: 'close', label: 'Declined' },
  countered: { tone: 'primary', ink: 'primaryText', glyph: 'primary', icon: 'refresh', label: 'Countered' },
  expired: { tone: 'neutral', ink: 'mutedText', glyph: 'muted', icon: 'error', label: 'Expired' },
};

/**
 * **V4 offer row** — a buyer's offer on a listing: who, how much, where it
 * stands, and the three answers the seller can give.
 *
 * The row proper takes the family metric from `dashboard/internal/row-v4.ts`
 * (§4.3); the optional note and the action bar hang beneath it inside the same
 * gutters, because a row that grows a second block is still a row and must not
 * suddenly acquire a second horizontal inset. The base gave the whole thing a
 * border, a radius and a `surface` ground — a card in a list of cards — which
 * is the treatment brief §4.3 takes away from every row.
 *
 * What changes:
 *
 * 1. **Row metric, transparent ground, `md` gutters.** The container owns the
 *    card.
 * 2. **Tabular money** (rule 2), still through `formatMoney` (rule 1). The
 *    amount is the decision on this row, so it sits one step up the scale at
 *    `lg` — the same step `PriceTagV4` gives a price at `md`.
 * 3. **The status chip carries a glyph and a word** (rule 6), and its tone is
 *    re-mapped so `warn` is not spent on "waiting" — see {@link STATUS}.
 * 4. **The row says who and what out loud.** Neither twin had an accessible
 *    name at all: a screen reader met an avatar, a name, a chip and a figure as
 *    four unrelated fragments. It now announces party, status and amount as one
 *    thing.
 * 5. **Decline is `ghost`/`danger` on both twins.** The web base used the
 *    filled `danger` button, this one used the quiet one — the same choice made
 *    two ways. Declining an offer is reversible and private; the filled
 *    destructive button belongs to `ReportListingV4`, which is neither.
 *
 * Renders `null` when there is no party to attribute the offer to (§4.5).
 */
export function OfferRowV4({
  party,
  amountCents,
  currency = 'USD',
  avatarUrl,
  status = 'pending',
  timeLabel,
  note,
  onAccept,
  onDecline,
  onCounter,
  showAvatar = true,
  style,
}: OfferRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();

  // §4.5: no party, no row.
  if (party.trim() === '') return null;

  const { spacing } = theme.tokens;
  const look = STATUS[status] ?? STATUS.pending;
  const supporting = timeLabel !== undefined && timeLabel !== '';
  const amount = formatMoney(amountCents, currency);
  const showActions =
    status === 'pending' && (onAccept != null || onDecline != null || onCounter != null);

  return (
    <View
      accessibilityLabel={`${party}, ${look.label}, ${amount}`}
      style={[{ width: '100%' }, style]}
    >
      <View style={rowContainerStyle(theme, { twoLine: supporting })}>
        {showAvatar ? (
          <View style={rowLeadingStyle(theme)}>
            <AvatarV4 src={avatarUrl} name={party} size="md" />
          </View>
        ) : null}
        <View style={rowTextStyle(theme)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <TextV4
              size="base"
              weight="semibold"
              tone="onSurface"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {party}
            </TextV4>
            <BadgeV4 tone={look.tone} variant="soft" size="sm">
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <IconV4 name={look.icon} size="xs" color={look.glyph} />
                <TextV4 size="xs" weight="medium" tone={look.ink}>
                  {look.label}
                </TextV4>
              </View>
            </BadgeV4>
          </View>
          {supporting ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {timeLabel}
            </TextV4>
          ) : null}
        </View>
        <View style={rowTrailingStyle(theme)}>
          <TextV4 size="lg" weight="bold" tone="onSurface" numeric="tabular">
            {amount}
          </TextV4>
        </View>
      </View>

      {note !== undefined && note !== '' ? (
        // The same `md` gutter the row above uses, so the note lines up under
        // the name rather than starting its own inset.
        <View style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.sm }}>
          <TextV4 size="sm" tone="mutedText" numberOfLines={3}>
            {note}
          </TextV4>
        </View>
      ) : null}

      {showActions ? (
        <View
          style={{
            flexDirection: 'row',
            gap: spacing.sm,
            paddingHorizontal: spacing.md,
            paddingBottom: spacing.sm,
          }}
        >
          {onAccept != null ? (
            <ButtonV4 variant="primary" tone="success" size="sm" onPress={onAccept} style={{ flex: 1 }}>
              Accept
            </ButtonV4>
          ) : null}
          {onCounter != null ? (
            <ButtonV4 variant="outline" size="sm" onPress={onCounter} style={{ flex: 1 }}>
              Counter
            </ButtonV4>
          ) : null}
          {onDecline != null ? (
            <ButtonV4 variant="ghost" tone="danger" size="sm" onPress={onDecline} style={{ flex: 1 }}>
              Decline
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

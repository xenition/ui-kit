import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import {
  DECORATIVE,
  chipStyle,
  metaLine,
  pillStyle,
  spokenLine,
  toneInk,
} from './internal/tone-v4';
import type { AgentContactCardProps } from './AgentContactCard';

export interface AgentContactCardV4Props extends AgentContactCardProps {
  /** Copy on the call action. Default `'Call'`. */
  callLabel?: string;
  /** Copy on the email action. Default `'Email'`. */
  emailLabel?: string;
  /** Shown when `available` is true. Default `'Available'`. */
  availableLabel?: string;
  /** Shown when `available` is false. Default `'Offline'`. */
  offlineLabel?: string;
}

/**
 * **V4 agent contact card** — same props as {@link AgentContactCard} plus
 * `callLabel`, `emailLabel`, `availableLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **Two adjuster cards no longer offer two buttons called "Call".** A
 *    claims screen listing an agent and an adjuster gave a screen-reader user
 *    two identically-named actions and no way to tell which one dialled whom;
 *    the rotor listed "Call, Call, Email, Email". Each action's spoken name now
 *    carries the person and the number or address it will reach — the visible
 *    label stays the short word, because the button is 80px wide.
 * 2. **The phone number and the address are announced with the action that
 *    uses them.** The base drew them as inert text nodes (on the web twin,
 *    literally `<span>`s where a `tel:` and a `mailto:` belong), so the two
 *    facts the card exists to deliver were three separate stops away from the
 *    buttons that act on them. Native has no anchor: the platform's dialler is
 *    the host's to open with `Linking`, which is what `onCall` and `onEmail`
 *    are for. What the card owes is a named target, and it has one.
 * 3. **Availability is a word, and the word is a prop.** `'● Available'` and
 *    `'○ Offline'` were hard-coded English concatenated into a badge, in the
 *    one component a policyholder reads before deciding whether to phone
 *    someone at 9pm.
 * 4. **Both actions clear 44.** `size="sm"` buttons in a row is the pattern
 *    §8 sets a floor for, and neither of these had one.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function AgentContactCardV4({
  name,
  title,
  agency,
  phone,
  email,
  avatarUrl,
  available,
  callLabel = 'Call',
  emailLabel = 'Email',
  availableLabel = 'Available',
  offlineLabel = 'Offline',
  onCall,
  onEmail,
  style,
}: AgentContactCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!name) return null;

  const presence =
    available == null ? null : available ? availableLabel : offlineLabel;
  const role = metaLine([title, agency]);
  const tap = minTap(tokens.spacing);

  const canCall = phone != null && phone !== '' && onCall != null;
  const canEmail = email != null && email !== '' && onEmail != null;

  return (
    <CardV4 style={[{ gap: tokens.spacing.md }, style]}>
      <View
        accessible
        accessibilityLabel={spokenLine([name, role, presence, phone, email])}
        style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
      >
        <AvatarV4
          src={avatarUrl}
          name={name}
          size="lg"
          status={available == null ? undefined : available ? 'online' : 'offline'}
        />
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="lg" weight="bold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          {role ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {role}
            </TextV4>
          ) : null}
          {presence ? (
            // A presence is a state; the availability of the person you are
            // about to phone is exactly what `success` is for.
            <View style={available ? pillStyle(theme, 'success') : chipStyle(theme)}>
              <TextV4
                size="xs"
                weight="semibold"
                style={{ color: available ? toneInk(theme, 'success') : theme.colors.onCard }}
              >
                {presence}
              </TextV4>
            </View>
          ) : null}
        </View>
      </View>

      {phone || email ? (
        <View {...DECORATIVE} style={{ gap: tokens.spacing.xs }}>
          {phone ? (
            <TextV4 size="sm" tone="onCard" numeric="tabular">
              {phone}
            </TextV4>
          ) : null}
          {email ? (
            <TextV4 size="sm" tone="onCard" numberOfLines={1}>
              {email}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      {canCall || canEmail ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {canCall ? (
            <ButtonV4
              variant="primary"
              size="sm"
              onPress={onCall}
              // The person and the number, so a rotor full of "Call" becomes a
              // rotor of distinct actions — see change 1.
              accessibilityLabel={spokenLine([callLabel, name, phone])}
              style={{ flex: 1, minHeight: tap }}
            >
              {callLabel}
            </ButtonV4>
          ) : null}
          {canEmail ? (
            <ButtonV4
              variant="secondary"
              size="sm"
              onPress={onEmail}
              accessibilityLabel={spokenLine([emailLabel, name, email])}
              style={{ flex: 1, minHeight: tap }}
            >
              {emailLabel}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}

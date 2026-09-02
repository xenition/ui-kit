import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { cardSurfaceStyle, headcountLabel, metaLine, spokenName } from './internal/tone-v4';
import type { CompanyCardProps } from './CompanyCard';

export interface CompanyCardV4Props extends CompanyCardProps {
  /** Copy on the follow action. Default `'Follow'`. */
  followLabel?: string;
  /** Copy once following. Default `'Following'`. */
  followingLabel?: string;
  /**
   * Render the headcount chip. Default `'200 employees'`. Only reached when
   * `company.size` is a plain number — see the note below.
   */
  formatEmployees?: (count: number) => string;
  /** Render the open-roles chip. Default `'12 open roles'` / `'No open roles'`. */
  formatOpenRoles?: (count: number) => string;
}

/**
 * **V4 company card** — same props as {@link CompanyCard} plus `followLabel`,
 * `followingLabel`, `formatEmployees` and `formatOpenRoles`.
 *
 * ## Five changes
 *
 * 1. **A dead Follow button is no longer drawn.**
 *    `<CompanyCard company={c} following />` rendered a focusable, pressable
 *    button wired to nothing — the worst kind of control, because it looks
 *    exactly like the working one. V4 draws the *button* only when
 *    `onToggleFollow` is given; a `following` flag with no handler is a fact,
 *    so it is drawn as a chip that states the fact and takes no focus.
 * 2. **The follow state is announced.** There was no `accessibilityState` (and
 *    no `aria-pressed` on the web twin) anywhere on it, so the reader heard
 *    "Following, button" and could not tell whether pressing would follow or
 *    unfollow. It is a toggle and now says so.
 * 3. **The button is a sibling of the card's activation**, not a child of it.
 *    A `Pressable` is `accessible` by default and flattens its subtree, so
 *    inside the card's own press the Follow button was not a focus stop at
 *    all — the same defect found in `PodcastRow`, `ContactCard`, `WalletCard`,
 *    `SessionCard` and `VenueCard` before it.
 * 4. **Both chips are localisable and neither is silent.** `${size} employees`
 *    and `${n} open roles` were hard-coded English inside a `View` nobody
 *    could read, and the card's name stopped at the industry — so the
 *    headcount and the open-roles count, the two facts a candidate is
 *    comparing, reached nobody. Both formatters are props and both strings are
 *    part of the card's name.
 * 5. **Tokens.** `muted` was inking the meta line — it is a fill with no
 *    contrast promise — and the card sat on `surface`, which is the page
 *    colour, so in dark mode a card was invisible against the page behind it.
 *    `card`/`onCard`, `mutedText`, and press as a state layer rather than
 *    `opacity: 0.9`.
 *
 * ## Why `formatEmployees` takes a number
 *
 * `Company.size` is documented as a **free-form** label — `'51–200'` — so a
 * numeric formatter can only be applied when an app happens to have stored a
 * plain count. It is, then; a range keeps the base's own wording rather than
 * being coerced into a number it is not. The prop's shape is fixed by the
 * spec's table and is identical on the web twin.
 *
 * **Renders nothing without a company name** (§4.5).
 */
export function CompanyCardV4({
  company,
  following,
  onToggleFollow,
  onPress,
  followLabel = 'Follow',
  followingLabel = 'Following',
  formatEmployees,
  formatOpenRoles,
  style,
}: CompanyCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!company?.name) return null;

  const meta = metaLine([company.industry, company.location]);
  const headcount = headcountLabel(company.size, formatEmployees);
  const roles =
    typeof company.openRoles === 'number'
      ? (formatOpenRoles ??
          ((n: number) => (n > 0 ? `${n} open roles` : 'No open roles')))(company.openRoles)
      : null;

  const isFollowing = following === true;
  const followWord = isFollowing ? followingLabel : followLabel;
  const name = spokenName([company.name, meta, headcount, roles]);

  const body = (
    <>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
        <AvatarV4 src={company.logoUrl} name={company.name} size="lg" />
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          <TextV4 size="lg" weight="semibold" tone="onCard" numberOfLines={1}>
            {company.name}
          </TextV4>
          {meta ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {meta}
            </TextV4>
          ) : null}
        </View>
      </View>

      {headcount || roles ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          {headcount ? (
            <BadgeV4 tone="neutral" size="sm">
              {headcount}
            </BadgeV4>
          ) : null}
          {roles ? (
            <BadgeV4
              tone={(company.openRoles ?? 0) > 0 ? 'primary' : 'neutral'}
              variant="soft"
              size="sm"
            >
              {roles}
            </BadgeV4>
          ) : null}
        </View>
      ) : null}
    </>
  );

  return (
    <View style={[cardSurfaceStyle(theme), style]}>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={() => onPress(company)}
          style={({ pressed }) => ({
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
          })}
        >
          {body}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name} style={{ gap: tokens.spacing.md }}>
          {body}
        </View>
      )}

      {/* A sibling of the activation — see change 3. */}
      {onToggleFollow ? (
        <ButtonV4
          variant={isFollowing ? 'secondary' : 'primary'}
          size="sm"
          onPress={() => onToggleFollow(company)}
          accessibilityLabel={spokenName([followWord, company.name])}
          accessibilityState={{ selected: isFollowing }}
          style={{ minHeight: minTap(tokens.spacing) }}
        >
          {followWord}
        </ButtonV4>
      ) : isFollowing ? (
        // A state with no handler is a fact, not a control: it says so and
        // takes no focus, where the base drew a button wired to nothing.
        <View
          accessible
          accessibilityLabel={spokenName([followingLabel, company.name])}
          style={{ alignSelf: 'flex-start' }}
        >
          <BadgeV4 tone="neutral" variant="outline" size="sm">
            {followingLabel}
          </BadgeV4>
        </View>
      ) : null}
    </View>
  );
}

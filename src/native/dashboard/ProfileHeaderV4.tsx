import * as React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import type { AvatarStatus } from '../primitives/Avatar';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import type { ProfileHeaderProps } from './ProfileHeader';

export interface ProfileHeaderV4Props extends Omit<ProfileHeaderProps, 'name'> {
  /**
   * The person's name. Optional in V4 — an account screen rendered before the
   * profile has loaded is a real state, and it should draw the block it is
   * about to fill rather than crash on a missing string.
   */
  name?: string;
  /**
   * Replace the avatar entirely — a workspace logo, a `BadgeV4`, an illustrated
   * mark. Takes precedence over `avatarUrl`; `AvatarV4` is what renders when
   * this is absent, which is the normal case.
   */
  avatar?: React.ReactNode;
  /** Presence dot on the avatar, forwarded to `AvatarV4`. */
  status?: AvatarStatus;
  /**
   * Open the profile. When set, the avatar + name + subtitle become one
   * tappable region carrying §4.3's state layer; `actions` stays **outside**
   * it, so the block never nests one pressable inside another.
   *
   * The web twin spells this `onClick` — the same platform-name divergence
   * `AuthStickyFooterV4` documents, and the one §5 asks for here by name.
   */
  onPress?: () => void;
  /**
   * Draw a hairline under the block. **Default `false`.** See the note on the
   * component.
   */
  divided?: boolean;
  /** Clamp the name to N lines. Default `1`, as the base truncated. */
  nameLines?: number;
  /** Clamp the subtitle to N lines. Default `1`, as the base truncated. */
  subtitleLines?: number;
  /** Test hook on the outer block. */
  testID?: string;
}

/**
 * `ProfileHeader`, V4 — the block that tops the account screen, drawn as an
 * identity rather than as a list row. Native twin of the web `ProfileHeaderV4`,
 * at prop parity.
 *
 * ## What V4 changes
 *
 * §3's product is warm, generous and airy, and §5 asks this block to "feel
 * generous, not like a row". The base is a row: a `lg` avatar, an `xl` name, a
 * `sm` subtitle in `colors.muted`, a literal `gap: 2` between the two lines,
 * and no vertical padding at all — an anonymous strip a settings row could be
 * mistaken for.
 *
 * 1. **A real avatar.** `AvatarV4` at `size="xl"` (72 on the stock scale, and
 *    composed from the spacing scale so a re-scaled seed re-scales it). It is
 *    the V4 avatar, so the monogram ground is derived from the name rather than
 *    being the same brand-tinted disc every person gets, and `status` names the
 *    presence state for a screen reader instead of relying on hue.
 * 2. **A confident name.** `TextV4 size="2xl" weight="bold" tone="onSurface"`
 *    in the seed's heading face — the loudest thing in the block, which is what
 *    a person's name is on their own screen. The base set no `fontFamily` at
 *    all, so a seed that chose a display face did not get it here.
 * 3. **Calm supporting text.** `size="base" tone="mutedText"` (§5; the base
 *    used `sm` and `colors.muted`). **`mutedText`, never the `muted` fill** —
 *    `muted` is decorative and carries no contrast promise against `surface`,
 *    and a handle or a role is a line the user is meant to read. This is the
 *    exact bug the shadcn pass closed elsewhere and this module kept.
 * 4. **Air around it.** `spacing.lg` vertically and `spacing.md` between the
 *    avatar and the text (§4.1), with `spacing.xs` between the name and its
 *    supporting line — the literal `gap: 2` §1 names as a violation.
 * 5. **The whole identity can open the profile.** {@link
 *    ProfileHeaderV4Props.onPress} makes the avatar + name + subtitle one
 *    tappable region with §4.3's state layer — `pressFill`, the **opaque**
 *    flavour composited against `surface`, because the name carries a measured
 *    contrast promise against the fill it is drawn on. `actions` sits outside
 *    that region, so a header with an "Edit" button never nests a pressable
 *    inside a pressable. There is no `opacity: pressed ? 0.7 : 1` anywhere
 *    here; dimming the content is how M3 spells *disabled*.
 *
 * ## ⚠️ No hairline, by default
 *
 * §4.4: a separator groups rows *inside* a container, and **between
 * free-standing blocks the structuring device is space, not a rule** — "a
 * hairline under every screen title is admin styling". A profile header is a
 * free-standing block at the top of a screen, so
 * {@link ProfileHeaderV4Props.divided} defaults to **`false`**, exactly as
 * `PageHeaderV4`'s does, and puts the same 1px `colors.border` back when a
 * surface genuinely needs the edge. The base drew no border either, so nothing
 * moves for an existing caller — this is the rule being stated, not a default
 * being changed.
 *
 * **No card.** §5: the block sits directly on the page ground. No `card`
 * ground, no radius, no elevation — §4.6 gives a shadow to a card, a sheet and
 * the one dominant action, and this is none of the three.
 *
 * **It renders nothing when it has nothing** (§4.5): no name, no subtitle, no
 * avatar of any kind and no actions produces `null`, not an empty block holding
 * `spacing.lg` of padding open with a silhouette in it.
 */
export function ProfileHeaderV4({
  name,
  subtitle,
  avatarUrl,
  avatar,
  status,
  actions,
  onPress,
  divided = false,
  nameLines = 1,
  subtitleLines = 1,
  style,
  testID,
}: ProfileHeaderV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const hasName = name != null && name !== '';
  const hasSubtitle = subtitle != null && subtitle !== '';
  const hasAvatar = avatar != null || (avatarUrl != null && avatarUrl !== '');

  // §4.5 — a component with nothing to show renders nothing. A lone silhouette
  // over a name-shaped gap is not an identity.
  if (!hasName && !hasSubtitle && !hasAvatar && actions == null) return null;

  const face = avatar ?? <AvatarV4 src={avatarUrl} name={name} size="xl" status={status} />;

  const lines = (
    <View style={{ flexGrow: 1, flexShrink: 1, gap: tokens.spacing.xs }}>
      {hasName ? (
        <TextV4
          size="2xl"
          weight="bold"
          tone="onSurface"
          face="heading"
          numberOfLines={nameLines}
        >
          {name}
        </TextV4>
      ) : null}
      {hasSubtitle ? (
        <TextV4 size="base" tone="mutedText" face="body" numberOfLines={subtitleLines}>
          {subtitle}
        </TextV4>
      ) : null}
    </View>
  );

  const identityStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    flexGrow: 1,
    flexShrink: 1,
  };

  const identity = onPress ? (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        identityStyle,
        {
          // The layer is a fill, and a fill drawn exactly at the bounding box
          // of an avatar and two lines of text reads as a shrink-wrapped
          // rectangle rather than as the block lighting up. `spacing.sm` of
          // padding pulled back by the same negative margin gives it somewhere
          // to be without moving anything — `picker-v4`'s `ringWrap` trick.
          padding: tokens.spacing.sm,
          margin: -tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          // The opaque flavour of §4.3's state layer: the name is
          // contrast-checked against `surface`, so what it lights up with has
          // to be an opaque mix of that same pair.
          backgroundColor: pressed ? pressFill(theme) : 'transparent',
        },
      ]}
    >
      <View style={{ flexShrink: 0 }}>{face}</View>
      {lines}
    </Pressable>
  ) : (
    <View style={identityStyle}>
      <View style={{ flexShrink: 0 }}>{face}</View>
      {lines}
    </View>
  );

  return (
    <View
      testID={testID}
      accessibilityRole="header"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.lg,
        },
        // §4.4 — off by default. The hairline is opt-in, not the house style.
        divided ? { borderBottomWidth: 1, borderBottomColor: colors.border } : null,
        style,
      ]}
    >
      {hasName || hasSubtitle || hasAvatar ? identity : null}
      {actions != null ? <View style={{ flexShrink: 0 }}>{actions}</View> : null}
    </View>
  );
}

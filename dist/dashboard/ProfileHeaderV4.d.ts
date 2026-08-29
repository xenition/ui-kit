import * as React from 'react';
import type { AvatarStatus } from '../primitives/AvatarV4';
import type { ProfileHeaderProps } from './ProfileHeader';
export interface ProfileHeaderV4Props extends Omit<ProfileHeaderProps, 'name' | 'onClick'> {
    /**
     * The person's name. Optional in V4 — an account screen rendered before the
     * profile has loaded is a real state, and it should draw the block it is
     * about to fill rather than crash on a missing string.
     */
    name?: string;
    /** Optional line under the name, e.g. a role or handle. */
    subtitle?: string;
    /** Optional avatar image URL; falls back to a monogram derived from `name`. */
    avatarUrl?: string;
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
     * it, so the block never nests one button inside another.
     *
     * Typed `() => void` rather than a DOM handler, to match the native twin's
     * `onPress` — the same platform-name divergence `AuthStickyFooterV4`
     * documents, and the one §5 asks for here by name.
     */
    onClick?: () => void;
    /**
     * Draw a hairline under the block. **Default `false`.** See the note on the
     * component.
     */
    divided?: boolean;
    /** Clamp the name to N lines. Default `1`, as the base truncated. */
    nameLines?: number;
    /** Clamp the subtitle to N lines. Default `1`, as the base truncated. */
    subtitleLines?: number;
}
/**
 * `ProfileHeader`, V4 — the block that tops the account screen, drawn as an
 * identity rather than as a list row.
 *
 * ## What V4 changes
 *
 * §3's product is warm, generous and airy, and §5 asks this block to "feel
 * generous, not like a row". The base is a row: a `lg` avatar, a `text-xl`
 * name, a `text-sm` subtitle in `colors.muted`, `gap-0.5` between the two
 * lines, and no vertical padding at all — an anonymous strip that a settings
 * row could be mistaken for.
 *
 * 1. **A real avatar.** `AvatarV4` at `size="xl"` (72 on the stock scale, and
 *    composed from the spacing scale so a re-scaled seed re-scales it). It is
 *    the V4 avatar, so the monogram ground is derived from the name rather
 *    than being the same brand-tinted disc every person gets, and `status`
 *    names the presence state for a screen reader instead of relying on hue.
 * 2. **A confident name.** `TextV4 size="2xl" weight="bold" tone="onSurface"`
 *    in the seed's heading face — the loudest thing in the block, which is
 *    what a person's name is on their own screen.
 * 3. **Calm supporting text.** `size="base" tone="mutedText"` (§5; the base
 *    used `sm` and `colors.muted`). **`mutedText`, never the `muted` fill** —
 *    `muted` carries no contrast promise against `surface`, and a handle or a
 *    role is a line the user is meant to read.
 * 4. **Air around it.** `spacing.lg` vertically and `spacing.md` between the
 *    avatar and the text (§4.1), with `spacing.xs` between the name and its
 *    supporting line — the literal `gap-0.5` §1 names as a violation.
 * 5. **The whole identity can open the profile.** {@link
 *    ProfileHeaderV4Props.onClick} makes the avatar + name + subtitle one
 *    tappable region with §4.3's state layer — `data-xen-v4-state`, the
 *    opaque flavour over `surface`, because the name carries a measured
 *    contrast promise against the ground it is drawn on. `actions` sits
 *    outside that region, so a header with an "Edit" button never nests a
 *    button inside a button. There is no `hover:opacity-80` anywhere here;
 *    dimming the content is how M3 spells *disabled*.
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
 * avatar of any kind and no actions produces `null`, not an empty block
 * holding `spacing.lg` of padding open with a silhouette in it.
 */
export declare const ProfileHeaderV4: React.ForwardRefExoticComponent<ProfileHeaderV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ProfileHeaderV4.d.ts.map
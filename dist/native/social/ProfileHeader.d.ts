import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One profile stat (posts / followers / following) rendered as a frosted tile. */
export interface ProfileStat {
    /** Short caption under the value (e.g. `Followers`). */
    label: string;
    /** Pre-formatted display value (e.g. `12.4k`). */
    value: string;
}
export interface ProfileHeaderProps {
    /** Display name shown large in near-white ink over the gradient. */
    name: string;
    /** `@handle` without the leading `@`; shown as the soft-ink subtitle. */
    handle?: string;
    /** Avatar image URL; falls back to initials from `name`. */
    avatarUrl?: string;
    /** Show the primary verified tick beside the name. */
    verified?: boolean;
    /** Short bio / tagline shown under the identity line. */
    bio?: string;
    /** Stats rendered as a row of frosted tiles (posts / followers / following). */
    stats?: readonly ProfileStat[];
    /** Optional cover image URL layered under the brand gradient scrim. */
    coverUrl?: string;
    /** Owner mode: when `true`, renders an "Edit profile" CTA instead of Follow. */
    owner?: boolean;
    /** Current follow state (drives the Follow/Following CTA label + style). */
    following?: boolean;
    /** Fires when the Follow / Following CTA is pressed (visitor mode). */
    onFollow?: () => void;
    /** Fires when the "Edit profile" CTA is pressed (owner mode). */
    onEditProfile?: () => void;
    /** Optional style override for the outer container. */
    style?: StyleProp<ViewStyle>;
}
/**
 * ProfileHeader — the profile-page hero for the social V4 "feed" line, and one of
 * the module's gradient identity moments. A brand-gradient cover (optionally over
 * a `coverUrl`) carries a large overlapping avatar, the name with a primary
 * verified tick, `@handle` + `bio` in near-white ink, a row of frosted stat tiles
 * (posts / followers / following), and a single CTA — "Edit profile" in `owner`
 * mode, otherwise a Follow / Following toggle. Every color derives from the brand
 * ramp via `GradientSurface` + `feed*` + `useXenitionTheme()` (no literals);
 * dark-mode safe.
 */
export declare function ProfileHeader({ name, handle, avatarUrl, verified, bio, stats, coverUrl, owner, following, onFollow, onEditProfile, style, }: ProfileHeaderProps): React.ReactElement;
//# sourceMappingURL=ProfileHeader.d.ts.map
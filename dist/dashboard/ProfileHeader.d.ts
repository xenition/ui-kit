import * as React from 'react';
export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    /** Optional line under the name, e.g. a role or handle. */
    subtitle?: string;
    /** Optional avatar image URL; falls back to initials from `name`. */
    avatarUrl?: string;
    /** Trailing action slot, e.g. an "Edit" button. */
    actions?: React.ReactNode;
}
/**
 * Profile / account header: avatar, name, subtitle, and a trailing action slot.
 * The web mirror of the block that tops most account and settings screens.
 * Token-only.
 */
export declare const ProfileHeader: React.ForwardRefExoticComponent<ProfileHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ProfileHeader.d.ts.map
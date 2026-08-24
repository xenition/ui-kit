import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ProfileHeaderProps {
    name: string;
    /** Optional line under the name, e.g. a role or handle. */
    subtitle?: string;
    /** Optional avatar image URL; falls back to initials from `name`. */
    avatarUrl?: string;
    /** Trailing action slot, e.g. an "Edit" button. */
    actions?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Profile / account header: avatar, name, subtitle, and a trailing action slot.
 * The native mirror of the block that tops most account and settings screens.
 * Token-only.
 */
export declare function ProfileHeader({ name, subtitle, avatarUrl, actions, style, }: ProfileHeaderProps): React.ReactElement;
//# sourceMappingURL=ProfileHeader.d.ts.map
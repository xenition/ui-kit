import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type FamilyRole = 'parent' | 'guardian' | 'child' | 'sibling' | 'grandparent' | 'caregiver' | 'other';
export interface FamilyMemberRowProps {
    /** Member's name. */
    name: string;
    /** Family role; drives the role chip. */
    role?: FamilyRole;
    /** Photo URL for the avatar; falls back to initials. */
    photoUrl?: string;
    /** Relationship detail line, e.g. "Mom" or "Age 8". */
    relationLabel?: string;
    /** Presence — shown as an online/offline dot + text (not color alone). */
    online?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A roster row for a family member: avatar, name, an optional relationship line,
 * a role chip, and an optional presence indicator (dot + "Online"/"Offline"
 * text, never color alone). Pressable when `onPress` is set. Token-only colors.
 */
export declare function FamilyMemberRow({ name, role, photoUrl, relationLabel, online, onPress, style, }: FamilyMemberRowProps): React.ReactElement;
//# sourceMappingURL=FamilyMemberRow.d.ts.map
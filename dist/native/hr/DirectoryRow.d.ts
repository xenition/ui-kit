import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Presence } from './internal';
export type DirectoryRowVariant = 'default' | 'compact';
export interface DirectoryRowProps {
    /** Person's name. */
    name: string;
    /** Job title / role. */
    title?: string;
    /** Department / team. */
    department?: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Work email — shown on the default variant. */
    email?: string;
    /** Phone / extension — shown on the default variant. */
    phone?: string;
    /** Live presence — shown as a glyph + word, never color alone. */
    presence?: Presence;
    /** Density. `compact` drops the contact meta. */
    variant?: DirectoryRowVariant;
    /** Tap handler for the row. */
    onPress?: () => void;
    /** Trailing quick-action (e.g. a message icon button). */
    onMessage?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Dense people-directory row: avatar with presence, name, title / department,
 * and contact meta (email / phone). Presence is conveyed by a glyph + word pill
 * so it never depends on color alone. `compact` trims to name + title for tight
 * lists. Optional trailing message affordance. All colors are theme tokens —
 * no literals.
 */
export declare function DirectoryRow({ name, title, department, avatarUrl, email, phone, presence, variant, onPress, onMessage, testID, style, }: DirectoryRowProps): React.ReactElement;
//# sourceMappingURL=DirectoryRow.d.ts.map
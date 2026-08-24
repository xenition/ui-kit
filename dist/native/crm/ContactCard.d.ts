import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ContactCardVariant = 'default' | 'compact';
export interface ContactAction {
    key: string;
    /** Glyph shown on the pill (e.g. `📞`, `✉`). */
    glyph: string;
    /** Accessible label (e.g. "Call"). */
    label: string;
    onPress: () => void;
}
export interface ContactCardProps {
    /** Full name. */
    name: string;
    /** Job title / role. */
    title?: string;
    /** Company / account. */
    company?: string;
    /** Avatar image URL; initials of `name` are the fallback. */
    avatarUrl?: string;
    /** Free-form labels (segments, interests). */
    tags?: string[];
    /** Quick-action pills (call / email / …). */
    actions?: ContactAction[];
    variant?: ContactCardVariant;
    /** Skeleton placeholder while data loads. */
    loading?: boolean;
    /** Tap handler for the card body. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Profile card for a CRM contact: avatar, name, title, company, tag chips and a
 * row of quick-action pills (call / email / etc — caller-supplied glyph +
 * handler). `compact` hides tags and actions for list rows. Guards an empty
 * `tags`/`actions` array (renders nothing) and offers a `loading` skeleton.
 * All colors are theme tokens.
 */
export declare function ContactCard({ name, title, company, avatarUrl, tags, actions, variant, loading, onPress, testID, style, }: ContactCardProps): React.ReactElement;
//# sourceMappingURL=ContactCard.d.ts.map
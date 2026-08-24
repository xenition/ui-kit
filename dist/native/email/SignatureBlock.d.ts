import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SignatureContactLine {
    id: string;
    /** Glyph for the line (e.g. '✉️', '📞', '🌐'). */
    glyph?: string;
    /** The value text (email, phone, url). */
    value: string;
}
export interface SignatureBlockProps {
    /** Signer name. */
    name: string;
    /** Job title / role. */
    title?: string;
    /** Company / organisation. */
    company?: string;
    /** Avatar / logo image URI. */
    avatarUri?: string;
    /** Contact lines (email, phone, website…). */
    contacts?: SignatureContactLine[];
    /** Optional freeform tagline under the contacts. */
    tagline?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * An email signature block — avatar/logo, name, title · company, and a set of
 * contact lines (email / phone / website). Rendered read-only for a thread
 * footer or compose preview; a leading accent rule anchors it. All colors from
 * theme tokens. No literal colors.
 */
export declare function SignatureBlock({ name, title, company, avatarUri, contacts, tagline, style, }: SignatureBlockProps): React.ReactElement;
//# sourceMappingURL=SignatureBlock.d.ts.map
import * as React from 'react';
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
    /** Avatar / logo image URL. */
    avatarUri?: string;
    /** Contact lines (email, phone, website…). */
    contacts?: SignatureContactLine[];
    /** Optional freeform tagline under the contacts. */
    tagline?: string;
    className?: string;
}
/**
 * An email signature block — avatar/logo, name, title · company, and a set of
 * contact lines (email / phone / website). Rendered read-only for a thread
 * footer or compose preview; a leading accent rule (token border) anchors it.
 * All colors from token classes. No literal colors.
 */
export declare const SignatureBlock: React.ForwardRefExoticComponent<SignatureBlockProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SignatureBlock.d.ts.map
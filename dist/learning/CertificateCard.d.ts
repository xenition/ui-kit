import * as React from 'react';
/** Certificate emphasis — sets the seal tone. */
export type CertificateVariant = 'standard' | 'honors' | 'professional';
export interface CertificateCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Course / program the certificate is for. */
    courseTitle: string;
    /** The learner's name. */
    recipient: string;
    /** Issuer / academy name. */
    issuer?: string;
    /** Human issue date, e.g. "May 2026". */
    issuedOn?: string;
    /** Credential id / verification code. */
    credentialId?: string;
    /** Emphasis variant. */
    variant?: CertificateVariant;
    /** Share / download CTA label. */
    actionLabel?: string;
    /** Fires when the CTA is clicked. */
    onAction?: () => void;
}
/**
 * An earned-certificate card: a seal, the certificate type, the course, the
 * recipient, and issuer / date / credential metadata, plus an optional
 * share/download action. `variant` sets the seal glyph and tone. Token-only
 * colors (`--xen-*`).
 */
export declare const CertificateCard: React.ForwardRefExoticComponent<CertificateCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CertificateCard.d.ts.map
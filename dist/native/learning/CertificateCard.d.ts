import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Certificate emphasis — sets the seal tone. */
export type CertificateVariant = 'standard' | 'honors' | 'professional';
export interface CertificateCardProps {
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
    /** Fires when the CTA is pressed. */
    onAction?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An earned-certificate card: a seal, the certificate type, the course, the
 * recipient, and issuer / date / credential metadata, plus an optional
 * share/download action. `variant` sets the seal glyph and tone. Token-only
 * colors.
 */
export declare function CertificateCard({ courseTitle, recipient, issuer, issuedOn, credentialId, variant, actionLabel, onAction, style, }: CertificateCardProps): React.ReactElement;
//# sourceMappingURL=CertificateCard.d.ts.map
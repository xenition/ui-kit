import * as React from 'react';
import type { CertificateCardProps } from './CertificateCard';
/** Drop-in for {@link CertificateCardProps} — same props, the V4 "campus" design. */
export type CertificateCardV4Props = CertificateCardProps;
/**
 * CertificateCard — **V4** "campus" design (native twin of the web V4), and the
 * ONE reserved gradient moment of the learning V4 "campus" line: the award hero
 * (seal, certificate type, "This certifies that", recipient) rides a rounded,
 * overflow-hidden `GradientSurface` on the brand gradient (`campusGradient`) in
 * near-white ink (`campusInk` / `campusInkSoft`). The body — the course, plus
 * issuer / date / credential metadata and an optional share action — stays on the
 * plain surface. Reuses the base `variant`
 * (`standard` / `honors` / `professional`), which sets the seal glyph + label.
 * Token-only colors via `useXenitionTheme()` + the campus ramp helpers.
 */
export declare function CertificateCardV4({ courseTitle, recipient, issuer, issuedOn, credentialId, variant, actionLabel, onAction, style, }: CertificateCardV4Props): React.ReactElement;
//# sourceMappingURL=CertificateCardV4.d.ts.map
import * as React from 'react';
import type { CertificateCardProps } from './CertificateCard';
/** Drop-in for {@link CertificateCardProps} — same props, the V4 "campus" design. */
export type CertificateCardV4Props = CertificateCardProps;
/**
 * CertificateCard — **V4** "campus" design (web parity of the native V4), and the
 * ONE reserved gradient moment of the learning V4 "campus" line: the award hero
 * (seal, certificate type, "This certifies that", recipient) rides a
 * brand-gradient ground (`bg-gradient-to-br from-primary-500 to-primary-700`) in
 * near-white ink (`text-primary-50` / `text-primary-100`). The body — the course,
 * plus issuer / date / credential metadata and an optional share action — stays
 * on the plain surface. Reuses the base `variant`
 * (`standard` / `honors` / `professional`), which sets the seal glyph + label.
 * All colors from `--xen-*` token classes / gradient utilities (no literals).
 */
export declare const CertificateCardV4: React.ForwardRefExoticComponent<CertificateCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CertificateCardV4.d.ts.map
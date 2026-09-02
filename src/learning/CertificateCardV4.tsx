import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { CertificateCardProps, CertificateVariant } from './CertificateCard';

/** Drop-in for {@link CertificateCardProps} — same props, the V4 "campus" design. */
export type CertificateCardV4Props = CertificateCardProps;

const VARIANT_META: Record<CertificateVariant, { seal: string; label: string }> = {
  standard: { seal: '🎓', label: 'Certificate of Completion' },
  honors: { seal: '🏅', label: 'Certificate with Honors' },
  professional: { seal: '📜', label: 'Professional Certificate' },
};

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
export const CertificateCardV4 = React.forwardRef<HTMLDivElement, CertificateCardV4Props>(function CertificateCardV4(
  { courseTitle, recipient, issuer, issuedOn, credentialId, variant = 'standard', actionLabel = 'Share', onAction, className, ...rest },
  ref
) {
  const meta = VARIANT_META[variant];

  return (
    <div
      ref={ref}
      data-xen-certificate-card=""
      aria-label={`${meta.label} for ${courseTitle}, awarded to ${recipient}`}
      className={cn('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm', className)}
      {...rest}
    >
      {/* Reserved gradient moment: the certificate award hero. */}
      <div className="flex flex-col items-center gap-1 bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)] text-center text-primary-50">
        <span className="text-4xl" aria-hidden="true">{meta.seal}</span>
        <span className="text-xs font-bold uppercase tracking-wide text-primary-100">{meta.label}</span>
        <span className="mt-1 text-sm text-primary-100">This certifies that</span>
        <span className="text-2xl font-bold text-primary-50">{recipient}</span>
      </div>

      {/* Clean body: the course + metadata on the plain surface. */}
      <div className="flex flex-col items-center gap-1 p-[var(--xen-space-lg)] text-center">
        <span className="text-sm text-muted">has completed</span>
        <span className="text-lg font-semibold text-on-surface">{courseTitle}</span>

        {issuer || issuedOn || credentialId ? (
          <div className="mt-2 flex flex-col items-center gap-0.5">
            {issuer ? <span className="text-xs text-muted">Issued by {issuer}</span> : null}
            {issuedOn ? <span className="text-xs text-muted">{issuedOn}</span> : null}
            {credentialId ? <span className="text-xs tabular-nums text-muted">ID: {credentialId}</span> : null}
          </div>
        ) : null}

        {onAction ? (
          <div className="mt-3 self-stretch">
            <Button variant="secondary" onClick={onAction} className="w-full">{actionLabel}</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';

/** Certificate emphasis — sets the seal tone. */
export type CertificateVariant = 'standard' | 'honors' | 'professional';

interface VariantMeta {
  seal: string;
  /** Token `border-*` class for the frame. */
  borderClass: string;
  /** Token `text-*` class for the seal label. */
  textClass: string;
  label: string;
}

const VARIANT_META: Record<CertificateVariant, VariantMeta> = {
  standard: { seal: '🎓', borderClass: 'border-primary', textClass: 'text-primary', label: 'Certificate of Completion' },
  honors: { seal: '🏅', borderClass: 'border-accent', textClass: 'text-accent', label: 'Certificate with Honors' },
  professional: { seal: '📜', borderClass: 'border-success', textClass: 'text-success', label: 'Professional Certificate' },
};

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
export const CertificateCard = React.forwardRef<HTMLDivElement, CertificateCardProps>(
  function CertificateCard(
    { courseTitle, recipient, issuer, issuedOn, credentialId, variant = 'standard', actionLabel = 'Share', onAction, className, ...rest },
    ref
  ) {
    const meta = VARIANT_META[variant];

    return (
      <div
        ref={ref}
        aria-label={`${meta.label} for ${courseTitle}, awarded to ${recipient}`}
        className={cn(
          'flex flex-col items-center gap-2 rounded-[var(--xen-radius-lg)] border-2 bg-surface p-[var(--xen-space-xl)] text-center',
          meta.borderClass,
          className
        )}
        {...rest}
      >
        <span className="text-3xl" aria-hidden="true">
          {meta.seal}
        </span>
        <span className={cn('text-xs font-bold uppercase tracking-wide', meta.textClass)}>{meta.label}</span>
        <span className="text-sm text-muted">This certifies that</span>
        <span className="text-xl font-bold text-on-surface">{recipient}</span>
        <span className="text-sm text-muted">has completed</span>
        <span className="text-lg font-semibold text-on-surface">{courseTitle}</span>

        {issuer || issuedOn || credentialId ? (
          <div className="mt-2 flex flex-col items-center gap-0.5">
            {issuer ? <span className="text-xs text-muted">Issued by {issuer}</span> : null}
            {issuedOn ? <span className="text-xs text-muted">{issuedOn}</span> : null}
            {credentialId ? <span className="text-xs text-muted">ID: {credentialId}</span> : null}
          </div>
        ) : null}

        {onAction ? (
          <div className="mt-2 self-stretch">
            <Button variant="secondary" onClick={onAction} className="w-full">
              {actionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
);

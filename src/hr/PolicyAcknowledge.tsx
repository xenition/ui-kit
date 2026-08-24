import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Button, Checkbox } from '../primitives';
import { StatusPill } from './StatusPill';
import { POLICY_STATUS_META, type PolicyStatus } from './internal';

export type PolicyAcknowledgeVariant = 'default' | 'compact';

export interface PolicyAcknowledgeProps {
  /** Policy title (e.g. "Code of Conduct"). */
  title: string;
  /** Version / revision label (e.g. "v3.1"). */
  version?: string;
  /** Pre-formatted effective date. */
  effectiveDate?: string;
  /** Short summary of what's being acknowledged. */
  summary?: string;
  /** Acknowledgement status — glyph + word pill. */
  status?: PolicyStatus;
  /** Whether the user has acknowledged (controls the checkbox + action). */
  acknowledged?: boolean;
  /** Pre-formatted acknowledgement date (shown once acknowledged). */
  acknowledgedDate?: string;
  /** Consent line next to the checkbox. */
  consentLabel?: string;
  /** Density. */
  variant?: PolicyAcknowledgeVariant;
  /** Fires with the next checked value when the consent box is toggled. */
  onToggle?: (checked: boolean) => void;
  /** Fires when the acknowledge button is pressed. */
  onAcknowledge?: () => void;
  className?: string;
}

/**
 * A policy-acknowledgement card: title, version, effective date and a summary,
 * with a consent checkbox and an acknowledge action. Status is a glyph + word
 * pill (acknowledged → success, overdue → danger, never color alone). Once
 * acknowledged the control collapses to a confirmation line with the date. The
 * acknowledge button stays disabled until consent is checked. `compact` drops
 * the summary. All colors are `--xen-*` token classes — no literals. `forwardRef`
 * to the root `<div>`.
 */
export const PolicyAcknowledge = React.forwardRef<HTMLDivElement, PolicyAcknowledgeProps>(
  function PolicyAcknowledge(
    {
      title,
      version,
      effectiveDate,
      summary,
      status,
      acknowledged = false,
      acknowledgedDate,
      consentLabel = 'I have read and agree to this policy',
      variant = 'default',
      onToggle,
      onAcknowledge,
      className,
    },
    ref
  ) {
    const compact = variant === 'compact';
    const derivedStatus: PolicyStatus = status ?? (acknowledged ? 'acknowledged' : 'pending');
    const [consented, setConsented] = React.useState(false);

    const meta = [version, effectiveDate ? `Effective ${effectiveDate}` : null].filter(Boolean).join('  ·  ');

    const handleToggle = (next: boolean): void => {
      setConsented(next);
      onToggle?.(next);
    };

    return (
      <Card ref={ref} className={cn('flex flex-col gap-3', className)}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-base font-bold text-on-surface">{title}</p>
            {meta ? <p className="text-xs text-muted">{meta}</p> : null}
          </div>
          <StatusPill meta={POLICY_STATUS_META[derivedStatus]} size="sm" />
        </div>

        {!compact && summary ? <p className="line-clamp-4 text-sm text-muted">{summary}</p> : null}

        {acknowledged ? (
          <p className="text-xs font-semibold text-success">
            ✓ Acknowledged{acknowledgedDate ? ` on ${acknowledgedDate}` : ''}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3">
              <Checkbox
                checked={consented}
                onChange={(e) => handleToggle(e.target.checked)}
                aria-label={consentLabel}
              />
              <span className="flex-1 text-xs text-on-surface">{consentLabel}</span>
            </label>
            <Button size="sm" variant="primary" disabled={!consented} onClick={onAcknowledge}>
              Acknowledge
            </Button>
          </div>
        )}
      </Card>
    );
  }
);

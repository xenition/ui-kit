import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, type ButtonVariant } from '../primitives/Button';
import { Icon, type IconColor } from '../primitives/Icon';

/** Severity of the escalation. `critical` maps to danger, `warning` to warn. */
export type EscalationLevel = 'info' | 'warning' | 'critical';

export interface EscalationBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Severity level (default `warning`). */
  level?: EscalationLevel;
  /** Headline (e.g. "SLA breach imminent"). */
  title: string;
  /** Optional supporting line. */
  message?: string;
  /** Fires when the primary "Escalate" button is pressed. */
  onEscalate?: () => void;
  /** Fires when the secondary "Acknowledge"/dismiss button is pressed. */
  onAcknowledge?: () => void;
  /** Primary button label (default "Escalate"). */
  escalateLabel?: string;
  /** Secondary button label (default "Acknowledge"). */
  acknowledgeLabel?: string;
  /** Show the escalate button as busy (disabled — the web `Button` has no spinner). */
  escalating?: boolean;
}

interface LevelSpec {
  glyph: string;
  role: string;
  /** Icon token color slot + left-border token class. */
  iconColor: IconColor;
  borderCls: string;
  /** Escalate button variant. */
  escalateVariant: ButtonVariant;
}

// critical → danger, warning → warn, info → primary. The role word + glyph carry
// severity so it's never color-alone.
const LEVEL: Record<EscalationLevel, LevelSpec> = {
  info: { glyph: 'ℹ', role: 'Notice', iconColor: 'primary', borderCls: 'border-l-primary', escalateVariant: 'primary' },
  warning: { glyph: '⚠', role: 'Warning', iconColor: 'warn', borderCls: 'border-l-warn', escalateVariant: 'primary' },
  critical: { glyph: '⛔', role: 'Critical', iconColor: 'danger', borderCls: 'border-l-danger', escalateVariant: 'danger' },
};

/**
 * A prominent escalation banner for at-risk / breached tickets. Severity is
 * shown by a leading glyph, a role word ("Warning"/"Critical") **and** a
 * semantic left-border tone — never color alone — mapping `critical`→danger,
 * `warning`→warn, `info`→primary. Exposes an "Escalate" primary action
 * (`onEscalate`; disabled while `escalating`) and an "Acknowledge" secondary
 * (`onAcknowledge`). All colors come from token classes; no literal hex.
 */
export const EscalationBanner = React.forwardRef<HTMLDivElement, EscalationBannerProps>(
  function EscalationBanner(
    {
      level = 'warning',
      title,
      message,
      onEscalate,
      onAcknowledge,
      escalateLabel = 'Escalate',
      acknowledgeLabel = 'Acknowledge',
      escalating = false,
      className,
      ...rest
    },
    ref
  ) {
    const spec = LEVEL[level] ?? LEVEL.warning;

    return (
      <div
        ref={ref}
        role="alert"
        aria-label={`${spec.role}: ${title}${message ? `. ${message}` : ''}`}
        className={cn(
          'flex items-start gap-2 rounded-[var(--xen-radius-md)] border border-border border-l-4 bg-surface p-3',
          spec.borderCls,
          className
        )}
        {...rest}
      >
        <Icon glyph={spec.glyph} size="lg" color={spec.iconColor} aria-label={spec.role} />
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-base font-bold text-on-surface">{title}</span>
          {message ? <span className="text-sm text-muted">{message}</span> : null}
          {onEscalate || onAcknowledge ? (
            <div className="mt-1 flex gap-2">
              {onEscalate ? (
                <Button size="sm" variant={spec.escalateVariant} disabled={escalating} onClick={onEscalate}>
                  {escalateLabel}
                </Button>
              ) : null}
              {onAcknowledge ? (
                <Button size="sm" variant="ghost" onClick={onAcknowledge}>
                  {acknowledgeLabel}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

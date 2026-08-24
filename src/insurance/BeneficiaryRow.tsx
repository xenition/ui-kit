import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { formatPct } from './internal/format';
import { pressableProps } from './internal/pressable';

/** Whether the beneficiary is primary or contingent (secondary). */
export type BeneficiaryKind = 'primary' | 'contingent';

const KIND_LABEL: Record<BeneficiaryKind, string> = {
  primary: 'Primary',
  contingent: 'Contingent',
};

export interface BeneficiaryRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Beneficiary full name. */
  name: string;
  /** Relationship to the insured (e.g. "Spouse", "Child"). */
  relationship?: string;
  /** Benefit allocation as a whole percentage (0–100). */
  allocationPct: number;
  /** Primary vs contingent designation (default `primary`). */
  kind?: BeneficiaryKind;
  /** Optional avatar image URL. */
  avatarUrl?: string;
  /** Fires on row click (e.g. edit beneficiary). */
  onClick?: () => void;
}

/**
 * One beneficiary in a policy's allocation list: avatar (initials fallback),
 * name + relationship, a primary/contingent tag, and a right-aligned allocation
 * percentage. The percentage is clamped to 0–100 and rendered whole (no float
 * drift). Token-bound throughout; becomes a keyboard-operable button only when
 * `onClick` is supplied. Web parity of the native `BeneficiaryRow`.
 */
export const BeneficiaryRow = React.forwardRef<HTMLDivElement, BeneficiaryRowProps>(
  function BeneficiaryRow(
    { name, relationship, allocationPct, kind = 'primary', avatarUrl, onClick, className, ...rest },
    ref
  ) {
    const pct = Number.isFinite(allocationPct) ? Math.min(100, Math.max(0, allocationPct)) : 0;
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? `${name}, ${KIND_LABEL[kind]} beneficiary, ${formatPct(pct)}` : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <Avatar src={avatarUrl} name={name} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
          <p className="truncate text-xs text-muted">
            {KIND_LABEL[kind]}
            {relationship != null ? ` · ${relationship}` : ''}
          </p>
        </div>
        <span aria-label={`${formatPct(pct)} allocation`} className="text-lg font-bold text-primary">
          {formatPct(pct)}
        </span>
      </div>
    );
  }
);

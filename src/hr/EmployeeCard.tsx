import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  EMPLOYEE_STATUS_META,
  EMPLOYMENT_META,
  type EmployeeStatus,
  type EmploymentType,
} from './internal';

export type EmployeeCardVariant = 'default' | 'compact' | 'detailed';

export interface EmployeeContactAction {
  key: string;
  glyph: string;
  label: string;
  /** DOM click handler (web parity of the native `onPress`). */
  onClick: () => void;
}

export interface EmployeeCardProps {
  /** Full name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Department or team. */
  department?: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Employment arrangement — shown as a glyph + word chip. */
  employmentType?: EmploymentType;
  /** Lifecycle state — shown as a glyph + word chip, never color alone. */
  status?: EmployeeStatus;
  /** Location / office (detailed variant). */
  location?: string;
  /** Pre-formatted hire/start date (detailed variant). */
  startDate?: string;
  /** Quick contact affordances (call / email / message) — real `<button>`s. */
  actions?: EmployeeContactAction[];
  /** Visual density / emphasis. */
  variant?: EmployeeCardVariant;
  /** Render a placeholder skeleton instead of content. */
  loading?: boolean;
  /** Click handler for the whole card (web parity of native `onPress`). */
  onClick?: () => void;
  className?: string;
}

/**
 * Profile card for a single employee: avatar, name, title, department, and
 * employment-type / status chips (each a glyph + word so state never rests on
 * color alone). `compact` trims to a single row; `detailed` adds location and
 * start date. Quick contact `actions` render as real `<button>`s. Renders a
 * `loading` skeleton on demand. When `onClick` is set the card becomes a
 * keyboard-operable `role="button"`. All colors are `--xen-*` token classes —
 * no literals.
 */
export const EmployeeCard = React.forwardRef<HTMLDivElement, EmployeeCardProps>(function EmployeeCard(
  {
    name,
    title,
    department,
    avatarUrl,
    employmentType,
    status,
    location,
    startDate,
    actions,
    variant = 'default',
    loading = false,
    onClick,
    className,
  },
  ref
) {
  const compact = variant === 'compact';
  const detailed = variant === 'detailed';
  const interactive = onClick != null && !loading;

  return (
    <Card
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Employee ${name}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        'flex flex-col gap-3',
        interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      {loading ? (
        <div aria-label="Loading employee" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/5 rounded bg-neutral-200" />
            <div className="h-2.5 w-2/5 rounded bg-neutral-200" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold text-on-surface">{name}</p>
              {title ? (
                <p className="truncate text-sm text-muted">
                  {title}
                  {department ? ` · ${department}` : ''}
                </p>
              ) : department ? (
                <p className="truncate text-sm text-muted">{department}</p>
              ) : null}
            </div>
            {status ? <StatusPill meta={EMPLOYEE_STATUS_META[status]} size="sm" /> : null}
          </div>

          {!compact && (employmentType || detailed) ? (
            <div className="flex flex-wrap items-center gap-2">
              {employmentType ? <StatusPill meta={EMPLOYMENT_META[employmentType]} size="sm" /> : null}
              {detailed && location ? <span className="text-xs text-muted">📍 {location}</span> : null}
              {detailed && startDate ? <span className="text-xs text-muted">Since {startDate}</span> : null}
            </div>
          ) : null}

          {!compact && actions && actions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {actions.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  aria-label={a.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    a.onClick();
                  }}
                  className="inline-flex items-center gap-1 rounded-[var(--xen-radius-md)] bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span aria-hidden="true">{a.glyph}</span>
                  {a.label}
                </button>
              ))}
            </div>
          ) : null}
        </>
      )}
    </Card>
  );
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  EMPLOYEE_STATUS_META,
  EMPLOYMENT_META,
  type HrTone,
} from './internal';
import type { EmployeeCardProps } from './EmployeeCard';

/** Drop-in alternate design for {@link EmployeeCard} — identical Props. */
export type EmployeeCardV2Props = EmployeeCardProps;

/** Tone → soft background tint (token-bound opacity, never a literal). */
const TONE_TINT: Record<HrTone, string> = {
  neutral: 'bg-neutral-100',
  primary: 'bg-primary/10',
  success: 'bg-success/10',
  warn: 'bg-warn/10',
  danger: 'bg-danger/10',
  accent: 'bg-accent/10',
};

/**
 * EmployeeCard, design **V2** — a banner-header profile card. A tone-tinted
 * banner (derived from the employee's status, never color alone) sits above an
 * overlapping ringed avatar; name, title and department stack below, followed by
 * employment / location / start-date chips and a full-width row of contact
 * `<button>`s. Same Props as {@link EmployeeCard}, so it swaps in with no
 * call-site change. Elevated with a subtle hover lift; token-pure (no literals).
 */
export const EmployeeCardV2 = React.forwardRef<HTMLDivElement, EmployeeCardV2Props>(function EmployeeCardV2(
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
    loading = false,
    onClick,
    className,
  },
  ref
) {
  const interactive = onClick != null && !loading;
  const bannerTone: HrTone = status ? EMPLOYEE_STATUS_META[status].tone : 'primary';

  return (
    <Card
      ref={ref}
      variant="elevated"
      padding="none"
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
        'overflow-hidden transition duration-200 motion-reduce:transition-none',
        interactive &&
          'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      {loading ? (
        <div aria-label="Loading employee" className="p-4">
          <div className="h-12 animate-pulse rounded bg-neutral-100" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-3/5 animate-pulse rounded bg-neutral-100" />
            <div className="h-2.5 w-2/5 animate-pulse rounded bg-neutral-100" />
          </div>
        </div>
      ) : (
        <>
          {/* Tone banner — meaning also carried by the status pill below. */}
          <div className={cn('h-14', TONE_TINT[bannerTone])} aria-hidden="true" />
          <div className="flex flex-col gap-2 px-4 pb-4">
            <div className="-mt-6 flex items-end justify-between gap-2">
              <span className="rounded-full ring-2 ring-surface">
                <Avatar size="xl" name={name} src={avatarUrl} ring />
              </span>
              {status ? <StatusPill meta={EMPLOYEE_STATUS_META[status]} size="sm" className="mb-1" /> : null}
            </div>

            <div>
              <p className="truncate text-lg font-bold text-on-surface">{name}</p>
              {title || department ? (
                <p className="truncate text-sm text-muted">{[title, department].filter(Boolean).join(' · ')}</p>
              ) : null}
            </div>

            {employmentType || location || startDate ? (
              <div className="flex flex-wrap items-center gap-2">
                {employmentType ? <StatusPill meta={EMPLOYMENT_META[employmentType]} size="sm" /> : null}
                {location ? <span className="text-xs text-muted">📍 {location}</span> : null}
                {startDate ? <span className="text-xs text-muted">Since {startDate}</span> : null}
              </div>
            ) : null}

            {actions && actions.length > 0 ? (
              <div className="mt-1 flex gap-2">
                {actions.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    aria-label={a.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      a.onClick();
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span aria-hidden="true">{a.glyph}</span>
                    {a.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </>
      )}
    </Card>
  );
});

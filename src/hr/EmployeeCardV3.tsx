import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import {
  EMPLOYEE_STATUS_META,
  EMPLOYMENT_META,
  TONE_TEXT_CLASS,
} from './internal';
import type { EmployeeCardProps } from './EmployeeCard';

/** Drop-in alternate design for {@link EmployeeCard} — identical Props. */
export type EmployeeCardV3Props = EmployeeCardProps;

/**
 * EmployeeCard, design **V3** — a compact directory row. A small avatar, name +
 * title on one line, a trailing employment word, and the status carried by a
 * leading tone glyph plus its word (never color alone) — dense enough to stack
 * many per screen. Same Props as {@link EmployeeCard}; the card chrome is
 * dropped for a borderless hairline-divider row. Token-pure (no literals).
 */
export const EmployeeCardV3 = React.forwardRef<HTMLDivElement, EmployeeCardV3Props>(function EmployeeCardV3(
  {
    name,
    title,
    department,
    avatarUrl,
    employmentType,
    status,
    loading = false,
    onClick,
    className,
  },
  ref
) {
  const interactive = onClick != null && !loading;
  const statusMeta = status ? EMPLOYEE_STATUS_META[status] : undefined;

  return (
    <div
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
        'flex items-center gap-3 border-b border-border bg-surface px-2 py-2 transition-colors motion-reduce:transition-none',
        interactive &&
          'cursor-pointer hover:bg-neutral-100 active:scale-[.99] motion-reduce:active:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      {loading ? (
        <div aria-label="Loading employee" className="flex flex-1 items-center gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-100" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
        </div>
      ) : (
        <>
          <Avatar size="sm" name={name} src={avatarUrl} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
            {title || department ? (
              <p className="truncate text-xs text-muted">{[title, department].filter(Boolean).join(' · ')}</p>
            ) : null}
          </div>

          {employmentType ? (
            <span className="hidden text-xs text-muted sm:inline">{EMPLOYMENT_META[employmentType].label}</span>
          ) : null}

          {statusMeta ? (
            <span aria-label={statusMeta.label} className="flex items-center gap-1">
              <span aria-hidden="true" className={cn('text-sm', TONE_TEXT_CLASS[statusMeta.tone])}>
                {statusMeta.glyph}
              </span>
              <span className={cn('text-xs font-semibold', TONE_TEXT_CLASS[statusMeta.tone])}>{statusMeta.label}</span>
            </span>
          ) : null}
        </>
      )}
    </div>
  );
});

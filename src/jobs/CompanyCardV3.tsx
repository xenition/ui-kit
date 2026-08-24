import * as React from 'react';
import { Avatar, Badge, Button } from '../primitives';
import { cn } from '../primitives/cn';
import type { CompanyCardProps } from './CompanyCard';

/** Drop-in alternate: identical props to {@link CompanyCardProps}. */
export type CompanyCardV3Props = CompanyCardProps;

/**
 * CompanyCard — design V3 (web). A compact directory row: a small logo, the name
 * and `industry · location` meta stacked, and a trailing open-roles `Badge` plus
 * a small follow `Button`. Hairline-separated for dense lists. Same props as
 * {@link CompanyCardProps} (drop-in). Token-pure.
 */
export const CompanyCardV3 = React.forwardRef<HTMLDivElement, CompanyCardV3Props>(
  function CompanyCardV3({ company, following, onToggleFollow, onClick, className, ...rest }, ref) {
    const showFollow = following != null || onToggleFollow != null;
    const meta = [company.industry, company.location].filter(Boolean).join(' · ');
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        data-xen-company-card="v3"
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${company.name}${company.industry ? `, ${company.industry}` : ''}`}
        onClick={interactive ? () => onClick!(company) : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick!(company);
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center gap-md border-b border-border bg-surface px-md py-md text-on-surface',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <Avatar src={company.logoUrl} name={company.name} size="md" shape="rounded" />
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-on-surface">{company.name}</span>
          {meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
        </div>

        {typeof company.openRoles === 'number' && company.openRoles > 0 ? (
          <Badge tone="primary">{`${company.openRoles} open`}</Badge>
        ) : null}

        {showFollow ? (
          <Button
            variant={following ? 'secondary' : 'primary'}
            size="sm"
            onClick={
              onToggleFollow
                ? (e) => {
                    e.stopPropagation();
                    onToggleFollow(company);
                  }
                : undefined
            }
            aria-label={following ? `Following ${company.name} — tap to unfollow` : `Follow ${company.name}`}
          >
            {following ? 'Following' : 'Follow'}
          </Button>
        ) : null}
      </div>
    );
  }
);

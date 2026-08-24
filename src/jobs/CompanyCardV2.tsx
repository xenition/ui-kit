import * as React from 'react';
import { Avatar, Badge, Button } from '../primitives';
import { cn } from '../primitives/cn';
import type { CompanyCardProps } from './CompanyCard';

/** Drop-in alternate: identical props to {@link CompanyCardProps}. */
export type CompanyCardV2Props = CompanyCardProps;

/**
 * CompanyCard — design V2 (web). A profile-style card: a tinted banner strip, a
 * large rounded logo straddling it inside a surface ring, then the name, meta, a
 * headcount / open-roles badge row, and a full-width follow `Button`. Same props
 * as {@link CompanyCardProps} (drop-in). Token-pure — the banner and ring are
 * token tints, depth is the shared shadow scale, with a subtle hover lift.
 */
export const CompanyCardV2 = React.forwardRef<HTMLDivElement, CompanyCardV2Props>(
  function CompanyCardV2({ company, following, onToggleFollow, onClick, className, ...rest }, ref) {
    const showFollow = following != null || onToggleFollow != null;
    const meta = [company.industry, company.location].filter(Boolean).join(' · ');
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        data-xen-company-card="v2"
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
          'flex flex-col overflow-hidden rounded-lg border border-border bg-surface text-on-surface shadow-md',
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...rest}
      >
        {/* Banner strip. */}
        <div aria-hidden="true" className="h-14 bg-primary/10" />

        <div className="flex flex-col gap-md px-lg pb-lg">
          {/* Logo straddling the banner inside a surface ring. */}
          <div className="-mt-9 self-start rounded-lg bg-surface p-0.5">
            <Avatar src={company.logoUrl} name={company.name} size="xl" shape="rounded" />
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="truncate text-xl font-bold text-on-surface">{company.name}</span>
            {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
          </div>

          <div className="flex flex-wrap items-center gap-sm">
            {company.size ? <Badge tone="neutral">{`${company.size} employees`}</Badge> : null}
            {typeof company.openRoles === 'number' ? (
              <Badge tone={company.openRoles > 0 ? 'primary' : 'neutral'}>
                {company.openRoles > 0 ? `${company.openRoles} open roles` : 'No open roles'}
              </Badge>
            ) : null}
          </div>

          {showFollow ? (
            <Button
              variant={following ? 'secondary' : 'primary'}
              size="sm"
              className="w-full"
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
      </div>
    );
  }
);

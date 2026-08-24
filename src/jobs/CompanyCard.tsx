import * as React from 'react';
import { Avatar, Badge, Button } from '../primitives';
import { cn } from '../primitives/cn';
import type { Company } from './types';

export interface CompanyCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The company to render. */
  company: Company;
  /** Follow state; when set (or `onToggleFollow` given) a follow button shows. */
  following?: boolean;
  /** Fired when the follow toggle is pressed. */
  onToggleFollow?: (company: Company) => void;
  /** Fired when the card body is pressed (open company page). `onPress` → `onClick`. */
  onClick?: (company: Company) => void;
}

/**
 * An employer summary card — logo (`Avatar`), name, industry / location, a
 * headcount `Badge`, an open-roles count, and an optional follow `Button`.
 * Data + callbacks only; the follow button flips between primary "Follow" and
 * secondary "Following" while keeping an explicit accessible label. Tokens only.
 */
export const CompanyCard = React.forwardRef<HTMLDivElement, CompanyCardProps>(function CompanyCard(
  { company, following, onToggleFollow, onClick, className, ...rest },
  ref
) {
  const showFollow = following != null || onToggleFollow != null;
  const meta = [company.industry, company.location].filter(Boolean).join(' · ');
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      data-xen-company-card=""
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
        'flex flex-col gap-md rounded-lg border border-border bg-surface p-lg text-on-surface',
        interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-md">
        <Avatar src={company.logoUrl} name={company.name} size="lg" />
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="truncate text-lg font-semibold text-on-surface">{company.name}</span>
          {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
        </div>
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
          className="self-start"
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
});

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import type { TeamGridProps } from './TeamGrid';

/** Drop-in for {@link TeamGridProps} — same props, the V4 "showcase" design. */
export type TeamGridV4Props = TeamGridProps;

const COLUMN_CLASSES: Record<NonNullable<TeamGridV4Props['columns']>, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * TeamGrid — **V4** "showcase" design (web parity of the native V4). A
 * responsive grid of elevated member cards on the page ground (NOT a gradient
 * surface): each card an initials-fallback `avatar`, a bold `name`, a muted
 * `role`, optional `bio`, and a row of soft-primary social chips (each a
 * `≥44px` tap target that brightens on hover). Every `member` field (`name`,
 * `role`, `avatar`, `bio`, `socials`) honored. `columns` drives the breakpoint
 * grid. Same props/behavior as {@link TeamGridProps}; token-only colors, no
 * literals.
 */
export const TeamGridV4 = React.forwardRef<HTMLDivElement, TeamGridV4Props>(function TeamGridV4(
  { members, columns = 3, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-team-grid=""
      className={cn(
        'grid grid-cols-1 gap-[var(--xen-space-lg)]',
        COLUMN_CLASSES[columns],
        className
      )}
      {...rest}
    >
      {members.map((member, index) => (
        <div
          key={index}
          data-xen-team-member=""
          className="flex flex-col items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-center text-on-surface shadow-sm"
        >
          <Avatar src={member.avatar} name={member.name} size="lg" />
          <div className="flex flex-col gap-[var(--xen-space-xs)]">
            <h3 className="font-heading text-base font-extrabold tracking-tight">{member.name}</h3>
            {member.role !== undefined ? (
              <p className="text-sm font-medium text-muted">{member.role}</p>
            ) : null}
          </div>
          {member.bio !== undefined ? (
            <p className="text-sm leading-relaxed text-muted">{member.bio}</p>
          ) : null}
          {member.socials && member.socials.length > 0 ? (
            <div className="mt-[var(--xen-space-xs)] flex items-center justify-center gap-[var(--xen-space-sm)]">
              {member.socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-on-primary"
                >
                  {social.icon ?? social.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
});

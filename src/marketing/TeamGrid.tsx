import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';

export interface TeamMember {
  /** Display name — also the source for the initials-fallback avatar. */
  name: string;
  /** Role / title line. */
  role?: React.ReactNode;
  /** Short bio paragraph. */
  bio?: React.ReactNode;
  /** Avatar image URL; falls back to initials when omitted. */
  avatar?: string;
  /** Social links rendered as a row under the bio. */
  socials?: { label: string; href: string; icon?: React.ReactNode }[];
}

export interface TeamGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Team / member cards. */
  members: TeamMember[];
  /** Column count at the largest breakpoint. */
  columns?: 2 | 3 | 4;
}

const COLUMN_CLASSES: Record<NonNullable<TeamGridProps['columns']>, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/** Responsive grid of team/member cards with an initials-fallback avatar. */
export const TeamGrid = React.forwardRef<HTMLDivElement, TeamGridProps>(function TeamGrid(
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
          className="flex flex-col items-center gap-[var(--xen-space-sm)] border border-border bg-surface text-on-surface rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)] text-center"
        >
          <Avatar src={member.avatar} name={member.name} size="lg" />
          <div className="flex flex-col gap-[var(--xen-space-xs)]">
            <h3 className="font-heading text-base font-semibold">{member.name}</h3>
            {member.role !== undefined ? (
              <p className="text-sm font-medium text-primary">{member.role}</p>
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
                  className="text-muted transition-colors hover:text-primary"
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

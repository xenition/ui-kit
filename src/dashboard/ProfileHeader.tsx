import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';

export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  /** Optional line under the name, e.g. a role or handle. */
  subtitle?: string;
  /** Optional avatar image URL; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Trailing action slot, e.g. an "Edit" button. */
  actions?: React.ReactNode;
}

/**
 * Profile / account header: avatar, name, subtitle, and a trailing action slot.
 * The web mirror of the block that tops most account and settings screens.
 * Token-only.
 */
export const ProfileHeader = React.forwardRef<HTMLElement, ProfileHeaderProps>(
  function ProfileHeader({ name, subtitle, avatarUrl, actions, className, ...rest }, ref) {
    return (
      <header ref={ref} className={cn('flex items-center gap-md', className)} {...rest}>
        <Avatar src={avatarUrl} name={name} size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-xl font-bold text-on-surface">{name}</span>
          {subtitle ? (
            <span className="truncate text-sm text-muted">{subtitle}</span>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>
    );
  }
);

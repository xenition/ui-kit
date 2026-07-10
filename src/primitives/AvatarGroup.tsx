import * as React from 'react';
import { cn } from './cn';
import { Avatar, type AvatarSize } from './Avatar';

export interface AvatarGroupProps {
  avatars: { name?: string; src?: string }[];
  /** Max avatars before collapsing into a +N chip (default 4). */
  max?: number;
  size?: AvatarSize;
  className?: string;
}

const CHIP: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

/** Overlapping avatar stack with a +N overflow chip — bound to the theme tokens. */
export function AvatarGroup({ avatars, max = 4, size = 'md', className }: AvatarGroupProps): React.ReactElement {
  const shown = avatars.slice(0, max);
  const extra = avatars.length - shown.length;
  return (
    <div className={cn('flex items-center', className)}>
      {shown.map((a, i) => (
        <span key={i} className="-ml-2 rounded-full ring-2 ring-surface first:ml-0">
          <Avatar name={a.name} src={a.src} size={size} />
        </span>
      ))}
      {extra > 0 && (
        <span
          className={cn(
            '-ml-2 inline-flex items-center justify-center rounded-full bg-neutral-100 font-medium text-on-surface ring-2 ring-surface',
            CHIP[size]
          )}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import { activate } from './internal';
import type { ContactCardProps } from './ContactCard';

/** V3 accepts the exact same props as {@link ContactCard} — a drop-in replacement. */
export type ContactCardV3Props = ContactCardProps;

/**
 * ContactCard **design V3** — a *compact directory row*: a small avatar, the
 * name with title·company beneath, and (when present) the first tag as a trailing
 * muted chip. No card surface, no action pills — the densest possible list item
 * for an A–Z contacts index. Same props as {@link ContactCard}; a `loading`
 * skeleton is supported. Token-pure — no literal colors.
 */
export const ContactCardV3 = React.forwardRef<HTMLDivElement, ContactCardV3Props>(function ContactCardV3(
  { name, title, company, avatarUrl, tags, loading = false, onClick, className, ...rest },
  ref
) {
  const trailingTag = Array.isArray(tags) && tags.length > 0 ? tags[0] : undefined;
  const interactive = onClick && !loading ? activate(onClick) : {};

  return (
    <div
      ref={ref}
      aria-label={onClick && !loading ? `Contact ${name}` : undefined}
      className={cn(
        'flex items-center gap-sm px-sm py-sm transition duration-200 motion-reduce:transition-none',
        onClick && !loading && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      {loading ? (
        <div aria-label="Loading contact" className="flex flex-1 items-center gap-sm">
          <div className="h-8 w-8 rounded-full bg-neutral-100" />
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="h-3 w-[55%] rounded-sm bg-neutral-100" />
            <div className="h-2 w-[35%] rounded-sm bg-neutral-100" />
          </div>
        </div>
      ) : (
        <>
          <Avatar size="sm" name={name} src={avatarUrl} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
            {title || company ? (
              <p className="truncate text-xs text-muted">{[title, company].filter(Boolean).join(' · ')}</p>
            ) : null}
          </div>
          {trailingTag ? (
            <span className="shrink-0 truncate rounded-full bg-neutral-100 px-xs py-0.5 text-xs font-semibold text-muted">
              {trailingTag}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
});

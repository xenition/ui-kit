import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Tag, Button } from '../primitives';
import { activate } from './internal';
import type { ContactCardProps } from './ContactCard';

/** V2 accepts the exact same props as {@link ContactCard} — a drop-in replacement. */
export type ContactCardV2Props = ContactCardProps;

/**
 * ContactCard **design V2** — a *centered profile hero*. Where the base is a
 * left-aligned avatar row, V2 stacks a large centered avatar, name and
 * title·company, a centered wrap of tag chips, and a full-width row of quick
 * actions across the footer. Elevated on a token `shadow-md` and lifted on hover.
 * Same props as {@link ContactCard}; empty tag/action arrays render nothing;
 * `loading` shows a skeleton. Token-pure — no literal colors.
 */
export const ContactCardV2 = React.forwardRef<HTMLDivElement, ContactCardV2Props>(function ContactCardV2(
  { name, title, company, avatarUrl, tags, actions, variant = 'default', loading = false, onClick, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
  const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
  const interactive = onClick && !loading ? activate(onClick) : {};

  return (
    <Card
      ref={ref}
      aria-label={onClick && !loading ? `Contact ${name}` : undefined}
      className={cn(
        'flex flex-col items-center gap-md rounded-lg text-center shadow-md transition duration-200',
        'motion-reduce:transition-none',
        onClick && !loading && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      {loading ? (
        <div aria-label="Loading contact" className="flex flex-col items-center gap-sm self-stretch">
          <div className="h-16 w-16 rounded-full bg-neutral-100" />
          <div className="h-4 w-[55%] rounded-sm bg-neutral-100" />
          <div className="h-3 w-[40%] rounded-sm bg-neutral-100" />
        </div>
      ) : (
        <>
          <Avatar size={compact ? 'md' : 'xl'} name={name} src={avatarUrl} />
          <div className="flex min-w-0 flex-col items-center gap-0.5">
            <p className="truncate text-lg font-bold text-on-surface">{name}</p>
            {title || company ? (
              <p className="truncate text-sm text-muted">{[title, company].filter(Boolean).join(' · ')}</p>
            ) : null}
          </div>

          {hasTags ? (
            <div className="flex flex-wrap justify-center gap-xs">
              {tags!.map((t, i) => (
                <Tag key={`${t}-${i}`} tone="neutral">
                  {t}
                </Tag>
              ))}
            </div>
          ) : null}

          {hasActions ? (
            <div className="flex flex-wrap justify-center gap-sm self-stretch">
              {actions!.map((a) => (
                <Button
                  key={a.key}
                  variant="secondary"
                  size="sm"
                  aria-label={a.label}
                  onClick={a.onClick}
                  className="min-w-[96px] flex-1"
                >
                  <span aria-hidden="true">{a.glyph}</span>
                  <span className="ml-1">{a.label}</span>
                </Button>
              ))}
            </div>
          ) : null}
        </>
      )}
    </Card>
  );
});

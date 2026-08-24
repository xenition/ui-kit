import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Tag, Button } from '../primitives';
import { activate } from './internal';

export type ContactCardVariant = 'default' | 'compact';

export interface ContactAction {
  key: string;
  /** Glyph shown on the pill (e.g. `📞`, `✉`). */
  glyph: string;
  /** Accessible label (e.g. "Call"). */
  label: string;
  onClick: () => void;
}

export interface ContactCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Full name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Company / account. */
  company?: string;
  /** Avatar image URL; initials of `name` are the fallback. */
  avatarUrl?: string;
  /** Free-form labels (segments, interests). */
  tags?: string[];
  /** Quick-action pills (call / email / …). */
  actions?: ContactAction[];
  variant?: ContactCardVariant;
  /** Skeleton placeholder while data loads. */
  loading?: boolean;
  /** Click handler for the card body (renders as a keyboard-accessible button). */
  onClick?: () => void;
}

/**
 * Profile card for a CRM contact: avatar, name, title, company, tag chips and a
 * row of quick-action pills (call / email / etc — caller-supplied glyph +
 * handler). `compact` hides tags and actions for list rows. Guards empty
 * `tags`/`actions` arrays (renders nothing) and offers a `loading` skeleton.
 * When `onClick` is set the body becomes a `role="button"` div with Enter/Space
 * activation. All colors are `--xen-*` token classes.
 */
export const ContactCard = React.forwardRef<HTMLDivElement, ContactCardProps>(function ContactCard(
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
        'flex flex-col gap-[var(--xen-space-sm)]',
        onClick && !loading && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      {loading ? (
        <div aria-label="Loading contact" className="flex items-center gap-[var(--xen-space-sm)]">
          <div className="h-10 w-10 rounded-full bg-neutral-100" />
          <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
            <div className="h-4 w-[60%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
            <div className="h-3 w-[40%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-on-surface">{name}</p>
              {title || company ? (
                <p className="truncate text-sm text-muted">{[title, company].filter(Boolean).join(' · ')}</p>
              ) : null}
            </div>
          </div>

          {hasTags ? (
            <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
              {tags!.map((t, i) => (
                <Tag key={`${t}-${i}`} tone="neutral">
                  {t}
                </Tag>
              ))}
            </div>
          ) : null}

          {hasActions ? (
            <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
              {actions!.map((a) => (
                <Button key={a.key} variant="secondary" size="sm" aria-label={a.label} onClick={a.onClick}>
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

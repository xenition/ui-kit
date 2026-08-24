import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import { PRESENCE_META, TONE_TEXT_CLASS, type Presence } from './internal';

export type DirectoryRowVariant = 'default' | 'compact';

export interface DirectoryRowProps {
  /** Person's name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Department / team. */
  department?: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Work email — shown on the default variant. */
  email?: string;
  /** Phone / extension — shown on the default variant. */
  phone?: string;
  /** Live presence — shown as a glyph + word, never color alone. */
  presence?: Presence;
  /** Density. `compact` drops the contact meta. */
  variant?: DirectoryRowVariant;
  /** Click handler for the row (web parity of native `onPress`). */
  onClick?: () => void;
  /** Trailing quick-action (a message icon button). */
  onMessage?: () => void;
  className?: string;
}

/**
 * Dense people-directory row: avatar, name, title / department, and contact meta
 * (email / phone). Presence is conveyed by a glyph + word so it never depends on
 * color alone. `compact` trims to name + title. Optional trailing message
 * affordance renders as a real `<button>`. When `onClick` is set the row becomes
 * a keyboard-operable `role="button"`. All colors are `--xen-*` token classes —
 * no literals. `forwardRef` to the root `<div>`.
 */
export const DirectoryRow = React.forwardRef<HTMLDivElement, DirectoryRowProps>(function DirectoryRow(
  {
    name,
    title,
    department,
    avatarUrl,
    email,
    phone,
    presence,
    variant = 'default',
    onClick,
    onMessage,
    className,
  },
  ref
) {
  const compact = variant === 'compact';
  const presenceMeta = presence ? PRESENCE_META[presence] : undefined;
  const subtitle = [title, department].filter(Boolean).join(' · ');
  const contact = [email, phone].filter(Boolean).join('  ·  ');
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Open ${name}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-md)] bg-surface px-3',
        compact ? 'py-1.5' : 'py-2',
        interactive && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-on-surface">{name}</p>
        {subtitle ? <p className="truncate text-sm text-muted">{subtitle}</p> : null}
        {!compact && contact ? <p className="truncate text-xs text-muted">{contact}</p> : null}
      </div>
      {presenceMeta ? (
        <span className="flex items-center gap-1" aria-label={presenceMeta.label}>
          <span aria-hidden="true" className={cn('text-xs', TONE_TEXT_CLASS[presenceMeta.tone])}>
            {presenceMeta.glyph}
          </span>
          <span className="text-xs text-muted">{presenceMeta.label}</span>
        </span>
      ) : null}
      {onMessage ? (
        <button
          type="button"
          aria-label={`Message ${name}`}
          onClick={(e) => {
            e.stopPropagation();
            onMessage();
          }}
          className="shrink-0 pl-2 text-lg text-primary hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span aria-hidden="true">✉</span>
        </button>
      ) : null}
    </div>
  );
});

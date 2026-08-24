import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge } from '../primitives';
import type { BadgeTone } from '../primitives';

/** Family role. Drives the role chip. */
export type FamilyRole =
  | 'parent'
  | 'guardian'
  | 'child'
  | 'sibling'
  | 'grandparent'
  | 'caregiver'
  | 'other';

interface RoleMeta {
  label: string;
  tone: BadgeTone;
}

// Native `accent` tone maps to `primary` on web (web Badge has no accent).
const ROLE_META: Record<FamilyRole, RoleMeta> = {
  parent: { label: 'Parent', tone: 'primary' },
  guardian: { label: 'Guardian', tone: 'primary' },
  child: { label: 'Child', tone: 'primary' },
  sibling: { label: 'Sibling', tone: 'primary' },
  grandparent: { label: 'Grandparent', tone: 'neutral' },
  caregiver: { label: 'Caregiver', tone: 'success' },
  other: { label: 'Family', tone: 'neutral' },
};

export interface FamilyMemberRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Member's name. */
  name: string;
  /** Family role; drives the role chip. */
  role?: FamilyRole;
  /** Photo URL for the avatar; falls back to initials. */
  photoUrl?: string;
  /** Relationship detail line, e.g. "Mom" or "Age 8". */
  relationLabel?: string;
  /** Presence — shown as an online/offline dot + text (not color alone). */
  online?: boolean;
  /** Fires when the row is activated. */
  onClick?: () => void;
}

/**
 * A roster row for a family member: avatar, name, an optional relationship line,
 * a role chip, and an optional presence indicator (dot + "Online"/"Offline"
 * text, never color alone). When `onClick` is set the row is an accessible
 * `role="button"` with keyboard activation. Token-bound throughout — no literal
 * colors.
 */
export const FamilyMemberRow = React.forwardRef<HTMLDivElement, FamilyMemberRowProps>(
  function FamilyMemberRow(
    { name, role = 'other', photoUrl, relationLabel, online, onClick, className, ...rest },
    ref
  ) {
    const meta = ROLE_META[role] ?? ROLE_META.other;
    const interactive = typeof onClick === 'function';
    const a11y = `${name}, ${meta.label}${online !== undefined ? `, ${online ? 'online' : 'offline'}` : ''}`;
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        data-xen-family-member-row=""
        className={cn(
          'flex items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...rest}
      >
        <Avatar src={photoUrl} name={name} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
          {relationLabel ? <p className="truncate text-xs text-muted">{relationLabel}</p> : null}
          {online !== undefined ? (
            <span className="flex items-center gap-1.5">
              <span
                className={cn('h-2 w-2 shrink-0 rounded-full', online ? 'bg-success' : 'bg-neutral-300')}
                aria-hidden="true"
              />
              <span className="text-xs text-muted">{online ? 'Online' : 'Offline'}</span>
            </span>
          ) : null}
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </div>
    );
  }
);

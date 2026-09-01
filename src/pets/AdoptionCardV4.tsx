import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { activateOnKey, toBadgeTone } from './_tokens';
import type { AdoptionCardProps, AdoptionStatus } from './AdoptionCard';

/** V4 layout choices for the "companion" design. */
export type AdoptionCardLayout = 'cover' | 'list' | 'compact';

/** Drop-in for {@link AdoptionCardProps} — same props, the V4 "companion" design. */
export interface AdoptionCardV4Props extends AdoptionCardProps {
  /** V4 layout: `cover` (photo banner on top, default), `list` (horizontal thumbnail row), `compact` (dense, no photo). */
  variant?: AdoptionCardLayout;
}

const STATUS_META: Record<AdoptionStatus, { label: string; tone: 'success' | 'warn' | 'neutral' | 'accent' }> = {
  available: { label: 'Available', tone: 'success' },
  pending: { label: 'Pending', tone: 'warn' },
  adopted: { label: 'Adopted', tone: 'neutral' },
  fostered: { label: 'In foster', tone: 'accent' },
};

/**
 * AdoptionCard — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on an adoption listing: an elevated rounded card with a
 * soft shadow, a photo banner (or a big glyph in a soft-primary tinted well), a
 * frosted favorite heart, a labelled status chip, and the fee shown as a
 * soft-primary chip beside a rounded adopt CTA. Same props/behavior as
 * {@link AdoptionCardProps}; availability reads via a labelled chip (never color
 * alone). All colors from `--xen-*` token classes (no literals); the whole card
 * is a keyboard-activatable button when `onClick` is set.
 */
export const AdoptionCardV4 = React.forwardRef<HTMLDivElement, AdoptionCardV4Props>(function AdoptionCardV4(
  {
    name,
    breed,
    age,
    sex,
    shelter,
    photoUrl,
    glyph = '🐾',
    fee,
    status,
    favorited = false,
    applyLabel = 'Apply to adopt',
    onApply,
    onFavorite,
    onClick,
    className,
    variant = 'cover',
  },
  ref
) {
  const statusMeta = STATUS_META[status];
  const meta = [age, sex, breed].filter(Boolean).join(' · ');
  const showApply = onApply != null && status !== 'adopted';
  const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
  const interactive = onClick != null;

  const statusBadge = (
    <Badge tone={toBadgeTone(statusMeta.tone)} variant="soft">
      {statusMeta.label}
    </Badge>
  );

  const feeChip = fee ? (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface">
      {fee}
    </span>
  ) : null;

  const applyButton = showApply ? (
    <Button
      variant="primary"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        onApply?.();
      }}
    >
      {applyLabel}
    </Button>
  ) : null;

  const favoriteButton = (extraClass: string) =>
    onFavorite ? (
      <button
        type="button"
        aria-pressed={favorited}
        aria-label={favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        onClick={(e) => {
          e.stopPropagation();
          onFavorite();
        }}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-lg shadow-sm',
          favorited ? 'text-danger' : 'text-muted',
          extraClass
        )}
      >
        {favorited ? '♥' : '♡'}
      </button>
    ) : null;

  const shellClass = cn(
    'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-md',
    interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    className
  );

  const shellProps = {
    ref,
    role: interactive ? ('button' as const) : undefined,
    tabIndex: interactive ? 0 : undefined,
    'aria-label': a11y,
    onClick,
    onKeyDown: interactive ? activateOnKey(onClick) : undefined,
  };

  // ── list ──────────────────────────────────────────────────────────────────
  if (variant === 'list') {
    return (
      <div {...shellProps} className={shellClass}>
        <div className="flex gap-[var(--xen-space-md)] p-[var(--xen-space-md)]">
          {/* Thumbnail (photo or glyph) inside a thin mat, favorite heart top-right. */}
          <div className="relative h-[88px] w-[88px] flex-none overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-primary/10">
            <div className="flex h-full w-full items-center justify-center">
              {photoUrl ? (
                <img src={photoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl" aria-hidden="true">
                  {glyph}
                </span>
              )}
            </div>
            {favoriteButton('absolute right-1 top-1 h-9 w-9')}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
            <p className="truncate text-base font-bold text-on-surface">{name}</p>
            {meta ? <p className="truncate text-sm text-muted">{meta}</p> : null}
            {shelter ? <p className="truncate text-xs text-muted">📍 {shelter}</p> : null}
            <div>{statusBadge}</div>

            {fee || showApply ? (
              <div className="mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]">
                {feeChip ?? <span />}
                {applyButton}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // ── compact ─────────────────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <div {...shellProps} className={shellClass}>
        <div className="flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]">
          <span
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary/10 text-lg"
            aria-hidden="true"
          >
            {glyph}
          </span>
          <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]">
            <p className="truncate text-sm font-bold text-on-surface">{name}</p>
            {meta ? <p className="truncate text-xs text-muted">{meta}</p> : null}
          </div>
          {statusBadge}
          {feeChip}
          {favoriteButton('')}
        </div>
      </div>
    );
  }

  // ── cover (default) ──────────────────────────────────────────────────────────
  return (
    <div {...shellProps} className={shellClass}>
      {/* Photo banner, or a friendly glyph in a soft-primary well. */}
      <div className="relative flex h-[132px] items-center justify-center bg-primary/10">
        {photoUrl ? (
          <img src={photoUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-4xl" aria-hidden="true">
            {glyph}
          </span>
        )}
        <div className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]">
          <Badge tone={toBadgeTone(statusMeta.tone)} variant="soft">
            {statusMeta.label}
          </Badge>
        </div>
        {onFavorite ? (
          <button
            type="button"
            aria-pressed={favorited}
            aria-label={favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className={cn(
              'absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-lg shadow-sm',
              favorited ? 'text-danger' : 'text-muted'
            )}
          >
            {favorited ? '♥' : '♡'}
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]">
        <p className="truncate text-lg font-bold text-on-surface">{name}</p>
        {meta ? <p className="truncate text-sm text-muted">{meta}</p> : null}
        {shelter ? <p className="truncate text-xs text-muted">📍 {shelter}</p> : null}

        {fee || showApply ? (
          <div className="mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]">
            {fee ? (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface">
                {fee}
              </span>
            ) : (
              <span />
            )}
            {showApply ? (
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onApply?.();
                }}
              >
                {applyLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
});

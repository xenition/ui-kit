import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Badge, Icon } from '../primitives';

/** Developmental category. Drives the icon + label. */
export type MilestoneCategory =
  | 'physical'
  | 'cognitive'
  | 'social'
  | 'language'
  | 'emotional'
  | 'other';

interface CategoryMeta {
  glyph: string;
  label: string;
}

const CATEGORY_META: Record<MilestoneCategory, CategoryMeta> = {
  physical: { glyph: '🏃', label: 'Physical' },
  cognitive: { glyph: '🧠', label: 'Cognitive' },
  social: { glyph: '🤝', label: 'Social' },
  language: { glyph: '💬', label: 'Language' },
  emotional: { glyph: '❤️', label: 'Emotional' },
  other: { glyph: '🌟', label: 'Milestone' },
};

export interface MilestoneCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Milestone title, e.g. "First steps". */
  title: string;
  /** Developmental category; drives the icon + label. */
  category?: MilestoneCategory;
  /** Date the milestone was reached (or is expected). */
  date?: string;
  /** Typical age band, e.g. "12–15 mo". */
  ageLabel?: string;
  /** Free-text description / note. */
  description?: string;
  /** Whether the milestone has been achieved. */
  achieved?: boolean;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Fires when the card is activated. */
  onClick?: () => void;
}

/**
 * A developmental milestone: a category icon, title, date/age band, an optional
 * note, and an achieved/upcoming chip. State is conveyed by glyph + text + a11y
 * label (never color alone). When `onClick` is set the card is an accessible
 * `role="button"` with keyboard activation; renders a muted skeleton while
 * `loading`. Token-bound throughout — no literal colors.
 */
export const MilestoneCard = React.forwardRef<HTMLDivElement, MilestoneCardProps>(
  function MilestoneCard(
    { title, category = 'other', date, ageLabel, description, achieved = false, loading = false, onClick, className, ...rest },
    ref
  ) {
    const meta = CATEGORY_META[category] ?? CATEGORY_META.other;

    if (loading) {
      return (
        <Card ref={ref} data-xen-milestone-card="" aria-label="Loading milestone" className={className} {...rest}>
          <div className="space-y-2">
            <div className="h-3.5 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
            <div className="h-2.5 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          </div>
        </Card>
      );
    }

    const subParts = [ageLabel, date].filter((s): s is string => !!s);
    const interactive = typeof onClick === 'function';
    const a11y = `${title}, ${meta.label}, ${achieved ? 'achieved' : 'upcoming'}`;
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <Card
        ref={ref}
        data-xen-milestone-card=""
        className={cn(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...rest}
      >
        <div className="flex items-center gap-3">
          <Icon glyph={meta.glyph} size="2xl" />
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-base font-bold text-on-surface">{title}</p>
            <p className="truncate text-xs text-muted">{[meta.label, ...subParts].join(' · ')}</p>
          </div>
          <Badge tone={achieved ? 'success' : 'neutral'}>{achieved ? '✓ Achieved' : '◦ Upcoming'}</Badge>
        </div>

        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </Card>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { TONE_TINT } from './internal/tint';
import { pressableProps } from './internal/pressable';

/** Category of a public notice / announcement. */
export type NoticeCategory =
  | 'hearing'
  | 'meeting'
  | 'roadwork'
  | 'election'
  | 'ordinance'
  | 'bid'
  | 'general';

const CATEGORY: Record<NoticeCategory, { label: string; glyph: string; tone: BadgeTone }> = {
  hearing: { label: 'Public hearing', glyph: '⚖️', tone: 'primary' },
  // Native `accent` folds to `primary` on web (no `accent` BadgeTone).
  meeting: { label: 'Meeting', glyph: '📋', tone: 'primary' },
  roadwork: { label: 'Roadwork', glyph: '🚧', tone: 'warn' },
  election: { label: 'Election', glyph: '🗳️', tone: 'primary' },
  ordinance: { label: 'Ordinance', glyph: '📜', tone: 'neutral' },
  bid: { label: 'Bid / RFP', glyph: '📑', tone: 'primary' },
  general: { label: 'Notice', glyph: '📢', tone: 'neutral' },
};

export interface PublicNoticeCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Notice category — drives the leading glyph + a category badge. */
  category: NoticeCategory;
  /** Notice headline. */
  title: string;
  /** Body / summary text (truncated by the caller as needed). */
  body?: string;
  /** Issuing agency / department. */
  agency?: string;
  /** Localized posted / effective date. */
  date?: string;
  /** Location the notice concerns (address, venue, ward). */
  location?: string;
  /** Marks the notice as new / unread (a text+glyph pill, not color alone). */
  isNew?: boolean;
  /** Fires on card click (open full notice); card is a button only when set. */
  onClick?: () => void;
}

/**
 * A public-notice / civic-announcement card for a notices feed. The `category`
 * selects a tinted leading glyph and a labelled badge (text + glyph + color,
 * never color alone), with optional agency / date / location metadata and a
 * "New" flag. Becomes a keyboard-operable button only when `onClick` is
 * supplied. Token-bound throughout — no literal colors. Web parity of the native
 * `PublicNoticeCard`.
 */
export const PublicNoticeCard = React.forwardRef<HTMLDivElement, PublicNoticeCardProps>(
  function PublicNoticeCard(
    { category, title, body, agency, date, location, isNew = false, onClick, className, ...rest },
    ref
  ) {
    const cat = CATEGORY[category] ?? CATEGORY.general;
    const interactive = pressableProps(onClick);
    const meta = [agency, location, date].filter((v) => v != null && v !== '').join(' · ');

    return (
      <Card
        ref={ref}
        aria-label={interactive ? `${cat.label}: ${title}` : undefined}
        className={cn(
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
              TONE_TINT[cat.tone]
            )}
          >
            <Icon glyph={cat.glyph} aria-label={cat.label} />
          </span>
          <div className="flex flex-1 flex-wrap items-center gap-[var(--xen-space-xs)]">
            <Badge tone={cat.tone}>{cat.label}</Badge>
            {isNew ? (
              <Badge tone="danger">
                <span aria-hidden="true">●</span> New
              </Badge>
            ) : null}
          </div>
        </div>

        <p className="mt-[var(--xen-space-sm)] text-base font-bold text-on-surface">{title}</p>

        {body != null ? (
          <p className="mt-0.5 line-clamp-3 text-sm text-on-surface">{body}</p>
        ) : null}

        {meta !== '' ? (
          <p className="mt-[var(--xen-space-sm)] text-xs text-muted">{meta}</p>
        ) : null}
      </Card>
    );
  }
);

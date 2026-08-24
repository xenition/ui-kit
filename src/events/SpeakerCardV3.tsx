import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';
import type { SpeakerCardProps } from './SpeakerCard';

/** Drop-in replacement for {@link SpeakerCard} — identical props. */
export type SpeakerCardV3Props = SpeakerCardProps;

/**
 * SpeakerCard — **compact directory row** alternate design (web / React DOM).
 *
 * A small avatar beside a tight two-line name / role, with the rating and (at
 * most two) topic tags folded onto the trailing edge. No bio, no banner — the
 * densest speaker treatment, sized for long scrolling lists. Uses a minimal
 * hairline-bottom rule rather than a full card border. Same props as
 * {@link SpeakerCard} — a drop-in swap. Token-pure.
 */
export const SpeakerCardV3 = React.forwardRef<HTMLDivElement, SpeakerCardV3Props>(function SpeakerCardV3(
  { name, role, company, avatarUrl, rating, tags = [], bio: _bio, variant: _variant, onClick, onKeyDown, className, ...rest },
  ref
) {
  const clickable = typeof onClick === 'function';
  const roleLine = [role, company].filter(Boolean).join(' · ');
  const shownTags = tags.slice(0, 2);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(e);
    if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).click();
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-row items-center gap-md border-b border-border bg-surface px-md py-sm text-on-surface',
        clickable && 'cursor-pointer transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? name : undefined}
      {...rest}
    >
      <Avatar src={avatarUrl} name={name} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-base font-bold text-on-surface">{name}</p>
        {roleLine ? <p className="truncate text-xs text-muted">{roleLine}</p> : null}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-xs">
        {typeof rating === 'number' ? <Rating value={rating} size="sm" /> : null}
        {shownTags.length > 0 ? (
          <div className="flex flex-row gap-xs">
            {shownTags.map((t, i) => (
              <Badge key={`${t}-${i}`} tone="neutral" size="sm">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});

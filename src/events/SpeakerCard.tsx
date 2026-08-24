import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';

/** Layout of a {@link SpeakerCard}. */
export type SpeakerCardVariant = 'row' | 'stacked';

export interface SpeakerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Speaker name. */
  name: string;
  /** Role / title, e.g. `Principal Engineer`. */
  role?: string;
  /** Company / organisation. */
  company?: string;
  /** Avatar image URL (initials fallback when absent). */
  avatarUrl?: string;
  /** Short bio (clamped to 3 lines in `stacked`, 2 in `row`). */
  bio?: string;
  /** Optional 0–5 rating shown as stars. */
  rating?: number;
  /** Topic / track tags. */
  tags?: string[];
  /** `row` (horizontal, list-friendly) or `stacked` (centered profile). */
  variant?: SpeakerCardVariant;
}

/**
 * Speaker profile card built on the `Avatar` and `Rating` primitives. `row`
 * lays the avatar beside the details for lists; `stacked` centers a larger
 * avatar for a profile header. Role and company collapse gracefully when
 * absent. Passing `onClick` makes the whole card an accessible button. Colors
 * come from the `--xen-*` tokens; no literal colors.
 */
export const SpeakerCard = React.forwardRef<HTMLDivElement, SpeakerCardProps>(function SpeakerCard(
  { name, role, company, avatarUrl, bio, rating, tags = [], variant = 'row', onClick, onKeyDown, className, ...rest },
  ref
) {
  const stacked = variant === 'stacked';
  const clickable = typeof onClick === 'function';
  const roleLine = [role, company].filter(Boolean).join(' · ');

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
        'rounded-lg border border-border bg-surface text-on-surface',
        clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? name : undefined}
      {...rest}
    >
      <div className={cn('flex gap-md p-lg', stacked ? 'flex-col items-center' : 'flex-row items-start')}>
        <Avatar src={avatarUrl} name={name} size={stacked ? 'lg' : 'md'} />
        <div className={cn('flex flex-col gap-xs', stacked ? 'items-center text-center' : 'flex-1 items-start text-left')}>
          <p className="font-heading text-lg font-bold text-on-surface">{name}</p>
          {roleLine ? <p className="text-sm text-muted">{roleLine}</p> : null}
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
          {bio ? <p className={cn('text-sm text-on-surface', stacked ? 'line-clamp-3' : 'line-clamp-2')}>{bio}</p> : null}
          {tags.length > 0 ? (
            <div className={cn('flex flex-row flex-wrap gap-xs', stacked ? 'justify-center' : 'justify-start')}>
              {tags.map((t, i) => (
                <Badge key={`${t}-${i}`} tone="neutral">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

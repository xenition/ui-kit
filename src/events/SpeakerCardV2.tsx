import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';
import type { SpeakerCardProps } from './SpeakerCard';

/** Drop-in replacement for {@link SpeakerCard} — identical props. */
export type SpeakerCardV2Props = SpeakerCardProps;

/**
 * SpeakerCard — **centered profile hero** alternate design (web / React DOM).
 *
 * A soft primary-tinted top band with a large ringed `xl` avatar straddling it,
 * then the name, role, rating, bio and topic tags all centered beneath — an
 * elevated card built for a "meet the speaker" spotlight rather than a list row.
 * Ignores `variant` (always the hero form) so it stays visually one thing. Same
 * props as {@link SpeakerCard} — a drop-in swap. Token-pure.
 */
export const SpeakerCardV2 = React.forwardRef<HTMLDivElement, SpeakerCardV2Props>(function SpeakerCardV2(
  { name, role, company, avatarUrl, bio, rating, tags = [], variant: _variant, onClick, onKeyDown, className, ...rest },
  ref
) {
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
        'overflow-hidden rounded-lg bg-surface text-on-surface shadow-md',
        clickable &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? name : undefined}
      {...rest}
    >
      {/* Tinted banner the avatar overlaps. */}
      <div className="h-14 bg-primary/10" />
      <div className="-mt-9 flex flex-col items-center gap-sm px-lg pb-lg text-center">
        <Avatar src={avatarUrl} name={name} size="xl" ring />
        <p className="font-heading text-xl font-extrabold text-on-surface">{name}</p>
        {roleLine ? <p className="text-sm font-semibold text-primary">{roleLine}</p> : null}
        {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
        {bio ? <p className="line-clamp-4 text-sm text-muted">{bio}</p> : null}
        {tags.length > 0 ? (
          <div className="mt-xs flex flex-row flex-wrap justify-center gap-xs">
            {tags.map((t, i) => (
              <Badge key={`${t}-${i}`} tone="primary" variant="soft" size="sm">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});

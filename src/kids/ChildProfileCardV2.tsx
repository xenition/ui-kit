import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Icon } from '../primitives';
import type { ChildProfileCardProps, ChildMood } from './ChildProfileCard';

/** Same public contract as {@link ChildProfileCard} — a drop-in alternate design. */
export type ChildProfileCardV2Props = ChildProfileCardProps;

const MOOD_META: Record<ChildMood, { glyph: string; label: string }> = {
  happy: { glyph: '😊', label: 'Happy' },
  excited: { glyph: '🤩', label: 'Excited' },
  calm: { glyph: '😌', label: 'Calm' },
  sad: { glyph: '😢', label: 'Sad' },
  tired: { glyph: '😴', label: 'Tired' },
  sick: { glyph: '🤒', label: 'Not well' },
};

/**
 * ChildProfileCard, redesigned (v2): a **banner hero card**. A primary-tinted
 * cover band carries a large centered avatar straddling its edge, with the name,
 * age·grade line, mood, and interest chips centered beneath. Elevated. Distinct
 * from v1's compact left-aligned row. Same props, token-only.
 */
export const ChildProfileCardV2 = React.forwardRef<HTMLDivElement, ChildProfileCardV2Props>(
  function ChildProfileCardV2(
    { name, photoUrl, age, grade, birthday, mood, interests, loading = false, onClick, className, ...rest },
    ref
  ) {
    const interactive = typeof onClick === 'function';

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-child-profile-card=""
          aria-label="Loading child profile"
          className={cn('overflow-hidden rounded-lg bg-surface shadow-md', className)}
          {...rest}
        >
          <div className="h-16 bg-neutral-200" />
          <div className="flex flex-col items-center gap-2 p-md">
            <div className="-mt-12 h-20 w-20 animate-pulse rounded-full bg-neutral-200" />
            <div className="h-4 w-1/2 animate-pulse rounded-sm bg-neutral-200" />
          </div>
        </div>
      );
    }

    const moodMeta = mood ? MOOD_META[mood] : undefined;
    const subParts = [age, grade].filter((s): s is string => !!s);
    const a11y = `${name}${age ? `, ${age}` : ''}${grade ? `, ${grade}` : ''}${moodMeta ? `, mood ${moodMeta.label}` : ''}`;
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        data-xen-child-profile-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          'overflow-hidden rounded-lg bg-surface text-center shadow-md transition-transform',
          interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          className
        )}
        {...rest}
      >
        <div className="h-16 bg-primary/20" />
        <div className="flex flex-col items-center gap-1 px-md pb-md">
          <div className="-mt-12 rounded-full border-4 border-surface">
            <Avatar src={photoUrl} name={name} size="xl" />
          </div>
          <p className="text-xl font-bold text-on-surface">{name}</p>
          {subParts.length > 0 ? <p className="text-sm text-muted">{subParts.join(' · ')}</p> : null}
          {birthday ? <p className="text-xs text-muted">🎂 {birthday}</p> : null}
          {moodMeta ? (
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-on-surface">
              <Icon glyph={moodMeta.glyph} size="sm" /> {moodMeta.label}
            </span>
          ) : null}
          {interests && interests.length > 0 ? (
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {interests.map((interest, i) => (
                <Badge key={`${interest}-${i}`} tone="primary">
                  {interest}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

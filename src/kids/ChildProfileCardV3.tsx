import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';
import type { ChildProfileCardProps, ChildMood } from './ChildProfileCard';

/** Same public contract as {@link ChildProfileCard} — a drop-in alternate design. */
export type ChildProfileCardV3Props = ChildProfileCardProps;

const MOOD_META: Record<ChildMood, { glyph: string; label: string }> = {
  happy: { glyph: '😊', label: 'Happy' },
  excited: { glyph: '🤩', label: 'Excited' },
  calm: { glyph: '😌', label: 'Calm' },
  sad: { glyph: '😢', label: 'Sad' },
  tired: { glyph: '😴', label: 'Tired' },
  sick: { glyph: '🤒', label: 'Not well' },
};

/**
 * ChildProfileCard, redesigned (v3): a **compact borderless roster row**. A small
 * avatar, the name over an age·grade·interests summary line, and the mood as a
 * trailing glyph — a hairline underline lets many stack as a family list. The
 * opposite of v2's banner hero. Same props, token-only.
 */
export const ChildProfileCardV3 = React.forwardRef<HTMLDivElement, ChildProfileCardV3Props>(
  function ChildProfileCardV3(
    { name, photoUrl, age, grade, birthday, mood, interests, loading = false, onClick, className, ...rest },
    ref
  ) {
    void birthday;
    const interactive = typeof onClick === 'function';

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-child-profile-card=""
          aria-label="Loading child profile"
          className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}
          {...rest}
        >
          <div className="h-9 w-9 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-200" />
        </div>
      );
    }

    const moodMeta = mood ? MOOD_META[mood] : undefined;
    const summary = [age, grade, ...(interests ?? [])].filter((s): s is string => !!s);
    const a11y = `${name}${age ? `, ${age}` : ''}${moodMeta ? `, mood ${moodMeta.label}` : ''}`;
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
          'flex items-center gap-3 border-b border-border py-2.5',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        {...rest}
      >
        <Avatar src={photoUrl} name={name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
          {summary.length > 0 ? <p className="truncate text-xs text-muted">{summary.join(' · ')}</p> : null}
        </div>
        {moodMeta ? (
          <span className="flex items-center gap-1 text-xs text-muted">
            <Icon glyph={moodMeta.glyph} size="base" />
            {moodMeta.label}
          </span>
        ) : null}
      </div>
    );
  }
);

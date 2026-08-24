import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Badge, Icon } from '../primitives';

/** Today's mood — shown as an emoji glyph + word (never color alone). */
export type ChildMood = 'happy' | 'excited' | 'calm' | 'sad' | 'tired' | 'sick';

interface MoodMeta {
  glyph: string;
  label: string;
}

const MOOD_META: Record<ChildMood, MoodMeta> = {
  happy: { glyph: '😊', label: 'Happy' },
  excited: { glyph: '🤩', label: 'Excited' },
  calm: { glyph: '😌', label: 'Calm' },
  sad: { glyph: '😢', label: 'Sad' },
  tired: { glyph: '😴', label: 'Tired' },
  sick: { glyph: '🤒', label: 'Not well' },
};

export interface ChildProfileCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Child's name. */
  name: string;
  /** Photo URL for the avatar; falls back to initials. */
  photoUrl?: string;
  /** Age label already formatted, e.g. "6 yrs" or "18 mo". */
  age?: string;
  /** School grade / class, e.g. "Grade 1". */
  grade?: string;
  /** Birthday label, e.g. "May 4". */
  birthday?: string;
  /** Today's mood; shown as an emoji chip (glyph + word, never color alone). */
  mood?: ChildMood;
  /** Interests / hobbies shown as soft chips. */
  interests?: string[];
  /** Loading placeholder state. */
  loading?: boolean;
  /** Fires when the card is activated. */
  onClick?: () => void;
}

/**
 * Header card for a single child: avatar/photo, name, an age·grade line, an
 * optional mood chip, and a wrapped strip of interest chips. When `onClick` is
 * set the card is an accessible `role="button"` with keyboard activation;
 * renders a muted skeleton while `loading`. Token-bound throughout — no literal
 * colors.
 */
export const ChildProfileCard = React.forwardRef<HTMLDivElement, ChildProfileCardProps>(
  function ChildProfileCard(
    { name, photoUrl, age, grade, birthday, mood, interests, loading = false, onClick, className, ...rest },
    ref
  ) {
    if (loading) {
      return (
        <Card ref={ref} data-xen-child-profile-card="" aria-label="Loading child profile" className={className} {...rest}>
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-neutral-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
              <div className="h-2.5 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
            </div>
          </div>
        </Card>
      );
    }

    const moodMeta = mood ? MOOD_META[mood] : undefined;
    const subParts = [age, grade].filter((s): s is string => !!s);

    const interactive = typeof onClick === 'function';
    const a11y = `${name}${age ? `, ${age}` : ''}${grade ? `, ${grade}` : ''}${
      moodMeta ? `, mood ${moodMeta.label}` : ''
    }`;
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <Card
        ref={ref}
        data-xen-child-profile-card=""
        className={cn(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...rest}
      >
        <div className="flex items-center gap-3">
          <Avatar src={photoUrl} name={name} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xl font-bold text-on-surface">{name}</p>
            {subParts.length > 0 ? (
              <p className="truncate text-sm text-muted">{subParts.join(' · ')}</p>
            ) : null}
            {birthday ? <p className="truncate text-xs text-muted">🎂 {birthday}</p> : null}
          </div>
          {moodMeta ? (
            <div className="flex flex-col items-center gap-0.5">
              <Icon glyph={moodMeta.glyph} size="xl" />
              <span className="text-xs text-muted">{moodMeta.label}</span>
            </div>
          ) : null}
        </div>

        {interests && interests.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {interests.map((interest, i) => (
              <Badge key={`${interest}-${i}`} tone="primary">
                {interest}
              </Badge>
            ))}
          </div>
        ) : null}
      </Card>
    );
  }
);

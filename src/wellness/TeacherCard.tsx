import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { CARD_SHELL, SLOT_TINT } from './_tokens';

export interface TeacherCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  specialty?: string;
  avatarGlyph?: string;
  sessions?: number;
  following?: boolean;
  onPress?: () => void;
  onFollow?: () => void;
}

/**
 * TeacherCard — an instructor row on a clean card: a soft primary-tinted avatar
 * circle, the teacher's name, specialty and session count, and (when `onFollow`
 * is wired) a Follow/Following button. The card stays calm — surface, border,
 * on-surface/muted text — with the only tint on the avatar; follow state lives
 * in the button's label and variant, not in color alone. The whole row is
 * pressable when `onPress` is set. Token-only colors.
 */
export const TeacherCard = React.forwardRef<HTMLDivElement, TeacherCardProps>(function TeacherCard(
  { name, specialty, avatarGlyph = '🧑‍🏫', sessions, following = false, onPress, onFollow, className, ...rest },
  ref
) {
  const body = (
    <>
      <span
        aria-hidden="true"
        className={cn('flex h-12 w-12 items-center justify-center rounded-full text-xl', SLOT_TINT.primary)}
      >
        {avatarGlyph}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold text-on-surface">{name}</p>
        {specialty ? <p className="truncate text-sm text-muted">{specialty}</p> : null}
        {sessions != null ? <p className="text-xs text-muted">{`${sessions} sessions`}</p> : null}
      </div>

      {onFollow ? (
        <Button
          variant={following ? 'secondary' : 'primary'}
          size="sm"
          aria-pressed={following}
          onClick={(e) => {
            e.stopPropagation();
            onFollow();
          }}
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      ) : null}
    </>
  );

  const shell = cn(CARD_SHELL, 'flex items-center gap-[var(--xen-space-md)] p-5 shadow-sm', className);

  if (onPress) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={name}
        onClick={onPress}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress();
          }
        }}
        className={cn(
          shell,
          'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
        )}
        {...rest}
      >
        {body}
      </div>
    );
  }

  return (
    <div ref={ref} className={shell} {...rest}>
      {body}
    </div>
  );
});

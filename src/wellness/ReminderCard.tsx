import * as React from 'react';
import { cn } from '../primitives/cn';
import { Switch } from '../primitives';
import { Icon } from '../primitives/Icon';
import { CARD_SHELL } from './_tokens';

export interface ReminderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  time: string;
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
  glyph?: string;
}

/**
 * ReminderCard — a single daily reminder on a clean card: a small gradient clock
 * badge (the one spot of color), the reminder label and its time, and a `Switch`
 * to arm or silence it. The card itself stays calm (surface + border); on/off is
 * carried by the switch's own state, not by color. Token-only colors.
 */
export const ReminderCard = React.forwardRef<HTMLDivElement, ReminderCardProps>(function ReminderCard(
  { label, time, enabled = false, onToggle, glyph = '⏰', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(CARD_SHELL, 'flex items-center gap-[var(--xen-space-md)] p-5 shadow-sm', className)}
      {...rest}
    >
      <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
        <Icon glyph={glyph} size="lg" color="onPrimary" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold text-on-surface">{label}</p>
        <p className="text-sm text-muted">{time}</p>
      </div>

      <Switch
        checked={enabled}
        onChange={(next) => onToggle?.(next)}
        aria-label={`${label} reminder at ${time}`}
      />
    </div>
  );
});

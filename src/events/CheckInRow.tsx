import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';

export interface CheckInRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Attendee name. */
  name: string;
  /** Avatar image URL (initials fallback when absent). */
  avatarUrl?: string;
  /** Ticket tier / type label. */
  ticketType?: string;
  /** Pre-formatted check-in time, shown when checked in. */
  checkedInAt?: string;
  /** Current check-in state. */
  checkedIn?: boolean;
  /** Fires with the desired next state when the row's toggle is pressed. */
  onToggle?: (next: boolean) => void;
  /** Disable the toggle. */
  disabled?: boolean;
}

/**
 * A staff-facing check-in row: avatar, attendee name, ticket type, and a toggle
 * that flips the checked-in state. The state is shown with a check glyph, a text
 * badge (`Checked in` / `Not in`) and `aria-checked` on a `switch` — never color
 * alone. Colors come from the `--xen-*` tokens; no literal colors.
 */
export const CheckInRow = React.forwardRef<HTMLDivElement, CheckInRowProps>(function CheckInRow(
  { name, avatarUrl, ticketType, checkedInAt, checkedIn = false, onToggle, disabled = false, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-row items-center gap-md rounded-md border border-border bg-surface p-md', className)}
      {...rest}
    >
      <Avatar src={avatarUrl} name={name} size="sm" />
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-base font-semibold text-on-surface">{name}</p>
        <div className="flex flex-row flex-wrap items-center gap-sm">
          {ticketType ? <span className="text-sm text-muted">{ticketType}</span> : null}
          {checkedIn ? (
            <Badge tone="success">{checkedInAt ? `In · ${checkedInAt}` : 'Checked in'}</Badge>
          ) : (
            <Badge tone="neutral">Not in</Badge>
          )}
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checkedIn}
        aria-label={checkedIn ? `Undo check-in for ${name}` : `Check in ${name}`}
        disabled={disabled}
        onClick={() => onToggle?.(!checkedIn)}
        className={cn(
          'inline-flex flex-row items-center gap-xs rounded-full px-md py-xs text-sm font-bold transition-opacity',
          checkedIn ? 'bg-success text-on-success' : 'bg-primary text-on-primary',
          'disabled:pointer-events-none disabled:opacity-50 hover:opacity-90',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
        )}
      >
        <span aria-hidden="true">{checkedIn ? '✓' : '+'}</span>
        {checkedIn ? 'In' : 'Check in'}
      </button>
    </div>
  );
});

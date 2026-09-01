import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface LocationHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Place name, shown bold on the brand ground. */
  location: string;
  /** Secondary line beneath the location (e.g. the date). */
  date?: string;
  /** Trailing icon button handler; omit to hide the button. */
  onMenu?: () => void;
  /** Glyph for the trailing button. Default `'☰'`. */
  menuGlyph?: string;
}

/**
 * LocationHeader — a gradient rounded header card (web parity of the native
 * `LocationHeader`). A `📍` pin + the `location` in bold `on-primary`, an
 * optional `date` beneath in the softer `primary-100`, and — when `onMenu` is
 * set — a round trailing button on a lighter ramp step. The ground is a
 * `primary` gradient; every color comes from `--xen-*` Tailwind classes, no
 * literals.
 */
export const LocationHeader = React.forwardRef<HTMLDivElement, LocationHeaderProps>(
  function LocationHeader({ location, date, onMenu, menuGlyph = '☰', className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-4 flex flex-row items-center justify-between',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-row items-center gap-2">
          <Icon glyph="📍" size="lg" aria-hidden color="onPrimary" />
          <div className="min-w-0">
            <p className="truncate font-bold text-on-primary">{location}</p>
            {date ? <p className="truncate text-sm text-primary-100">{date}</p> : null}
          </div>
        </div>

        {onMenu ? (
          <button
            type="button"
            onClick={onMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500"
          >
            <Icon glyph={menuGlyph} size="lg" aria-hidden color="onPrimary" />
          </button>
        ) : null}
      </div>
    );
  }
);

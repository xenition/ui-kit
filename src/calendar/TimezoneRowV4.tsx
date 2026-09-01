import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import { metaLine } from './internal/grid-v4';
import type { TimezoneRowProps } from './TimezoneRow';

export interface TimezoneRowV4Props extends TimezoneRowProps {
  /**
   * Derive the offset caption when none is passed. Default: the zone's current
   * short offset from `Intl`. The base required the host to restate what every
   * platform already knows, and showed nothing when they did not.
   */
  formatOffset?: (timezone: string) => string | undefined;
}

/** The zone's current short offset, from `Intl`. `undefined` if it cannot say. */
function defaultOffset(timezone: string): string | undefined {
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    }).formatToParts(new Date());
    return parts.find((p) => p.type === 'timeZoneName')?.value;
  } catch {
    // An unknown IANA name is a host bug, not a reason to take the screen down.
    return undefined;
  }
}

/**
 * **V4 timezone row** — the web twin of the native `TimezoneRowV4`, same props
 * as {@link TimezoneRow} plus `formatOffset`.
 *
 * ## Three changes
 *
 * 1. **The offset is derived when it is not given.**
 * 2. **It is a row from the shared row line**, with the shared hover layer.
 * 3. **An unknown zone degrades rather than throwing.**
 *
 * **Renders nothing without a `timezone`** (§4.5).
 */
export const TimezoneRowV4 = React.forwardRef<HTMLDivElement, TimezoneRowV4Props>(
  function TimezoneRowV4(
    { timezone, label, offsetLabel, title, variant = 'row', formatOffset, onPress, className, ...rest },
    ref
  ) {
    if (!timezone) return null;

    const offset = offsetLabel ?? (formatOffset ?? defaultOffset)(timezone);
    const caption = metaLine([label ?? timezone, offset]);
    const name = metaLine([title, caption]);

    if (variant === 'inline') {
      return (
        <span
          ref={ref as React.Ref<HTMLDivElement>}
          aria-label={name}
          className={cn('flex items-center gap-xs text-xs text-muted-text', className)}
          {...rest}
        >
          <IconV4 name="globe" size="sm" />
          <span className="truncate">{caption}</span>
        </span>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-timezone-row=""
        data-xen-v4-chrome={onPress ? 'on-surface' : undefined}
        role={onPress ? 'button' : undefined}
        onClick={onPress}
        aria-label={name}
        className={cn(ROW_V4_BASE_CLASS, rowHeightClass(Boolean(title)), className)}
        {...rest}
      >
        <IconV4 name="globe" size="lg" className="text-muted-text" />
        <div className={ROW_V4_TEXT_CLASS}>
          {title ? (
            <span className="truncate text-base font-semibold text-on-card">{title}</span>
          ) : null}
          <span
            className={cn('truncate', title ? 'text-xs text-muted-text' : 'text-base text-on-card')}
          >
            {caption}
          </span>
        </div>
        {onPress ? <IconV4 name="chevron-right" size="lg" className="text-muted-text" /> : null}
      </div>
    );
  }
);

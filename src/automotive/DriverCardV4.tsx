import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { metaLine, SKELETON_CLASS } from './internal/fleet-v4';
import type { DriverCardProps } from './DriverCard';

export interface DriverCardV4Props extends DriverCardProps {
  /** Accessible name for the message action. Default `'Message driver'`. */
  messageLabel?: string;
  /** Accessible name for the call action. Default `'Call driver'`. */
  callLabel?: string;
  /** Words for the presence dot. Defaults `'Online'` / `'Offline'`. */
  onlineLabel?: string;
  offlineLabel?: string;
  /** Format the trip count. Default `'1,204 trips'`. */
  formatTripCount?: (trips: number) => string;
}

/**
 * **V4 driver card** — the web twin of the native `DriverCardV4`, same props
 * as {@link DriverCard} plus four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number** — `RatingV4 showValue`. Five glyphs at
 *    `sm` is not a number.
 * 2. **Presence is a dot *and* a word.** `online` was a green circle and
 *    nothing else: invisible to a colour-blind user and to a screen reader.
 * 3. **An interactive card is a real `<button>`**, not a div with
 *    `role="button"` and a hand-written key handler.
 * 4. **The skeleton is opaque**, not a translucent wash that borrows whatever
 *    is behind it.
 * 5. **The message and call actions are named** — they were glyph-only
 *    buttons with no accessible name at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export const DriverCardV4 = React.forwardRef<HTMLDivElement, DriverCardV4Props>(
  function DriverCardV4(
    {
      name,
      avatarUrl,
      rating,
      tripCount,
      vehicle,
      plate,
      etaLabel,
      online,
      variant = 'default',
      messageLabel = 'Message driver',
      callLabel = 'Call driver',
      onlineLabel = 'Online',
      offlineLabel = 'Offline',
      formatTripCount,
      onMessage,
      onCall,
      onClick,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    if (loading) {
      return (
        <CardV4 ref={ref} className={cn('flex gap-sm', className)} {...rest}>
          <div className={cn('h-12 w-12 rounded-full', SKELETON_CLASS)} />
          <div className="flex flex-1 flex-col gap-xs">
            <div className={cn('h-4 w-1/2', SKELETON_CLASS)} />
            <div className={cn('h-3 w-2/3', SKELETON_CLASS)} />
          </div>
        </CardV4>
      );
    }

    if (!name) return null;

    const compact = variant === 'compact';
    const trips =
      typeof tripCount === 'number'
        ? (formatTripCount ?? ((n: number) => `${n.toLocaleString()} trips`))(tripCount)
        : null;
    const caption = metaLine([vehicle, plate, trips]);
    const presence = online == null ? null : online ? onlineLabel : offlineLabel;

    const body = (
      <>
        <div className="flex items-center gap-sm">
          <AvatarV4 src={avatarUrl} name={name} size={compact ? 'sm' : 'md'} />
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <div className="flex items-center gap-sm">
              <span className="truncate font-heading text-base font-bold text-on-card">{name}</span>
              {/* A dot AND a word — the base shipped the dot alone. */}
              {presence ? (
                <span className="flex shrink-0 items-center gap-xs">
                  <span
                    aria-hidden
                    className={cn('h-2 w-2 rounded-full', online ? 'bg-success' : 'bg-muted')}
                  />
                  <span className={cn('text-xs', online ? 'text-success-text' : 'text-muted-text')}>
                    {presence}
                  </span>
                </span>
              ) : null}
            </div>

            {typeof rating === 'number' ? <RatingV4 value={rating} size="sm" showValue /> : null}

            {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
          </div>

          {etaLabel ? (
            <BadgeV4 tone="primary" variant="soft" size="sm">
              {etaLabel}
            </BadgeV4>
          ) : null}
        </div>

        {!compact && (onMessage || onCall) ? (
          <div className="mt-md flex gap-sm">
            {onMessage ? (
              <ButtonV4
                variant="secondary"
                size="sm"
                onClick={onMessage}
                aria-label={messageLabel}
                className="flex-1"
              >
                <IconV4 name="mail" size="sm" />
              </ButtonV4>
            ) : null}
            {onCall ? (
              <ButtonV4
                variant="primary"
                size="sm"
                onClick={onCall}
                aria-label={callLabel}
                className="flex-1"
              >
                <IconV4 name="phone" size="sm" />
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </>
    );

    if (!onClick) {
      return (
        <CardV4 ref={ref} data-xen-driver-card="" className={className} {...rest}>
          {body}
        </CardV4>
      );
    }

    return (
      <CardV4 ref={ref} data-xen-driver-card="" className={cn('p-0', className)} {...rest}>
        <button
          type="button"
          onClick={onClick}
          aria-label={metaLine([name, presence, caption, etaLabel])}
          data-xen-v4-chrome="on-surface"
          className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
        >
          {body}
        </button>
      </CardV4>
    );
  }
);

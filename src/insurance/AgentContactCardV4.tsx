import * as React from 'react';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import {
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  toneGroundStyle,
  toneInkClass,
} from './internal/tone-v4';
import type { AgentContactCardProps } from './AgentContactCard';

/** A phone number as a dialable `tel:` target — everything but digits and `+`. */
function telHref(phone: string): string {
  const trimmed = phone.trim();
  const plus = trimmed.startsWith('+') ? '+' : '';
  const digits = trimmed.replace(/[^0-9]/g, '');
  return `tel:${plus}${digits}`;
}

export interface AgentContactCardV4Props extends AgentContactCardProps {
  /** The call action's visible word. Default `'Call'`. */
  callLabel?: string;
  /** The email action's visible word. Default `'Email'`. */
  emailLabel?: string;
  /** Said when `available` is true. Default `'Available'`. */
  availableLabel?: string;
  /** Said when `available` is false. Default `'Offline'`. */
  offlineLabel?: string;
}

/**
 * **V4 agent contact card** — same props as {@link AgentContactCard} plus
 * `callLabel`, `emailLabel`, `availableLabel` and `offlineLabel`.
 *
 * ## Five changes
 *
 * 1. **The phone number and the email address are links.** They were inert
 *    `<span>`s. On a phone — where a policyholder opens this card in the
 *    middle of an accident — the number could be read and not dialled, and the
 *    address could not be copied by any gesture the platform offers for a
 *    link. They are now `tel:` and `mailto:` anchors, which also means the
 *    card still works with no `onCall` / `onEmail` handler at all, where the
 *    base rendered no action whatsoever.
 * 2. **Two adjuster cards no longer present two identical "Call" buttons.** A
 *    claim page lists the agent and the adjuster; a reader tabbing through
 *    heard "Call, button. Email, button. Call, button. Email, button." and had
 *    no way to tell whose. Each action's accessible name carries the person's
 *    name, and contains the visible word, so the visible label is still part
 *    of the name (WCAG 2.5.3).
 * 3. **Availability is a word, in the card's own reading order.** The pill was
 *    a `Badge` whose glyph — `●` against `○` — was its only non-colour signal
 *    at a glance, and `success`/`neutral` did the rest.
 * 4. **The card is one block of contact detail, not five stops.** Name, title,
 *    agency and availability are read together; the glyphs beside the number
 *    and the address are decorative rather than three more announced items.
 * 5. **Every control clears 44 and focuses with `ring-ring`.** Nothing in the
 *    module cleared the tap floor — a phone number was a line of text with no
 *    target at all.
 */
export const AgentContactCardV4 = React.forwardRef<HTMLDivElement, AgentContactCardV4Props>(
  function AgentContactCardV4(
    {
      name,
      title,
      agency,
      phone,
      email,
      avatarUrl,
      available,
      callLabel = 'Call',
      emailLabel = 'Email',
      availableLabel = 'Available',
      offlineLabel = 'Offline',
      onCall,
      onEmail,
      className,
      ...rest
    },
    ref
  ) {
    if (!name) return null;

    const availabilityText =
      available == null ? undefined : available ? availableLabel : offlineLabel;
    const contactLine = cn(
      'flex items-center gap-sm rounded-[var(--xen-radius-sm)] text-sm text-on-card underline',
      MIN_TAP_CLASS,
      FOCUS_RING_CLASS
    );

    return (
      <CardV4 ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        <div className="flex items-center gap-md">
          <AvatarV4 src={avatarUrl} name={name} size="lg" alt="" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-on-card">{name}</p>
            {title != null || agency != null ? (
              <p className="truncate text-sm text-muted-text">{metaLine([title, agency])}</p>
            ) : null}
            {availabilityText != null ? (
              <span
                className={cn(
                  'mt-xs inline-flex items-center gap-xs rounded-[var(--xen-radius-full)] px-sm py-xs text-xs font-semibold',
                  toneInkClass(available ? 'success' : 'neutral')
                )}
                style={toneGroundStyle(available ? 'success' : 'neutral')}
              >
                <span aria-hidden="true">{available ? '●' : '○'}</span>
                {availabilityText}
              </span>
            ) : null}
          </div>
        </div>

        {phone != null || email != null ? (
          <div className="flex flex-col gap-xs">
            {phone != null ? (
              <a href={telHref(phone)} className={contactLine}>
                <span aria-hidden="true">📞</span>
                {phone}
              </a>
            ) : null}
            {email != null ? (
              <a href={`mailto:${email}`} className={cn(contactLine, 'truncate')}>
                <span aria-hidden="true">✉️</span>
                {email}
              </a>
            ) : null}
          </div>
        ) : null}

        {phone != null || email != null ? (
          <div className="flex gap-sm">
            {phone != null ? (
              <ButtonV4
                variant="primary"
                size="sm"
                // The name says whose number this is; a claim page shows two of
                // these cards and the visible word is the same on both.
                aria-label={`${callLabel} ${name}`}
                href={onCall == null ? telHref(phone) : undefined}
                onClick={onCall}
                className={cn('flex-1', MIN_TAP_CLASS)}
              >
                {callLabel}
              </ButtonV4>
            ) : null}
            {email != null ? (
              <ButtonV4
                variant="secondary"
                size="sm"
                aria-label={`${emailLabel} ${name}`}
                href={onEmail == null ? `mailto:${email}` : undefined}
                onClick={onEmail}
                className={cn('flex-1', MIN_TAP_CLASS)}
              >
                {emailLabel}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);

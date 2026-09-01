import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Icon } from '../primitives';
import { Avatar } from '../primitives/Avatar';

export interface ContactAgentBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional agent name shown on the left (e.g. `'Dana Reyes'`). */
  agentName?: string;
  /** Optional agent photo URL for the avatar. Falls back to initials of `agentName`. */
  agentAvatarUrl?: string;
  /** Optional supporting line under the name (e.g. `'Listing agent · Acme Realty'`). */
  agentSubtitle?: string;
  /** Fires when the Call action is pressed. When omitted the Call button is hidden. */
  onCall?: React.MouseEventHandler<HTMLButtonElement>;
  /** Fires when the Message action is pressed. When omitted the Message button is hidden. */
  onMessage?: React.MouseEventHandler<HTMLButtonElement>;
  /** Fires when the Schedule-tour action is pressed. When omitted the primary CTA is hidden. */
  onTour?: React.MouseEventHandler<HTMLButtonElement>;
  /** Label for the Call action. Defaults to `'Call'`. */
  callLabel?: string;
  /** Label for the Message action. Defaults to `'Message'`. */
  messageLabel?: string;
  /** Label for the primary Schedule-tour action. Defaults to `'Tour'`. */
  tourLabel?: string;
}

/** Shared min-height so every CTA clears the 44px tap target. */
const CTA = 'min-h-[44px]';

/**
 * ContactAgentBar — **V4** "listing" design. A sticky-style contact action bar
 * for a listing: an optional agent avatar + name/subtitle on the left, then the
 * secondary Call and Message actions and a primary Schedule-tour CTA on the
 * right. Editorial, single-accent (primary) with the tour as the only filled
 * button; every CTA is ≥44px. 8-pt spacing inside a rounded elevated bar.
 * Presentational only — data + callbacks; an action is only rendered when its
 * handler is supplied. All colors from `--xen-*` token classes, no literals;
 * dark-mode safe.
 */
export const ContactAgentBar = React.forwardRef<HTMLDivElement, ContactAgentBarProps>(function ContactAgentBar(
  {
    agentName,
    agentAvatarUrl,
    agentSubtitle,
    onCall,
    onMessage,
    onTour,
    callLabel = 'Call',
    messageLabel = 'Message',
    tourLabel = 'Tour',
    className,
    ...rest
  },
  ref
) {
  const showAgent = Boolean(agentName || agentAvatarUrl);

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md',
        className
      )}
      {...rest}
    >
      {showAgent ? (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Avatar src={agentAvatarUrl} name={agentName} size="md" />
          <div className="flex min-w-0 flex-col">
            {agentName ? <span className="truncate text-sm font-bold text-on-surface">{agentName}</span> : null}
            {agentSubtitle ? <span className="truncate text-xs text-muted">{agentSubtitle}</span> : null}
          </div>
        </div>
      ) : null}

      <div className={cn('flex items-center gap-2', showAgent ? 'ml-auto' : 'w-full')}>
        {onCall ? (
          <Button variant="secondary" size="md" onClick={onCall} aria-label={callLabel} className={cn(CTA, 'gap-1.5')}>
            <Icon name="phone" aria-hidden size="base" />
            {callLabel}
          </Button>
        ) : null}
        {onMessage ? (
          <Button
            variant="secondary"
            size="md"
            onClick={onMessage}
            aria-label={messageLabel}
            className={cn(CTA, 'gap-1.5')}
          >
            <Icon name="mail" aria-hidden size="base" />
            {messageLabel}
          </Button>
        ) : null}
        {onTour ? (
          <Button variant="primary" size="md" onClick={onTour} aria-label={tourLabel} className={cn(CTA, 'flex-1 gap-1.5')}>
            <Icon name="calendar" aria-hidden size="base" />
            {tourLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
});

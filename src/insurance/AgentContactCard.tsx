import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';

export interface AgentContactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Agent full name. */
  name: string;
  /** Role / title (e.g. "Licensed agent", "Claims adjuster"). */
  title?: string;
  /** Agency or brokerage name. */
  agency?: string;
  /** Phone number, already formatted by the caller. */
  phone?: string;
  /** Email address. */
  email?: string;
  /** Optional avatar image URL. */
  avatarUrl?: string;
  /** Availability flag — shows an online/offline presence pill + label. */
  available?: boolean;
  /** Fires when the call action is pressed (only shown with a `phone`). */
  onCall?: () => void;
  /** Fires when the email action is pressed (only shown with an `email`). */
  onEmail?: () => void;
}

/**
 * A contact card for the policyholder's agent / adjuster: avatar, name/title/
 * agency, and call + email actions. Availability is shown by **text + a
 * presence pill** (glyph + label + a `success`/`neutral` token tone) — never
 * color alone. Call/email actions are real `<button>`s that only render when the
 * corresponding contact detail and handler are supplied. Token-bound throughout
 * — no literal colors. Web parity of the native `AgentContactCard`.
 */
export const AgentContactCard = React.forwardRef<HTMLDivElement, AgentContactCardProps>(
  function AgentContactCard(
    { name, title, agency, phone, email, avatarUrl, available, onCall, onEmail, className, ...rest },
    ref
  ) {
    const showCall = phone != null && onCall != null;
    const showEmail = email != null && onEmail != null;

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <Avatar src={avatarUrl} name={name} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-on-surface">{name}</p>
            {title != null ? (
              <p className="truncate text-sm text-muted">
                {title}
                {agency != null ? ` · ${agency}` : ''}
              </p>
            ) : agency != null ? (
              <p className="truncate text-sm text-muted">{agency}</p>
            ) : null}
            {available != null ? (
              <Badge tone={available ? 'success' : 'neutral'} className="mt-1">
                <span aria-hidden="true">{available ? '●' : '○'}</span>{' '}
                {available ? 'Available' : 'Offline'}
              </Badge>
            ) : null}
          </div>
        </div>

        {phone != null || email != null ? (
          <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
            {phone != null ? (
              <div className="flex items-center gap-[var(--xen-space-sm)]">
                <Icon glyph="📞" size="sm" aria-label="Phone" />
                <span className="text-sm text-on-surface">{phone}</span>
              </div>
            ) : null}
            {email != null ? (
              <div className="flex items-center gap-[var(--xen-space-sm)]">
                <Icon glyph="✉️" size="sm" aria-label="Email" />
                <span className="truncate text-sm text-on-surface">{email}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        {showCall || showEmail ? (
          <div className={cn('mt-[var(--xen-space-md)] flex gap-[var(--xen-space-sm)]')}>
            {showCall ? (
              <Button variant="primary" size="sm" onClick={onCall} className="flex-1">
                Call
              </Button>
            ) : null}
            {showEmail ? (
              <Button variant="secondary" size="sm" onClick={onEmail} className="flex-1">
                Email
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { TONE_TINT } from './internal/tint';

/** Voter registration status. */
export type RegistrationStatus = 'registered' | 'pending' | 'not-registered' | 'inactive';

const REG: Record<RegistrationStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  registered: { label: 'Registered', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  'not-registered': { label: 'Not registered', glyph: '!', tone: 'danger' },
  inactive: { label: 'Inactive', glyph: '✕', tone: 'neutral' },
};

export interface VotingInfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Voter registration status — conveyed by text + glyph + color. */
  registration: RegistrationStatus;
  /** Localized upcoming election date (already formatted). */
  electionDate?: string;
  /** Name / title of the upcoming election. */
  electionName?: string;
  /** Assigned polling place name. */
  pollingPlace?: string;
  /** Polling place address. */
  pollingAddress?: string;
  /** Whether the voter is registered for mail / absentee ballot. */
  mailBallot?: boolean;
  /** Fires "Register" / "Update registration" (shown when handler present). */
  onRegister?: () => void;
  /** Fires "Find polling place" (shown when handler present). */
  onFindPolling?: () => void;
}

/**
 * A voter-information card: registration status conveyed by **text + glyph +
 * color** (never color alone), the next election, an assigned polling place, and
 * gated Register / Find-polling actions (real `<button>`s). The action label
 * adapts to whether the voter is already registered. Token-bound throughout — no
 * literal colors. Web parity of the native `VotingInfoCard`.
 */
export const VotingInfoCard = React.forwardRef<HTMLDivElement, VotingInfoCardProps>(
  function VotingInfoCard(
    {
      registration,
      electionDate,
      electionName,
      pollingPlace,
      pollingAddress,
      mailBallot = false,
      onRegister,
      onFindPolling,
      className,
      ...rest
    },
    ref
  ) {
    const reg = REG[registration] ?? REG['not-registered'];
    const isRegistered = registration === 'registered';
    const election = [electionName, electionDate].filter((v) => v != null && v !== '').join(' · ');

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
              TONE_TINT[reg.tone]
            )}
          >
            <Icon glyph="🗳️" size="xl" aria-label="Voting" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-on-surface">Voter status</p>
            <Badge tone={reg.tone} className="mt-0.5">
              <span aria-hidden="true">{reg.glyph}</span> {reg.label}
            </Badge>
          </div>
          {mailBallot ? (
            <Badge tone="primary">
              <span aria-hidden="true">📮</span> Mail ballot
            </Badge>
          ) : null}
        </div>

        {election !== '' ? (
          <div className="mt-[var(--xen-space-md)] flex flex-col gap-0.5 border-t border-border pt-[var(--xen-space-md)]">
            <span className="text-xs text-muted">Next election</span>
            <span className="text-sm font-semibold text-on-surface">{election}</span>
          </div>
        ) : null}

        {pollingPlace != null ? (
          <div className="mt-[var(--xen-space-sm)] flex flex-col gap-0.5">
            <span className="text-xs text-muted">Polling place</span>
            <span className="text-sm text-on-surface">
              <span aria-hidden="true">📍</span> {pollingPlace}
            </span>
            {pollingAddress != null ? (
              <span className="text-xs text-muted">{pollingAddress}</span>
            ) : null}
          </div>
        ) : null}

        {onRegister != null || onFindPolling != null ? (
          <div className="mt-[var(--xen-space-md)] flex justify-end gap-[var(--xen-space-sm)]">
            {onFindPolling != null ? (
              <Button size="sm" variant="outline" onClick={onFindPolling}>
                Find polling place
              </Button>
            ) : null}
            {onRegister != null ? (
              <Button size="sm" onClick={onRegister}>
                {isRegistered ? 'Update registration' : 'Register to vote'}
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);

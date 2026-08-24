import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Spinner } from '../primitives/Spinner';
import { clamp, formatElapsed, type MatchmakingPhase } from './types';

export interface MatchmakingStatusProps {
  /** Current phase — drives the icon, headline, and available actions. */
  phase: MatchmakingPhase;
  /** Seconds spent searching (shown as `m:ss` while searching). */
  elapsedSeconds?: number;
  /** Players found so far (for the "3 / 10" slot readout). */
  found?: number;
  /** Total players needed. */
  needed?: number;
  /** Optional queue / mode label, e.g. `'Ranked · Solo'`. */
  queueLabel?: string;
  /** Called to cancel the search (shown while `searching`). */
  onCancel?: () => void;
  /** Called to accept a found match (shown while `found`). */
  onAccept?: () => void;
  /** Called to retry after a failure (shown while `failed`). */
  onRetry?: () => void;
  /** Extra classes on the root card. */
  className?: string;
}

const PHASE_COPY: Record<MatchmakingPhase, { title: string; glyph: string }> = {
  idle: { title: 'Ready to queue', glyph: '🎯' },
  searching: { title: 'Finding a match…', glyph: '🔎' },
  found: { title: 'Match found!', glyph: '✅' },
  failed: { title: 'Matchmaking failed', glyph: '⚠️' },
};

const RING: Record<MatchmakingPhase, string> = {
  idle: 'border-primary',
  searching: 'border-primary',
  found: 'border-success',
  failed: 'border-danger',
};

/**
 * A matchmaking status panel — reflects the queue `phase` with an icon,
 * headline, a live elapsed timer + player-slot readout, and phase-appropriate
 * actions (Cancel while searching, Accept when found, Retry on failure). While
 * `searching` it shows a spinner; the phase is announced via the accessible
 * label (never conveyed by color alone). Composes `Card`, `Button`, `Spinner`,
 * `Icon`. Token-only.
 */
export function MatchmakingStatus({
  phase,
  elapsedSeconds,
  found,
  needed,
  queueLabel,
  onCancel,
  onAccept,
  onRetry,
  className,
}: MatchmakingStatusProps): React.ReactElement {
  const copy = PHASE_COPY[phase];
  const searching = phase === 'searching';

  const slots =
    needed != null && needed > 0 ? `${clamp(found ?? 0, 0, needed)} / ${needed} players` : undefined;

  const a11y = `${copy.title}${slots ? `, ${slots}` : ''}${
    searching && elapsedSeconds != null ? `, ${formatElapsed(elapsedSeconds)} elapsed` : ''
  }`;

  return (
    <Card className={cn('flex flex-col items-center gap-[var(--xen-space-md)]', className)} aria-label={a11y}>
      <div
        className={cn('flex h-16 w-16 items-center justify-center rounded-full border-2', RING[phase])}
      >
        {searching ? <Spinner size="md" /> : <Icon glyph={copy.glyph} size="2xl" color="onSurface" />}
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <p className="text-lg font-bold text-on-surface">{copy.title}</p>
        {queueLabel ? <p className="text-sm text-muted">{queueLabel}</p> : null}
        <div className="mt-0.5 flex gap-[var(--xen-space-md)]">
          {searching && elapsedSeconds != null ? (
            <span className="text-sm font-semibold text-muted">{formatElapsed(elapsedSeconds)}</span>
          ) : null}
          {slots ? <span className="text-sm font-semibold text-muted">{slots}</span> : null}
        </div>
      </div>

      {phase === 'found' && onAccept ? (
        <Button variant="primary" onClick={onAccept} className="w-full" aria-label="Accept match">
          Accept
        </Button>
      ) : null}
      {phase === 'failed' && onRetry ? (
        <Button variant="primary" onClick={onRetry} className="w-full" aria-label="Retry matchmaking">
          Retry
        </Button>
      ) : null}
      {searching && onCancel ? (
        <Button variant="danger" onClick={onCancel} className="w-full" aria-label="Cancel search">
          Cancel
        </Button>
      ) : null}
    </Card>
  );
}

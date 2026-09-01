import * as React from 'react';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { SpinnerV4 } from '../primitives/SpinnerV4';
import type { MatchmakingStatusProps } from './MatchmakingStatus';
import { clamp, formatElapsed, type MatchmakingPhase } from './types';
import { TABULAR_CLASS, spokenLine } from './internal/arcade-v4';

export interface MatchmakingStatusV4Props extends MatchmakingStatusProps {
  /** Override the four phase headlines. */
  phaseLabels?: Partial<Record<MatchmakingPhase, string>>;
}

const PHASE_TITLE: Record<MatchmakingPhase, string> = {
  idle: 'Ready to queue',
  searching: 'Finding a match…',
  found: 'Match found!',
  failed: 'Matchmaking failed',
};

const PHASE_GLYPH: Record<MatchmakingPhase, string> = {
  idle: '🎯',
  searching: '🔎',
  found: '✅',
  failed: '⚠️',
};

/**
 * The ring around the phase glyph.
 *
 * `found` and `failed` are the two phases that genuinely *are* status, so they
 * are the only two that spend a status colour. `idle` is a hairline and
 * `searching` is the brand — neither is a success or a warning.
 */
const PHASE_RING: Record<MatchmakingPhase, string> = {
  idle: 'border-border',
  searching: 'border-primary',
  found: 'border-success',
  failed: 'border-danger',
};

/**
 * **V4 matchmaking status** — same props as {@link MatchmakingStatus} plus
 * `phaseLabels`.
 *
 * ## Four changes
 *
 * 1. **The panel has a name again.** The base hung the combined status string
 *    on `Card`, which renders a bare `<div>` — and ARIA forbids naming a
 *    generic element, so the browser threw the label away and a screen-reader
 *    user in a queue heard nothing at all. The root is a `group` now, a role
 *    that both takes a name and leaves its subtree reachable, so Accept, Retry
 *    and Cancel are still their own stops. (The native twin fails the same
 *    moment from the other side: `accessible` on the root collapses the panel
 *    and takes the only three controls with it.)
 * 2. **A phase change is announced.** Nothing on either twin told anyone the
 *    match had been found; the user had to happen to be re-reading the panel
 *    at the moment it flipped, and the accept window expired while they
 *    swiped. The headline is a live region — **assertive for `found` only**,
 *    because that is the one phase with a window that closes unseen, and
 *    polite for the other three. The elapsed timer stays outside it: a region
 *    that re-announces every second is a region people turn off.
 * 3. **Cancel is the same weight on both twins.** It was a solid `danger`
 *    button here and an outlined one on native, and neither is right:
 *    abandoning a queue is reversible and undoes nothing, so spending the
 *    error colour on it leaves nothing left to say when matchmaking actually
 *    fails. Both twins draw it as the low-emphasis outline.
 * 4. **Press is a state layer and every control clears 44**, both of which
 *    `ButtonV4` now owns, in place of the base's `hover:opacity` dimming —
 *    which is the signal M3 reserves for *disabled*.
 */
export const MatchmakingStatusV4 = React.forwardRef<HTMLDivElement, MatchmakingStatusV4Props>(
  function MatchmakingStatusV4(
    {
      phase,
      elapsedSeconds,
      found,
      needed,
      queueLabel,
      onCancel,
      onAccept,
      onRetry,
      phaseLabels,
      className,
    },
    ref
  ) {
    const searching = phase === 'searching';
    const title = phaseLabels?.[phase] ?? PHASE_TITLE[phase];

    const slots =
      needed != null && needed > 0
        ? `${clamp(found ?? 0, 0, needed)} / ${needed} players`
        : undefined;
    const elapsed = searching && elapsedSeconds != null ? formatElapsed(elapsedSeconds) : undefined;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={spokenLine([title, queueLabel, slots, elapsed && `${elapsed} elapsed`])}
        className={cn(
          'flex flex-col items-center gap-md rounded-[var(--xen-radius-lg)] border border-border',
          'bg-card p-lg text-on-card',
          className
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            'flex h-2xl w-2xl items-center justify-center rounded-full border-2',
            PHASE_RING[phase]
          )}
        >
          {searching ? <SpinnerV4 size="md" /> : <IconV4 glyph={PHASE_GLYPH[phase]} size="2xl" />}
        </div>

        <div className="flex flex-col items-center gap-xs">
          {/*
            `found` is the one phase worth interrupting for — its accept window
            expires. The timer and the slot count sit outside the region
            deliberately; see change 2.
          */}
          <p
            role="status"
            aria-live={phase === 'found' ? 'assertive' : 'polite'}
            aria-atomic="true"
            className="font-heading text-lg font-bold text-on-card"
          >
            {title}
          </p>
          {queueLabel ? <p className="text-sm text-muted-text">{queueLabel}</p> : null}
          {elapsed != null || slots != null ? (
            <div className="flex gap-md">
              {elapsed != null ? (
                <span className={cn('text-sm font-semibold text-muted-text', TABULAR_CLASS)}>
                  {elapsed}
                </span>
              ) : null}
              {slots != null ? (
                <span className={cn('text-sm font-semibold text-muted-text', TABULAR_CLASS)}>
                  {slots}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {phase === 'found' && onAccept ? (
          <ButtonV4
            variant="primary"
            onClick={onAccept}
            className="w-full"
            aria-label="Accept match"
          >
            Accept
          </ButtonV4>
        ) : null}
        {phase === 'failed' && onRetry ? (
          <ButtonV4
            variant="primary"
            onClick={onRetry}
            className="w-full"
            aria-label="Retry matchmaking"
          >
            Retry
          </ButtonV4>
        ) : null}
        {searching && onCancel ? (
          <ButtonV4
            variant="outline"
            onClick={onCancel}
            className="w-full"
            aria-label="Cancel search"
          >
            Cancel
          </ButtonV4>
        ) : null}
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { metaLine } from '../primitives/internal/tone-v4';
import { discGround, discInkClass, type ToneV4 } from './internal/job-v4';
import type { DispatchBarProps, DispatchStage } from './DispatchBar';

export interface DispatchBarV4Props extends DispatchBarProps {
  /**
   * How the armed "Complete" action is named while it waits for its confirming
   * press. Default `` (next) => `Confirm ${next}` ``.
   */
  confirmAdvanceLabel?: (next: string) => string;
  /** Override the stage words — five English phrases lived inside. */
  stageLabels?: Partial<Record<DispatchStage, string>>;
}

interface StageV4 {
  label: string;
  glyph: string;
  tone: ToneV4;
  advance?: string;
  next?: DispatchStage;
}

/**
 * Stage → word, glyph, tone and the action that leaves it.
 *
 * The stages in the middle of the workflow take no status colour: a dispatch
 * stage is where a job sits in a queue, not how it turned out, and the base
 * painted "En route" amber and "On site" green — spending the two colours that
 * have to mean "look at this" and "this went well" on a position in a list.
 * Only `complete`, which really is an outcome, keeps `success`.
 */
const STAGE_V4: Record<DispatchStage, StageV4> = {
  unassigned: { label: 'Unassigned', glyph: '○', tone: 'muted', advance: 'Accept', next: 'accepted' },
  accepted: { label: 'Accepted', glyph: '✓', tone: 'primary', advance: 'Start driving', next: 'en-route' },
  'en-route': { label: 'En route', glyph: '→', tone: 'primary', advance: 'Arrive', next: 'on-site' },
  'on-site': { label: 'On site', glyph: '▶', tone: 'primary', advance: 'Complete', next: 'complete' },
  complete: { label: 'Complete', glyph: '✓', tone: 'success', advance: undefined, next: undefined },
};

/**
 * **V4 dispatch bar** — the web twin of the native `DispatchBarV4`, same props
 * as {@link DispatchBar} plus `confirmAdvanceLabel` and `stageLabels`.
 *
 * ## Six changes
 *
 * 1. **No enabled button that does nothing.** `canAdvance` never consulted
 *    `onAdvance`, so `<DispatchBar stage="on-site" />` shipped a live
 *    "Complete" that swallowed every press in silence. The action now exists
 *    only when there is a handler to receive it.
 * 2. **Completing a visit takes a confirming press.** It is irreversible — the
 *    bar offers no action afterwards — and it was one tap on a phone held in a
 *    glove. The first press arms and renames the button through
 *    `confirmAdvanceLabel`; the second advances.
 * 3. **`loading` means the same thing on both twins.** The web bar only set
 *    `disabled`, so a caller who showed a spinner on the phone got a dead grey
 *    button on the tablet. It is now `aria-busy` as well as disabled.
 * 4. **The stage is not printed twice.** Without a `jobLabel` the bar drew the
 *    stage word as its title and then again underneath it.
 * 5. **The disc is decorative.** It carried an accessible label, so the stage
 *    was announced from the disc and then from the line under the title.
 * 6. **The primary action clears 44** and a dispatch stage stops wearing a
 *    status colour — see {@link STAGE_V4}.
 */
export const DispatchBarV4 = React.forwardRef<HTMLDivElement, DispatchBarV4Props>(
  function DispatchBarV4(
    {
      stage,
      eta,
      jobLabel,
      onAdvance,
      onNavigate,
      loading = false,
      confirmAdvanceLabel = (next: string) => `Confirm ${next}`,
      stageLabels,
      className,
      style,
    },
    ref
  ) {
    const [armed, setArmed] = React.useState(false);

    const sd = STAGE_V4[stage] ?? STAGE_V4.unassigned;
    const word = stageLabels?.[stage] ?? sd.label;
    // An action with no handler is not an action.
    const canAdvance = sd.advance != null && sd.next != null && onAdvance != null;
    // Only the last step is guarded: it is the one the bar cannot undo.
    const guarded = sd.next === 'complete';
    const advanceWord = armed ? confirmAdvanceLabel(sd.advance ?? word) : (sd.advance ?? word);

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'flex items-center gap-md border-t border-border bg-surface px-md py-md',
          className
        )}
      >
        <span
          aria-hidden
          className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]"
          style={{ background: discGround(sd.tone) }}
        >
          <IconV4 glyph={sd.glyph} className={discInkClass(sd.tone)} />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="truncate font-heading text-base font-bold text-on-surface">
            {jobLabel ?? word}
          </span>
          {/* With no job label the title IS the stage, so the caption carries
              only what the title does not. */}
          <span className="truncate text-xs text-muted-text">
            {jobLabel != null ? metaLine([word, eta]) : (eta ?? '')}
          </span>
        </div>

        {onNavigate ? (
          <ButtonV4 variant="outline" size="md" onClick={onNavigate}>
            Navigate
          </ButtonV4>
        ) : null}

        {canAdvance ? (
          <ButtonV4
            variant="primary"
            size="md"
            disabled={loading}
            aria-busy={loading || undefined}
            onClick={() => {
              if (guarded && !armed) {
                setArmed(true);
                return;
              }
              setArmed(false);
              onAdvance?.(sd.next as DispatchStage);
            }}
            // Walking away from an armed Complete disarms it.
            onBlur={() => setArmed(false)}
          >
            {advanceWord}
          </ButtonV4>
        ) : null}
      </div>
    );
  }
);

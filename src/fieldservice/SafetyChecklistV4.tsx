import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AlertV4 } from '../primitives/AlertV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import {
  BADGE_V4,
  clearsHazard,
  discGround,
  discInkClass,
  hazardCount,
  nextVerdict,
  spokenLine,
  type ToneV4,
} from './internal/job-v4';
import type { SafetyChecklistProps, SafetyVerdict } from './SafetyChecklist';

export interface SafetyChecklistV4Props extends SafetyChecklistProps {
  /**
   * How the armed row is named while it waits for its confirming press.
   * Default `` (label) => `Confirm clearing hazard: ${label}` ``.
   */
  confirmHazardLabel?: (label: string) => string;
  /** Override the verdict words — three English words lived inside. */
  verdictLabels?: Partial<Record<SafetyVerdict, string>>;
  /** The word for a blocking hazard. Default `'Hazard'`. */
  hazardLabel?: string;
  /** Build the hazard banner's sentence. */
  formatHazardCount?: (count: number) => string;
}

/** Verdict → glyph, tone and word. `unchecked` is an absence, so it is `muted`. */
const VERDICT_V4: Record<SafetyVerdict, { glyph: string; tone: ToneV4; label: string }> = {
  pass: { glyph: '✓', tone: 'success', label: 'Pass' },
  fail: { glyph: '✕', tone: 'danger', label: 'Fail' },
  unchecked: { glyph: '○', tone: 'muted', label: 'Unchecked' },
};

/**
 * **V4 safety checklist** — the web twin of the native `SafetyChecklistV4`,
 * same props as {@link SafetyChecklist} plus `confirmHazardLabel`,
 * `verdictLabels`, `hazardLabel` and `formatHazardCount`.
 *
 * ## Five changes
 *
 * 1. **A glove brushing the screen no longer certifies a site as safe.** A
 *    failing fall-protection anchor showed a red "Hazard — do not proceed"
 *    banner over a 40px row, tapped one-handed and outdoors. One tap moved the
 *    row `fail → unchecked`, which dropped it out of the hazard count,
 *    unmounted the banner and flipped the header to "All clear" — with no
 *    confirmation, no undo, and no prop through which a caller could ask for
 *    either. `clearsHazard()` names that one transition: the first press arms
 *    the row and says so, in the accessible name *and* on screen, and only the
 *    second press calls `onToggle`. Every other transition is unchanged and
 *    immediate, because passing is the ordinary case and making it cost two
 *    taps would be a worse component rather than a safer one.
 * 2. **The row's name says what pressing will do**, and carries the hazard
 *    flag. `` `${label}, ${verdict}` `` replaced the subtree, so the one word
 *    that decides whether a technician walks onto the site — "Hazard" — was
 *    the word the label dropped.
 * 3. **The verdict is announced once.** The glyph disc had an accessible label
 *    of its own, so a reader said "Fail" from the disc and "Fail" again from
 *    the row.
 * 4. **A checklist with no handler is not a wall of live buttons.** Without
 *    `onToggle` every row was a fully controlled control that could be pressed
 *    forever and never change; the rows are now plain text.
 * 5. **Rows clear 44 and answer with a state layer**, not `hover:opacity-80` —
 *    a dimmed row reads as an unavailable one.
 */
export const SafetyChecklistV4 = React.forwardRef<HTMLDivElement, SafetyChecklistV4Props>(
  function SafetyChecklistV4(
    {
      title,
      items,
      onToggle,
      loading = false,
      emptyLabel = 'No safety items',
      confirmHazardLabel = (label: string) => `Confirm clearing hazard: ${label}`,
      verdictLabels,
      hazardLabel = 'Hazard',
      formatHazardCount = (count: number) =>
        `${count} blocking safety ${count === 1 ? 'item is' : 'items are'} failing.`,
      className,
      style,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [armedId, setArmedId] = React.useState<string | null>(null);

    const list = Array.isArray(items) ? items : [];
    const hazards = hazardCount(list);
    const failCount = list.filter((item) => item.verdict === 'fail').length;
    const interactive = onToggle != null;

    if (loading) {
      return (
        <CardV4 ref={ref} className={className} style={style}>
          <div role="status" aria-label="Loading safety checklist" className="flex flex-col gap-md">
            <SkeletonV4 variant="text" width="50%" />
            <SkeletonV4 variant="text" lines={3} />
          </div>
        </CardV4>
      );
    }

    if (list.length === 0) {
      return (
        <EmptyStateV4
          ref={ref}
          title={emptyLabel}
          description="Safety checkpoints will appear here."
          className={className}
          style={style}
        />
      );
    }

    return (
      <CardV4 ref={ref} className={className} style={style}>
        <div className="flex items-center justify-between gap-md">
          {title != null ? (
            <span className="font-heading text-base font-bold text-on-card">{title}</span>
          ) : (
            <span />
          )}
          <BadgeV4 tone={failCount > 0 ? 'danger' : 'success'} {...BADGE_V4}>
            {failCount > 0 ? `✕ ${failCount} failing` : '✓ All clear'}
          </BadgeV4>
        </div>

        {hazards > 0 ? (
          <div className="mt-md">
            <AlertV4 tone="danger" title="Hazard — do not proceed">
              {formatHazardCount(hazards)}
            </AlertV4>
          </div>
        ) : null}

        <div className="mt-md flex flex-col gap-xs">
          {list.map((item) => {
            const vd = VERDICT_V4[item.verdict] ?? VERDICT_V4.unchecked;
            const word = verdictLabels?.[item.verdict] ?? vd.label;
            const next = nextVerdict(item.verdict);
            const nextWord = verdictLabels?.[next] ?? VERDICT_V4[next].label;
            const armed = armedId === item.id;
            const guarded = clearsHazard(item, next);

            // The trailing fragment is the verdict the press moves to — the
            // thing the base's `label, verdict` name never said.
            const name = armed
              ? confirmHazardLabel(item.label)
              : spokenLine([item.label, word, item.hazard ? hazardLabel : null, nextWord]);

            const body = (
              <>
                <span
                  aria-hidden
                  className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]"
                  style={{ background: discGround(vd.tone) }}
                >
                  <IconV4 glyph={vd.glyph} size="sm" className={discInkClass(vd.tone)} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-xs">
                  <span className="text-sm font-medium text-on-card">{item.label}</span>
                  {armed ? (
                    // The confirmation is on the screen too, not carried by the
                    // accessible name alone.
                    <span className="text-xs font-semibold text-warn-text">
                      {confirmHazardLabel(item.label)}
                    </span>
                  ) : null}
                </span>
                {item.hazard ? (
                  <BadgeV4 tone="danger" {...BADGE_V4}>
                    {`⚠ ${hazardLabel}`}
                  </BadgeV4>
                ) : null}
                <BadgeV4 tone={vd.tone} {...BADGE_V4}>
                  {word}
                </BadgeV4>
              </>
            );

            if (!interactive) {
              return (
                <div
                  key={item.id}
                  className={cn('flex items-center gap-md py-xs', MIN_TAP_CLASS)}
                >
                  {body}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                aria-label={name}
                onClick={() => {
                  if (guarded && !armed) {
                    setArmedId(item.id);
                    return;
                  }
                  setArmedId(null);
                  onToggle?.(item.id, next);
                }}
                // Walking away disarms, so a checklist left open never sits one
                // stray press from clearing the banner.
                onBlur={() => setArmedId((current) => (current === item.id ? null : current))}
                data-xen-v4-state=""
                style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
                className={cn(
                  'flex items-center gap-md rounded-[var(--xen-radius-md)] px-xs py-xs text-left',
                  MIN_TAP_CLASS
                )}
              >
                {body}
              </button>
            );
          })}
        </div>
      </CardV4>
    );
  }
);

import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { StatusPillV4 } from './StatusPillV4';
import { isAdverse } from './workforce-v4';
import {
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  MIN_TAP_SQUARE_CLASS,
  toneInkClass,
} from './internal/tone-v4';
import { POLICY_STATUS_META, type PolicyStatus } from './internal';
import type { PolicyAcknowledgeProps } from './PolicyAcknowledge';

export interface PolicyAcknowledgeV4Props extends PolicyAcknowledgeProps {
  /**
   * When the acknowledgement is due, pre-formatted.
   *
   * `overdue` is the adverse member of this union and the card had no field
   * saying *when* it went overdue, so "⚠ Overdue" was a red word with no
   * deadline attached to it.
   */
  dueDate?: string;
  /**
   * Whether the policy has been acknowledged — now genuinely controlled.
   *
   * The prop existed, but the consent tick beside it lived in the card's own
   * `useState`, so a caller that rejected the acknowledgement server-side and
   * flipped this back to `false` was left looking at a ticked box it had no
   * way to clear. The tick follows this prop.
   */
  acknowledged?: boolean;
  /** Copy on the acknowledge action. Default `'Acknowledge'`. */
  acknowledgeLabel?: string;
  /** Build the effective-date line. Default `` `Effective ${date}` ``. */
  formatEffective?: (date: string) => string;
  /** Build the due line. Default `` `Due ${date}` ``. */
  formatDue?: (date: string) => string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 policy acknowledgement** — the web twin of the native
 * `PolicyAcknowledgeV4`, same props as {@link PolicyAcknowledge} plus
 * `dueDate`, a controlled `acknowledged`, `acknowledgeLabel`,
 * `formatEffective`, `formatDue` and `testID`.
 *
 * ## Five changes
 *
 * 1. **A server-side rejection can clear the tick.** Consent was uncontrolled
 *    `useState`. A caller that posted the acknowledgement, had it refused, and
 *    set `acknowledged={false}` again could not un-tick the box the employee
 *    was looking at — so the card said the policy had been agreed to and the
 *    record said it had not. The tick now follows the prop.
 * 2. **The consent checkbox is a 44 target.** It was a bare 16px `<input>` on
 *    the one control that turns a policy into a signed record.
 * 3. **The consent line is named once.** `aria-label={consentLabel}` on the
 *    input *and* the same sentence as the `<label>`'s visible text meant a
 *    reader was handed the sentence twice. The label names the input; the
 *    input carries no second name.
 * 4. **An overdue policy says when it was due.** See `dueDate`.
 * 5. **The status words are inked with ink slots.** "✓ Acknowledged" was drawn
 *    in `text-success` — a **fill** token, guaranteed readable only *under*
 *    `on-success`, not as text.
 */
export const PolicyAcknowledgeV4 = React.forwardRef<HTMLDivElement, PolicyAcknowledgeV4Props>(
  function PolicyAcknowledgeV4(
    {
      title,
      version,
      effectiveDate,
      summary,
      status,
      acknowledged = false,
      acknowledgedDate,
      consentLabel = 'I have read and agree to this policy',
      variant = 'default',
      onToggle,
      onAcknowledge,
      dueDate,
      acknowledgeLabel = 'Acknowledge',
      formatEffective,
      formatDue,
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const [consented, setConsented] = React.useState(acknowledged);

    // The whole point of change 1: when the caller flips `acknowledged` back —
    // a rejected submission, a fresh policy version — the tick follows it
    // instead of stranding the employee with a box they cannot clear.
    React.useEffect(() => {
      setConsented(acknowledged);
    }, [acknowledged]);

    // A card with no policy on it is a consent box for nothing.
    if (!title) return null;

    const compact = variant === 'compact';
    const derivedStatus: PolicyStatus = status ?? (acknowledged ? 'acknowledged' : 'pending');
    const statusMeta = POLICY_STATUS_META[derivedStatus];
    const effective = effectiveDate
      ? (formatEffective ?? ((d: string) => `Effective ${d}`))(effectiveDate)
      : null;
    const meta = metaLine([version, effective]);
    const overdue = isAdverse(derivedStatus);
    const dueLine = dueDate ? (formatDue ?? ((d: string) => `Due ${d}`))(dueDate) : undefined;

    const handleToggle = (next: boolean): void => {
      setConsented(next);
      onToggle?.(next);
    };

    return (
      <Card ref={ref} data-testid={testID} className={cn('flex flex-col gap-sm', className)}>
        <div className="flex items-start justify-between gap-sm">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-base font-bold text-on-card">{title}</p>
            {meta ? <p className="text-xs text-muted-text">{meta}</p> : null}
          </div>
          <StatusPillV4 meta={statusMeta} size="sm" />
        </div>

        {dueLine ? (
          <p className={cn('text-xs font-semibold', overdue ? toneInkClass('danger') : 'text-muted-text')}>
            {overdue ? <span aria-hidden="true">⚠ </span> : null}
            {dueLine}
          </p>
        ) : null}

        {!compact && summary ? (
          <p className="line-clamp-4 text-sm text-muted-text">{summary}</p>
        ) : null}

        {acknowledged ? (
          <p className={cn('text-xs font-semibold', toneInkClass('success'))}>
            <span aria-hidden="true">✓ </span>
            {acknowledgedDate ? `Acknowledged on ${acknowledgedDate}` : 'Acknowledged'}
          </p>
        ) : (
          <div className="flex flex-col gap-sm">
            {/*
              The label is the target: a 44 square holds the tick, and the
              sentence beside it is the input's only accessible name.
            */}
            <label className="flex cursor-pointer items-center gap-sm">
              <span
                className={cn(
                  'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
                  MIN_TAP_SQUARE_CLASS
                )}
              >
                <CheckboxV4 checked={consented} onChange={(e) => handleToggle(e.target.checked)} />
              </span>
              <span className="flex-1 text-xs text-on-card">{consentLabel}</span>
            </label>
            <ButtonV4
              size="sm"
              variant="primary"
              disabled={!consented}
              onClick={onAcknowledge}
              className={cn(MIN_TAP_CLASS, FOCUS_RING_CLASS)}
            >
              {acknowledgeLabel}
            </ButtonV4>
          </div>
        )}
      </Card>
    );
  }
);

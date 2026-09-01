import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { AlertSeverity, CivicAlertProps } from './CivicAlert';
import { spokenLine, tintGround, tintInkClass, type ToneV4 } from './internal/civic-v4';

export interface CivicAlertV4Props extends CivicAlertProps {
  /** Override the four severity words — `'Information'`, `'Emergency'`. */
  severityLabels?: Partial<Record<AlertSeverity, string>>;
  /** How dismiss names itself once armed. Default `'Confirm dismiss'`. */
  confirmDismissLabel?: string;
}

/**
 * Severity → word, glyph, tone and border.
 *
 * Four severities and only three tones, because the base already folds the
 * native `accent` advisory into `primary` on web; keeping that fold here means
 * an advisory does not quietly become a second kind of warning.
 */
const SEVERITY_V4: Record<
  AlertSeverity,
  { label: string; glyph: string; tone: ToneV4; border: string }
> = {
  info: { label: 'Information', glyph: 'ℹ️', tone: 'primary', border: 'border-primary' },
  advisory: { label: 'Advisory', glyph: '📢', tone: 'primary', border: 'border-primary' },
  warning: { label: 'Warning', glyph: '⚠️', tone: 'warn', border: 'border-warn' },
  emergency: { label: 'Emergency', glyph: '🚨', tone: 'danger', border: 'border-danger' },
};

/** The two severities that are allowed to interrupt whatever is being read. */
const URGENT: AlertSeverity[] = ['warning', 'emergency'];

/**
 * **V4 civic alert** — the web twin of the native `CivicAlertV4`, same props as
 * {@link CivicAlert} plus `severityLabels` and `confirmDismissLabel`.
 *
 * ## Four changes
 *
 * 1. **It actually announces.** The base put `role="alert"` on the banner
 *    itself — content present at first paint. A live region announces
 *    *changes*, so a banner that is already in the tree when the region is
 *    created is read out by nobody, and the ordinary case is the only case an
 *    emergency banner has. V4 keeps a live region whose text arrives one commit
 *    after mount, and reserves `assertive` for `warning` and `emergency`:
 *    announcing everything teaches a user to ignore everything.
 * 2. **The message is inside the name.** `aria-label={`${severity}: ${title}`}`
 *    on the container replaced its own subtree, so the field carrying "evacuate
 *    via Route 9" — the sentence the alert exists for — never reached a reader.
 *    The container no longer names itself; the announcement carries severity,
 *    title, message, source and time in that order.
 * 3. **Dismissing an emergency takes a second press.** One tap removed the
 *    banner irreversibly and the component offers no way to restore it. The
 *    control arms first, renames itself, and disarms on blur.
 * 4. **Dismiss is a target.** It was a bare 14×20 glyph with no padding at all —
 *    the smallest control in the module, on the component people tap while
 *    moving. It clears 44, answers with a state layer rather than a fade, and
 *    the eyebrow takes the contrast-corrected ink instead of the `primary` /
 *    `warn` / `danger` **fill** used as words on a tint of itself.
 */
export const CivicAlertV4 = React.forwardRef<HTMLDivElement, CivicAlertV4Props>(
  function CivicAlertV4(
    {
      severity,
      title,
      message,
      source,
      time,
      actionLabel = 'View details',
      onAction,
      onDismiss,
      severityLabels,
      confirmDismissLabel = 'Confirm dismiss',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [armed, setArmed] = React.useState(false);

    const sd = SEVERITY_V4[severity] ?? SEVERITY_V4.info;
    const word = severityLabels?.[severity] ?? sd.label;
    const urgent = URGENT.includes(severity);
    const meta = metaLine([source, time]);
    const announcement = spokenLine([word, title, message, source, time]);

    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
      setAnnounced(announcement);
    }, [announcement]);

    const dismissWord = armed ? confirmDismissLabel : 'Dismiss alert';

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-md rounded-[var(--xen-radius-md)] border p-md',
          sd.border,
          className
        )}
        style={{ background: tintGround(sd.tone) }}
        {...rest}
      >
        <span
          role={urgent ? 'alert' : 'status'}
          aria-live={urgent ? 'assertive' : 'polite'}
          className="sr-only"
        >
          {announced}
        </span>

        <IconV4 glyph={sd.glyph} size="xl" aria-hidden className={tintInkClass(sd.tone)} />

        <div className="min-w-0 flex-1">
          <p className={cn('text-xs font-bold uppercase', tintInkClass(sd.tone))}>{word}</p>
          <p className="text-base font-bold text-on-surface">{title}</p>
          {message != null ? <p className="text-sm text-on-surface">{message}</p> : null}
          {meta !== '' ? <p className="text-xs text-muted-text">{meta}</p> : null}
          {onAction != null ? (
            <div className="mt-sm">
              <ButtonV4
                size="md"
                variant={severity === 'emergency' ? 'danger' : 'primary'}
                onClick={onAction}
              >
                {actionLabel}
              </ButtonV4>
            </div>
          ) : null}
        </div>

        {onDismiss != null ? (
          <button
            type="button"
            aria-label={dismissWord}
            onClick={() => {
              // An emergency alert has no undo, so the first press only arms.
              if (!armed) {
                setArmed(true);
                return;
              }
              setArmed(false);
              onDismiss();
            }}
            // Walking away from an armed dismiss disarms it.
            onBlur={() => setArmed(false)}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
            className={cn(
              'inline-flex shrink-0 items-center justify-center gap-xs rounded-[var(--xen-radius-md)] px-sm',
              MIN_TAP_CLASS,
              'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <span aria-hidden="true" className="text-muted-text">
              {armed ? '?' : '✕'}
            </span>
            {armed ? (
              // The word changes with the state, so the confirm is not carried
              // by a glyph swap alone.
              <span className="text-xs font-semibold text-on-surface">{confirmDismissLabel}</span>
            ) : null}
          </button>
        ) : null}
      </div>
    );
  }
);

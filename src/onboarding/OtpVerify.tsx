import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Progress } from '../primitives/Progress';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';

/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 56 (`h-14`) — the height a §6 field stands at, which the code cells
  now match — and 44 (`h-11`), the minimum tap target for a header control or a
  text link (§7). Every colour, radius, gap and font size here is a token class.
*/
const CELL_CLASS = 'h-14 w-14';
const TAP_TARGET_CLASS = 'min-h-11';

/** Default cooldown length, in seconds, for the resend progress bar. */
const DEFAULT_RESEND_INTERVAL = 30;

export interface OtpVerifyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  /** The channel the code was sent to (e.g. a phone number or email). */
  destination?: string;
  /** Number of digits. Default `6`. */
  length?: number;
  /** Controlled code value. */
  value: string;
  /** Fires with the joined code on every keystroke. */
  onChange: (value: string) => void;
  /** Fires when the user confirms (or the code auto-fills to full length). */
  onVerify?: (code: string) => void;
  /** Fires when the user clicks "Resend code". */
  onResend?: () => void;
  /** Error message shown under the inputs (e.g. `'That code didn't match'`). */
  error?: string;
  /** Verify button spinner + block. */
  loading?: boolean;
  /** Seconds until resend is available; disables the resend link until 0. */
  resendCountdown?: number;
  /** Verify button copy. Default `'Verify'`. */
  verifyLabel?: string;
  /** Auto-fire `onVerify` once the code reaches `length`. Default `true`. */
  autoSubmit?: boolean;
  /**
   * Headline above the code field (§4). Omitted by default so a host that
   * already prints its own screen title does not end up with two.
   */
  title?: string;
  /** Supporting line under the headline (§4). Defaults to the "sent to" line. */
  subtitle?: string;
  /** Hero art for the step (§3). Rendered in a centred, tinted panel. */
  illustration?: React.ReactNode;
  /** Glyph for the fallback hero medallion when `illustration` is absent (§3). */
  logoGlyph?: string;
  /**
   * Header progress slot (§1/§2) — pass the segmented bars, e.g.
   * `<ProgressDots variant="bars" count={4} activeIndex={3} />`.
   */
  progress?: React.ReactNode;
  /** Renders the header's back control. */
  onBack?: () => void;
  /** Renders the header's dismiss (✕) control. */
  onDismiss?: () => void;
  /**
   * Full length of the resend cooldown in seconds — what `resendCountdown`
   * counts down *from*. Drives the draining bar under the resend row so the
   * wait is visible rather than a number that mysteriously changes. Default 30.
   */
  resendInterval?: number;
  /**
   * Confirmation shown after a resend ("Code sent"), announced politely. The
   * whole reason a user clicks resend three times is that the first click looked
   * like nothing happened.
   */
  resendNotice?: string;
  /** Copy beside the resend link. Default `"Didn't get the code?"`. */
  resendPrompt?: string;
}

/**
 * One-time-code verification — the code-entry step, rebuilt to the anatomy in
 * `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress · dismiss),
 * a hero slot, a headline block, the code field, and the sticky CTA footer.
 *
 * **The code cells are owned here rather than delegated to `PinInput`.** §6
 * requires an error state that raises the field's border to `danger` alongside
 * a `danger-text` message — never colour alone — and `PinInput` has no error or
 * focus contract to express that. The cells keep `PinInput`'s behaviour exactly
 * (single character each, focus advances on entry, backspace retreats) at the
 * §6 geometry: 56 tall, `radius.lg`, a 1px border that rises to `primary` on
 * focus.
 *
 * The **resend affordance shows its cooldown**: the label counts down, a
 * draining bar shows how much of the wait is left, and `resendNotice` confirms
 * the send in a polite live region. A user who cannot tell whether resend worked
 * clicks it again, and again — which is how an account ends up rate-limited by
 * its own verification screen.
 *
 * When `autoSubmit` is on it fires `onVerify` as soon as the code fills,
 * matching the SMS-autofill idiom. Every new prop is optional. No literal
 * colors.
 */
export const OtpVerify = React.forwardRef<HTMLDivElement, OtpVerifyProps>(
  function OtpVerify(
    {
      destination,
      length = 6,
      value,
      onChange,
      onVerify,
      onResend,
      error,
      loading = false,
      resendCountdown,
      verifyLabel = 'Verify',
      autoSubmit = true,
      title,
      subtitle,
      illustration,
      logoGlyph,
      progress,
      onBack,
      onDismiss,
      resendInterval = DEFAULT_RESEND_INTERVAL,
      resendNotice,
      resendPrompt = "Didn't get the code?",
      className,
      ...rest
    },
    ref
  ) {
    const refs = React.useRef<(HTMLInputElement | null)[]>([]);
    const chars = Array.from({ length }, (_, i) => value[i] ?? '');
    const invalid = error != null && error !== '';

    const setChar = (i: number, c: string): void => {
      const next = chars.slice();
      next[i] = c.slice(-1);
      const joined = next.join('');
      onChange(joined);
      if (c && i < length - 1) refs.current[i + 1]?.focus();
      if (autoSubmit && joined.length === length) onVerify?.(joined);
    };

    const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Backspace' && !chars[i] && i > 0) refs.current[i - 1]?.focus();
    };

    const remaining = Math.max(0, resendCountdown ?? 0);
    const canResend = resendCountdown == null || resendCountdown <= 0;
    const interval = resendInterval > 0 ? resendInterval : DEFAULT_RESEND_INTERVAL;
    const elapsed = Math.max(0, interval - Math.min(remaining, interval));

    const showHeader = onBack != null || onDismiss != null || progress != null;
    const showHero = illustration != null || logoGlyph != null;

    return (
      <div ref={ref} className={cn('flex flex-col items-center gap-lg', className)} {...rest}>
        {showHeader ? (
          <div className="flex w-full items-center gap-sm">
            {onBack ? (
              <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
            <div className="flex flex-1 justify-center">{progress}</div>
            {onDismiss ? (
              <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                <Icon name="close" size="lg" color="muted" />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
          </div>
        ) : null}

        {showHero ? (
          <div className="flex aspect-[4/3] w-full max-h-[38vh] items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50 p-lg">
            {illustration ?? (
              <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-primary">
                <Icon glyph={logoGlyph} size="3xl" color="onPrimary" />
              </span>
            )}
          </div>
        ) : null}

        {title != null || subtitle != null ? (
          <div className="flex flex-col gap-sm">
            {title ? (
              <h2>
                <Text size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2} className="block">
                  {title}
                </Text>
              </h2>
            ) : null}
            {subtitle ? (
              <Text size="base" tone="muted" align="center" numberOfLines={3} className="block">
                {subtitle}
              </Text>
            ) : null}
          </div>
        ) : null}

        {subtitle == null && destination ? (
          <p className="text-center">
            <Text size="base" tone="muted">
              Enter the code we sent to{' '}
            </Text>
            <Text size="base" weight="bold" tone="onSurface">
              {destination}
            </Text>
          </p>
        ) : null}

        {/* §6 code field — 56 tall, radius.lg, border rises to primary on focus
            and holds at danger while the code is wrong. */}
        <div className="flex gap-sm">
          {chars.map((c, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              aria-label={`Digit ${i + 1}`}
              aria-invalid={invalid || undefined}
              inputMode="numeric"
              maxLength={1}
              value={c}
              onChange={(e) => setChar(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              className={cn(
                'rounded-[var(--xen-radius-lg)] border bg-surface text-center text-lg font-semibold text-on-surface outline-none',
                CELL_CLASS,
                invalid ? 'border-danger' : 'border-border focus:border-primary'
              )}
            />
          ))}
        </div>

        {invalid ? (
          <p aria-live="assertive" className="flex items-center justify-center gap-xs">
            <Icon name="error" size="sm" color="danger" />
            <Text size="sm" tone="dangerText">
              {error}
            </Text>
          </p>
        ) : null}

        {/* Resend, with the wait made visible. */}
        <div className="flex w-full flex-col items-center gap-xs">
          <p className="flex items-center justify-center gap-xs">
            <Text size="sm" tone="muted">
              {resendPrompt}
            </Text>
            <button
              type="button"
              aria-label="Resend code"
              aria-disabled={!canResend || undefined}
              disabled={!canResend}
              onClick={onResend}
              className={cn('flex items-center disabled:pointer-events-none', TAP_TARGET_CLASS)}
            >
              <Text size="sm" weight="semibold" tone={canResend ? 'primary' : 'muted'}>
                {canResend ? 'Resend code' : `Resend in ${remaining}s`}
              </Text>
            </button>
          </p>
          {!canResend ? <Progress value={elapsed} max={interval} size="sm" className="w-full" /> : null}
          {resendNotice ? (
            <p aria-live="polite" className="flex items-center justify-center gap-xs">
              <Icon name="check" size="sm" color="success" />
              <Text size="sm" tone="successText">
                {resendNotice}
              </Text>
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex w-full flex-col border-t border-border bg-surface pb-lg pt-md">
          <GetStartedButton
            label={verifyLabel} trailingArrow={false}
            loading={loading}
            disabled={value.length < length}
            onClick={() => onVerify?.(value)}
          />
        </div>
      </div>
    );
  }
);

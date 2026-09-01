import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  FIELD_V4_CSS,
  FIELD_V4_STYLE_ID,
  fieldBorderClass,
  fieldRingVars,
} from '../primitives/internal/field-v4';
import { injectStyleOnce } from '../motion/internal/inject';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowScreenV4,
  flowGroundVars,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { OtpVerifyProps } from './OtpVerify';

export interface OtpVerifyV4Props extends OtpVerifyProps, OnboardingFlowV4Props {
  /** Render as a whole screen — the shared shell. Default `false`. */
  fullScreen?: boolean;
  /** Copy for the resend action while it is available. Default `'Resend code'`. */
  resendLabel?: string;
  /**
   * Copy while the user must wait. Default `'Resend in 30s'`.
   *
   * A function, not a template string, because "in 30s" is not how every
   * language says it — and the base hard-coded the English one inside the
   * component where a host could not reach it.
   */
  formatResendCountdown?: (seconds: number) => string;
  /**
   * Accessible name for cell `n` of `length`. Default `'Digit 3 of 6'`.
   *
   * The base announced "Digit 3" with no total, so a screen-reader user had no
   * way to know how long the code was.
   */
  formatDigitLabel?: (position: number, total: number) => string;
  /** Copy for the sent-to line when no `subtitle` is given. */
  formatDestination?: (destination: string) => string;
}

/** Default seconds between resends when the caller supplies no interval. */
const DEFAULT_RESEND_INTERVAL = 30;

/**
 * **V4 code verification** — the web twin of the native `OtpVerifyV4`: the
 * base's props plus `fullScreen` and four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The cells are on the shared field skin.** `FIELD_V4_SHELL`'s height and
 *    radius, `fieldBorderClass()`, and the one focus ring every V4 control
 *    draws — the base picked its own cell class, so the code field was visibly
 *    a different control from the email field one screen earlier.
 * 2. **Focus does not move the layout.** The ring is a `box-shadow`, so
 *    arming it costs no layout.
 * 3. **Every English string is a prop** — four sentences that were unreachable
 *    inside a module whose contract is that copy is caller-supplied.
 * 4. **The digit label carries the total** ("Digit 3 of 6").
 * 5. **`fullScreen`** — the shared shell.
 *
 * `PinInputV4` is deliberately not composed: it takes exactly its base's props
 * and therefore cannot express an invalid code, and a verification screen that
 * cannot show a wrong code is not a verification screen. Closing that gap
 * belongs in `PinInput`, per the design spec's Addendum.
 */
export const OtpVerifyV4 = React.forwardRef<HTMLDivElement, OtpVerifyV4Props>(function OtpVerifyV4(
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
    resendLabel = 'Resend code',
    formatResendCountdown,
    formatDigitLabel,
    formatDestination,
    fullScreen = false,
    ground = 'plain',
    accent = 'primary',
    className,
    style,
    ...rest
  },
  ref
) {
  injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);

  const cells = React.useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');
  const invalid = error != null && error !== '';

  const setChar = (i: number, c: string): void => {
    const ch = c.slice(-1);
    const next = chars.slice();
    next[i] = ch;
    const joined = next.join('');
    onChange(joined);
    if (ch && i < length - 1) cells.current[i + 1]?.focus();
    if (autoSubmit && joined.length === length) onVerify?.(joined);
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !chars[i] && i > 0) cells.current[i - 1]?.focus();
  };

  const remaining = Math.max(0, resendCountdown ?? 0);
  const canResend = resendCountdown == null || resendCountdown <= 0;
  const interval = resendInterval > 0 ? resendInterval : DEFAULT_RESEND_INTERVAL;
  const elapsed = Math.max(0, interval - Math.min(remaining, interval));

  const showHero = illustration != null || logoGlyph != null;
  const digitLabel = formatDigitLabel ?? ((n: number, total: number) => `Digit ${n} of ${total}`);
  const countdownLabel = formatResendCountdown ?? ((seconds: number) => `Resend in ${seconds}s`);

  const body = (
    <>
      {showHero ? <FlowHeroV4 illustration={illustration} logoGlyph={logoGlyph} /> : null}

      <FlowHeadlineV4 title={title ?? ''} subtitle={subtitle} />

      {subtitle == null && destination ? (
        <p className="text-center text-base text-muted-text">
          {formatDestination ? (
            formatDestination(destination)
          ) : (
            <>
              Enter the code we sent to{' '}
              <strong className="font-bold text-on-surface">{destination}</strong>
            </>
          )}
        </p>
      ) : null}

      <div className="flex w-full gap-sm">
        {chars.map((c, i) => (
          <input
            key={i}
            ref={(el) => {
              cells.current[i] = el;
            }}
            data-xen-v4-field=""
            aria-label={digitLabel(i + 1, length)}
            aria-invalid={invalid || undefined}
            inputMode="numeric"
            maxLength={1}
            value={c}
            onChange={(e) => setChar(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            style={fieldRingVars(invalid)}
            className={cn(
              // The shared control geometry, not a per-screen cell class: a
              // code cell is a field, and it should be the same object the
              // email field on the previous screen was.
              'min-w-0 flex-1 rounded-[var(--xen-radius-md)] border bg-surface text-center text-lg font-semibold text-on-surface',
              'h-[var(--xen-space-2xl)] max-w-[var(--xen-space-2xl)]',
              fieldBorderClass(invalid)
            )}
          />
        ))}
      </div>

      {invalid ? (
        <p
          aria-live="assertive"
          className="flex items-center justify-center gap-xs text-sm text-danger-text"
        >
          <IconV4 name="error" size="sm" />
          {error}
        </p>
      ) : null}

      {/* Resend, with the wait made visible rather than only counted down. */}
      <div className="flex w-full flex-col gap-xs">
        <p className="flex items-center justify-center gap-xs text-sm text-muted-text">
          {resendPrompt}
          <button
            type="button"
            aria-label={resendLabel}
            disabled={!canResend}
            onClick={onResend}
            data-xen-v4-chrome="on-surface"
            className={cn(
              'rounded-[var(--xen-radius-md)] px-xs text-sm font-semibold [font-variant-numeric:tabular-nums]',
              MIN_TAP_CLASS,
              canResend ? 'text-primary-text' : 'text-muted-text'
            )}
          >
            {canResend ? resendLabel : countdownLabel(remaining)}
          </button>
        </p>
        {!canResend ? <ProgressV4 value={elapsed} max={interval} size="sm" /> : null}
        {resendNotice ? (
          <p
            aria-live="polite"
            className="flex items-center justify-center gap-xs text-sm text-success-text"
          >
            <IconV4 name="check" size="sm" />
            {resendNotice}
          </p>
        ) : null}
      </div>
    </>
  );

  const header = <FlowHeaderV4 onBack={onBack} onDismiss={onDismiss} progress={progress} />;

  const footer = (
    <FlowFooterV4 safeArea={fullScreen}>
      <GetStartedButtonV4
        label={verifyLabel}
        trailingArrow={false}
        loading={loading}
        disabled={value.length < length}
        onClick={() => onVerify?.(value)}
      />
    </FlowFooterV4>
  );

  if (fullScreen) {
    return (
      <FlowScreenV4
        ref={ref}
        {...rest}
        ground={ground}
        accent={accent}
        center={false}
        className={className}
        style={style}
        header={header}
        footer={footer}
      >
        {body}
      </FlowScreenV4>
    );
  }

  return (
    <div
      ref={ref}
      style={{ ...flowGroundVars(ground, accent), ...style }}
      className={cn('flex flex-col items-center gap-lg', className)}
      {...rest}
    >
      {onBack != null || onDismiss != null || progress != null ? header : null}
      {body}
      <div className="mt-auto w-full">{footer}</div>
    </div>
  );
});

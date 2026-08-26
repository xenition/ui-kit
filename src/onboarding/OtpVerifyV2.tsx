import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Progress } from '../primitives/Progress';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import type { OtpVerifyProps } from './OtpVerify';

/** Drop-in for {@link OtpVerify} — identical props, different design. */
export type OtpVerifyV2Props = OtpVerifyProps;

/** §10: geometry only — 56 (`h-14`) is the code-cell size, 44 the tap target. */
const CELL_CLASS = 'h-14 w-14';
const TAP_TARGET_CLASS = 'min-h-11';
const DEFAULT_RESEND_INTERVAL = 30;

/**
 * Code verification — V2, the editorial line. The hero runs full-bleed to the
 * top edge and the content sheet rises over the seam carrying the headline, the
 * §6 code cells and the sticky CTA. The cells keep the base line's contract
 * exactly: 56 tall, focus raises the border to `primary`, an error holds it at
 * `danger` and prints the message — never colour alone.
 *
 * Same props as {@link OtpVerify}. Token-pure.
 */
export const OtpVerifyV2 = React.forwardRef<HTMLDivElement, OtpVerifyV2Props>(
  function OtpVerifyV2(
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

    return (
      <div ref={ref} className={cn('flex flex-col bg-surface', className)} {...rest}>
        <div className="relative flex h-[38vh] items-center justify-center overflow-hidden bg-primary-50">
          {illustration ?? (
            <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-primary">
              <Icon glyph={logoGlyph ?? '✉'} size="3xl" color="onPrimary" />
            </span>
          )}

          {showHeader ? (
            <div className="absolute inset-x-0 top-0 flex items-center gap-sm px-sm">
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
        </div>

        <div className="-mt-xl flex flex-col items-center gap-lg rounded-t-[var(--xen-radius-lg)] bg-surface p-xl shadow-lg">
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
      </div>
    );
  }
);

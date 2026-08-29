import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Progress } from '../primitives/Progress';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import type { OtpVerifyProps } from './OtpVerify';

/** Drop-in for {@link OtpVerify} — identical props, different design. */
export type OtpVerifyV3Props = OtpVerifyProps;

/** §10: geometry only — 56 (`h-14`) is the code-cell size, 44 the tap target. */
const CELL_CLASS = 'h-14 w-14';
const TAP_TARGET_CLASS = 'min-h-11';
const DEFAULT_RESEND_INTERVAL = 30;

/**
 * Code verification — V3, the compact line. No hero panel: a small badge sits
 * beside a left-aligned headline and the rows tighten, so the step fits a sheet
 * over the screen the user was already on.
 *
 * The code cells keep their 56 size — a shrunk digit box is a box nobody can
 * hit, and density is not worth a mistyped code. `illustration` is deliberately
 * ignored; `logoGlyph` drives the small leading badge.
 *
 * Same props as {@link OtpVerify}. Token-pure.
 */
export const OtpVerifyV3 = React.forwardRef<HTMLDivElement, OtpVerifyV3Props>(
  function OtpVerifyV3(
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
      illustration: _illustration,
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
    const headline = title ?? (destination ? `Enter the code sent to ${destination}` : undefined);

    return (
      <div ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        {showHeader ? (
          <div className="flex items-center gap-sm">
            {onBack ? (
              <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </button>
            ) : null}
            <div className="flex-1">{progress}</div>
            {onDismiss ? (
              <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                <Icon name="close" size="lg" color="muted" />
              </button>
            ) : null}
          </div>
        ) : null}

        {/* Small leading badge beside the headline — the compact line's stand-in
            for the hero panel. Left-aligned per §11's V3 brief. */}
        {headline != null || subtitle != null ? (
          <div className="flex items-center gap-md">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50">
              <Icon glyph={logoGlyph ?? '✉'} size="lg" color="primary" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-xs">
              {headline != null ? (
                <h2>
                  <Text size="lg" weight="bold" tone="onSurface" numberOfLines={2} className="block">
                    {headline}
                  </Text>
                </h2>
              ) : null}
              {subtitle ? (
                <Text size="sm" tone="muted" numberOfLines={2}>
                  {subtitle}
                </Text>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="flex gap-xs">
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
          <p aria-live="assertive" className="flex items-center gap-xs">
            <Icon name="error" size="sm" color="danger" />
            <Text size="sm" tone="dangerText">
              {error}
            </Text>
          </p>
        ) : null}

        <div className="flex w-full flex-col gap-xs">
          <p className="flex items-center gap-xs">
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
            <p aria-live="polite" className="flex items-center gap-xs">
              <Icon name="check" size="sm" color="success" />
              <Text size="sm" tone="successText">
                {resendNotice}
              </Text>
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex w-full flex-col border-t border-border bg-surface pb-lg pt-sm">
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

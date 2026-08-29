import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { TextV4 } from './TextV4';
import { MIN_TAP_CLASS } from './internal/nav-v4';
import { V4_DISABLED_CLASS, V4_STATE_CSS, V4_STATE_STYLE_ID } from './internal/v4-state';
import type { AuthSwitchFooterProps } from './AuthCard';

/**
 * How much weight the action carries.
 *
 * `'primary'` is §9's line — "Don't have an account? **Register**" — where the
 * action is the whole point of the line and reads in `primary-text`.
 *
 * `'muted'` is §5's line — the "No thanks" / "Back" that sits **below** the
 * CTA. §5 is explicit that it must never compete with the CTA for weight, so
 * this tone drops both the colour and the weight: `muted-text` at `medium`
 * rather than `primary-text` at `semibold`. It is the same anatomy at a lower
 * volume, not a second component.
 */
export type AuthSwitchTone = 'primary' | 'muted';

export interface AuthSwitchFooterV4Props extends AuthSwitchFooterProps {
  /** How loudly the action reads. Default `'primary'` — the §9 register line. */
  tone?: AuthSwitchTone;
}

/** The `<style>` id the V4 auth footers share. Injection is idempotent. */
export const AUTH_FOOTER_V4_STYLE_ID = 'xen-v4-auth-footer-styles';

/**
 * The one thing a utility class cannot say.
 *
 * A focus indicator is an accessibility affordance, not a decoration, so it
 * comes off `--xen-ring` — the single slot the compiler already corrected to
 * 3:1 against `surface` — exactly as `ButtonV4` rings itself. Tabbing from the
 * CTA onto the footer link must not change the shape of the focus signal.
 */
export const AUTH_FOOTER_V4_CSS = `
[data-xen-v4-auth-link]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
`;

const TONE: Record<AuthSwitchTone, { ink: 'primaryText' | 'mutedText'; weight: 'semibold' | 'medium' }> =
  {
    primary: { ink: 'primaryText', weight: 'semibold' },
    muted: { ink: 'mutedText', weight: 'medium' },
  };

/**
 * **V4 auth switch footer** — the web twin of the native `AuthSwitchFooterV4`,
 * the base's props plus {@link AuthSwitchTone}, a different design line.
 *
 * §9's centred footer line carrying the opposite action. One line, one
 * emphasis: the prompt is muted, the action is the only thing with weight.
 *
 * ## What V4 changes
 *
 * **The link is a real tap target.** The base put `min-h-11` on the *row* and
 * left the `<button>` the size of the word inside it, so the row was 44 tall
 * and the thing you could actually press was about 17. The minimum moves onto
 * the button, composed as `2xl - xs` off the spacing scale rather than typed as
 * `44`, which is the same expression `ButtonV4` and the V4 nav line compose —
 * so a footer link, a nav row and a button land on one size instead of three
 * that happen to be close.
 *
 * **It answers the pointer.** The base had no hover, no press and no visible
 * disabled state at all on web: the only signal that "Register" was pressable
 * was that it was blue. V4 takes the M3 state layer (`data-xen-v4-state`) —
 * the control's own ink at 0.08 / 0.12 over the ground — and M3's 0.38 for
 * disabled content, instead of dimming, which is the signal 0.38 already means.
 *
 * **The prompt reads.** `muted` is `neutral[600]` and carries no contrast
 * promise; `muted-text` is that slot corrected to AA on `surface`, once, by the
 * compiler. A footer line is small type, which is the last place that can
 * afford ink nobody measured.
 *
 * **Nothing renders without a label** (§10.6/§12). A footer line with no action
 * on it is the same defect as §9's divider above no providers.
 */
export function AuthSwitchFooterV4({
  prompt,
  label,
  onClick,
  disabled = false,
  tone = 'primary',
  className,
  ...rest
}: AuthSwitchFooterV4Props): React.ReactElement | null {
  if (!label) return null;

  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  injectStyleOnce(AUTH_FOOTER_V4_STYLE_ID, AUTH_FOOTER_V4_CSS);

  const t = TONE[tone];

  return (
    <div
      data-xen-v4-auth-switch={tone}
      className={cn('flex flex-wrap items-center justify-center gap-xs', className)}
      {...rest}
    >
      {prompt ? (
        <TextV4 size="sm" tone="mutedText">
          {prompt}
        </TextV4>
      ) : null}
      <button
        type="button"
        data-xen-v4-auth-link=""
        data-xen-v4-state=""
        aria-label={label}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center px-sm',
          'rounded-[var(--xen-radius-md)] focus-visible:outline-none',
          MIN_TAP_CLASS,
          V4_DISABLED_CLASS
        )}
      >
        <TextV4 size="sm" weight={t.weight} tone={t.ink}>
          {label}
        </TextV4>
      </button>
    </div>
  );
}

import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { discGround, spokenLine } from './internal/job-v4';
import type { SignaturePadProps } from './SignaturePad';

export interface SignaturePadV4Props extends SignaturePadProps {
  /** How Clear names itself once armed. Default `'Confirm clear'`. */
  confirmClearLabel?: string;
  /** The prompt on the empty pad. Default `'Tap to sign'`. */
  signLabel?: string;
}

/**
 * **V4 signature pad** — the web twin of the native `SignaturePadV4`, same
 * props as {@link SignaturePad} plus `confirmClearLabel` and `signLabel`.
 *
 * ## Four changes
 *
 * 1. **Clear asks first.** The signature is the legally meaningful artefact of
 *    the visit and one press destroyed it — no confirmation, no undo, and no
 *    prop through which a host app could require either. The first press arms
 *    the button and renames it through `confirmClearLabel`; the second calls
 *    `onClear`.
 * 2. **Clear stops being the loudest thing on the card.** It was a filled
 *    `danger` button on the web and a quiet ghost text button on the phone, so
 *    the riskiest control in the module shouted on one platform and whispered
 *    on the other. Both twins now take the quieter treatment — a `danger`-toned
 *    ghost — and pay for the safety with the confirming press instead of with
 *    a red slab.
 * 3. **One prompt on both twins.** The web said "click to sign" and the phone
 *    "tap to sign", so a shared test, a shared translation and a voice command
 *    each matched exactly one of the two. `signLabel` is one string.
 * 4. **Clear clears 44**, and the pad answers a pointer with a state layer
 *    rather than dimming itself toward the band that means disabled.
 */
export const SignaturePadV4 = React.forwardRef<HTMLDivElement, SignaturePadV4Props>(
  function SignaturePadV4(
    {
      label,
      signed = false,
      signerName,
      signedAt,
      onSign,
      onClear,
      disabled = false,
      confirmClearLabel = 'Confirm clear',
      signLabel = 'Tap to sign',
      className,
      style,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [armed, setArmed] = React.useState(false);

    const header =
      label != null ? (
        <span className="mb-xs block text-xs font-semibold text-muted-text">{label}</span>
      ) : null;

    if (signed) {
      return (
        <div ref={ref} className={className} style={style}>
          {header}
          <div
            className="flex flex-col gap-sm rounded-[var(--xen-radius-md)] border border-border p-md"
            style={{ background: discGround('success') }}
          >
            <div className="flex min-h-[var(--xen-space-2xl)] flex-col justify-end">
              <span className="truncate text-xl font-semibold italic text-on-card">
                {signerName ?? 'Signed'}
              </span>
              <span aria-hidden className="mt-xs block h-px w-full bg-border" />
            </div>
            <div className="flex items-center justify-between gap-md">
              <span className="flex items-center gap-xs">
                <IconV4 glyph="✓" size="sm" className="text-success-text" />
                <span className="text-xs text-muted-text">
                  {spokenLine(['Captured', signedAt])}
                </span>
              </span>
              {onClear ? (
                <ButtonV4
                  variant="ghost"
                  tone="danger"
                  size="md"
                  disabled={disabled}
                  onClick={() => {
                    if (!armed) {
                      setArmed(true);
                      return;
                    }
                    setArmed(false);
                    onClear();
                  }}
                  // Walking away disarms, so a captured signature is never one
                  // stray press from being destroyed.
                  onBlur={() => setArmed(false)}
                >
                  {armed ? confirmClearLabel : 'Clear'}
                </ButtonV4>
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={className} style={style}>
        {header}
        <button
          type="button"
          aria-label={label != null ? `${label}: ${signLabel}` : signLabel}
          disabled={disabled || onSign == null}
          onClick={onSign}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-xs rounded-[var(--xen-radius-md)]',
            'border border-dashed border-border bg-surface px-md py-xl',
            'disabled:pointer-events-none disabled:opacity-[0.38]'
          )}
        >
          <IconV4 glyph="✍" size="2xl" className="text-muted-text" />
          <span className="text-sm font-medium text-muted-text">{signLabel}</span>
          <span aria-hidden className="mt-sm block h-px w-4/5 bg-border" />
        </button>
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Button } from '../primitives';

export interface SignaturePadProps {
  /** Prompt shown above the signing area (e.g. "Customer signature"). */
  label?: string;
  /**
   * Controlled captured state. When `true` the pad shows the captured
   * signature summary instead of the prompt. The kit ships no drawing canvas
   * (that needs a native gesture/SVG dependency), so this is a dep-free
   * capture-state placeholder: it records *that* a signature was taken and by
   * whom, and the host app supplies the real capture surface if needed.
   */
  signed?: boolean;
  /** Name of the signer, shown once captured. */
  signerName?: string;
  /** Localized capture timestamp, shown once captured. */
  signedAt?: string;
  /** Fires when the empty pad is clicked to capture a signature. */
  onSign?: () => void;
  /** Fires when the Clear action is pressed on a captured signature. */
  onClear?: () => void;
  /** Disables interaction. */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A signature capture block. Because the kit adds no drawing dependency, this
 * is a dependency-free capture-state surface: an empty state (a dashed baseline
 * + "Click to sign" prompt as a real `<button>` firing `onSign`) and a captured
 * state (the signer name over a baseline, a timestamp, and a Clear action that
 * fires `onClear`). Capture is conveyed by text + a check glyph, not color
 * alone. All colors trace to `--xen-*` tokens — no literals.
 */
export const SignaturePad = React.forwardRef<HTMLDivElement, SignaturePadProps>(
  function SignaturePad(
    { label, signed = false, signerName, signedAt, onSign, onClear, disabled = false, className, style },
    ref
  ) {
    const header =
      label != null ? (
        <span className="mb-[var(--xen-space-xs)] block text-xs font-semibold text-muted">{label}</span>
      ) : null;

    if (signed) {
      return (
        <div ref={ref} className={className} style={style}>
          {header}
          <div className="flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-success/[0.06] p-[var(--xen-space-md)]">
            <div className="flex min-h-[48px] flex-col justify-end">
              <span className="truncate text-xl font-semibold italic text-on-surface">
                {signerName ?? 'Signed'}
              </span>
              <span className="mt-[var(--xen-space-xs)] block h-px w-full bg-border" />
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-[var(--xen-space-xs)]">
                <Icon glyph="✓" size="sm" color="success" aria-label="Signed" />
                <span className="text-xs text-muted">
                  Captured{signedAt != null ? ` · ${signedAt}` : ''}
                </span>
              </span>
              {onClear ? (
                <Button variant="danger" size="sm" onClick={onClear} disabled={disabled}>
                  Clear
                </Button>
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
          aria-label={label != null ? `${label}: click to sign` : 'Click to sign'}
          disabled={disabled || onSign == null}
          onClick={onSign}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)]',
            'border border-dashed border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-xl)]',
            'transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <Icon glyph="✍" size="2xl" color="muted" />
          <span className="text-sm font-medium text-muted">Click to sign</span>
          <span className="mt-[var(--xen-space-sm)] block h-px w-4/5 bg-border" />
        </button>
      </div>
    );
  }
);

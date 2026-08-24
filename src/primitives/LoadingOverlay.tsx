import * as React from 'react';
import { cn } from './cn';
import { Spinner } from './Spinner';

export interface LoadingOverlayProps {
  /** When false the overlay renders nothing. */
  visible: boolean;
  /** Optional label beneath the spinner. */
  label?: string;
  className?: string;
}

/**
 * Blocking loading overlay — an absolute-fill dim layer with a centered spinner
 * (from the `primary` token) and an optional label card. The dim is a faded
 * neutral scrim; the label card is `surface`. Fills its nearest positioned
 * ancestor, so wrap it in a `relative` parent (or let it cover the screen).
 * Announces a polite busy live region. No literal colors.
 */
export function LoadingOverlay({
  visible,
  label,
  className,
}: LoadingOverlayProps): React.ReactElement | null {
  if (!visible) return null;
  return (
    <div
      role="progressbar"
      aria-label={label ?? 'Loading'}
      aria-busy="true"
      aria-live="polite"
      className={cn(
        'absolute inset-0 z-40 flex items-center justify-center bg-neutral-950/40',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface px-8 py-6">
        <Spinner size="lg" />
        {label && <span className="text-sm text-on-surface">{label}</span>}
      </div>
    </div>
  );
}

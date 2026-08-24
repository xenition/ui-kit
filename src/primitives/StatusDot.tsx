import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';

export type StatusDotTone = 'success' | 'warn' | 'danger' | 'primary' | 'accent';

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color slot for the dot (default `success` — "live"). */
  tone?: StatusDotTone;
  /** Emit the expanding echo pulse (default true; reduced motion disables it). */
  pulse?: boolean;
  /**
   * Accessible name (e.g. "Live"). When provided the dot is announced via
   * `role="img"`; when omitted it is purely decorative (`aria-hidden`).
   */
  label?: string;
}

const TONES: readonly StatusDotTone[] = ['success', 'warn', 'danger', 'primary', 'accent'];

/**
 * Color comes from the semantic slots via an injected sheet; the echo ring is
 * the same slot animated on scale/opacity only, and reduced motion removes
 * the animation (the solid dot still communicates state).
 */
const STATUS_DOT_CSS = `
@keyframes xen-status-echo {
  0% { transform: scale(1); opacity: 0.75; }
  70% { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
}
[data-xen-status-dot] { position: relative; display: inline-flex; width: 0.5rem; height: 0.5rem; }
[data-xen-status-dot] [data-xen-status-fill] { position: absolute; inset: 0; border-radius: 9999px; }
[data-xen-status-dot] [data-xen-status-echo] {
  position: absolute; inset: 0; border-radius: 9999px;
  animation: xen-status-echo 2s ease-out infinite;
}
${TONES.map(
  (tone) =>
    `[data-xen-status-dot="${tone}"] [data-xen-status-fill], [data-xen-status-dot="${tone}"] [data-xen-status-echo] { background-color: var(--xen-${tone}); }`
).join('\n')}
@media (prefers-reduced-motion: reduce) {
  [data-xen-status-dot] [data-xen-status-echo] { animation: none; opacity: 0; }
}
`;

/**
 * The pulsing "live" indicator distilled from the templates: a solid semantic
 * dot with an expanding, fading echo. CSS-only, token-only, and inert under
 * `prefers-reduced-motion`. Drop it inside chips, nav items, or the
 * `ProductMock` chrome bar.
 */
export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(function StatusDot(
  { tone = 'success', pulse = true, label, className, ...rest },
  ref
) {
  injectStyleOnce('xen-status-dot-styles', STATUS_DOT_CSS);
  return (
    <span
      ref={ref}
      data-xen-status-dot={tone}
      className={cn(className)}
      {...(label !== undefined
        ? { role: 'img', 'aria-label': label }
        : { 'aria-hidden': 'true' as const })}
      {...rest}
    >
      <span data-xen-status-fill="" />
      {pulse ? <span data-xen-status-echo="" /> : null}
    </span>
  );
});

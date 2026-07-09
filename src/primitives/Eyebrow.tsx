import * as React from 'react';
import { cn } from './cn';

export type EyebrowTone = 'primary' | 'accent' | 'muted';

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Semantic color slot for the label (default `accent`). */
  tone?: EyebrowTone;
  /** Draw short hairline ticks flanking the label. */
  rule?: boolean;
  /** Horizontal alignment (default `start`; `center` for section openers). */
  align?: 'start' | 'center';
}

const TONE_CLASS: Record<EyebrowTone, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  muted: 'text-muted',
};

/**
 * Tracked small-caps kicker label — the tiny loud line above headings that
 * every template hand-rolled. Uses the semantic `primary`/`accent`/`muted`
 * slots (auto-contrast-checked by the theme compiler), never raw ramp steps,
 * so it stays readable in both modes. The optional flanking rules use
 * `currentColor` — no extra color rule needed.
 */
export const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(function Eyebrow(
  { tone = 'accent', rule = false, align = 'start', className, children, ...rest },
  ref
) {
  return (
    <p
      ref={ref}
      data-xen-eyebrow={tone}
      className={cn(
        'flex items-center gap-[var(--xen-space-xs)] font-heading text-xs font-bold uppercase tracking-[0.22em]',
        align === 'center' && 'justify-center',
        TONE_CLASS[tone],
        className
      )}
      {...rest}
    >
      {rule ? <span aria-hidden="true" className="inline-block h-px w-6 bg-current" /> : null}
      {children}
      {rule ? <span aria-hidden="true" className="inline-block h-px w-6 bg-current" /> : null}
    </p>
  );
});

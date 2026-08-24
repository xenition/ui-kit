import * as React from 'react';
import { cn } from './cn';

export type TagTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  /** Renders a remove (×) button that calls this. */
  onRemove?: () => void;
}

const TONE: Record<TagTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  primary: 'bg-primary-50 text-primary',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

/** Removable chip/tag bound to the theme tokens — for filters, keywords, multi-select values. */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { className, tone = 'neutral', onRemove, children, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--xen-radius-sm)] px-2 py-0.5 text-xs font-medium',
        TONE[tone],
        className
      )}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={onRemove}
          className="ml-0.5 opacity-70 transition-opacity hover:opacity-100"
        >
          ×
        </button>
      )}
    </span>
  );
});

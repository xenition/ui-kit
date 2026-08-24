import * as React from 'react';
import { cn } from './cn';

export type FloatButtonPlacement = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface FloatButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Leading glyph/icon node (e.g. an `<Icon glyph="+" />`). */
  icon?: React.ReactNode;
  /** Optional text — when present the FAB expands into a pill. */
  label?: string;
  /** Where the FAB anchors over the viewport (default `bottom-right`). */
  placement?: FloatButtonPlacement;
}

const ANCHOR: Record<FloatButtonPlacement, string> = {
  'bottom-right': 'right-6',
  'bottom-left': 'left-6',
  'bottom-center': 'left-1/2 -translate-x-1/2',
};

/**
 * Floating action button — a circular (or pill, when `label` is set) primary
 * affordance `fixed` to a viewport corner. Background is the `primary` token,
 * content the `on-primary` token. Anchored by `placement`; override via
 * `className`. No literal colors.
 */
export const FloatButton = React.forwardRef<HTMLButtonElement, FloatButtonProps>(function FloatButton(
  { icon, label, placement = 'bottom-right', type = 'button', className, disabled, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={rest['aria-label'] ?? label}
      className={cn(
        'fixed bottom-8 z-40 inline-flex items-center justify-center gap-2 font-semibold shadow-lg transition',
        'bg-primary text-on-primary hover:opacity-90',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        label ? 'h-14 rounded-full px-6' : 'h-14 w-14 rounded-full',
        ANCHOR[placement],
        className
      )}
      {...rest}
    >
      {icon != null && <span className="inline-flex shrink-0">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
});

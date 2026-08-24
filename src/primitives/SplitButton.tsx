import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export type SplitButtonVariant = 'primary' | 'secondary';

export interface SplitButtonAction {
  key: string;
  label: React.ReactNode;
  /** Click handler (web parity of the native `onPress`). */
  onClick?: () => void;
  disabled?: boolean;
  /** Tint the label with the `danger` token. */
  destructive?: boolean;
}

export interface SplitButtonProps {
  /** Label for the primary (left) action. */
  label: React.ReactNode;
  /** Primary action click handler (web parity of the native `onPress`). */
  onClick?: () => void;
  /** Secondary actions revealed by the caret. */
  actions: SplitButtonAction[];
  variant?: SplitButtonVariant;
  disabled?: boolean;
  className?: string;
}

/**
 * Web parity of the native `SplitButton`: a primary action fused to a caret that
 * toggles a dropdown of secondary actions. `primary` fills with the `primary`
 * token; `secondary` is outlined. All colors/radii/spacing come from the
 * `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export function SplitButton({
  label,
  onClick,
  actions,
  variant = 'primary',
  disabled = false,
  className,
}: SplitButtonProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const filled = variant === 'primary';
  const faceClass = filled
    ? 'bg-primary text-on-primary hover:opacity-90'
    : 'bg-transparent text-primary hover:bg-primary-50';

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'inline-flex overflow-hidden rounded-[var(--xen-radius-md)]',
          !filled && 'border border-primary',
          disabled && 'pointer-events-none opacity-50'
        )}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => onClick?.()}
          className={cn(
            'px-6 py-2 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300',
            faceClass
          )}
        >
          {label}
        </button>
        <span className={cn('w-px self-stretch', filled ? 'bg-on-primary opacity-40' : 'bg-primary opacity-40')} />
        <button
          type="button"
          aria-label="More actions"
          aria-expanded={open}
          aria-haspopup="menu"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'flex items-center justify-center px-2 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300',
            faceClass
          )}
        >
          <span className={cn('text-xs transition-transform', open && 'rotate-180')}>▾</span>
        </button>
      </div>

      {open ? (
        <div
          role="menu"
          className="bg-surface absolute left-0 z-50 mt-1 min-w-[10rem] rounded-[var(--xen-radius-md)] border border-border py-1 shadow-lg"
        >
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              role="menuitem"
              disabled={action.disabled}
              onClick={() => {
                setOpen(false);
                action.onClick?.();
              }}
              className={cn(
                'flex w-full items-center px-3 py-2 text-left text-sm transition-colors',
                'hover:bg-neutral-100 disabled:pointer-events-none disabled:text-muted',
                action.destructive ? 'text-danger' : 'text-on-surface'
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

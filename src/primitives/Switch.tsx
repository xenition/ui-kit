import * as React from 'react';
import { cn } from './cn';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  /**
   * Fires with the requested checked state. Prefer `onChange` — that is the
   * kit's one canonical name for "the value changed". `onCheckedChange` is this
   * component's original spelling, kept so existing callers keep working; if
   * both are passed this one wins. (The DOM `onChange` is already omitted from
   * the inherited button props, so the name carries the kit meaning here, not
   * the React form-event one.)
   */
  onCheckedChange?: (checked: boolean) => void;
  /** Canonical spelling of `onCheckedChange` (see it for the precedence rule). */
  onChange?: (checked: boolean) => void;
}

/** Themed on/off switch (`role="switch"`) for boolean settings/filters. */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, checked = false, onCheckedChange, onChange, disabled, ...rest },
  ref
) {
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onCheckedChange ?? onChange;
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => emit?.(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        checked ? 'bg-primary' : 'bg-neutral-300',
        className
      )}
      {...rest}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-surface transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
  );
});

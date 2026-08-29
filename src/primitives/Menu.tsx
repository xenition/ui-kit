import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export interface MenuItem {
  label: React.ReactNode;
  onSelect?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Renders the item in the danger tone (e.g. Delete). */
  danger?: boolean;
}

/** The one prop Menu injects into an element trigger. */
interface TriggerProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface MenuProps {
  /**
   * The control that opens the menu — normally a kit `<Button>` or an icon
   * button. Menu clones the element and injects its own `onClick` rather than
   * wrapping it in a click-catching `<span>` (see the note below), so the
   * trigger stays the real button: its `disabled` state still blocks the menu,
   * and any `onClick` it already carries still runs. A trigger that cannot take
   * an `onClick` — a bare string, or a component that drops the prop — should
   * be wrapped by the caller in an element that can.
   */
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'start' | 'end';
}

/** Dropdown action menu bound to the theme tokens. Closes on select / outside click / Escape. */
export function Menu({ trigger, items, align = 'start' }: MenuProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  /*
    The trigger IS the button. Menu does not wrap it in a click catcher.

    This mirrors the native twin, where the wrapper was an outright bug: on RN the
    deepest `Pressable` wins the touch responder, so a `<Button>` trigger swallowed
    the tap and the menu never opened. The DOM bubbles clicks, so the old
    `<span onClick>` did fire here — but it made `disabled` a lie in the other
    direction. A disabled `<button>` dispatches no click, yet a caller who instead
    disabled a plain `<div>` trigger, or blocked its pointer events, still had the
    span open the menu on a control the user was told was dead.

    Cloning the element and injecting `onClick` gives both platforms the same rule:
    the trigger is the only thing that handles the press, so whatever the trigger
    says about being disabled is what happens. Anything it already does on click
    runs first, then the menu toggles. A non-element trigger (a bare string) has
    nothing to clone onto, so it keeps the transparent `<span>`.
  */
  const renderedTrigger = React.isValidElement<TriggerProps>(trigger) ? (
    React.cloneElement(trigger, {
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        trigger.props.onClick?.(event);
        setOpen((o) => !o);
      },
    })
  ) : (
    <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
  );

  return (
    <div ref={ref} className="relative inline-block">
      {renderedTrigger}
      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-50 mt-1 min-w-[10rem] rounded-[var(--xen-radius-md)] border border-border',
            'bg-surface py-1 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              disabled={it.disabled}
              onClick={() => {
                it.onSelect?.();
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors',
                'hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50',
                it.danger ? 'text-danger' : 'text-on-surface'
              )}
            >
              {it.icon != null && <span className="shrink-0">{it.icon}</span>}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

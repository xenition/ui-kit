import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

/** The one prop Popover injects into an element trigger. */
interface TriggerProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface PopoverProps {
  /**
   * The control that opens the panel — normally a kit `<Button>`. Popover
   * clones the element and injects its own `onClick` rather than wrapping it in
   * a click-catching `<span>` (see the note below), so the trigger stays the
   * real button: its `disabled` state still blocks the panel, and any `onClick`
   * it already carries still runs. A trigger that cannot take an `onClick` — a
   * bare string, or a component that drops the prop — should be wrapped by the
   * caller in an element that can.
   */
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/** Click-triggered floating panel bound to the theme tokens. Closes on outside click / Escape. */
export function Popover({ trigger, children, align = 'start', className }: PopoverProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  const alignCls =
    align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';
  /*
    The trigger IS the button. Popover does not wrap it in a click catcher.

    This mirrors the native twin, where the wrapper was an outright bug: on RN the
    deepest `Pressable` wins the touch responder, so a `<Button>` trigger swallowed
    the tap and the panel never opened. The DOM bubbles clicks, so the old
    `<span onClick>` did fire here — but it made `disabled` a lie in the other
    direction. A disabled `<button>` dispatches no click, yet a caller who instead
    disabled a plain `<div>` trigger, or blocked its pointer events, still had the
    span open the panel on a control the user was told was dead.

    Cloning the element and injecting `onClick` gives both platforms the same rule:
    the trigger is the only thing that handles the press, so whatever the trigger
    says about being disabled is what happens. Anything it already does on click
    runs first, then the panel toggles. A non-element trigger (a bare string) has
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
          className={cn(
            'absolute z-50 mt-1 min-w-[12rem] rounded-[var(--xen-radius-md)] border border-border',
            'bg-surface p-2 text-on-surface shadow-lg',
            alignCls,
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

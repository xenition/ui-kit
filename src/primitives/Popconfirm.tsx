import * as React from 'react';
import { useDismiss } from './useDismiss';

/** The one prop Popconfirm injects into an element trigger. */
interface TriggerProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface PopconfirmProps {
  /**
   * The control that opens the bubble — normally a kit `<Button>`. Popconfirm
   * clones the element and injects its own `onClick` rather than wrapping it in
   * a click-catching `<span>` (see the note below), so the trigger stays the
   * real button: its `disabled` state still blocks the dialog, and any
   * `onClick` it already carries still runs. A trigger that cannot take an
   * `onClick` — a bare string, or a component that drops the prop — should be
   * wrapped by the caller in an element that can.
   */
  trigger: React.ReactNode;
  message: React.ReactNode;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

/** Inline confirmation popover bound to the theme tokens — for destructive actions. */
export function Popconfirm({
  trigger,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: PopconfirmProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  /*
    The trigger IS the button. Popconfirm does not wrap it in a click catcher.

    This mirrors the native twin, where the wrapper was an outright bug: on RN the
    deepest `Pressable` wins the touch responder, so a `<Button>` trigger swallowed
    the tap and the bubble never opened. The DOM bubbles clicks, so the old
    `<span onClick>` did fire here — but it made `disabled` a lie in the other
    direction. A disabled `<button>` dispatches no click, yet a caller who instead
    disabled a plain `<div>` trigger, or blocked its pointer events, still had the
    span open the dialog on a control the user was told was dead.

    Cloning the element and injecting `onClick` gives both platforms the same rule:
    the trigger is the only thing that handles the press, so whatever the trigger
    says about being disabled is what happens. Anything it already does on click
    runs first, then the bubble toggles. A non-element trigger (a bare string) has
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
          role="dialog"
          className="absolute z-50 mt-1 w-56 rounded-[var(--xen-radius-md)] border border-border bg-surface p-3 shadow-lg"
        >
          <p className="mb-3 text-sm text-on-surface">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-[var(--xen-radius-sm)] px-2 py-1 text-xs text-muted transition-colors hover:text-on-surface"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              className="rounded-[var(--xen-radius-sm)] bg-danger px-2 py-1 text-xs text-on-danger"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

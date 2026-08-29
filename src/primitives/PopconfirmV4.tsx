import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { PopconfirmProps } from './Popconfirm';
import { CHROME_V4_CSS, CHROME_V4_STYLE_ID, MIN_TAP_CLASS } from './internal/chrome-v4';
import { NAV_V4_CSS, PANEL_MIN_WIDTH_CLASS } from './internal/nav-v4';
import { panelKind, useDepth } from './internal/surface-v4';
import { useDismiss } from './useDismiss';

export type { PopconfirmProps as PopconfirmV4Props };

/** The one prop Popconfirm injects into an element trigger. */
interface TriggerProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * `Popconfirm`, V4 — the same props, and the last thing between a user and a
 * mistake.
 *
 * ## What the depth is saying
 *
 * The bubble is a floating layer, so it takes the V4 panel skin —
 * `--xen-elevation-sheet`, and the glass treatment only when the seed asked for
 * `depth: 'glass'`. That is the same skin `MenuV4` and `PopoverV4` wear, on
 * purpose: a confirm bubble, a menu and a popover are one object at three
 * sizes, and the base line gave them `shadow-lg`, `shadow-lg` and `shadow-md`
 * respectively — three answers to one question, none of which knows what
 * scheme it is falling in.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. Popconfirm clones the trigger
 * element and injects its own `onClick` rather than wrapping it in a
 * click-catching `<span>`. On native the deepest `Pressable` under the finger
 * wins the responder, so a wrapper made a `<Button>` trigger a silent no-op;
 * the DOM bubbles clicks so the wrapper did fire here, but it made `disabled`
 * a lie in the other direction — a caller who disabled a plain `<div>` trigger
 * still had the span open a dialog on a control the user was told was dead.
 * Cloning gives both platforms one rule: the trigger is the only thing that
 * handles the press, so whatever it says about being disabled is what happens.
 * A non-element trigger (a bare string) has nothing to clone onto, so it keeps
 * the transparent `<span>`.
 *
 * ## Reading the choice
 *
 * §25 asks for friction proportional to risk and §26 that a destructive
 * consequence be legible. So the destructive button is the **only** coloured
 * thing in the bubble — `danger` filled with `on-danger`, the compiler's paired
 * ink, not the `on-primary` the base painted on a red fill by mistake — and
 * Cancel is quiet text in `muted-text`, which is `muted` with an actual AA
 * promise rather than `muted`, which has none.
 *
 * Both buttons clear the 44px target the rest of the V4 line composes from the
 * spacing scale. A confirm bubble is the one place in a product where a
 * mis-tap is unrecoverable, and the base's `px-2 py-1` chips were roughly 24
 * tall.
 *
 * Cancel is listed first and is the one that gets focus by default: the safe
 * choice should be the one a user lands on without aiming.
 */
export function PopconfirmV4({
  trigger,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: PopconfirmProps): React.ReactElement {
  injectStyleOnce('xen-v4-nav-styles', NAV_V4_CSS);
  injectStyleOnce(CHROME_V4_STYLE_ID, CHROME_V4_CSS);

  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const kind = panelKind(useDepth());

  React.useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

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
          aria-modal="false"
          data-xen-v4-nav-panel={kind}
          className={cn(
            'absolute z-50 mt-xs flex flex-col gap-md rounded-[var(--xen-radius-md)] p-md',
            PANEL_MIN_WIDTH_CLASS
          )}
        >
          <p className="font-body text-sm leading-relaxed text-on-surface">{message}</p>
          <div className="flex justify-end gap-sm">
            <button
              ref={cancelRef}
              type="button"
              data-xen-v4-chrome="on-surface"
              onClick={() => setOpen(false)}
              className={cn(
                'inline-flex items-center justify-center rounded-[var(--xen-radius-md)] px-md',
                'font-body text-sm font-medium',
                // `muted-text`, not `muted`: the plain slot carries no contrast
                // promise, and this is text.
                'text-muted-text focus-visible:outline-none',
                MIN_TAP_CLASS
              )}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              data-xen-v4-chrome="filled-danger"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              className={cn(
                'inline-flex items-center justify-center rounded-[var(--xen-radius-md)] bg-danger px-md',
                'font-body text-sm font-semibold',
                // `on-danger`, the compiler's paired ink for the danger FILL.
                // The base painted `on-primary` on a red ground, which is a
                // contrast promise made against a different colour entirely.
                'text-on-danger focus-visible:outline-none',
                MIN_TAP_CLASS
              )}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import * as React from 'react';
import type { PopconfirmProps } from './Popconfirm';
export type { PopconfirmProps as PopconfirmV4Props };
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
export declare function PopconfirmV4({ trigger, message, onConfirm, confirmLabel, cancelLabel, }: PopconfirmProps): React.ReactElement;
//# sourceMappingURL=PopconfirmV4.d.ts.map
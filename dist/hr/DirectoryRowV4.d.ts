import * as React from 'react';
import type { DirectoryRowProps } from './DirectoryRow';
export interface DirectoryRowV4Props extends DirectoryRowProps {
    /**
     * Copy on the trailing message action, before the person's name. Default
     * `'Message'`, so the button announces `Message Ada Lovelace`.
     */
    messageLabel?: string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 directory row** — the web twin of the native `DirectoryRowV4`, same
 * props as {@link DirectoryRow} plus `messageLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **Pressing Enter on the message button no longer opens the profile
 *    instead.** The row was a `<div role="button">` with a hand-written
 *    Enter/Space handler, and the message `<button>` lived inside it. The
 *    click was guarded with `stopPropagation`; the *keydown* was not. So the
 *    row's handler caught the bubbled Enter, called `preventDefault()` — which
 *    cancels the button's own activation, because Enter's default action on a
 *    button **is** the click — and ran `onClick`. A keyboard user aiming at
 *    "Message Ada" navigated to Ada's profile and sent nothing, with no sign
 *    anything had gone wrong. The fix is structural: the row is a plain
 *    `<div>`, the activation is a real `<button>` around the avatar and the
 *    text, and the message button is its **sibling**. There is no ancestor
 *    handler left to fire, so no guard is needed and none is written.
 * 2. **The row is one accessible name.** `Open Ada Lovelace` replaced the
 *    whole subtree, so the title, the department, the email and the presence
 *    were never announced at all. They now join the name, comma-separated.
 * 3. **The message button is a 44 target.** It was a bare glyph with padding
 *    on one side — the conventions call a control that relies on `hitSlop`
 *    alone a defect, and the web twin did not even have that.
 * 4. **Press and hover are a state layer.** `hover:bg-neutral-100` on the row
 *    and `hover:opacity-70` on the glyph: the first is a ramp step that
 *    inverts under `[data-theme="dark"]` and paints a near-white slab on a
 *    dark page, the second dims the control's own content, which is the signal
 *    M3 spends on **disabled**. A hovered ✉ and a dead ✉ looked alike.
 * 5. **Presence is inked with an ink slot**, not `text-success` / `text-muted`
 *    — fill tokens, and `muted` has no contrast promise as text at all.
 * 6. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a directory scrolled into a conversation list does not
 *    change rhythm halfway down. The ground and the radius the base painted on
 *    the row itself go with it: a row lives inside a container, and a row that
 *    paints its own card is what stopped four list components looking like one.
 */
export declare const DirectoryRowV4: React.ForwardRefExoticComponent<DirectoryRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DirectoryRowV4.d.ts.map
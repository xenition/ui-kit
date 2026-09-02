import * as React from 'react';
import type { PolicyDocumentRowProps } from './PolicyDocumentRow';
export interface PolicyDocumentRowV4Props extends PolicyDocumentRowProps {
    /**
     * File size in **bytes**, formatted by {@link formatSize}.
     *
     * The base took `size` as a pre-formatted string, so `formatSize` would have
     * had nothing to format. Both are accepted: a caller already passing `size`
     * keeps exactly today's output, and `sizeBytes` wins when both are given.
     */
    sizeBytes?: number;
    /** Render `sizeBytes`. Default `'1.2 MB'` — base-1000, as carriers quote. */
    formatSize?: (bytes: number) => string;
}
/**
 * **V4 policy document row** — same props as {@link PolicyDocumentRow} plus
 * `sizeBytes` and `formatSize`.
 *
 * ## Five changes
 *
 * 1. **Download is reachable from the keyboard.** This is the module's
 *    headline structural defect and this row is where it does the most damage.
 *    The Download `<Button>` sat *inside* a `div` carrying `role="button"`,
 *    `tabIndex` and a hand-written Enter/Space handler. Its click was guarded
 *    with `stopPropagation`; its keydown was not. Tab to Download, press
 *    Enter, and the row's handler catches the bubbled keydown, calls
 *    `preventDefault()` — which cancels the button's own activation, because
 *    Enter's default action on a button **is** that click — and fires the
 *    row's `onClick` instead. The document opens; nothing downloads; nothing
 *    says so. A mouse user never sees it. The row is now a plain container,
 *    the activation is a real `<button>` around the title and its meta line,
 *    and Download is its **sibling**. No guard, because there is nothing left
 *    to guard against.
 * 2. **Nesting a button inside `role="button"` was invalid ARIA anyway**, and
 *    it cost the row its own content: `aria-label="Auto declarations
 *    document"` replaced the subtree, so the kind, the size and the date were
 *    never announced. All three are folded into the name.
 * 3. **Download has a name that says what it downloads.** A documents list
 *    presents five identically-named "Download" buttons; a reader tabbing
 *    through them hears "Download, button" five times and cannot tell which
 *    file each one is.
 * 4. **The meta line has words.** It was built from
 *    `kind.replace('-', ' ')`, so every row read "id card" or "declaration" in
 *    lower case regardless of locale.
 * 5. **It joins the row family**, presses with a state layer rather than
 *    `hover:opacity-80`, clears 44 on both the row and the Download button,
 *    and focuses with `ring-ring` rather than the `ring-primary-300` ramp
 *    step.
 */
export declare const PolicyDocumentRowV4: React.ForwardRefExoticComponent<PolicyDocumentRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PolicyDocumentRowV4.d.ts.map
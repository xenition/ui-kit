import * as React from 'react';
import type { PolicyDocumentRowProps } from './PolicyDocumentRow';
export interface PolicyDocumentRowV4Props extends PolicyDocumentRowProps {
    /**
     * File size in **bytes**, for {@link PolicyDocumentRowV4Props.formatSize}.
     *
     * The base's `size` is a string the caller has already formatted, which means
     * every screen in an app formats it slightly differently — and because
     * `XV4Props extends XProps` forbids narrowing `size` to a number,
     * `formatSize` had nothing to format without this. Pass the number and the
     * row formats it once. `sizeBytes` wins when both are given; `size` alone
     * still renders exactly today's output.
     */
    sizeBytes?: number;
    /**
     * Render {@link PolicyDocumentRowV4Props.sizeBytes}. Default `'1.2 MB'`.
     */
    formatSize?: (bytes: number) => string;
}
/**
 * **V4 policy document row** — same props as {@link PolicyDocumentRow} plus
 * `sizeBytes` and `formatSize`.
 *
 * ## Five changes
 *
 * 1. **Download is reachable.** This is the module's clearest instance of the
 *    sibling rule and it fails differently on each platform. On native the
 *    whole row — glyph, title, meta line *and the Download `Button`* — was the
 *    subtree of one `Pressable`, and a `Pressable` is `accessible` by default,
 *    so VoiceOver flattened it into a single leaf named "Auto policy
 *    declarations document". The Download button was **not reachable by any
 *    gesture**: not a focus stop, not swipeable to, not activatable. (On the
 *    web twin the same nesting had teeth instead: the row's `onKeyDown` caught
 *    the bubbled Enter, `preventDefault()` cancelled the button's own
 *    activation, and the row *opened the document* instead of downloading it.)
 *    The fix is structural, not a guard: the row container is a plain `View`,
 *    the activation wraps only the glyph-and-text region and carries the row's
 *    spoken name, and the Download button sits beside it.
 * 2. **Two rows no longer offer two buttons called "Download".** The button's
 *    spoken name now carries the document it belongs to, so a list of six
 *    documents is six distinct actions rather than six identical ones.
 * 3. **The kind is a word, not a mangled enum.** The meta line was built from
 *    `kind.replace('-', ' ')`, so the reader was shown `"id card"` — the raw
 *    identifier, lower-cased and untranslatable. It comes from the module's
 *    tone table now, like every other label.
 * 4. **The size can be a number.** `size` was a pre-formatted string, so
 *    `'1.2 MB'`, `'1,2 Mo'` and `'1200 KB'` all appeared in one product.
 * 5. **Press is a state layer and the row joins the shared row family** — the
 *    same height, the same 44 leading slot and the same pressed ground as
 *    `ClaimRowV4` and `BeneficiaryRowV4`, instead of `opacity: 0.7` and a
 *    hand-set 40px disc. The Download button clears 44 too; at `size="sm"` on
 *    a bare `Button` it did not.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function PolicyDocumentRowV4({ title, kind, size, sizeBytes, date, downloadLabel, formatSize, onPress, onDownload, style, }: PolicyDocumentRowV4Props): React.ReactElement | null;
//# sourceMappingURL=PolicyDocumentRowV4.d.ts.map
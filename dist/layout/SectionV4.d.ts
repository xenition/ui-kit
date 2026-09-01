import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface SectionV4Props extends React.HTMLAttributes<HTMLElement> {
    /** Section heading. Rendered as an `<h2>`. */
    title?: string;
    /** Supporting line under the heading. */
    subtitle?: string;
    /**
     * Vertical gap between the header and the content, from the spacing scale.
     * Defaults to `md` (16) — §4.1's "between a card header and its body".
     */
    spacing?: SpaceKey;
    /**
     * Trailing header slot — a "See all" link, a filter, an overflow menu.
     * Default `undefined`, so a section without one renders exactly as today.
     *
     * This is shadcn/ui's `CardAction` idea: a `Section` and a `SectionCard`
     * should have the **same header anatomy**, and the reason the two currently
     * look unrelated is that only one of them had a place to put an action.
     */
    action?: React.ReactNode;
}
/**
 * **V4 section** — the web twin of the native `SectionV4`, the base `Section`'s
 * props plus one, a different design line.
 *
 * ## What V4 changes
 *
 * 1. **The header is on the type ramp, and it is the same ramp on both twins.**
 *    The base sets `text-lg font-semibold` here and `lg` / `600` on native — the
 *    same intent, expressed twice, free to drift. V4 sets both through `TextV4`:
 *    title `size="xl" weight="bold"`, subtitle `size="base" tone="mutedText"`.
 *    Louder and with more air than the base, because §3 asks for one loud thing
 *    per block and a section heading is it.
 * 2. **`mutedText`, not `muted`.** The base subtitle uses the `muted` slot,
 *    which is a *fill* and carries no contrast promise. `mutedText` is the same
 *    quietness walked until it clears AA. This is the exact bug the shadcn pass
 *    closed elsewhere in the kit.
 * 3. **`action` exists.** See the prop.
 *
 * What V4 does **not** do is own the space *between* sections. §4.1 puts that at
 * `spacing.xl` (32) and it stays the caller's decision — a `Column gap="xl"`
 * around the sections — because a component that pushed its own siblings apart
 * would double up wherever a caller already had a rhythm.
 *
 * The header collapses entirely when there is no `title`, no `subtitle` and no
 * `action`: §4.5 asks that every component survive its empty case, and an empty
 * header row would leave a `gap` where two lines would be. With no children
 * either, this renders an empty `<section>` and paints nothing.
 *
 * ### Platform divergence
 *
 * None. The `<h2>`/`<p>` elements here are the web's semantics for a heading and
 * its supporting line; the native twin reaches the same place with
 * `accessibilityRole="header"`. Same props, same defaults, same type ramp.
 */
export declare const SectionV4: React.ForwardRefExoticComponent<SectionV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=SectionV4.d.ts.map
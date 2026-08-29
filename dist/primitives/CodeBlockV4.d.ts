import * as React from 'react';
import type { CodeBlockProps } from './CodeBlock';
export type { CodeBlockProps as CodeBlockV4Props };
/**
 * **V4 code block** — the web twin of the native `CodeBlockV4`, same props as
 * {@link CodeBlock}, a different design line.
 *
 * Code is the one content in this kit that is read character by character, so
 * the V4 answer is the opposite of decoration: a calmer surface and one more
 * piece of structure.
 *
 * Four changes:
 *
 * 1. **A calm, recessed ground.** The base painted the code on `bg-surface` —
 *    the same colour as the page — so a block sat on a page it could not be
 *    distinguished from except by its border. V4 sinks the `<pre>` by the same
 *    4% neutral step the V4 tables band with, mixed from `--xen-on-surface`
 *    into `--xen-surface` so it darkens a light page and lightens a dark one
 *    with no dark rule of its own.
 * 2. **A gutter with an edge.** A line number the reader is counting to needs
 *    something to stop at; with only `mr-3` the numbers read as a first column
 *    of code. That is the second and last rule on the surface — everything
 *    else is spacing (§9).
 * 3. **The header is chrome, the body is content.** The header stays on
 *    `surface` while the body sinks, so the two layers are told apart by
 *    ground rather than by another border.
 * 4. **The copy button stops using the wrong three tokens.** `text-primary` is
 *    a FILL colour with no contrast promise as ink on `surface` —
 *    `text-primary-text` is that promise. `hover:bg-neutral-100` is the
 *    light-oriented ramp and turns into a pale slab in dark mode.
 *    `ring-primary-300` is a ramp step where the semantic `primary` slot
 *    belongs. All three are the same mistake: reaching past the token that
 *    means the thing for one that merely looks like it.
 *
 * **No gradient, anywhere near this.** §35.11 keeps gradients for a hero and
 * one primary action; a brand sweep behind code is decoration laid over
 * something read one glyph at a time. **No syntax colours either** — the base
 * highlights nothing, and inventing a palette here would be a second colour
 * system living outside the seed.
 *
 * `font-mono` is a font family, not a colour. Monospace figures are tabular by
 * construction, so the gutter needs no numeral setting of its own.
 */
export declare const CodeBlockV4: React.ForwardRefExoticComponent<CodeBlockProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CodeBlockV4.d.ts.map
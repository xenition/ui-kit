import * as React from 'react';
import type { CodeBlockProps } from './CodeBlock';
export type { CodeBlockProps as CodeBlockV4Props };
/**
 * **V4 code block** — same props as {@link CodeBlock}, a different design line.
 *
 * Code is the one content in this kit that is read character by character, so
 * the V4 answer is the opposite of decoration: a calmer surface and one more
 * piece of structure.
 *
 * Three changes:
 *
 * 1. **A calm, recessed ground.** The base painted the code on `surface` — the
 *    same colour as the page — so a block sat on a page it could not be
 *    distinguished from except by its border. V4 sinks the body by the same 4%
 *    neutral step the V4 tables band with, mixed from the two scheme-resolved
 *    slots so it darkens a light page and lightens a dark one. One recessed
 *    amount for the whole data-display line, and the block reads as quoted
 *    rather than as more page.
 * 2. **A gutter with an edge.** The header keeps its rule and the gutter gains
 *    one. A line number the reader is counting to needs something to stop at;
 *    with only a margin the numbers read as a first column of code. That is
 *    the second and last rule on the surface — everything else is spacing
 *    (§9).
 * 3. **The header is chrome, the body is content.** The header stays on
 *    `surface` while the body sinks, so the two layers are told apart by
 *    ground rather than by another border. The copy control also takes a real
 *    `xl` target and tints on press instead of doing nothing visible.
 *
 * **No gradient, anywhere near this.** §35.11 keeps gradients for a hero and
 * one primary action; a brand sweep behind code is decoration laid over
 * something read one glyph at a time. **No syntax colours either** — the base
 * highlights nothing, and inventing a palette here would be a second colour
 * system living outside the seed.
 *
 * `fontFamily: 'monospace'` is a font family, not a colour. Monospace figures
 * are tabular by construction, so the gutter needs no numeral setting of its
 * own.
 */
export declare function CodeBlockV4({ code, language, lineNumbers, onCopy, style, }: CodeBlockProps): React.ReactElement;
//# sourceMappingURL=CodeBlockV4.d.ts.map
import * as React from 'react';
export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCopy'> {
    /** Source text to render verbatim in a monospace face. */
    code: string;
    /** Language label shown in the header (display only — no highlighting). */
    language?: string;
    /** Show a left gutter of line numbers (default true). */
    lineNumbers?: boolean;
    /**
     * Fires when the copy button is clicked, with the full `code` string. The
     * component also attempts `navigator.clipboard.writeText` when available.
     * Omit to hide the copy button.
     */
    onCopy?: (code: string) => void;
}
/**
 * Web parity of the native `CodeBlock`: a monospace `<pre><code>` surface with an
 * optional header (language label + copy button) and an optional line-number
 * gutter. Horizontally scrollable for long lines. `font-mono` is a font family,
 * not a color. All colors/radii/spacing come from the `--xen-*` tokens via
 * Tailwind classes — no literal colors.
 */
export declare const CodeBlock: React.ForwardRefExoticComponent<CodeBlockProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CodeBlock.d.ts.map
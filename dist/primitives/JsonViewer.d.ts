import * as React from 'react';
export interface JsonViewerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Any JSON-serializable value to inspect. */
    value: unknown;
    /** Expand nodes up to this depth on first render (default 1). */
    defaultExpandDepth?: number;
    /** Root key label (default `root`). */
    rootLabel?: string;
}
/**
 * Web parity of the native `JsonViewer`: a collapsible JSON tree inspector. Keys
 * render in the `accent` token, strings in `on-surface`, numbers in `primary`,
 * booleans in `warn`, and null in `muted`, all monospaced. Branch nodes toggle
 * open on click. `font-mono` is a font family, not a color. All colors/spacing
 * come from the `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export declare const JsonViewer: React.ForwardRefExoticComponent<JsonViewerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JsonViewer.d.ts.map
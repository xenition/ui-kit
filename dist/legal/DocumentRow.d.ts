import * as React from 'react';
import { type DocumentKind, type DocumentStatus } from './internal';
export type DocumentRowVariant = 'default' | 'compact';
export interface DocumentRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Document title / filename. */
    title: string;
    /** Document kind — drives the leading glyph. */
    kind?: DocumentKind;
    /** Lifecycle state — glyph + word pill, never color alone. */
    status?: DocumentStatus;
    /** Pre-formatted last-modified label. */
    modified?: string;
    /** Version label (e.g. "v3"). */
    version?: string;
    /** File size label (e.g. "1.2 MB"). */
    size?: string;
    /** Author / owner. */
    author?: string;
    /** Density. */
    variant?: DocumentRowVariant;
    /** Click handler (open / preview the document). */
    onClick?: () => void;
    /** Optional download affordance. */
    onDownload?: () => void;
    testID?: string;
}
/**
 * One document in a matter's file: kind glyph, title, and a status pill (glyph +
 * word so state never rests on color alone), plus optional version / size /
 * modified metadata. `compact` collapses the metadata line. An optional
 * `onDownload` renders a trailing real `<button>`. When `onClick` is set the row
 * is an accessible `role="button"`. All colors are `--xen-*` token classes.
 */
export declare const DocumentRow: React.ForwardRefExoticComponent<DocumentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DocumentRow.d.ts.map
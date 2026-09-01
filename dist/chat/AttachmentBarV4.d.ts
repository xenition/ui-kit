import * as React from 'react';
import type { AttachmentBarProps, AttachmentKind } from './AttachmentBar';
export interface AttachmentBarV4Props extends AttachmentBarProps {
    /** Build the remove action's name. Default `'Remove photo.jpg'`. */
    formatRemoveLabel?: (name: string) => string;
    /** Override the kind words — four English words lived inside. */
    kindLabels?: Partial<Record<AttachmentKind, string>>;
}
/**
 * **V4 attachment bar** — the web twin of the native `AttachmentBarV4`, same
 * props as {@link AttachmentBar} plus `formatRemoveLabel` and `kindLabels`.
 *
 * ## Four changes
 *
 * 1. **Remove says *what* it removes.** The base's close button was a bare
 *    `×`, so a reader heard "button" once per staged file with nothing to
 *    tell them apart.
 * 2. **Remove clears 44.** It was a 16px glyph in the corner of a thumbnail —
 *    the smallest target in the composer, and a destructive one.
 * 3. **The kind is a word, not only an emoji.** An emoji is announced by name
 *    on some readers and skipped on others; neither is "Video".
 * 4. **The bar is a labelled list**, and renders nothing when empty (§4.5).
 */
export declare const AttachmentBarV4: React.ForwardRefExoticComponent<AttachmentBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AttachmentBarV4.d.ts.map
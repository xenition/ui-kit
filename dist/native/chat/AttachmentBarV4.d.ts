import * as React from 'react';
import type { AttachmentBarProps, AttachmentKind } from './AttachmentBar';
export interface AttachmentBarV4Props extends AttachmentBarProps {
    /** Accessible name for a remove control. Default `'Remove {name}'`. */
    formatRemoveLabel?: (name: string) => string;
    /** Override the kind words — four English words lived inside. */
    kindLabels?: Partial<Record<AttachmentKind, string>>;
}
/**
 * **V4 attachment bar** — same props as {@link AttachmentBar} plus
 * `formatRemoveLabel` and `kindLabels`.
 *
 * ## Four changes
 *
 * 1. **The remove control clears 44 and is named per attachment.** It was an
 *    unlabelled `✕` at glyph size, so a reader heard "button" four times and a
 *    thumb missed it.
 * 2. **The thumbnail ground is `colors.muted`** at a fixed square, so a bar of
 *    staged files does not reflow as thumbnails decode.
 * 3. **The kind is named**, not only glyphed — the glyph is emoji and is read
 *    aloud as its own name.
 * 4. **Nothing renders for an empty list** (§4.5) — the base drew an empty
 *    strip above the composer.
 */
export declare function AttachmentBarV4({ attachments, onRemove, appearance, formatRemoveLabel, kindLabels, style, }: AttachmentBarV4Props): React.ReactElement | null;
//# sourceMappingURL=AttachmentBarV4.d.ts.map
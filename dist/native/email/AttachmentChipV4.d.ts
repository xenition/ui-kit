import * as React from 'react';
import type { AttachmentChipProps } from './AttachmentChip';
export interface AttachmentChipV4Props extends AttachmentChipProps {
    /**
     * Abandon an upload that is still in flight. Shown for exactly the interval
     * `onRemove` is hidden for.
     */
    onCancel?: () => void;
    /** Name the cancel control. Default `'Cancel upload'`. */
    cancelLabel?: string;
    /** Name the download control. Default `'Download'`. */
    downloadLabel?: string;
    /** Name the remove control. Default `'Remove'`. */
    removeLabel?: string;
}
/**
 * **V4 attachment chip** — same props as {@link AttachmentChip} plus
 * `onCancel`, `cancelLabel`, `downloadLabel` and `removeLabel`.
 *
 * ## Five changes
 *
 * 1. **An upload in flight can be abandoned.** The base hid remove for the
 *    whole of `uploadProgress` — which is exactly the interval in which a user
 *    notices they attached the wrong file, and the only interval in which
 *    stopping it saves them anything. `onCancel` fills it.
 * 2. **Progress is a progressbar with a value**, not the sentence
 *    "Uploading… 40%" and nothing else. A reader can now poll it; before, the
 *    number only changed if you happened to be looking.
 * 3. **Download and remove are siblings of the chip's button**, not children
 *    of it. Nesting them inside an `accessible` Pressable made them
 *    presentational: on VoiceOver the only thing you could do to an attachment
 *    was open it.
 * 4. **A chip with no `onPress` is not announced as a button.** The base
 *    always claimed the role and then set `disabled` — a reader was told there
 *    was a button and then that it did not work.
 * 5. **The glyph well is gone and press is a state layer.** The well was
 *    `withAlpha(colors.primary, 0.12)` carrying a `primary` glyph — a fill
 *    slot used as ink on a tint nobody measured it against — and a file kind
 *    is identity, so the glyph carries it in neutral ink. `opacity: 0.85`
 *    becomes M3's layer.
 */
export declare function AttachmentChipV4({ name, kind, size, uploadProgress, onPress, onDownload, onRemove, onCancel, cancelLabel, downloadLabel, removeLabel, style, }: AttachmentChipV4Props): React.ReactElement | null;
//# sourceMappingURL=AttachmentChipV4.d.ts.map
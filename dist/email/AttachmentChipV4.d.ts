import * as React from 'react';
import type { AttachmentChipProps } from './AttachmentChip';
export interface AttachmentChipV4Props extends AttachmentChipProps {
    /**
     * Abort an upload that is still in flight. Without it the interval in which
     * a user discovers they attached the wrong file is the one interval with no
     * way out of it.
     */
    onCancel?: () => void;
    /** Copy on the cancel control. Default `'Cancel upload'`. */
    cancelLabel?: string;
    /** Copy on the download control. Default `'Download'`. */
    downloadLabel?: string;
    /** Copy on the remove control. Default `'Remove'`. */
    removeLabel?: string;
}
/**
 * **V4 attachment chip** — same props as {@link AttachmentChip} plus
 * `onCancel`, `cancelLabel`, `downloadLabel` and `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **An upload in flight can be stopped.** The base suppressed *every*
 *    trailing action while `uploadProgress` was running, so the one moment a
 *    user needs an escape — they have just watched the wrong file start
 *    uploading — was the one moment the chip offered none. `onCancel` fills it;
 *    remove stays out of the way until the upload lands.
 * 2. **The progress is a progress bar.** It was a sentence, "Uploading… 40%",
 *    and nothing else: no role, no value, no drawn bar, so a reader had to
 *    re-read the line to learn whether anything had moved.
 * 3. **The download and remove controls are real targets.** Both were bare
 *    glyphs with no box — around 20px — and both dimmed on hover at M3's
 *    *disabled* band. They now clear 44 and answer with a state layer.
 * 4. **The icon well stops being a light-mode ramp step.** `bg-primary-50`
 *    painted a near-white tile on a dark page; the well is now the tone mixed
 *    into the card, which follows the scheme.
 */
export declare const AttachmentChipV4: React.ForwardRefExoticComponent<AttachmentChipV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AttachmentChipV4.d.ts.map
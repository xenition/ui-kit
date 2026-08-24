import * as React from 'react';
export type AttachmentKind = 'image' | 'pdf' | 'doc' | 'sheet' | 'audio' | 'video' | 'zip' | 'file';
export interface AttachmentChipProps {
    /** File name shown as the label. */
    name: string;
    /** File kind → leading glyph. Default `'file'`. */
    kind?: AttachmentKind;
    /** Human-readable size (e.g. "1.2 MB"). */
    size?: string;
    /** Uploading progress 0–1; renders a loading state and suppresses actions. */
    uploadProgress?: number;
    /** Click the chip (preview / open). Renders the main cell as a real button. */
    onClick?: () => void;
    /** Download affordance (a real `<button>`); shown when provided. */
    onDownload?: () => void;
    /** Remove affordance (compose staging, a real `<button>`); shown when provided. */
    onRemove?: () => void;
    className?: string;
}
/**
 * A single mail attachment as a compact chip — kind glyph, file name, optional
 * size, and optional download / remove affordances (each a real `<button>`).
 * While `uploadProgress` is between 0 and 1 it reads as loading (`aria-busy`)
 * and suppresses the trailing actions. Surface, border, and the soft icon well
 * all resolve from token classes. No literal colors.
 */
export declare const AttachmentChip: React.ForwardRefExoticComponent<AttachmentChipProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AttachmentChip.d.ts.map
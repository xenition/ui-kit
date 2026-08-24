import * as React from 'react';
/** Kinds of staged attachment, driving the fallback glyph. */
export type AttachmentKind = 'image' | 'video' | 'file' | 'audio';
export interface StagedAttachment {
    /** Stable identifier passed back to `onRemove`. */
    id: string;
    /** Display name (file name / caption). */
    name?: string;
    /** Attachment kind → fallback glyph when there's no thumbnail. */
    kind?: AttachmentKind;
    /** Optional thumbnail URL (shown for image/video). */
    thumbnailUri?: string;
}
export interface AttachmentBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Staged attachments to preview before sending. */
    attachments: StagedAttachment[];
    /** Called with an attachment id when its remove button is clicked. */
    onRemove?: (id: string) => void;
}
/**
 * Horizontal strip of staged attachments shown above the composer before a
 * message is sent. Each tile shows a thumbnail (or a kind glyph) and a remove
 * button. Scrolls horizontally; renders nothing when empty. No literal colors.
 */
export declare const AttachmentBar: React.ForwardRefExoticComponent<AttachmentBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AttachmentBar.d.ts.map
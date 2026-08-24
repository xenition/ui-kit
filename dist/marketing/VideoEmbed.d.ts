import * as React from 'react';
export interface VideoEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Video URL — an embed URL renders an `<iframe>`; a file URL renders a `<video>`. */
    src: string;
    /** Accessible title (iframe title / video aria-label). */
    title: string;
    /** Poster image shown before playback (native `<video>` only). */
    poster?: string;
    /** Render a `<video>` element instead of an `<iframe>` (auto-detected otherwise). */
    native?: boolean;
}
/** Responsive 16:9 video wrapper with a poster + play affordance; `<iframe>` or `<video>` as appropriate. */
export declare const VideoEmbed: React.ForwardRefExoticComponent<VideoEmbedProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VideoEmbed.d.ts.map
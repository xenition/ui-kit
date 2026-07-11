import * as React from 'react';
import { cn } from '../primitives/cn';

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

/** Detects a same-origin/file video URL that should use a native `<video>` element. */
function isFileSource(src: string): boolean {
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(src);
}

/** Responsive 16:9 video wrapper with a poster + play affordance; `<iframe>` or `<video>` as appropriate. */
export const VideoEmbed = React.forwardRef<HTMLDivElement, VideoEmbedProps>(function VideoEmbed(
  { src, title, poster, native, className, ...rest },
  ref
) {
  const useVideo = native ?? isFileSource(src);

  return (
    <div
      ref={ref}
      data-xen-video-embed=""
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-950',
        className
      )}
      {...rest}
    >
      {useVideo ? (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          aria-label={title}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <iframe
            src={src}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
          <span
            aria-hidden="true"
            data-xen-video-play=""
            className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary text-on-primary opacity-90"
          >
            <span className="ml-0.5 text-2xl leading-none">▶</span>
          </span>
        </>
      )}
    </div>
  );
});

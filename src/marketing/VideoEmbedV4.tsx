import * as React from 'react';
import { cn } from '../primitives/cn';
import type { VideoEmbedProps } from './VideoEmbed';

/** Drop-in for {@link VideoEmbedProps} — same props, the V4 "showcase" design. */
export type VideoEmbedV4Props = VideoEmbedProps;

/** Detects a same-origin/file video URL that should use a native `<video>` element. */
function isFileSource(src: string): boolean {
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(src);
}

/**
 * VideoEmbed — **V4** "showcase" design (web parity of the native V4). A rounded,
 * elevated 16:9 media frame: an `<iframe>` embed (or a `<video>` element for a
 * file `src`/`native`) inside a soft-bordered, shadowed surface, with a refined
 * circular play affordance over embeds. The correct aspect ratio, `poster`,
 * accessible `title`, and iframe/video auto-detection are all preserved from the
 * base; only the skin changes. NOT a brand-gradient surface. Same props/behavior
 * as {@link VideoEmbedProps}; every color is a `--xen-*` token (`bg-surface`,
 * `bg-primary`, `text-on-primary`) — no literals.
 */
export const VideoEmbedV4 = React.forwardRef<HTMLDivElement, VideoEmbedV4Props>(
  function VideoEmbedV4({ src, title, poster, native, className, ...rest }, ref) {
    const useVideo = native ?? isFileSource(src);

    return (
      <div
        ref={ref}
        data-xen-video-embed=""
        className={cn(
          'relative aspect-video w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm',
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
              className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--xen-radius-full)] border border-primary-50/30 bg-primary text-on-primary shadow-lg"
            >
              <span className="ml-0.5 text-2xl leading-none">▶</span>
            </span>
          </>
        )}
      </div>
    );
  }
);

import * as React from 'react';
import { cn } from '../primitives/cn';
import { injectStyleOnce } from './internal/inject';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scroll speed in px/s (loop duration is derived from content width). */
  speed?: number;
  /** Pause the loop while hovered. */
  pauseOnHover?: boolean;
}

const MARQUEE_CSS = `
@keyframes xen-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
[data-xen-marquee-track] {
  animation-name: xen-marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
[data-xen-marquee][data-pause-on-hover="true"]:hover [data-xen-marquee-track] {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-marquee-track] { animation: none !important; }
}
`;

const FALLBACK_DURATION_S = 24;

/**
 * Infinite horizontal loop (pure CSS keyframes — the content is rendered
 * twice and the track translates by -50%). The duplicate copy is
 * `aria-hidden` so assistive tech reads the content once. Reduced-motion
 * users get a static, non-animated row.
 */
export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(function Marquee(
  { speed = 40, pauseOnHover = true, className, children, ...rest },
  ref
) {
  injectStyleOnce('xen-marquee-styles', MARQUEE_CSS);

  const trackRef = React.useRef<HTMLDivElement>(null);
  const [durationS, setDurationS] = React.useState(FALLBACK_DURATION_S);

  React.useEffect(() => {
    const track = trackRef.current;
    if (track === null) return;
    const contentWidth = track.scrollWidth / 2;
    if (contentWidth > 0 && speed > 0) {
      setDurationS(contentWidth / speed);
    }
  }, [speed, children]);

  return (
    <div
      ref={ref}
      data-xen-marquee=""
      data-pause-on-hover={pauseOnHover ? 'true' : 'false'}
      className={cn('overflow-hidden', className)}
      {...rest}
    >
      <div
        ref={trackRef}
        data-xen-marquee-track=""
        className="flex w-max items-center gap-[var(--xen-space-lg)]"
        style={{ animationDuration: `${durationS}s` }}
      >
        <div className="flex shrink-0 items-center gap-[var(--xen-space-lg)]">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-[var(--xen-space-lg)]">
          {children}
        </div>
      </div>
    </div>
  );
});

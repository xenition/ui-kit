import * as React from 'react';
import { usePrefersReducedMotion } from '../motion/internal/reduced-motion';
import { cn } from '../primitives/cn';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Slides to render; falls back to `children` when omitted. */
  items?: React.ReactNode[];
  /** Show the prev/next arrow controls. */
  arrows?: boolean;
  /** Show the dot pager. */
  dots?: boolean;
  /** Auto-advance interval in ms (0 disables). Paused on hover/focus and under reduced motion. */
  autoplay?: number;
  /** Accessible label for the carousel region. */
  label?: string;
}

const ArrowIcon = ({ dir }: { dir: 'left' | 'right' }): React.ReactElement => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={dir === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'} />
  </svg>
);

/**
 * Horizontal, scroll-snapping slider for cards, images, or testimonials.
 * Native swipe/scroll drives the active dot; arrows and dots page through it,
 * ArrowLeft/ArrowRight move focus-driven navigation, and optional autoplay
 * honors hover/focus pauses and `prefers-reduced-motion`.
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    items,
    arrows = true,
    dots = true,
    autoplay = 0,
    label = 'Carousel',
    className,
    children,
    ...rest
  },
  ref
) {
  const slides = items ?? React.Children.toArray(children);
  const count = slides.length;
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const goTo = React.useCallback(
    (index: number) => {
      if (count === 0) return;
      const nextIndex = ((index % count) + count) % count;
      setActive(nextIndex);
      const scroller = scrollerRef.current;
      const child = scroller?.children[nextIndex] as HTMLElement | undefined;
      if (scroller && child && typeof scroller.scrollTo === 'function') {
        scroller.scrollTo({
          left: child.offsetLeft - scroller.offsetLeft,
          behavior: reduced ? 'auto' : 'smooth',
        });
      }
    },
    [count, reduced]
  );

  const prev = React.useCallback(() => goTo(active - 1), [active, goTo]);
  const next = React.useCallback(() => goTo(active + 1), [active, goTo]);

  // Keep the active dot in sync while the user swipes/scrolls.
  const onScroll = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const kids = Array.from(scroller.children) as HTMLElement[];
    let nearest = 0;
    let best = Infinity;
    kids.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - scroller.offsetLeft - scroller.scrollLeft);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  React.useEffect(() => {
    if (!autoplay || autoplay <= 0 || paused || reduced || count <= 1) return undefined;
    const id = window.setInterval(() => goTo(active + 1), autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, paused, reduced, count, active, goTo]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  };

  return (
    <div
      ref={ref}
      data-xen-carousel=""
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={cn('relative', className)}
      {...rest}
    >
      <div
        ref={scrollerRef}
        data-xen-carousel-track=""
        tabIndex={0}
        aria-label={`${label} slides`}
        onScroll={onScroll}
        className={cn(
          'flex snap-x snap-mandatory gap-[var(--xen-space-md)] overflow-x-auto scroll-smooth',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            data-xen-carousel-slide=""
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i === active ? undefined : true}
            data-active={i === active ? 'true' : 'false'}
            className="min-w-0 shrink-0 basis-full snap-start"
          >
            {slide}
          </div>
        ))}
      </div>

      {arrows && count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className={cn(
              'absolute left-[var(--xen-space-sm)] top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center',
              'rounded-[var(--xen-radius-full)] border border-border bg-surface text-on-surface shadow-sm transition-colors',
              'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            <ArrowIcon dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className={cn(
              'absolute right-[var(--xen-space-sm)] top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center',
              'rounded-[var(--xen-radius-full)] border border-border bg-surface text-on-surface shadow-sm transition-colors',
              'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            <ArrowIcon dir="right" />
          </button>
        </>
      ) : null}

      {dots && count > 1 ? (
        <div
          data-xen-carousel-dots=""
          role="tablist"
          aria-label="Slides"
          className="mt-[var(--xen-space-md)] flex justify-center gap-[var(--xen-space-xs)]"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              data-active={i === active ? 'true' : 'false'}
              className={cn(
                'h-2 rounded-[var(--xen-radius-full)] transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                i === active ? 'w-5 bg-primary' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
});

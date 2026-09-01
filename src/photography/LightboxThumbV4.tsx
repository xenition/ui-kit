import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LightboxThumbProps } from './LightboxThumb';

/** Drop-in for {@link LightboxThumbProps} — same props, the V4 "studio" design. */
export type LightboxThumbV4Props = LightboxThumbProps;

/** Studio mat sizes — both stay ≥44px so a pressable thumb is a valid tap target. */
const THUMB_CLASS: Record<NonNullable<LightboxThumbProps['size']>, string> = {
  sm: 'h-14 w-14', // 56px
  md: 'h-20 w-20', // 80px
};

/**
 * LightboxThumb — **V4** "studio" design (web parity of the native V4). A
 * **matted** filmstrip thumbnail — the photo sits inside a thin inset mat ring
 * (`ring-1 ring-inset ring-border`) over a `bg-neutral-100` ground, with **no
 * gradient** (the studio line reserves gradient for the gallery hero). When
 * `active`, the mat ring turns primary and a small `✓` glyph badge appears, so
 * selection is never carried by color alone; it is also reported via
 * `aria-pressed`. Both `sm` (56px) and `md` (80px) sizes are honored and stay
 * ≥44px so a pressable thumb is a valid tap target. Renders a real keyboard-
 * operable `<button>` when `onClick` is set. Identical props/behavior to
 * {@link LightboxThumbProps}; all colors from `--xen-*` token classes.
 */
export const LightboxThumbV4 = React.forwardRef<HTMLDivElement, LightboxThumbV4Props>(
  function LightboxThumbV4({ url, alt, active = false, size = 'md', index, onClick, className, ...rest }, ref) {
    const frame = cn(
      'relative overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset transition-shadow',
      THUMB_CLASS[size],
      active ? 'ring-2 ring-primary opacity-100' : 'ring-border opacity-80',
      className
    );

    const media = (
      <>
        {url ? (
          <img src={url} alt={onClick ? '' : alt ?? ''} loading="lazy" className="h-full w-full object-cover" />
        ) : null}
        {/* Selection glyph badge — token color, not color alone. */}
        {active ? (
          <span
            aria-hidden="true"
            className="absolute right-1 top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-on-primary"
          >
            ✓
          </span>
        ) : null}
      </>
    );

    if (typeof onClick === 'function') {
      return (
        <button
          ref={ref as React.Ref<never>}
          type="button"
          data-xen-lightbox-thumb=""
          aria-pressed={active}
          aria-label={alt ?? (typeof index === 'number' ? `Photo ${index}` : 'Photo')}
          onClick={onClick}
          className={cn(
            frame,
            'block cursor-pointer p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
          {...(rest as unknown as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {media}
        </button>
      );
    }

    return (
      <div ref={ref} data-xen-lightbox-thumb="" className={frame} {...rest}>
        {media}
      </div>
    );
  }
);

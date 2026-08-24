import * as React from 'react';
import { cn } from '../primitives/cn';

/** Size presets for the thumbnail. */
export type LightboxThumbSize = 'sm' | 'md';

const THUMB_CLASS: Record<LightboxThumbSize, string> = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
};

export interface LightboxThumbProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Thumbnail source URL. When absent a token-tinted placeholder is drawn. */
  url?: string;
  /** Accessible description of the photo. */
  alt?: string;
  /** Marks this thumb as the active frame (accent ring + a11y `selected`). */
  active?: boolean;
  /** Size preset (default `md`). */
  size?: LightboxThumbSize;
  /** Position for the accessibility label (1-based). */
  index?: number;
  /** Press handler (jump the lightbox to this frame). */
  onClick?: () => void;
}

/**
 * A filmstrip thumbnail for a lightbox — a small square image with a token
 * accent ring when `active`. Reports its selection through `aria-pressed` (not
 * color alone) and renders a real `<button>` when pressable. Meant to sit in a
 * horizontal scroll strip under a `Lightbox`. Token-only colors.
 */
export const LightboxThumb = React.forwardRef<HTMLDivElement, LightboxThumbProps>(
  function LightboxThumb({ url, alt, active = false, size = 'md', index, onClick, className, ...rest }, ref) {
    const frame = cn(
      'overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100',
      THUMB_CLASS[size],
      active ? 'border-2 border-accent opacity-100' : 'border border-border opacity-70',
      className
    );

    const img = url ? (
      <img src={url} alt={onClick ? '' : alt ?? ''} loading="lazy" className="h-full w-full object-cover" />
    ) : null;

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
          {img}
        </button>
      );
    }

    return (
      <div ref={ref} data-xen-lightbox-thumb="" className={frame} {...rest}>
        {img}
      </div>
    );
  }
);

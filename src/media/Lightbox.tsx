import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MediaItem } from './types';

export interface LightboxProps {
  /** The full item set. */
  items: MediaItem[];
  /** Index of the open item, or `null`/out-of-range to render nothing (closed). */
  index: number | null;
  /** Close the overlay (Esc, backdrop click, close button). */
  onClose: () => void;
  /** Go to the previous item (← / prev button). */
  onPrev?: () => void;
  /** Go to the next item (→ / next button). */
  onNext?: () => void;
  /** Wrap around at the ends (default false). */
  loop?: boolean;
  /** Accessible name for the dialog (default `Media viewer`). */
  label?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}

/**
 * Backdrop color is `color-mix` over the darkest neutral step (token-only, same
 * in light and dark). The fade is opacity-only and dropped under reduced
 * motion.
 */
const LIGHTBOX_CSS = `
@keyframes xen-lightbox-in { from { opacity: 0; } to { opacity: 1; } }
[data-xen-lightbox] {
  background-color: color-mix(in srgb, var(--xen-neutral-950) 88%, transparent);
  animation: xen-lightbox-in 180ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-lightbox] { animation: none; }
}
`;

const FOCUSABLE =
  'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/**
 * Fullscreen overlay media viewer. `role="dialog" aria-modal="true"` with a
 * focus trap (focus enters on open, cycles with Tab, and is restored to the
 * trigger on close), keyboard control (Esc closes, ←/→ navigate), a
 * token-styled backdrop, and an opacity-only fade that's disabled under
 * `prefers-reduced-motion`. SSR-safe (guards `document`) and renders nothing
 * when `index` is `null` or out of range. Presentational — the parent owns
 * `index` and the prev/next handlers.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  loop = false,
  label = 'Media viewer',
  closeLabel = 'Close',
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: LightboxProps): React.ReactElement | null {
  injectStyleOnce('xen-lightbox-styles', LIGHTBOX_CSS);

  const open = index !== null && index >= 0 && index < items.length;
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<Element | null>(null);

  const hasPrev = open && (loop || (index as number) > 0);
  const hasNext = open && (loop || (index as number) < items.length - 1);

  // Callbacks read the latest handlers without re-subscribing the key listener.
  const handlers = React.useRef({ onClose, onPrev, onNext, hasPrev, hasNext });
  handlers.current = { onClose, onPrev, onNext, hasPrev, hasNext };

  React.useEffect(() => {
    if (!open || typeof document === 'undefined') return undefined;

    restoreRef.current = document.activeElement;
    const dialog = dialogRef.current;
    // Move focus into the dialog.
    const focusables = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE);
    (focusables && focusables.length ? focusables[0] : dialog)?.focus();

    const onKeyDown = (e: KeyboardEvent): void => {
      const h = handlers.current;
      if (e.key === 'Escape') {
        e.preventDefault();
        h.onClose();
      } else if (e.key === 'ArrowLeft') {
        if (h.hasPrev) {
          e.preventDefault();
          h.onPrev?.();
        }
      } else if (e.key === 'ArrowRight') {
        if (h.hasNext) {
          e.preventDefault();
          h.onNext?.();
        }
      } else if (e.key === 'Tab') {
        const nodes = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!nodes || nodes.length === 0) return;
        const list = Array.from(nodes);
        const first = list[0]!;
        const last = list[list.length - 1]!;
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
    // Re-run when the overlay opens/closes; `index` changes keep the same trap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;
  const item = items[index as number]!;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      data-xen-lightbox=""
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-[var(--xen-space-lg)]"
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute right-[var(--xen-space-lg)] top-[var(--xen-space-lg)] inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l10 10M14 4L4 14" />
        </svg>
      </button>

      {hasPrev ? (
        <button
          type="button"
          aria-label={prevLabel}
          onClick={onPrev}
          className="absolute left-[var(--xen-space-lg)] top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4L6 9l5 5" />
          </svg>
        </button>
      ) : null}

      <figure data-xen-lightbox-figure="" className="flex max-h-full max-w-3xl flex-col items-center gap-[var(--xen-space-sm)]">
        {item.kind === 'video' ? (
          <video
            src={item.url}
            poster={item.poster}
            controls
            autoPlay
            className="max-h-[80vh] max-w-full rounded-[var(--xen-radius-md)]"
          />
        ) : (
          <img
            src={item.url}
            alt={item.alt ?? item.caption ?? ''}
            className="max-h-[80vh] max-w-full rounded-[var(--xen-radius-md)] object-contain"
          />
        )}
        {item.caption ? (
          <figcaption className="text-center text-sm text-neutral-50">{item.caption}</figcaption>
        ) : null}
        <div data-xen-lightbox-counter="" className="text-xs text-neutral-50">
          {(index as number) + 1} / {items.length}
        </div>
      </figure>

      {hasNext ? (
        <button
          type="button"
          aria-label={nextLabel}
          onClick={onNext}
          className="absolute right-[var(--xen-space-lg)] top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4l5 5-5 5" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

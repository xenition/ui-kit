import * as React from 'react';
import { cn } from '../primitives/cn';
import type { AnnouncementBarProps, AnnouncementTone } from './AnnouncementBar';

/** Drop-in for {@link AnnouncementBarProps} — same props, the V4 "showcase" design. */
export type AnnouncementBarV4Props = AnnouncementBarProps;

/**
 * Announcement tone → surface classes for the **V4** "showcase" design. The
 * `primary` (promotional) tone rides the vibrant primary→accent brand gradient
 * with near-white ink — the reserved gradient moment. `accent`/`neutral` stay
 * as refined solid bands.
 */
const TONE_CLASSES: Record<AnnouncementTone, string> = {
  primary: 'bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 text-primary-50',
  accent: 'bg-accent text-on-accent',
  neutral: 'bg-neutral-100 text-on-surface border-b border-border',
};

/**
 * AnnouncementBar — **V4** "showcase" design (web parity of the native V4). A
 * compact, conversion-forward top banner: the `primary` promotional tone rides
 * the reserved vibrant primary→accent brand gradient with near-white ink, while
 * `accent`/`neutral` stay as refined solid bands. Bolder message + medium-weight
 * action. Honors every prop of {@link AnnouncementBarProps}
 * (`message`/`action`/`tone`/`dismissible`/`closeLabel`/`onDismiss`); dismissal
 * is session state only; token-only colors, no literals.
 */
export const AnnouncementBarV4 = React.forwardRef<HTMLDivElement, AnnouncementBarV4Props>(
  function AnnouncementBarV4(
    {
      message,
      action,
      tone = 'primary',
      dismissible = true,
      closeLabel = 'Dismiss announcement',
      onDismiss,
      className,
      ...rest
    },
    ref
  ) {
    const [dismissed, setDismissed] = React.useState(false);
    if (dismissed) return null;

    return (
      <div
        ref={ref}
        data-xen-announcement-bar=""
        role="region"
        aria-label="Announcement"
        className={cn(
          'flex w-full items-center justify-center gap-[var(--xen-space-md)]',
          'px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-sm font-medium',
          TONE_CLASSES[tone],
          className
        )}
        {...rest}
      >
        <div className="flex flex-wrap items-center justify-center gap-[var(--xen-space-sm)] text-center">
          <span>{message}</span>
          {action !== undefined ? <span className="font-semibold underline">{action}</span> : null}
        </div>
        {dismissible ? (
          <button
            type="button"
            aria-label={closeLabel}
            data-xen-announcement-close=""
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] leading-none opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
          >
            <span aria-hidden="true">✕</span>
          </button>
        ) : null}
      </div>
    );
  }
);

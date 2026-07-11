import * as React from 'react';
import { cn } from '../primitives/cn';

export type AnnouncementTone = 'primary' | 'accent' | 'neutral';

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Banner message. */
  message: React.ReactNode;
  /** Optional trailing call-to-action (a link or button). */
  action?: React.ReactNode;
  /** Color treatment. */
  tone?: AnnouncementTone;
  /** Hide the dismiss control. */
  dismissible?: boolean;
  /** Accessible label for the close button. */
  closeLabel?: string;
  /** Called after the bar is dismissed. */
  onDismiss?: () => void;
}

const TONE_CLASSES: Record<AnnouncementTone, string> = {
  primary: 'bg-primary text-on-primary',
  accent: 'bg-accent text-on-accent',
  neutral: 'bg-neutral-100 text-on-surface border-b border-border',
};

/** Dismissible top banner with a message, optional action, and tone variants (session state only). */
export const AnnouncementBar = React.forwardRef<HTMLDivElement, AnnouncementBarProps>(
  function AnnouncementBar(
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
          'px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-sm',
          TONE_CLASSES[tone],
          className
        )}
        {...rest}
      >
        <div className="flex flex-wrap items-center justify-center gap-[var(--xen-space-sm)] text-center">
          <span>{message}</span>
          {action !== undefined ? <span className="font-medium">{action}</span> : null}
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

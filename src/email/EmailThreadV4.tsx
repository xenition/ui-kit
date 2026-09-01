import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { AvatarV4 } from '../primitives/AvatarV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { AttachmentChipV4 } from './AttachmentChipV4';
import { MailLabelChipV4 } from './MailLabelChipV4';
import { StarButtonV4 } from './StarButtonV4';
import { PLACEHOLDER_CLASS, TONE_INK, useThreadExpansion } from './internal/mail-v4';
import type { EmailThreadProps } from './EmailThread';

export interface EmailThreadV4Props extends EmailThreadProps {
  /**
   * Which message starts open when the thread is **uncontrolled**. Defaults to
   * the last one, which is what the base opened.
   */
  defaultExpandedId?: string;
  /** The loading state's accessible name. Default `'Loading messages'`. */
  loadingLabel?: string;
  /**
   * A sentence for a conversation that failed to load. Supplying it puts the
   * thread into its error state; there was no error state at all before.
   */
  errorLabel?: string;
}

/** How many placeholder messages a loading thread draws. */
const SKELETON_MESSAGES = 3;

/**
 * **V4 email thread** — same props as {@link EmailThread} plus
 * `defaultExpandedId`, `loadingLabel` and `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **Expansion works when nobody is driving it.** The base computed
 *    `new Set(expandedIds ?? [lastId])` fresh on every render and held **no
 *    state at all**, while `expandedIds` is an *optional* prop. Mounted the way
 *    the module's own barrel doc shows it — `<EmailThread subject messages />`
 *    — every header click fired `onToggleMessage` into a callback nobody was
 *    listening to: the newest message stayed open, every earlier one stayed a
 *    clipped one-line snippet, and `aria-expanded` never flipped. A user tapped
 *    the third reply, saw nothing happen, tapped again, and concluded the app
 *    was broken; a screen-reader user heard "Expand message from Priya,
 *    collapsed" every single time they activated it. `useThreadExpansion` —
 *    shared with the native twin — leaves the controlled path exactly as it
 *    was and gives the uncontrolled path somewhere to put its state.
 * 2. **The header toggle is a real `<button>`**, not a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler —
 *    three approximations of what a button already does. The timestamp and the
 *    star stay outside it, so neither collapses the message.
 * 3. **Loading draws the messages it is about to show** and announces itself.
 *    A centred spinner collapsed the thread to a dot and then jumped to full
 *    height.
 * 4. **The empty state is `EmptyStateV4`**, not the base primitive re-exported
 *    through the deprecated `../commerce` shim the base imported it from.
 * 5. **A failed fetch has a representation.** `errorLabel` gives one; there
 *    was none, so a thread that failed to load and a thread with no messages
 *    were the same screen.
 */
export const EmailThreadV4 = React.forwardRef<HTMLDivElement, EmailThreadV4Props>(
  function EmailThreadV4(
    {
      subject,
      messages,
      labels,
      expandedIds,
      onToggleMessage,
      onToggleStar,
      onPressAttachment,
      loading = false,
      defaultExpandedId,
      loadingLabel = 'Loading messages',
      errorLabel,
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const safeMessages = messages ?? [];
    const safeLabels = labels ?? [];
    const lastId =
      safeMessages.length > 0 ? safeMessages[safeMessages.length - 1]!.id : undefined;

    const expansion = useThreadExpansion(expandedIds, defaultExpandedId ?? lastId);
    const uid = React.useId();

    if (loading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-label={loadingLabel}
          className={cn('flex flex-col bg-surface', className)}
        >
          {/* The shape it is about to be, not a dot in the middle of it. */}
          {Array.from({ length: SKELETON_MESSAGES }).map((_, index) => (
            <div key={index} className="flex items-start gap-sm border-b border-border px-md py-md">
              <span
                className={cn('h-2xl w-2xl shrink-0 rounded-full', PLACEHOLDER_CLASS)}
                aria-hidden="true"
              />
              <span className="flex min-w-0 flex-1 flex-col gap-xs" aria-hidden="true">
                <span className={cn('h-sm w-1/3', PLACEHOLDER_CLASS)} />
                <span className={cn('h-sm w-2/3', PLACEHOLDER_CLASS)} />
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (errorLabel) {
      return (
        <div ref={ref} role="alert" className={cn('bg-surface p-xl', className)}>
          <EmptyStateV4 title={errorLabel} />
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('bg-surface', className)}>
        <div className="flex flex-col gap-sm border-b border-border px-md py-md">
          <h2 className="text-xl font-bold text-on-surface">{subject}</h2>
          {safeLabels.length > 0 ? (
            <div className="flex flex-wrap gap-xs">
              {safeLabels.map((one) => (
                <MailLabelChipV4 key={one.id} label={one.label} tone={one.tone ?? 'neutral'} />
              ))}
            </div>
          ) : null}
        </div>

        {safeMessages.length === 0 ? (
          <div className="p-xl">
            <EmptyStateV4 title="No messages" description="This conversation is empty." />
          </div>
        ) : (
          safeMessages.map((message) => {
            const isOpen = expansion.isOpen(message.id);
            const atts = message.attachments ?? [];
            const bodyId = `${uid}-${message.id}`;

            return (
              <div key={message.id} className="border-b border-border px-md py-md">
                <div className="flex items-center gap-sm">
                  <button
                    type="button"
                    aria-label={`${isOpen ? 'Collapse' : 'Expand'} message from ${message.sender}`}
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? bodyId : undefined}
                    onClick={() => {
                      // The hook is a no-op on the controlled path, so a caller
                      // driving `expandedIds` still sees exactly what it saw.
                      expansion.toggle(message.id);
                      onToggleMessage?.(message.id);
                    }}
                    data-xen-v4-state=""
                    style={
                      stateGroundVars(
                        'var(--xen-surface)',
                        'var(--xen-on-surface)'
                      ) as React.CSSProperties
                    }
                    className={cn(
                      'flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-sm)] px-xs text-left',
                      MIN_TAP_CLASS,
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    )}
                  >
                    <AvatarV4 size="md" src={message.avatarUri} name={message.sender} alt="" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-semibold text-on-surface">
                        {message.sender}
                      </span>
                      {!isOpen ? (
                        <span className={cn('block truncate text-sm', TONE_INK.muted)}>
                          {message.body}
                        </span>
                      ) : null}
                    </span>
                  </button>
                  {/*
                    Siblings of the toggle, never inside it: on the twin the
                    toggle swallowed both, so tapping the timestamp collapsed
                    the message and the star could not be reached at all.
                  */}
                  {message.timestamp ? (
                    <span className={cn('shrink-0 text-xs', TONE_INK.muted)}>
                      {message.timestamp}
                    </span>
                  ) : null}
                  <StarButtonV4
                    starred={message.starred ?? false}
                    onToggle={onToggleStar ? (next) => onToggleStar(message.id, next) : undefined}
                    size="base"
                    className="shrink-0"
                  />
                </div>

                {isOpen ? (
                  <div id={bodyId} className="mt-sm flex flex-col gap-sm">
                    <p className="text-base leading-relaxed text-on-surface">{message.body}</p>
                    {atts.length > 0 ? (
                      <div className="flex flex-wrap gap-xs">
                        {atts.map((attachment) => (
                          <AttachmentChipV4
                            key={attachment.id}
                            name={attachment.name}
                            kind={attachment.kind ?? 'file'}
                            size={attachment.size}
                            onClick={
                              onPressAttachment
                                ? () => onPressAttachment(message.id, attachment.id)
                                : undefined
                            }
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    );
  }
);

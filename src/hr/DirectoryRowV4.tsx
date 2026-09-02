import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  MIN_TAP_SQUARE_CLASS,
  spokenLine,
  toneInkClass,
} from './internal/tone-v4';
import { PRESENCE_META } from './internal';
import type { DirectoryRowProps } from './DirectoryRow';

export interface DirectoryRowV4Props extends DirectoryRowProps {
  /**
   * Copy on the trailing message action, before the person's name. Default
   * `'Message'`, so the button announces `Message Ada Lovelace`.
   */
  messageLabel?: string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 directory row** — the web twin of the native `DirectoryRowV4`, same
 * props as {@link DirectoryRow} plus `messageLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **Pressing Enter on the message button no longer opens the profile
 *    instead.** The row was a `<div role="button">` with a hand-written
 *    Enter/Space handler, and the message `<button>` lived inside it. The
 *    click was guarded with `stopPropagation`; the *keydown* was not. So the
 *    row's handler caught the bubbled Enter, called `preventDefault()` — which
 *    cancels the button's own activation, because Enter's default action on a
 *    button **is** the click — and ran `onClick`. A keyboard user aiming at
 *    "Message Ada" navigated to Ada's profile and sent nothing, with no sign
 *    anything had gone wrong. The fix is structural: the row is a plain
 *    `<div>`, the activation is a real `<button>` around the avatar and the
 *    text, and the message button is its **sibling**. There is no ancestor
 *    handler left to fire, so no guard is needed and none is written.
 * 2. **The row is one accessible name.** `Open Ada Lovelace` replaced the
 *    whole subtree, so the title, the department, the email and the presence
 *    were never announced at all. They now join the name, comma-separated.
 * 3. **The message button is a 44 target.** It was a bare glyph with padding
 *    on one side — the conventions call a control that relies on `hitSlop`
 *    alone a defect, and the web twin did not even have that.
 * 4. **Press and hover are a state layer.** `hover:bg-neutral-100` on the row
 *    and `hover:opacity-70` on the glyph: the first is a ramp step that
 *    inverts under `[data-theme="dark"]` and paints a near-white slab on a
 *    dark page, the second dims the control's own content, which is the signal
 *    M3 spends on **disabled**. A hovered ✉ and a dead ✉ looked alike.
 * 5. **Presence is inked with an ink slot**, not `text-success` / `text-muted`
 *    — fill tokens, and `muted` has no contrast promise as text at all.
 * 6. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a directory scrolled into a conversation list does not
 *    change rhythm halfway down. The ground and the radius the base painted on
 *    the row itself go with it: a row lives inside a container, and a row that
 *    paints its own card is what stopped four list components looking like one.
 */
export const DirectoryRowV4 = React.forwardRef<HTMLDivElement, DirectoryRowV4Props>(
  function DirectoryRowV4(
    {
      name,
      title,
      department,
      avatarUrl,
      email,
      phone,
      presence,
      variant = 'default',
      onClick,
      onMessage,
      messageLabel = 'Message',
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    // A directory row with nobody on it is the blank bordered strip the line
    // rules out.
    if (!name) return null;

    const compact = variant === 'compact';
    const presenceMeta = presence ? PRESENCE_META[presence] : undefined;
    const subtitle = metaLine([title, department]);
    const contact = metaLine([email, phone]);
    const interactive = onClick != null;

    const identity = (
      <>
        <span className={ROW_V4_LEADING_CLASS}>
          <AvatarV4 size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} alt="" />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{name}</span>
          {subtitle ? <span className="truncate text-sm text-muted-text">{subtitle}</span> : null}
          {!compact && contact ? (
            <span className="truncate text-xs text-muted-text">{contact}</span>
          ) : null}
        </span>
      </>
    );

    return (
      <div
        ref={ref}
        data-testid={testID}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(Boolean(subtitle) || (!compact && Boolean(contact))),
          className
        )}
      >
        {interactive ? (
          <button
            type="button"
            aria-label={spokenLine([name, title, department, presenceMeta?.label, email, phone])}
            onClick={onClick}
            data-xen-v4-state=""
            style={cardStateVars()}
            className={cn(
              'flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {identity}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-md">{identity}</div>
        )}

        <span className={ROW_V4_TRAILING_CLASS}>
          {presenceMeta ? (
            // Already inside the activation's name when there is one, so it is
            // a second stop for no gain; on a static row it speaks for itself.
            <span className="flex items-center gap-xs" aria-hidden={interactive || undefined}>
              <span aria-hidden="true" className={cn('text-xs', toneInkClass(presenceMeta.tone))}>
                {presenceMeta.glyph}
              </span>
              <span className="text-xs text-muted-text">{presenceMeta.label}</span>
            </span>
          ) : null}

          {/*
            A sibling of the activation, never a descendant of it. That is the
            whole fix — an event that has no interactive ancestor cannot be
            stolen by one, so this button does one thing under the mouse and
            under the keyboard alike.
          */}
          {onMessage ? (
            <button
              type="button"
              aria-label={`${messageLabel} ${name}`}
              onClick={onMessage}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
                'text-lg text-primary-text',
                MIN_TAP_SQUARE_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              <span aria-hidden="true">✉</span>
            </button>
          ) : null}
        </span>
      </div>
    );
  }
);

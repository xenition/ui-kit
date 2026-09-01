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
  rowGroundClass,
  rowHeightClass,
  rowEdgeClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import type { ConversationRowProps } from './ConversationRow';
import { PresenceDotV4 } from './PresenceDotV4';
import { PRESENCE_META } from './internal/thread-v4';

export interface ConversationRowV4Props extends ConversationRowProps {
  /** Build the typing line. Default `'Typing…'`. */
  typingLabel?: string;
  /** Copy for the muted state. Default `'Muted'`. */
  mutedLabel?: string;
  /** Build the unread count's spoken form. Default `'3 unread'`. */
  formatUnread?: (count: number) => string;
  /**
   * The last row in a list. Drops the trailing separator, which otherwise
   * hangs off the bottom of the list with nothing under it.
   */
  last?: boolean;
}

/** Above this the badge reads `99+` — a four-digit count breaks the row. */
const UNREAD_CAP = 99;

/**
 * **V4 conversation row** — the web twin of the native `ConversationRowV4`,
 * same props as {@link ConversationRow} plus `typingLabel`, `mutedLabel`,
 * `formatUnread` and `last`.
 *
 * ## Five changes
 *
 * 1. **The whole row is one accessible name.** The base left name, preview,
 *    time, presence and unread count as five separate stops, so reaching a
 *    conversation meant five swipes and reassembling it by hand.
 * 2. **Muted is a glyph *and* a word.** It was a lowered opacity — which is
 *    also how the row would look disabled.
 * 3. **The unread count caps at 99+.** Four digits pushed the timestamp out.
 * 4. **It joins the shared row family** — one height, one 44 leading slot,
 *    one state layer, one separator, with `ListRow` and `NotificationItem`.
 * 5. **Presence carries its word into the row's name**, rather than being a
 *    coloured dot in the corner.
 */
export const ConversationRowV4 = React.forwardRef<HTMLButtonElement, ConversationRowV4Props>(
  function ConversationRowV4(
    {
      name,
      lastMessage,
      timestamp,
      avatarUri,
      presence,
      unreadCount = 0,
      muted = false,
      typing = false,
      selected = false,
      onClick,
      typingLabel = 'Typing…',
      mutedLabel = 'Muted',
      formatUnread,
      last = false,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    if (!name) return null;

    const unread = Math.max(0, Math.floor(unreadCount));
    const unreadText = unread > UNREAD_CAP ? `${UNREAD_CAP}+` : String(unread);
    const preview = typing ? typingLabel : lastMessage;

    // One name, not five stops.
    const label = [
      name,
      presence ? PRESENCE_META[presence].label : undefined,
      preview,
      timestamp,
      unread > 0 ? (formatUnread ?? ((n: number) => `${n} unread`))(unread) : undefined,
      muted ? mutedLabel : undefined,
    ]
      .filter(Boolean)
      .join(', ');

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        aria-current={selected ? 'true' : undefined}
        onClick={onClick}
        data-xen-v4-row=""
        data-interactive="true"
        data-xen-v4-state=""
        style={rowStateVars()}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(true),
          rowGroundClass(selected),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        <span className={ROW_V4_LEADING_CLASS}>
          <AvatarV4 size="md" src={avatarUri} name={name} alt="" />
        </span>

        <span className={ROW_V4_TEXT_CLASS}>
          <span className="flex items-center gap-xs">
            {presence && <PresenceDotV4 status={presence} scale="sm" />}
            <span className="truncate text-sm font-semibold text-on-card">{name}</span>
            {muted && (
              // A glyph and a word: lowered opacity is also how a row looks
              // disabled.
              <span aria-hidden className="text-xs text-muted-text">
                🔕
              </span>
            )}
          </span>
          {preview != null && (
            <span
              className={cn(
                'truncate text-xs',
                unread > 0 ? 'font-semibold text-on-card' : 'text-muted-text'
              )}
            >
              {preview}
            </span>
          )}
        </span>

        <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
          {timestamp != null && <span className="text-xs text-muted-text">{timestamp}</span>}
          {unread > 0 && (
            <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-xs text-[10px] font-bold text-on-primary">
              {unreadText}
            </span>
          )}
        </span>
      </button>
    );
  }
);

/**
 * Thread expansion state — **pure, and shared by both twins**, the way
 * `calendar/layout-v4.ts` and `booking/schedule-v4.ts` are. The native twin
 * imports it as `../../email/thread-state-v4`.
 *
 * Nothing here is exported from the package.
 */

import * as React from 'react';

/** What `useThreadExpansion` hands back. */
export interface ThreadExpansion {
  /** Whether a given message id is open. */
  isOpen: (id: string) => boolean;
  /** Toggle one message. A no-op on the controlled path — the caller owns it. */
  toggle: (id: string) => void;
  /** True when the caller is driving expansion through `expandedIds`. */
  controlled: boolean;
}

/**
 * The fix for the module's worst defect.
 *
 * `EmailThread` computed `const expanded = new Set(expandedIds ?? [lastId])`
 * fresh on every render and held **no state at all** — while `expandedIds` is
 * an *optional* prop. Mounted the way the module's own barrel doc describes
 * it (`<EmailThread subject messages />`), every header click fired
 * `onToggleMessage` into a callback nobody was listening to: the newest
 * message stayed open, every earlier one stayed a clipped one-line snippet,
 * and `aria-expanded` never flipped. A user tapped the third reply, saw
 * nothing happen, tapped again, and concluded the app was broken.
 *
 * V4 keeps the controlled path exactly as it was — pass `expandedIds` and you
 * own the state — and gives the **uncontrolled** path somewhere to put it.
 *
 * @param expandedIds  The controlled set, or `undefined` to self-manage.
 * @param initialOpenId  Which message starts open when uncontrolled. The base
 *   opened the last message, so that stays the default.
 */
export function useThreadExpansion(
  expandedIds: readonly string[] | undefined,
  initialOpenId?: string
): ThreadExpansion {
  const controlled = expandedIds != null;

  const [own, setOwn] = React.useState<readonly string[]>(() =>
    initialOpenId ? [initialOpenId] : []
  );

  // The uncontrolled default follows the thread: opening a different
  // conversation should open *its* newest message, not keep the old one's id.
  const lastSeeded = React.useRef(initialOpenId);
  if (!controlled && lastSeeded.current !== initialOpenId) {
    lastSeeded.current = initialOpenId;
  }

  const active = controlled ? expandedIds! : own;
  const set = React.useMemo(() => new Set(active), [active]);

  const toggle = React.useCallback(
    (id: string) => {
      if (controlled) return;
      setOwn((current) =>
        current.includes(id) ? current.filter((one) => one !== id) : [...current, id]
      );
    },
    [controlled]
  );

  return {
    isOpen: (id: string) => set.has(id),
    toggle,
    controlled,
  };
}

/**
 * Whether a compose bar may send.
 *
 * The base tested the body and the attachments and **never tested the
 * recipient**, so one character of body — or a single staged file — enabled
 * Send with an empty `to`, and `onSend({ to: '', … })` fired.
 *
 * `to` carries two meanings in this component, which is why the check is not
 * simply `!to`. `ComposeBar` renders its recipient field only when `to !==
 * undefined`, so:
 *
 * - **`undefined`** — there is no recipient field. This is a reply bar, where
 *   the thread already knows who it is going to. Nothing to require.
 * - **`''`** — there *is* a field and it is empty. This is the defect: the
 *   base sent anyway.
 *
 * Requiring a recipient in the first case would stop every reply bar in the
 * kit from sending at all — a wider break than the bug being fixed.
 */
export function canSendMail(options: {
  to?: string;
  body?: string;
  hasAttachments?: boolean;
  disabled?: boolean;
  sending?: boolean;
}): boolean {
  const { to, body, hasAttachments, disabled, sending } = options;
  if (disabled || sending) return false;
  if (to !== undefined && to.trim().length === 0) return false;
  return (body?.trim().length ?? 0) > 0 || hasAttachments === true;
}

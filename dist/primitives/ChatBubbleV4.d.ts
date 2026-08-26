import * as React from 'react';
import type { ChatBubbleProps } from './ChatBubble';
export type { ChatBubbleProps as ChatBubbleV4Props };
/**
 * `ChatBubble`, V4 — the same props, and both directions legible on their own
 * fill.
 *
 * ## The received bubble was unreadable in dark mode
 *
 * The base fills it with `bg-neutral-100` and inks it with `text-on-surface`.
 * The ramps carry the LIGHT orientation in both schemes, so under
 * `[data-theme="dark"]` `--xen-neutral-100` is one of the *lightest* steps
 * there is — while `on-surface` in dark is near-white. A near-white message on
 * a near-white bubble, on every dark-mode chat screen built on the kit.
 *
 * V4 uses only compiler-guaranteed pairs, in both directions:
 *
 * - **sent** — `primary` filled with `on-primary`;
 * - **received** — `surface` inked with `on-surface`, plus the `border`
 *   hairline that separates it from the page it is sitting on.
 *
 * Both pairs are derived per scheme by the compiler and are the contract
 * `MIN_CONTRAST` is measured against, so the text clears AA on its own fill in
 * light and in dark without this component checking anything.
 *
 * ## Direction without a tail
 *
 * Alignment, fill and one tightened corner — see {@link CORNERS}. Three signals
 * for one fact, which is what makes a thread scannable (§33) rather than
 * decorated: none of them is a shape drawn for its own sake.
 *
 * ## Everything else
 *
 * Padding comes off the spacing scale rather than the base's `px-3.5 py-2`, so
 * a re-scaled seed re-scales the bubble. The `meta` line moves from `muted` to
 * `muted-text`: an author name and a timestamp are text, and `muted` carries no
 * contrast promise.
 *
 * The two base twins disagreed about the message's own size — `text-sm` on the
 * web, `base` on native. V4 settles on `base` on both: a message is the content
 * of the screen, not a caption on something else.
 */
export declare const ChatBubbleV4: React.ForwardRefExoticComponent<ChatBubbleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChatBubbleV4.d.ts.map
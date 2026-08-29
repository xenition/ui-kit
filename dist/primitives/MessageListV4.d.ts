import * as React from 'react';
import type { MessageListProps } from './MessageList';
export type { MessageListProps as MessageListV4Props };
/**
 * `MessageList`, V4 — the same props, and a thread that reads as one
 * conversation.
 *
 * ## Rhythm
 *
 * The base separates messages by `gap-3` on the web and `spacing.md` on native
 * — two different numbers, neither of them a token on the web, for the same
 * idea. V4 uses `sm` on both.
 *
 * Tighter is the design decision, not just the smaller number: a bubble already
 * carries its own padding, so the visible space between two turns is the gap
 * *plus* two paddings. At the base's spacing that reads as a column of separate
 * blocks; at `sm` it reads as one conversation with turns in it, which is what
 * a thread is (§9 — let spacing say the structure).
 *
 * The viewport takes `lg` of padding, off the scale rather than `p-4`.
 *
 * ## No ground
 *
 * The list paints nothing. It is the page the bubbles are on, and a chat
 * viewport that fills itself with `surface` puts a second surface behind
 * bubbles that are already `surface` — §11's container that has not earned
 * itself, and §8's nesting. Whatever the screen behind it is stays visible.
 *
 * ## Two behaviours worth naming
 *
 * `role="log"` — the ARIA role for a running transcript. A screen reader
 * announces new entries politely as they arrive, which is what a chat is for;
 * without it a message that appears while the reader is elsewhere on the page
 * simply never happened (§37, §46). The native twin has no equivalent role and
 * says so rather than inventing one.
 *
 * `overscroll-contain` — scrolling past the top of a thread stops at the top of
 * the thread instead of scrolling the page behind it. Chain-scrolling out of a
 * conversation while reading it is the kind of motion §36.11 asks components
 * not to introduce.
 */
export declare const MessageListV4: React.ForwardRefExoticComponent<MessageListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageListV4.d.ts.map
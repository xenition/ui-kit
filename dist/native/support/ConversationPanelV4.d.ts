import * as React from 'react';
import type { ConversationPanelProps } from './ConversationPanel';
/** Drop-in for {@link ConversationPanelProps} — same props, the V4 "console" design. */
export type ConversationPanelV4Props = ConversationPanelProps;
/**
 * ConversationPanel — **V4** "calm console" design. A quiet, legible support
 * thread: agent replies as soft-primary bubbles aligned right, customer messages
 * as surface + hairline bubbles aligned left, system notes centered, internal
 * notes with a warn tint — each aligned and tinted by author with the role in
 * text (never color-only). Muted timestamps, an inline reply composer with a
 * ≥44px send target, and the base's `loading` / empty states. Same
 * props/behavior as {@link ConversationPanelProps}; token-only colors via
 * `useXenitionTheme()`.
 */
export declare function ConversationPanelV4({ messages, loading, emptyText, replyValue, onChangeReply, onReply, sendLabel, hideComposer, disabled, style, }: ConversationPanelV4Props): React.ReactElement;
//# sourceMappingURL=ConversationPanelV4.d.ts.map
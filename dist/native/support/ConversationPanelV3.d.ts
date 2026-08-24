import * as React from 'react';
import { type ConversationPanelProps } from './ConversationPanel';
/** Drop-in alternate design for {@link ConversationPanel}. Identical contract. */
export type ConversationPanelV3Props = ConversationPanelProps;
/**
 * ConversationPanel — **V3 (flat quoted thread)**. An email-style transcript:
 * every message is a left sender rail + a role/name header + the body, laid out
 * flat (no bubbles, no side alignment) for a calm, readable log. Internal notes
 * get a warn rail and a lock glyph. Same `ConversationPanelProps` as
 * {@link ConversationPanel}. Sender is carried by rail + text; token colors
 * only. Handles loading and empty threads.
 */
export declare function ConversationPanelV3({ messages, loading, emptyText, replyValue, onChangeReply, onReply, sendLabel, hideComposer, disabled, style, }: ConversationPanelV3Props): React.ReactElement;
//# sourceMappingURL=ConversationPanelV3.d.ts.map
import * as React from 'react';
import { type ConversationPanelProps } from './ConversationPanel';
/** Drop-in alternate design for {@link ConversationPanel}. Identical contract. */
export type ConversationPanelV2Props = ConversationPanelProps;
/**
 * ConversationPanel — **V2 (avatar bubble thread)**. Chat-style bubbles with a
 * per-side avatar (customer left, agent right), a system chip in the centre,
 * and a rounded composer with a filled Send button. Same
 * `ConversationPanelProps` as {@link ConversationPanel}. Author role is in text
 * so it is never color-only; all colors trace to tokens. Handles loading and
 * empty threads.
 */
export declare function ConversationPanelV2({ messages, loading, emptyText, replyValue, onChangeReply, onReply, sendLabel, hideComposer, disabled, style, }: ConversationPanelV2Props): React.ReactElement;
//# sourceMappingURL=ConversationPanelV2.d.ts.map
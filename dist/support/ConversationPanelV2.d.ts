import * as React from 'react';
import type { ConversationPanelProps } from './ConversationPanel';
/** Same public contract as {@link ConversationPanel} — a drop-in alternate design. */
export type ConversationPanelV2Props = ConversationPanelProps;
/**
 * ConversationPanel, redesigned (v2): a **chat-bubble thread**. Agent replies sit
 * right in primary bubbles, customer messages left in bordered surface bubbles,
 * system lines center as quiet notes, and internal notes tint warn. A rounded
 * composer with a send button anchors the foot. Distinct from v1. Same props,
 * token-only.
 */
export declare const ConversationPanelV2: React.ForwardRefExoticComponent<ConversationPanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ConversationPanelV2.d.ts.map
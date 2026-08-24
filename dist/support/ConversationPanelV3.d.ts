import * as React from 'react';
import type { ConversationPanelProps } from './ConversationPanel';
/** Same public contract as {@link ConversationPanel} — a drop-in alternate design. */
export type ConversationPanelV3Props = ConversationPanelProps;
/**
 * ConversationPanel, redesigned (v3): a **flat quoted transcript**. Each message
 * hangs off a colored left rail (agent primary, customer hairline) with an author
 * · time header and the body beneath; internal notes tint warn. A minimal
 * borderless composer trails. The opposite of v2's bubbles. Same props,
 * token-only.
 */
export declare const ConversationPanelV3: React.ForwardRefExoticComponent<ConversationPanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ConversationPanelV3.d.ts.map
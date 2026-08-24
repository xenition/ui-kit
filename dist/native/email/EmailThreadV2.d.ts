import * as React from 'react';
import type { EmailThreadProps } from './EmailThread';
/** Same public contract as {@link EmailThread} — a drop-in alternate design. */
export type EmailThreadV2Props = EmailThreadProps;
/**
 * EmailThread — design V2. The conversation as a stack of **elevated, rounded
 * message cards** with clear gaps between them. Each card is collapsible:
 * expanded shows the body + attachments, collapsed shows sender + a one-line
 * snippet. Handles loading (spinner) and empty (no messages) states. Same props
 * as `EmailThread`. No literal colors.
 */
export declare function EmailThreadV2({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading, style, }: EmailThreadV2Props): React.ReactElement;
//# sourceMappingURL=EmailThreadV2.d.ts.map
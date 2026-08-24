import * as React from 'react';
import type { EmailThreadProps } from './EmailThread';
/** Same public contract as {@link EmailThread} — a drop-in alternate design. */
export type EmailThreadV3Props = EmailThreadProps;
/**
 * EmailThread — design V3. A **flat, quoted-style conversation**: each message
 * hangs off a colored vertical **sender rail** (like a quote block) instead of a
 * card, with no elevation — a calm, document-like read. Each message is
 * collapsible (body + attachments when open, snippet when closed). Handles
 * loading (spinner) and empty states. Same props as `EmailThread`. No literal
 * colors.
 */
export declare function EmailThreadV3({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading, style, }: EmailThreadV3Props): React.ReactElement;
//# sourceMappingURL=EmailThreadV3.d.ts.map
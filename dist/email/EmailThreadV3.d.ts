import * as React from 'react';
import type { EmailThreadProps } from './EmailThread';
/** Same public contract as {@link EmailThread} — a drop-in alternate design. */
export type EmailThreadV3Props = EmailThreadProps;
/**
 * EmailThread — design **V3**. A **flat, quoted-style conversation**: each
 * message hangs off a colored vertical **sender rail** (like a quote block)
 * instead of a card, with no elevation — a calm, document-like read. The rail
 * tint alternates primary / accent per message so adjacent replies read
 * distinctly, and dims to a neutral hairline when the message is collapsed. Each
 * message is a `role="button"` toggle (body + attachments when open, snippet when
 * closed). Handles loading and empty states. Same props as `EmailThread`. No
 * literal colors.
 */
export declare const EmailThreadV3: React.ForwardRefExoticComponent<EmailThreadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmailThreadV3.d.ts.map
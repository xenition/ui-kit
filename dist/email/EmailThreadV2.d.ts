import * as React from 'react';
import type { EmailThreadProps } from './EmailThread';
/** Same public contract as {@link EmailThread} — a drop-in alternate design. */
export type EmailThreadV2Props = EmailThreadProps;
/**
 * EmailThread — design **V2**. The conversation as a stack of **elevated, rounded
 * message cards** floating on the surface with clear gaps between them. Each card
 * header is a `role="button"` toggle: expanded shows the body + attachments over
 * a hairline divider, collapsed shows sender + a one-line snippet. Handles
 * `loading` (spinner) and empty (no messages) states. Same props as
 * `EmailThread`. No literal colors.
 */
export declare const EmailThreadV2: React.ForwardRefExoticComponent<EmailThreadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmailThreadV2.d.ts.map
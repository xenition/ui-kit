import * as React from 'react';
import type { ComposeBarProps } from './ComposeBar';
/** Same public contract as {@link ComposeBar} — a drop-in alternate design. */
export type ComposeBarV2Props = ComposeBarProps;
/**
 * ComposeBar — design V2. A **rounded pill** input carrying the attach button
 * and a growing body field, paired with a **floating circular send FAB** that
 * lifts on a shadow and press-scales on tap. Optional To/Subject fields appear
 * only when their controlled value is supplied. Send stays disabled until there
 * is a body or an attachment (and while `sending`). Same props as `ComposeBar`.
 * No literal colors.
 */
export declare function ComposeBarV2({ to, onChangeTo, subject, onChangeSubject, body, onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder, sending, disabled, style, }: ComposeBarV2Props): React.ReactElement;
//# sourceMappingURL=ComposeBarV2.d.ts.map
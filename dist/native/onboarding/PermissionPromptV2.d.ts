import * as React from 'react';
import type { PermissionPromptProps } from './PermissionPrompt';
/** Drop-in for {@link PermissionPrompt} — identical props, different design. */
export type PermissionPromptV2Props = PermissionPromptProps;
/**
 * Permission pre-prompt — V2, the editorial line. The tinted ground runs
 * full-bleed with no inset and the copy rises over it on a sheet: as a card the
 * band spans the card's full width behind the medallion; as a step screen
 * (`fullScreen`) the hero reaches the top edge and the content sheet overlaps
 * the seam.
 *
 * Like the base component it never fires an OS dialog itself — `onAllow` is the
 * host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
export declare function PermissionPromptV2({ kind, icon, title, rationale, allowLabel, denyLabel, onAllow, onDeny, state, deniedMessage, fullScreen, illustration, benefits, progress, onBack, onDismiss, grantedMessage, style, }: PermissionPromptV2Props): React.ReactElement;
//# sourceMappingURL=PermissionPromptV2.d.ts.map
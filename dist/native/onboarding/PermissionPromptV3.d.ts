import * as React from 'react';
import type { PermissionPromptProps } from './PermissionPrompt';
/** Drop-in for {@link PermissionPrompt} — identical props, different design. */
export type PermissionPromptV3Props = PermissionPromptProps;
/**
 * Permission pre-prompt — V3, the compact line. No hero panel and no medallion
 * stage: a 44pt badge sits beside a left-aligned headline, the rationale runs
 * underneath at the small step, and the benefit rows tighten to a single line
 * each. Sized for a sheet or a mid-flow nudge where a full hero would be
 * theatre.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Like the base component it never fires an OS dialog itself — `onAllow` is the
 * host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
export declare function PermissionPromptV3({ kind, icon, title, rationale, allowLabel, denyLabel, onAllow, onDeny, state, deniedMessage, fullScreen, benefits, progress, onBack, onDismiss, grantedMessage, style, }: PermissionPromptV3Props): React.ReactElement;
//# sourceMappingURL=PermissionPromptV3.d.ts.map
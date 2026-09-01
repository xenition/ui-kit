/**
 * The `email` module's own V4 vocabulary (native) — the twin of
 * `email/internal/mail-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
import type { XenitionNativeTheme } from '../../theme';
import { onPair, skeletonFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { canSendMail, useThreadExpansion } from '../../../email/thread-state-v4';
export { canSendMail, onPair, skeletonFill, toneInk, useThreadExpansion };
export type { ToneV4 };
/**
 * A mail label is **identity, not status**.
 *
 * `MailLabelTone` handed labels `'success' | 'warn' | 'danger'`, so a
 * Gmail-style "Receipts" chip rendered in the error colour and was
 * indistinguishable from a genuine failure in the same list.
 */
export declare function labelInk(theme: XenitionNativeTheme, tone: string): string;
/**
 * The selected / pressed row ground.
 *
 * Three components used `colors.border` — a hairline token — as the pressed
 * fill, and web resolved `selected` and `hover` to the *same* ramp step, so a
 * hovered row was indistinguishable from the selected one in a split-view
 * inbox. The theme ships `selected`/`onSelected` for exactly this.
 */
export declare function rowSelectedGround(theme: XenitionNativeTheme): string;
/** Build the one accessible name a mail row should carry. */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=mail-v4.d.ts.map
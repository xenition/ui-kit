import * as React from 'react';
import type { ConversationPanelProps } from './ConversationPanel';
/** Drop-in for {@link ConversationPanelProps} — same props, the V4 "console" design. */
export type ConversationPanelV4Props = ConversationPanelProps;
/**
 * ConversationPanel — **V4** "calm console" design (web parity of the native V4).
 * A quiet, legible support thread: agent replies as soft-primary bubbles aligned
 * right, customer messages as surface + hairline bubbles aligned left, system
 * notes centered, internal notes with a warn hairline — each aligned and tinted
 * by author with the role in text (never color-only). Muted timestamps, an
 * inline reply composer with a ≥44px send target, and the base's `loading` /
 * empty states. Same props/behavior as {@link ConversationPanelProps}; all colors
 * from `--xen-*` token classes (no literal hex).
 */
export declare const ConversationPanelV4: React.ForwardRefExoticComponent<ConversationPanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ConversationPanelV4.d.ts.map
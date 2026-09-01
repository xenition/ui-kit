import * as React from 'react';
import { type RefundStatus, type RefundReason } from './internal';
import type { RefundRowProps } from './RefundRow';
/** Re-exported so consumers of the V4 line can type refund reasons/status. */
export type { RefundReason, RefundStatus };
/** Drop-in for {@link RefundRowProps} — same props, the V4 "register" design. */
export type RefundRowV4Props = RefundRowProps;
/**
 * RefundRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a return line: a return glyph in a soft-tint disc, the
 * item + quantity, the reason and refund status as **glyph + word** chips (never
 * color alone), an optional restock flag, and the **refunded amount big and bold**
 * in `tabular-nums` inside a danger-tinted pill. In `selectable` mode a large
 * (≥44px) token-styled checkbox `<button>` (reflected in `aria-checked`) lets a
 * clerk pick lines to refund; when `onClick` is set the row is a keyboard-operable
 * `role="button"`. Same props/behavior as {@link RefundRowProps}; all colors from
 * `--xen-*` token classes (no literals). Dark-mode safe.
 */
export declare const RefundRowV4: React.ForwardRefExoticComponent<RefundRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RefundRowV4.d.ts.map
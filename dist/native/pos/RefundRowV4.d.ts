import * as React from 'react';
import { type RefundStatus, type RefundReason } from './internal';
import type { RefundRowProps } from './RefundRow';
/** Re-exported so consumers of the V4 line can type refund reasons/status. */
export type { RefundReason, RefundStatus };
/** Drop-in for {@link RefundRowProps} — same props, the V4 "register" design. */
export type RefundRowV4Props = RefundRowProps;
/**
 * RefundRow — **V4** "register" design. The tactile checkout take on a return
 * line: a return glyph in a soft-tint disc, the item + quantity, the reason and
 * refund status as **glyph + word** chips (never color alone), an optional restock
 * flag, and the **refunded amount big and bold** in `tabular-nums` inside a
 * danger-tinted pill. In `selectable` mode a large (≥44px) token-styled checkbox
 * (reflected in `accessibilityState.checked`) lets a clerk pick lines to refund.
 * Same props/behavior as {@link RefundRowProps}; token-only tints via
 * `useXenitionTheme()` + `withAlpha`. Dark-mode safe.
 */
export declare function RefundRowV4({ name, quantity, amountCents, currency, reason, status, restock, variant, selected, onToggle, onPress, testID, style, }: RefundRowV4Props): React.ReactElement;
//# sourceMappingURL=RefundRowV4.d.ts.map
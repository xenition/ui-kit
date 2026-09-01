import * as React from 'react';
import type { ModifierListProps } from './ModifierList';
export interface ModifierListV4Props extends ModifierListProps {
    /** The word marking the group required. Default `'Required'`. */
    requiredLabel?: string;
}
/**
 * **V4 modifier list** — same props as {@link ModifierList} plus
 * `requiredLabel`.
 *
 * ## Five changes
 *
 * 1. **A paid extra is no longer added in silence.** Each row was a
 *    `checkbox` / `radio` carrying `accessibilityLabel={option.label}`, and
 *    both roles are children-presentational — so "Extra cheese" was announced
 *    and "+$1.50" was not. The price delta is part of the row's one name now.
 * 2. **`required` reaches assistive tech.** It was a red word beside the
 *    heading and nothing else; it is folded into the group's name, the way
 *    `LabelV4` folds it into a field's.
 * 3. **A row clears 44.** The rows were roughly 38 tall, on a control a thumb
 *    hits repeatedly while building an order.
 * 4. **Disabled means the handler does not fire**, and it is drawn at M3's
 *    0.38 band rather than a hand-picked 0.5 — and press is a state layer, so
 *    a pressed row no longer reads as an unavailable one.
 * 5. **The empty case is a real empty state**, not a lone grey line.
 */
export declare function ModifierListV4({ options, mode, title, required, requiredLabel, onToggle, currency, emptyLabel, formatMoney, style, }: ModifierListV4Props): React.ReactElement;
//# sourceMappingURL=ModifierListV4.d.ts.map
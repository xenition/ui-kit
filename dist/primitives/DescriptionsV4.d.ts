import * as React from 'react';
import type { DescriptionItem, DescriptionsProps } from './Descriptions';
export type { DescriptionsProps as DescriptionsV4Props, DescriptionItem };
/**
 * **V4 descriptions** — the web twin of the native `DescriptionsV4`, same
 * props as {@link Descriptions}, a different design line.
 *
 * The base grid gets the ranking backwards. The `<dt>` is `uppercase
 * tracking-wide`; the `<dd>` — the thing the reader opened the record for — is
 * a plain `text-sm`. So the caption shouts and the answer whispers, and a
 * detail view full of that is slower to scan than the same facts in plain
 * type.
 *
 * Three changes:
 *
 * 1. **The value is the content.** It steps to `text-base` semibold in
 *    `text-on-surface`. The label stays `text-xs` and muted, so a record reads
 *    as a column of answers with quiet captions — which is what a spec sheet
 *    is.
 * 2. **The label stops shouting.** No `uppercase`, no `tracking-wide`.
 *    All-caps costs word-shape, which is most of what makes a short label
 *    recognisable at a glance (§33), and micro-labels styled up into
 *    decoration are one of the tells §8 lists. `text-xs text-muted-text` already
 *    says "caption"; the transform was saying it twice.
 * 3. **The gap between pairs grows.** `gap-y-3` becomes the `lg` step, well
 *    clear of the hairline gap inside a pair, because the gap is what groups a
 *    label with its value (§9).
 *
 * A value that reads as a quantity is set in tabular figures. Three prices
 * stacked in a record still line up on the decimal, which costs nothing and is
 * the difference between comparing them and re-reading them.
 *
 * **No container, at any density.** A detail view is exactly where the reflex
 * to put every field in its own card takes hold; §11 asks what the container
 * would be for, and the answer here is nothing.
 */
export declare function DescriptionsV4({ items, columns, className, }: DescriptionsProps): React.ReactElement;
//# sourceMappingURL=DescriptionsV4.d.ts.map
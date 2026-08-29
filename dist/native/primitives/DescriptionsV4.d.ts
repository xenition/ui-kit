import * as React from 'react';
import type { DescriptionItem, DescriptionsProps } from './Descriptions';
export type { DescriptionsProps as DescriptionsV4Props, DescriptionItem };
/**
 * **V4 descriptions** — same props as {@link Descriptions}, a different design
 * line.
 *
 * The base grid gets the ranking backwards. The label is set in uppercase with
 * extra letter-spacing; the value — the thing the reader opened the record
 * for — is a plain `sm`. So the caption shouts and the answer whispers, and a
 * detail view full of that is slower to scan than the same facts in plain
 * type.
 *
 * Three changes:
 *
 * 1. **The value is the content.** It steps to `base` at weight 600 in
 *    `onSurface`. The label stays `xs` and muted, so a record reads as a
 *    column of answers with quiet captions — which is what a spec sheet is.
 * 2. **The label stops shouting.** No uppercase, no tracking. All-caps costs
 *    word-shape, which is most of what makes a short label recognisable at a
 *    glance (§33 — recognition), and micro-labels styled up into decoration
 *    are one of the tells §8 lists. `xs` and `muted` already say "this is a
 *    caption"; the transform was saying it twice.
 * 3. **Two columns tile honestly.** The base gave every item `width: '45%'`
 *    with `flexGrow` — a number that neither fills a row nor survives a narrow
 *    phone. V4 uses a `40%` flex-basis that grows: two per row when there is
 *    room, one when there is not, and no ragged remainder either way.
 *
 * A value that reads as a quantity is set in tabular figures. Three prices
 * stacked in a record still line up on the decimal, which costs nothing and is
 * the difference between comparing them and re-reading them.
 *
 * **No container, at any density.** A detail view is exactly where the reflex
 * to put every field in its own card takes hold; §11 asks what the container
 * would be for, and the answer here is nothing — the pairs are already grouped
 * by the gap between them being eight times the gap inside them (§9).
 */
export declare function DescriptionsV4({ items, columns, style, }: DescriptionsProps): React.ReactElement;
//# sourceMappingURL=DescriptionsV4.d.ts.map
import * as React from 'react';
import type { WordmarkProps, WordmarkSize } from './Wordmark';
export type { WordmarkProps as WordmarkV4Props, WordmarkSize };
/**
 * **V4 wordmark** — same props as {@link Wordmark}, a different design line.
 *
 * The wordmark is the one string in a product that has to be recognised rather
 * than read, which makes it the place where a kit's restraint shows first.
 *
 * 1. **The mark is a monogram, not a blank swatch.** The base drew a solid
 *    brand-coloured rounded square — "an icon inside a coloured rounded square"
 *    is the fourth entry on §8's list of generic-AI-UI tells, and this one did
 *    not even have the icon. V4 sets the brand's own initial in it, in the
 *    heading face on the guaranteed `onPrimary` pair, so the placeholder reads
 *    as a logo instead of as a missing one. A caller with real artwork still
 *    passes `mark`; `mark={null}` still renders the name alone.
 * 2. **The heading face, on both twins.** The base explicitly set no
 *    `fontFamily` on native "because native conveys the heading font via
 *    weight" — so the brand name rendered in the seed's display face on the web
 *    and in the system font on a phone. Of every string in a product, this is
 *    the one that cannot be in the wrong typeface.
 * 3. **The scales own the sizes.** `16 / 18 / 24` and `16 / 20 / 28` were
 *    literals that happened to match the web's Tailwind classes. They now come
 *    from `typography.scale` and `spacing`, so a seed with a different rhythm
 *    moves the wordmark with it — and the two twins cannot drift apart, because
 *    they are reading the same numbers.
 * 4. **A tappable wordmark is a real target.** `onPress` made a row roughly
 *    20px tall pressable. The header brand is a navigation control; it gets the
 *    44px a finger needs, through hit slop rather than by inflating the mark.
 *
 * No gradient and no shadow. The brand mark is exactly where a lazy kit puts a
 * sweep, and §35.11 keeps those for the hero and the one primary action — a
 * logo that shimmers is a logo competing with the page it sits on.
 */
export declare function WordmarkV4({ name, mark, size, onPress, style, }: WordmarkProps): React.ReactElement;
//# sourceMappingURL=WordmarkV4.d.ts.map
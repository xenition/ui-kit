import * as React from 'react';
import type { WordmarkProps, WordmarkSize } from './Wordmark';
export type { WordmarkProps as WordmarkV4Props, WordmarkSize };
/**
 * **V4 wordmark** — the web twin of the native `WordmarkV4`, same props as
 * {@link Wordmark}, a different design line.
 *
 * The wordmark is the one string in a product that has to be recognised rather
 * than read, which makes it the place where a kit's restraint shows first.
 *
 * 1. **The mark is a monogram, not a blank swatch.** The base drew a solid
 *    `bg-primary` rounded square — "an icon inside a coloured rounded square"
 *    is the fourth entry on §8's list of generic-AI-UI tells, and this one did
 *    not even have the icon. V4 sets the brand's own initial in it, in the
 *    heading face on the guaranteed `on-primary` pair, so the placeholder
 *    reads as a logo instead of as a missing one. A caller with real artwork
 *    still passes `mark`; `mark={null}` still renders the name alone.
 * 2. **The scales own the sizes.** `h-4 / h-5 / h-7` is Tailwind's rhythm, not
 *    the seed's; the mark now comes from `spacing`, so a seed with a different
 *    rhythm moves the wordmark with it — and the two twins cannot drift apart,
 *    because they are reading the same numbers.
 * 3. **A linked wordmark is a real target.** `as="a"` produced a hit area as
 *    tall as the type — about 20px at `sm`. The header brand is a navigation
 *    control: it gets the 44px a finger needs, laid over the row rather than
 *    inflating the mark, plus the focus ring a keyboard user needs to see that
 *    it is reachable at all.
 *
 * No gradient and no shadow. The brand mark is exactly where a lazy kit puts a
 * sweep, and §35.11 keeps those for the hero and the one primary action — a
 * logo that shimmers is a logo competing with the page it sits on.
 */
export declare const WordmarkV4: React.ForwardRefExoticComponent<WordmarkProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=WordmarkV4.d.ts.map
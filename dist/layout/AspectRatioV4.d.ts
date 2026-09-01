import * as React from 'react';
/**
 * The corner steps a framed panel may take. `full` is deliberately absent — a
 * pill-shaped media frame is not a shape this product has, and `radius.full`
 * on a 16:9 box reads as a mistake rather than a decision.
 */
export type AspectRatioRadius = 'sm' | 'md' | 'lg';
export interface AspectRatioV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Width-to-height ratio, e.g. `16 / 9` or `1`. */
    ratio: number;
    /**
     * Clip children to a token corner radius. `true` keeps the base's `lg` —
     * the card radius (§4.2) — so a hero panel matches the cards around it;
     * `'sm'` / `'md'` are for a thumbnail, which at 44–64px wears `lg` like a
     * circle.
     */
    rounded?: boolean | AspectRatioRadius;
}
/**
 * **V4 aspect ratio** — the web twin of the native `AspectRatioV4`, the base's
 * props with a widened `rounded`.
 *
 * §5 calls this one "structure only, no visual change": both twins were
 * already token-pure, so nothing here moves a colour, a spacing or a default.
 *
 * ## What V4 changes
 *
 * **`rounded` is a step, not a switch.** The base hardcoded `radius.lg` behind
 * a boolean, so a 320px hero panel and a 44px thumbnail were forced to the
 * same corner — and on a thumbnail `lg` is most of the box. `rounded` now
 * takes `'sm' | 'md' | 'lg'` as well, with `true` still meaning `lg`, so the
 * default rendering is untouched (§1.4) and the caller can size the corner to
 * the frame.
 *
 * ## What it deliberately does not do
 *
 * **No shadow.** §4.6 gives a shadow to a card, a sheet and the one dominant
 * action. A ratio box is a frame around media — usually media already inside a
 * card, and §4.6 forbids nesting a shadow in a shadow. A caller that wants the
 * card treatment composes `CardV4` around this.
 *
 * **An empty frame still draws.** §4.5 says a component with nothing to show
 * renders nothing rather than a blank bordered box — but this component's
 * entire job is *reserving* the space before the media arrives, and it paints
 * no border and no ground to leave behind. Rendering `null` when the image has
 * not loaded would collapse the layout and reflow the page around it, which is
 * the defect the ratio box exists to prevent. So the empty case keeps its
 * geometry and stays invisible.
 *
 * `ratio` is the one bare number here, and it is geometric — a layout constant
 * the caller owns, not a design value (§1.1).
 */
export declare const AspectRatioV4: React.ForwardRefExoticComponent<AspectRatioV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AspectRatioV4.d.ts.map
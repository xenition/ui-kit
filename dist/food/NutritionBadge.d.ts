import * as React from 'react';
import { type BadgeTone } from '../primitives/Badge';
/** Well-known dietary / dish attributes with a default glyph + tone. */
export type NutritionKind = 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy' | 'halal' | 'popular' | 'new' | 'calories';
export interface NutritionBadgeProps {
    /** Attribute to render; sets the default glyph, label, and tone. */
    kind: NutritionKind;
    /** Override the label text (e.g. "420 cal" for `calories`). */
    label?: string;
    /** Override the semantic tone. */
    tone?: BadgeTone;
    /** Hide the leading glyph. */
    hideGlyph?: boolean;
    /** Extra classes forwarded to the underlying `Badge`. */
    className?: string;
}
/**
 * A small dietary / nutrition tag — a `Badge` preset for common dish
 * attributes (vegetarian, vegan, spicy, halal, popular, …). Each `kind` maps
 * to a default label, glyph, and semantic tone, all overridable. Because the
 * badge carries a glyph *and* a text label, the attribute never relies on color
 * alone. The web `Badge` sets the on-tone text color via its tone class, so the
 * label just inherits it. Web parity of the native `NutritionBadge`; token-only.
 */
export declare const NutritionBadge: React.ForwardRefExoticComponent<NutritionBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=NutritionBadge.d.ts.map
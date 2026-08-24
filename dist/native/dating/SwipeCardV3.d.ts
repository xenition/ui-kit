import * as React from 'react';
import type { SwipeCardProps } from './SwipeCard';
/** Drop-in alternate design — identical props to `SwipeCard`. */
export type SwipeCardV3Props = SwipeCardProps;
/**
 * SwipeCard — design variant **V3**, a **framed card with a caption strip**.
 * Unlike the full-bleed V1/V2, the photo is inset inside a padded surface frame
 * (a tasteful, editorial "polaroid"), and the name/age/tagline/distance live in
 * a **solid caption strip below the image** rather than overlaid on it. The
 * decision stamp still floats over the photo. Same `SwipeCardProps`; token-pure;
 * a token placeholder covers missing photos.
 */
export declare function SwipeCardV3({ profile, variant, overlay, overlayOpacity, aspectRatio, style, }: SwipeCardV3Props): React.ReactElement;
//# sourceMappingURL=SwipeCardV3.d.ts.map
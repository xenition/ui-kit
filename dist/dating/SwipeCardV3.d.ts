import * as React from 'react';
import type { SwipeCardProps } from './SwipeCard';
/** Drop-in alternate design — identical props to `SwipeCard`. */
export type SwipeCardV3Props = SwipeCardProps;
/**
 * SwipeCard — design variant **V3**, a **framed card with a caption strip** (web
 * parity of the native V3). Unlike the full-bleed base/V2, the photo is inset
 * inside a padded surface frame (a tasteful, editorial "polaroid"), and the
 * name/age/tagline/distance live in a **solid caption strip below the image**
 * rather than overlaid on it. The decision stamp still floats over the photo. Same
 * `SwipeCardProps`; token classes only; a placeholder covers missing photos.
 */
export declare const SwipeCardV3: React.ForwardRefExoticComponent<SwipeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwipeCardV3.d.ts.map
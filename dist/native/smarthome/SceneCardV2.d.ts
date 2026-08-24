import * as React from 'react';
import type { SceneCardProps } from './SceneCard';
/** Alternate design (V2) — identical prop contract to {@link SceneCardProps}. */
export type SceneCardV2Props = SceneCardProps;
/**
 * SceneCard — alternate design **V2**: a full-bleed tinted scene card with a big
 * background glyph. The whole surface is washed in a primary tint (via
 * `withAlpha`, never a literal), an oversized watermark glyph sits behind the
 * text, and the name + description + device count stack over it; the active
 * state raises the card, strengthens the tint/border, and shows an "Active"
 * {@link Badge} so running state is labeled, not color-only. Drop-in replacement
 * for `SceneCard` — same props. `deviceCount` is rendered defensively.
 */
export declare function SceneCardV2({ name, icon, description, deviceCount, active, onActivate, style, }: SceneCardV2Props): React.ReactElement;
//# sourceMappingURL=SceneCardV2.d.ts.map
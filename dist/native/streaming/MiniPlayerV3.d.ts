import * as React from 'react';
import type { MiniPlayerProps } from './MiniPlayer';
/** Drop-in for {@link MiniPlayerProps} — a genuinely different design, same props. */
export type MiniPlayerV3Props = MiniPlayerProps;
/**
 * **MiniPlayer — design V3 (flat dock).** A square-cornered, shadowless bar
 * that reads as part of the chrome: a single hairline divider on top, a
 * square-cropped thumbnail, text, transport, and a full-bleed progress line
 * pinned to the very bottom edge. The play control's accessible label reflects
 * `state`. Same `MiniPlayerProps`; token-pure; a11y-complete.
 */
export declare function MiniPlayerV3({ track, state, progress, onPlayToggle, onNext, onPress, style, }: MiniPlayerV3Props): React.ReactElement;
//# sourceMappingURL=MiniPlayerV3.d.ts.map
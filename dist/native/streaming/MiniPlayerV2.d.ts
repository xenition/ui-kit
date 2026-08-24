import * as React from 'react';
import type { MiniPlayerProps } from './MiniPlayer';
/** Drop-in for {@link MiniPlayerProps} — a genuinely different design, same props. */
export type MiniPlayerV2Props = MiniPlayerProps;
/**
 * **MiniPlayer — design V2 (floating pill).** A rounded, heavily-elevated bar
 * that hovers above content, with a rounded top progress line tucked inside the
 * radius and a subtle press-scale on the whole surface. The play control's
 * accessible label reflects `state`. Same `MiniPlayerProps`; token-pure;
 * a11y-complete.
 */
export declare function MiniPlayerV2({ track, state, progress, onPlayToggle, onNext, onPress, style, }: MiniPlayerV2Props): React.ReactElement;
//# sourceMappingURL=MiniPlayerV2.d.ts.map
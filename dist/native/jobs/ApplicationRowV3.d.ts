import * as React from 'react';
import type { ApplicationRowProps } from './ApplicationRow';
/** Drop-in alternate: identical props to {@link ApplicationRowProps}. */
export type ApplicationRowV3Props = ApplicationRowProps;
/**
 * ApplicationRow — design V3. A dense single line: a colored status dot, the
 * job title, then the stage word and applied age trailing. The stage is carried
 * by the WORD (and a ✕ glyph on rejection), never the dot color alone, and the
 * full context lives in the accessible label. Same props as
 * {@link ApplicationRowProps} (drop-in). Token-pure.
 */
export declare function ApplicationRowV3({ application, onPress, accessory, style, }: ApplicationRowV3Props): React.ReactElement;
//# sourceMappingURL=ApplicationRowV3.d.ts.map
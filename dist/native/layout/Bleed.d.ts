import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export interface BleedProps extends ViewProps {
    /** Uniform negative margin on all sides, from the spacing scale. Defaults to `md`. */
    space?: SpaceKey;
    /** Bleed only horizontally. */
    horizontal?: SpaceKey;
    /** Bleed only vertically. */
    vertical?: SpaceKey;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * The inverse of `Inset`: applies token-bound *negative* margins so content can
 * break out of a padded parent (full-bleed images, edge-to-edge rows). Margins
 * trace to the compiled spacing scale; no literal colors.
 */
export declare function Bleed({ space, horizontal, vertical, style, children, ...rest }: BleedProps): React.ReactElement;
//# sourceMappingURL=Bleed.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export interface SectionProps extends ViewProps {
    title?: string;
    subtitle?: string;
    /** Vertical gap between the header and the content, from the spacing scale. */
    spacing?: SpaceKey;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * A titled content block: an optional `title`/`subtitle` header followed by its
 * children, separated by a token-bound `spacing` gap. Type sizes, colors, and
 * spacing all trace to the compiled theme; no literal colors.
 */
export declare function Section({ title, subtitle, spacing, style, children, ...rest }: SectionProps): React.ReactElement;
//# sourceMappingURL=Section.d.ts.map
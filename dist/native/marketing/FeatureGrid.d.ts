import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FeatureItem {
    /** Icon slot rendered in a tinted square (string is auto-colored). */
    icon?: React.ReactNode;
    title: string;
    /** Body copy under the title. */
    description?: string;
}
export interface FeatureGridProps {
    /** The features to render (mirrors the web `FeatureCard` children). */
    features: FeatureItem[];
    /** Max columns; native wraps into rows of this width (default 2 for phones). */
    columns?: 2 | 3 | 4;
    style?: StyleProp<ViewStyle>;
}
/**
 * Responsive grid of feature cards — the native mirror of the web `FeatureGrid`
 * + `FeatureCard`. The web version composes children; native takes a `features`
 * data array (idiomatic for RN lists). Cards wrap via flex `basis` rather than
 * CSS grid breakpoints, and the web hover-lift is dropped (no hover on touch).
 * Token-only.
 */
export declare function FeatureGrid({ features, columns, style, }: FeatureGridProps): React.ReactElement;
//# sourceMappingURL=FeatureGrid.d.ts.map
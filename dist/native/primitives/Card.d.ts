import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
export type CardVariant = 'elevated' | 'outlined' | 'flat' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'sm' | 'md' | 'lg' | 'full';
export interface CardProps extends ViewProps {
    /**
     * Surface treatment. Defaults to the historical bordered surface
     * (`outlined`). `elevated` adds a token shadow, `flat` drops the border,
     * `interactive` keeps the border plus a subtle raise for tappable cards.
     */
    variant?: CardVariant;
    /** Padding scale. Defaults to the historical `lg` padding. */
    padding?: CardPadding;
    /** Corner radius scale. Defaults to the historical `lg` radius. */
    radius?: CardRadius;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Themed surface container — the native mirror of the web `Card`: token-bound
 * background, border, radius, and padding. The default (`outlined`, `lg`
 * padding, `lg` radius) renders exactly as before; `variant`/`padding`/`radius`
 * are additive opt-ins. No literal colors.
 */
export declare function Card({ variant, padding, radius, style, children, ...rest }: CardProps): React.ReactElement;
//# sourceMappingURL=Card.d.ts.map
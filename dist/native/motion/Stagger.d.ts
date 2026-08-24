import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface StaggerConfig {
    /** Delay increment between consecutive children, in ms. */
    interval: number;
    /** Base delay added to every child, in ms. */
    delay: number;
}
/** Provided by `Stagger`; consumed by `Reveal` to offset its mount delay. */
export declare const StaggerConfigContext: React.Context<StaggerConfig | null>;
/** Position of a child inside the nearest `Stagger`. */
export declare const StaggerIndexContext: React.Context<number>;
export interface StaggerProps {
    /** Delay increment between consecutive children, in ms. */
    interval?: number;
    /** Base delay added to every child, in ms. */
    delay?: number;
    children?: React.ReactNode;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * Sequences child `Reveal` mount delays so lists cascade in — the native mirror
 * of the web `Stagger`. Each child gets `delay + index * interval` added to its
 * own `Reveal` delay via context. Non-`Reveal` children still advance the index,
 * keeping visual order stable when items are mixed. Under reduced motion the
 * child `Reveal`s render immediately, so the cascade simply collapses.
 */
export declare function Stagger({ interval, delay, children, style, }: StaggerProps): React.ReactElement;
//# sourceMappingURL=Stagger.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface BadgeProps {
    tone?: BadgeTone;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Small status/label pill — the native mirror of the web `Badge`. Token-bound
 * background/foreground per tone; for statuses, tags, counts. No literal colors.
 */
export declare function Badge({ tone, style, children }: BadgeProps): React.ReactElement;
//# sourceMappingURL=Badge.d.ts.map
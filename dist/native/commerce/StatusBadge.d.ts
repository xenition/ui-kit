import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled' | 'refunded';
export interface StatusBadgeProps {
    /** Order lifecycle status; drives the semantic contrast pair. */
    status: OrderStatus;
    /** Human label (default: the capitalized status). */
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/** Small pill badge for an order's status. Token-only, contrast-guaranteed. */
export declare function StatusBadge({ status, children, style, }: StatusBadgeProps): React.ReactElement;
//# sourceMappingURL=StatusBadge.d.ts.map
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface EmptyStateProps {
    /** Optional decorative icon/illustration slot. */
    icon?: React.ReactNode;
    /** Headline (e.g. "Your cart is empty"). */
    title: React.ReactNode;
    /** Supporting line under the title. */
    description?: React.ReactNode;
    /** Primary action slot (e.g. a "Browse products" button). */
    action?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Generic empty / no-results state — the native mirror of the web
 * `EmptyState`. Centered icon slot, muted copy, optional action. Token-only
 * (dashed `border`, `surface` background, `muted` text). Domain-agnostic.
 */
export declare function EmptyState({ icon, title, description, action, style, }: EmptyStateProps): React.ReactElement;
//# sourceMappingURL=EmptyState.d.ts.map
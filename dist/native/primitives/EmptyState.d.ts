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
 * (dashed `border`, `surface` background, `muted` text). Domain-agnostic: an
 * empty cart, an unmatched filter, a feed with nothing in it yet. It lives in
 * `primitives` because nearly every screen in the kit reaches for it, and
 * because a prop is only confirmable against `dist/native/<module>/<Name>.d.ts`
 * when the component actually has a file in the module it is exported from.
 * `commerce` re-exports it so the older import path keeps working.
 */
export declare function EmptyState({ icon, title, description, action, style, }: EmptyStateProps): React.ReactElement;
//# sourceMappingURL=EmptyState.d.ts.map
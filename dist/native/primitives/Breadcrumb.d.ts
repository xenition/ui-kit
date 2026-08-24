import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface BreadcrumbItem {
    label: React.ReactNode;
    onPress?: () => void;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Breadcrumb trail — the native mirror of the web `Breadcrumb` (`onClick`→
 * `onPress`; there is no `href` on native). The last item is the current page.
 * Token-bound muted links, separators, and current label. No literal colors.
 */
export declare function Breadcrumb({ items, separator, style }: BreadcrumbProps): React.ReactElement;
//# sourceMappingURL=Breadcrumb.d.ts.map
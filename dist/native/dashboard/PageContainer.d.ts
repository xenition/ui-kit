import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface PageContainerProps {
    /** Optional page title rendered at the top. */
    title?: string;
    /** Optional subtitle under the title. */
    subtitle?: string;
    /** Trailing header slot next to the title (e.g. a primary action). */
    headerAction?: React.ReactNode;
    /** Set false to disable scrolling (static page). */
    scroll?: boolean;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    /** Extra padding at the bottom of the scroll content (for tab bars, etc). */
    bottomInset?: number;
}
/**
 * The outer wrapper for a screen: fills with the `surface` token, applies
 * consistent padding, and (by default) scrolls its content. Renders an optional
 * title/subtitle header with a trailing action. Token-only.
 */
export declare function PageContainer({ title, subtitle, headerAction, scroll, children, style, bottomInset, }: PageContainerProps): React.ReactElement;
//# sourceMappingURL=PageContainer.d.ts.map
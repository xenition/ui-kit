import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AuthCardProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    /** Wrapper style override — the native mirror of the web `className`. */
    style?: StyleProp<ViewStyle>;
}
/**
 * Centered card shell for auth screens (LoginForm/SignupForm/…) — the native
 * mirror of the web `AuthCard`. A themed `Card` holding an optional title +
 * subtitle, the form `children`, and an optional footer. Token-bound; no
 * literal colors. (`className` → `style` is the only idiomatic swap.)
 */
export declare function AuthCard({ title, subtitle, children, footer, style, }: AuthCardProps): React.ReactElement;
//# sourceMappingURL=AuthCard.d.ts.map
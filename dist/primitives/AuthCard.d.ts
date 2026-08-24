import * as React from 'react';
export interface AuthCardProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}
/** Centered card shell for auth screens (LoginForm/SignupForm/…). Bound to the theme tokens. */
export declare function AuthCard({ title, subtitle, children, footer, className }: AuthCardProps): React.ReactElement;
//# sourceMappingURL=AuthCard.d.ts.map
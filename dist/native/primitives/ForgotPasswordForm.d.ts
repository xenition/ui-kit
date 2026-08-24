import * as React from 'react';
export interface ForgotPasswordFormProps {
    /** Called with the email. Throw to surface an error; resolve to show the sent state. */
    onSubmit: (email: string) => void | Promise<void>;
    onLoginClick?: () => void;
    title?: React.ReactNode;
}
/**
 * Drop-in "reset password" request form — the native mirror of the web
 * `ForgotPasswordForm`. Composed, themed, with a sent confirmation state. Wire
 * `onSubmit` to `@xenition/sdk` auth. No literal colors.
 */
export declare function ForgotPasswordForm({ onSubmit, onLoginClick, title, }: ForgotPasswordFormProps): React.ReactElement;
//# sourceMappingURL=ForgotPasswordForm.d.ts.map
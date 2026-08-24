import * as React from 'react';
export interface LoginValues {
    email: string;
    password: string;
}
export interface LoginFormProps {
    /** Called with the credentials. Throw to surface an error message in the form. */
    onSubmit: (values: LoginValues) => void | Promise<void>;
    onForgotPassword?: () => void;
    onSignupClick?: () => void;
    title?: React.ReactNode;
}
/**
 * Drop-in email/password sign-in form — composed from the kit, themed, with
 * validation, loading and error states. SDK-agnostic: wire `onSubmit` to
 * `@xenition/sdk` auth (or anything). Just `<LoginForm onSubmit={…} />`.
 */
export declare function LoginForm({ onSubmit, onForgotPassword, onSignupClick, title, }: LoginFormProps): React.ReactElement;
//# sourceMappingURL=LoginForm.d.ts.map
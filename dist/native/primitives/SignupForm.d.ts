import * as React from 'react';
export interface SignupValues {
    name: string;
    email: string;
    password: string;
}
export interface SignupFormProps {
    /** Called with the new-account values. Throw to surface an error message. */
    onSubmit: (values: SignupValues) => void | Promise<void>;
    onLoginClick?: () => void;
    title?: React.ReactNode;
    /** Minimum password length (default 8). */
    minPasswordLength?: number;
}
/**
 * Drop-in sign-up form — the native mirror of the web `SignupForm`. Composed,
 * themed, validated. Wire `onSubmit` to `@xenition/sdk` auth. No literal colors.
 */
export declare function SignupForm({ onSubmit, onLoginClick, title, minPasswordLength, }: SignupFormProps): React.ReactElement;
//# sourceMappingURL=SignupForm.d.ts.map
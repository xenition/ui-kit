import * as React from 'react';
export interface NewsletterSignupProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    /** Section heading. */
    heading?: React.ReactNode;
    /** Supporting copy under the heading. */
    subtext?: React.ReactNode;
    /**
     * SDK-agnostic submit handler — receives the validated email and may be
     * async. Throw (or reject) to surface the error state.
     */
    onSubmit: (email: string) => void | Promise<void>;
    /** Input placeholder. */
    placeholder?: string;
    /** Submit button label. */
    buttonLabel?: React.ReactNode;
    /** Message shown after a successful submit. */
    successMessage?: React.ReactNode;
    /** Message shown when the email fails validation. */
    invalidMessage?: string;
    /** Fallback message shown when `onSubmit` throws without a message. */
    errorMessage?: string;
}
/**
 * Email-capture block: heading, subtext, validated email input, submit button,
 * and success/error states. The endpoint lives entirely in the caller's async
 * `onSubmit(email)` handler — never hardcoded here.
 */
export declare const NewsletterSignup: React.ForwardRefExoticComponent<NewsletterSignupProps & React.RefAttributes<HTMLFormElement>>;
//# sourceMappingURL=NewsletterSignup.d.ts.map
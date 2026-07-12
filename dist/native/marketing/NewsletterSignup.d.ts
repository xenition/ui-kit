import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface NewsletterSignupProps {
    /** Section heading. */
    heading?: string;
    /** Supporting copy under the heading. */
    subtext?: string;
    /**
     * SDK-agnostic submit handler — receives the validated email and may be
     * async. Throw (or reject) to surface the error state.
     */
    onSubmit: (email: string) => void | Promise<void>;
    /** Input placeholder. */
    placeholder?: string;
    /** Submit button label. */
    buttonLabel?: string;
    /** Message shown after a successful submit. */
    successMessage?: string;
    /** Message shown when the email fails validation. */
    invalidMessage?: string;
    /** Fallback message shown when `onSubmit` throws without a message. */
    errorMessage?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Email-capture block — the native mirror of the web `NewsletterSignup`:
 * heading, subtext, a validated email `Input`, a submit `Button`, and
 * success/error states. The web `<form onSubmit>` becomes an explicit submit
 * handler on the button; the endpoint lives entirely in the caller's async
 * `onSubmit(email)`. Composes the native `Input`/`Button` primitives. Token-only.
 */
export declare function NewsletterSignup({ heading, subtext, onSubmit, placeholder, buttonLabel, successMessage, invalidMessage, errorMessage, style, }: NewsletterSignupProps): React.ReactElement;
//# sourceMappingURL=NewsletterSignup.d.ts.map
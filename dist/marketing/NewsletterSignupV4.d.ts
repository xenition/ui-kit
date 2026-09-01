import * as React from 'react';
import type { NewsletterSignupProps } from './NewsletterSignup';
/** Drop-in for {@link NewsletterSignupProps} — same props, the V4 "showcase" design. */
export type NewsletterSignupV4Props = NewsletterSignupProps;
/**
 * NewsletterSignup — **V4** "showcase" design (web parity of the native V4). The
 * bold conversion moment: a vibrant primary→accent brand-gradient ground
 * carrying an extra-bold near-white heading, a soft supporting line, and a
 * **frosted** email input + submit button (translucent `primary-50` tiles) that
 * read cleanly on the saturated surface. Validation, the async `onSubmit(email)`
 * contract, and the success/error states are preserved exactly from the base;
 * only the skin changes. Same props/behavior as {@link NewsletterSignupProps};
 * every color is a `--xen-*` token (`from-primary-500`, `to-accent-500`,
 * `text-primary-50`) — no literals.
 */
export declare const NewsletterSignupV4: React.ForwardRefExoticComponent<NewsletterSignupProps & React.RefAttributes<HTMLFormElement>>;
//# sourceMappingURL=NewsletterSignupV4.d.ts.map
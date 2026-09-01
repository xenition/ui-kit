import * as React from 'react';
import type { NewsletterSignupProps } from './NewsletterSignup';
/** Drop-in for {@link NewsletterSignupProps} — same props, the V4 "showcase" design. */
export type NewsletterSignupV4Props = NewsletterSignupProps;
/**
 * NewsletterSignup — **V4** "showcase" design (native mirror of the web V4). The
 * bold conversion moment: a vibrant primary→accent brand-gradient ground (via
 * the shared `expo-linear-gradient` wrapper) carrying an extra-bold near-white
 * heading, a soft supporting line, and a **frosted** email `Input` + submit
 * `Button` seated on translucent `primary-50` tiles. Validation, the async
 * `onSubmit(email)` contract, and the success/error states are preserved
 * exactly from the base; only the skin changes. Same props/behavior as
 * {@link NewsletterSignupProps}; token-only colors via `useXenitionTheme()`
 * (`tokens.ramps.primary`/`accent` ground, near-white ink), dark-mode safe.
 */
export declare function NewsletterSignupV4({ heading, subtext, onSubmit, placeholder, buttonLabel, successMessage, invalidMessage, errorMessage, style, }: NewsletterSignupV4Props): React.ReactElement;
//# sourceMappingURL=NewsletterSignupV4.d.ts.map
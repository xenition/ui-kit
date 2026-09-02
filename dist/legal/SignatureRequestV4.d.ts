import * as React from 'react';
import type { SignatureRequestProps } from './SignatureRequest';
/** Drop-in for {@link SignatureRequestProps} — same props, the V4 "chambers" design. */
export type SignatureRequestV4Props = SignatureRequestProps;
/**
 * SignatureRequest — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on an e-signature request: an elevated rounded
 * card with a soft shadow, a signature glyph + document title, a sent / due meta
 * line, a labelled glyph + word lifecycle pill (never color alone), and the
 * signer (avatar + role) in a soft-primary well. A `draft` shows a "Request
 * signature" button; an in-flight request (`sent` / `viewed`) shows "Sign" /
 * "Remind"; terminal states hide actions. When `onClick` is set the card is a
 * keyboard-activable `role="button"`. Reuses the base `variant`
 * (`default` / `compact`). All colors from `--xen-*` token classes (no literals).
 */
export declare const SignatureRequestV4: React.ForwardRefExoticComponent<SignatureRequestProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SignatureRequestV4.d.ts.map
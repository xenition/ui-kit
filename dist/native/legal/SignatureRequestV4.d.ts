import * as React from 'react';
import type { SignatureRequestProps } from './SignatureRequest';
/** Drop-in for {@link SignatureRequestProps} — same props, the V4 "chambers" design. */
export type SignatureRequestV4Props = SignatureRequestProps;
/**
 * SignatureRequest — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a signature glyph + document title, a
 * sent / due meta line, a labelled glyph + word lifecycle pill (never color
 * alone), and the signer (avatar + role) in a soft-primary well. A `draft` shows
 * a "Request signature" button; an in-flight request (`sent` / `viewed`) shows
 * "Sign" / "Remind"; terminal states hide actions. Tappable when `onPress` is
 * set. Reuses the base `variant` (`default` / `compact`). Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function SignatureRequestV4({ document, signer, signerRole, signerAvatarUrl, status, sentDate, dueDate, variant, onRequest, onRemind, onSign, onPress, testID, style, }: SignatureRequestV4Props): React.ReactElement;
//# sourceMappingURL=SignatureRequestV4.d.ts.map
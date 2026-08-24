import * as React from 'react';
import { type SignatureStatus } from './internal';
export type SignatureRequestVariant = 'default' | 'compact';
export interface SignatureRequestProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Document title awaiting signature. */
    document: string;
    /** Name of the party who must sign. */
    signer: string;
    /** Signer role / relationship (e.g. "Client", "Opposing counsel"). */
    signerRole?: string;
    /** Signer avatar URL (initials fallback otherwise). */
    signerAvatarUrl?: string;
    /** Request lifecycle state — glyph + word pill, never color alone. */
    status?: SignatureStatus;
    /** Pre-formatted sent / due label. */
    sentDate?: string;
    /** Pre-formatted expiry / due label. */
    dueDate?: string;
    /** Density. */
    variant?: SignatureRequestVariant;
    /**
     * Send the request for signature — renders a "Request signature" button when
     * the request is still a `draft`.
     */
    onRequest?: () => void;
    /** Send a reminder — renders "Remind" while awaiting (sent / viewed). */
    onRemind?: () => void;
    /** Sign the document — renders "Sign" while awaiting. */
    onSign?: () => void;
    /** Click handler for the whole card. */
    onClick?: () => void;
    testID?: string;
}
/**
 * An e-signature request: the document, the signer (avatar + role), and a
 * lifecycle pill (glyph + word so state never rests on color alone). A `draft`
 * shows a "Request signature" button (`onRequest`); an in-flight request
 * (`sent` / `viewed`) shows "Sign" / "Remind". Terminal states hide actions.
 * When `onClick` is set the card is an accessible `role="button"`. All colors
 * are `--xen-*` token classes — no literals.
 */
export declare const SignatureRequest: React.ForwardRefExoticComponent<SignatureRequestProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SignatureRequest.d.ts.map
import * as React from 'react';
import { type ProofKind } from './internal';
export type ProofOutcome = 'delivered' | 'attempted' | 'refused';
export interface DeliveryProofProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Capture kind (signature / photo / pin / contactless). */
    kind: ProofKind;
    /** Delivery outcome — glyph + word, never color alone. */
    outcome?: ProofOutcome;
    /** Person who received (or refused) the delivery. */
    recipient?: string;
    /** Human timestamp of capture. */
    time?: string;
    /** Drop location note (e.g. `Front porch`). */
    location?: string;
    /** Optional free-text note from the driver. */
    note?: string;
    /** Whether the underlying media (photo/signature) is present. Drives the placeholder. */
    hasMedia?: boolean;
    /** Loading skeleton. */
    loading?: boolean;
    /** View the full proof. */
    onClick?: () => void;
}
/**
 * Proof-of-delivery card: a captured-media placeholder (a token-tinted panel
 * stands in for the signature/photo), the recipient, timestamp, drop location
 * and an outcome carried by a glyph + word. Clickable when `onClick` is set.
 * Empty (`hasMedia={false}`) and loading states supported. All colors are theme
 * tokens. Web parity of the native `DeliveryProof`.
 */
export declare const DeliveryProof: React.ForwardRefExoticComponent<DeliveryProofProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeliveryProof.d.ts.map
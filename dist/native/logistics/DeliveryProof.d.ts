import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ProofKind } from './internal';
export type ProofOutcome = 'delivered' | 'attempted' | 'refused';
export interface DeliveryProofProps {
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
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Proof-of-delivery card: a captured-media placeholder (the kit ships no image
 * component, so a token-tinted panel stands in for the signature/photo), the
 * recipient, timestamp, drop location and an outcome carried by a glyph + word.
 * Tappable when `onPress` is set. Empty (`hasMedia={false}`) and loading states
 * supported. All colors are theme tokens.
 */
export declare function DeliveryProof({ kind, outcome, recipient, time, location, note, hasMedia, loading, onPress, testID, style, }: DeliveryProofProps): React.ReactElement;
//# sourceMappingURL=DeliveryProof.d.ts.map
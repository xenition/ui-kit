import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FlashCardProps {
    /** Prompt side content. */
    front: string;
    /** Answer side content, revealed on flip. */
    back: string;
    /** Small label above the front, e.g. "Term". */
    frontLabel?: string;
    /** Small label above the back, e.g. "Definition". */
    backLabel?: string;
    /** Controlled flipped state; omit for internal (uncontrolled) flipping. */
    flipped?: boolean;
    /** Default flipped state when uncontrolled. */
    defaultFlipped?: boolean;
    /** Fires with the next flipped value on tap. */
    onFlip?: (flipped: boolean) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A tap-to-flip study card. Shows the `front` (prompt) and flips to the `back`
 * (answer) on press. Works controlled (via `flipped` + `onFlip`) or uncontrolled
 * (via `defaultFlipped`). Announced as a button whose label reflects the visible
 * face. Token-only colors.
 */
export declare function FlashCard({ front, back, frontLabel, backLabel, flipped, defaultFlipped, onFlip, style, }: FlashCardProps): React.ReactElement;
//# sourceMappingURL=FlashCard.d.ts.map
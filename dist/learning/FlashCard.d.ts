import * as React from 'react';
export interface FlashCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
    /** Fires with the next flipped value on click. */
    onFlip?: (flipped: boolean) => void;
}
/**
 * A click-to-flip study card. Shows the `front` (prompt) and flips to the `back`
 * (answer) on activation. Works controlled (via `flipped` + `onFlip`) or
 * uncontrolled (via `defaultFlipped`). Rendered as a `role="button"` element
 * (Enter/Space activation) whose label reflects the visible face. Token-only
 * colors (`--xen-*`).
 */
export declare const FlashCard: React.ForwardRefExoticComponent<FlashCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FlashCard.d.ts.map
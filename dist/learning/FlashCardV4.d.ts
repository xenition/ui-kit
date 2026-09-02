import * as React from 'react';
import type { FlashCardProps } from './FlashCard';
/** Drop-in for {@link FlashCardProps} — same props, the V4 "campus" design. */
export type FlashCardV4Props = FlashCardProps;
/**
 * FlashCard — **V4** "campus" design (web parity of the native V4). A
 * click-to-flip study card on an elevated rounded surface with a soft shadow:
 * shows the `front` (prompt) and flips to the `back` (answer). The flipped face
 * reads on a soft-primary ground with a "Definition" label; the face label and a
 * "Tap to flip" hint keep the state legible without color. Works controlled (via
 * `flipped` + `onFlip`) or uncontrolled. Rendered as a keyboard-operable
 * `role="button"`. Identical props/behavior to {@link FlashCardProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
export declare const FlashCardV4: React.ForwardRefExoticComponent<FlashCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FlashCardV4.d.ts.map
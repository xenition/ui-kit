import * as React from 'react';
import type { TabItem, TabsProps } from './Tabs';
export type { TabsProps as TabsV4Props, TabItem };
/**
 * **V4 tabs** — same props as {@link Tabs}, a different design line.
 *
 * ## The selected state is the whole job
 *
 * A tab bar answers one question — *which section am I in* — and §32 says the
 * user should recognise the answer, not reconstruct it. So the answer is said
 * three times over, in three channels that fail independently:
 *
 * 1. **An underline** in `colors.primary`. A 2px rule is a UI boundary, judged
 *    at 3:1 rather than 4.5:1, so the vivid fill slot is the correct one here —
 *    unlike the label.
 * 2. **The label's colour**, `primaryText` — the compiler's brand hue walked
 *    until it clears AA on `surface`. The base tab bar used `colors.primary`
 *    for this, which is a FILL colour and carries no promise as text; on a
 *    light-primary seed the selected tab was the least readable thing in the
 *    row, which is the exact inverse of what it was trying to say.
 * 3. **Weight.** 600 selected against 500 unselected — the one channel that
 *    survives a colour-blind reader and a greyscale screenshot.
 *
 * Nothing else changes: no pill, no fill, no shadow. §8 lists excessive
 * pill-shaped controls among the tells of generic AI UI, and a tab that gains a
 * container has stopped being a tab.
 *
 * ## Why the underline moves
 *
 * §36.5 asks that related states preserve continuity of position. Two tabs are
 * two states of one question, so the underline is ONE object that slides
 * between them rather than two that blink — the eye tracks the movement and
 * arrives already knowing where it ended up. `useMovingIndicator` measures the
 * row and drives it, snapping instead of travelling when the OS asks for
 * Reduce Motion (§36.10) and staying hidden until it has an honest position so
 * the first paint never shows it flying in from the left edge.
 *
 * ## Reach
 *
 * Every tab clears the 44pt tap target, composed from the spacing scale by
 * `minTap` rather than remembered. The base row was `spacing.sm` of vertical
 * padding around a 14pt label — about 30pt, and a miss on a phone (§30).
 */
export declare function TabsV4({ items, value, onValueChange, onChange, style, }: TabsProps): React.ReactElement;
//# sourceMappingURL=TabsV4.d.ts.map
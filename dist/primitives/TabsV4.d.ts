import * as React from 'react';
import type { TabItem, TabsProps } from './Tabs';
export type { TabsProps as TabsV4Props, TabItem };
/**
 * **V4 tabs** — the web twin of the native `TabsV4`, same props as
 * {@link Tabs}, a different design line.
 *
 * ## The selected state is the whole job
 *
 * A tab bar answers one question — *which section am I in* — and §32 says the
 * user should recognise the answer, not reconstruct it. So the answer is said
 * three times over, in three channels that fail independently:
 *
 * 1. **An underline** in `--xen-primary`. A 2px rule is a UI boundary, judged
 *    at 3:1 rather than 4.5:1, so the vivid fill slot is the correct one here —
 *    unlike the label.
 * 2. **The label's colour**, `text-primary-text` — the compiler's brand hue
 *    walked until it clears AA on `surface`. The base tab bar used
 *    `text-primary` for this, which is a FILL colour and carries no promise as
 *    text; on a light-primary seed the selected tab was the least readable
 *    thing in the row, the exact inverse of what it was trying to say.
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
 * two states of one question, so the underline is ONE absolutely-positioned
 * element that slides between them rather than a border that blinks off one
 * button and on to another. `useMovingIndicator` measures the row and hands
 * back the transform; the transition is dropped under
 * `prefers-reduced-motion` (§36.10), and with no layout engine at all — jsdom,
 * SSR — the indicator simply is not rendered and the colour and weight carry
 * the state on their own.
 *
 * ## Reach
 *
 * Every tab clears the 44px target, composed from the spacing scale rather
 * than remembered. The base row was `py-2` around a 14px label — about 30px,
 * and a miss on a touchscreen (§30).
 */
export declare const TabsV4: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TabsV4.d.ts.map
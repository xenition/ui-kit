import * as React from 'react';
import type { RegisterKeypadProps } from './RegisterKeypad';
/** Same public contract as {@link RegisterKeypad} — a drop-in alternate design. */
export type RegisterKeypadV3Props = RegisterKeypadProps;
/**
 * RegisterKeypad, redesigned (v3): a **compact grid keypad**. Small square keys
 * in a tight 3-column grid with a slim inline display — for a cramped side panel.
 * Identical entry behavior to {@link RegisterKeypad}. Same props, token-only.
 */
export declare const RegisterKeypadV3: React.ForwardRefExoticComponent<RegisterKeypadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RegisterKeypadV3.d.ts.map
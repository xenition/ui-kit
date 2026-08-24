import * as React from 'react';
import type { RegisterKeypadProps } from './RegisterKeypad';
/** Same public contract as {@link RegisterKeypad} — a drop-in alternate design. */
export type RegisterKeypadV2Props = RegisterKeypadProps;
/**
 * RegisterKeypad, redesigned (v2): a **big circular keypad**. Large round keys
 * with a filled backspace and a tall display panel — a tactile till pad. Identical
 * entry behavior to {@link RegisterKeypad}. Same props, token-only.
 */
export declare const RegisterKeypadV2: React.ForwardRefExoticComponent<RegisterKeypadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RegisterKeypadV2.d.ts.map
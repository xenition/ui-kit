import * as React from 'react';
import type { RegisterKeypadProps } from './RegisterKeypad';
/** Drop-in alternate of {@link RegisterKeypadProps} — identical prop contract. */
export type RegisterKeypadV2Props = RegisterKeypadProps;
/**
 * RegisterKeypad — design variant **V2**: a **large, elevated keypad** built for
 * a countertop terminal. Where V1 is a flat bordered grid with a slim display,
 * V2 floats on a shadowed surface, leads with a big **amount display band** (a
 * primary-tinted panel with an oversized running total), and gives every key a
 * tall, borderless touch target. Same props as {@link RegisterKeypadProps} —
 * value folding, `variant`, `pin` masking, `disabled`, `maxLength`. Token-only.
 */
export declare function RegisterKeypadV2({ value, onChange, onKeyPress, variant, showDisplay, displayPrefix, placeholder, maxLength, disabled, accessibilityLabel, style, }: RegisterKeypadV2Props): React.ReactElement;
//# sourceMappingURL=RegisterKeypadV2.d.ts.map
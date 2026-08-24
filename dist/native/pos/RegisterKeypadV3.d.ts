import * as React from 'react';
import type { RegisterKeypadProps } from './RegisterKeypad';
/** Drop-in alternate of {@link RegisterKeypadProps} — identical prop contract. */
export type RegisterKeypadV3Props = RegisterKeypadProps;
/**
 * RegisterKeypad — design variant **V3**: a **compact, minimal grid**. Where V1
 * boxes every key in a bordered surface and V2 is a tall elevated pad, V3 strips
 * all chrome — no key borders, no fills, a hairline-underlined inline display —
 * for a dense number pad that tucks into a sidebar or a modal. Same props as
 * {@link RegisterKeypadProps}. Token-only; `pin` masks the display.
 */
export declare function RegisterKeypadV3({ value, onChange, onKeyPress, variant, showDisplay, displayPrefix, placeholder, maxLength, disabled, accessibilityLabel, style, }: RegisterKeypadV3Props): React.ReactElement;
//# sourceMappingURL=RegisterKeypadV3.d.ts.map
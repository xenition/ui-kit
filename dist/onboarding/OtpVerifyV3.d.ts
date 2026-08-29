import * as React from 'react';
import type { OtpVerifyProps } from './OtpVerify';
/** Drop-in for {@link OtpVerify} — identical props, different design. */
export type OtpVerifyV3Props = OtpVerifyProps;
/**
 * Code verification — V3, the compact line. No hero panel: a small badge sits
 * beside a left-aligned headline and the rows tighten, so the step fits a sheet
 * over the screen the user was already on.
 *
 * The code cells keep their 56 size — a shrunk digit box is a box nobody can
 * hit, and density is not worth a mistyped code. `illustration` is deliberately
 * ignored; `logoGlyph` drives the small leading badge.
 *
 * Same props as {@link OtpVerify}. Token-pure.
 */
export declare const OtpVerifyV3: React.ForwardRefExoticComponent<OtpVerifyProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OtpVerifyV3.d.ts.map
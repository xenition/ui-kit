import * as React from 'react';
import type { OtpVerifyProps } from './OtpVerify';
/** Drop-in for {@link OtpVerify} — identical props, different design. */
export type OtpVerifyV2Props = OtpVerifyProps;
/**
 * Code verification — V2, the editorial line. The hero runs full-bleed to the
 * top edge and the content sheet rises over the seam carrying the headline, the
 * §6 code cells and the sticky CTA. The cells keep the base line's contract
 * exactly: 56 tall, focus raises the border to `primary`, an error holds it at
 * `danger` and prints the message — never colour alone.
 *
 * Same props as {@link OtpVerify}. Token-pure.
 */
export declare const OtpVerifyV2: React.ForwardRefExoticComponent<OtpVerifyProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OtpVerifyV2.d.ts.map
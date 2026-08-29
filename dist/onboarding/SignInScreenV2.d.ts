import * as React from 'react';
import { type SignInScreenProps } from './SignInScreen';
/** Drop-in for {@link SignInScreen} — identical props, different design. */
export type SignInScreenV2Props = SignInScreenProps;
/**
 * Sign-in / register — **V2, editorial** (§11).
 *
 * The base line stacks brand, headline and form down one column. V2 turns the
 * top of the screen into a full-bleed tinted panel that runs to the very edge
 * and carries the brand tile and headline, then lets the form sheet **rise
 * over it** — `radius.lg` on its top corners, `surface` fill, pulled up so it
 * overlaps the panel. The overlap is the whole idea: it reads as a card handed
 * to you rather than a form printed on a page, and it gives the headline
 * somewhere to sit that is not the same plane as the inputs.
 *
 * Same parts as the base line, same props, same 56px controls, same sticky
 * CTA (§5) — only the arrangement differs.
 */
export declare const SignInScreenV2: React.ForwardRefExoticComponent<SignInScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SignInScreenV2.d.ts.map
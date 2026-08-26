import * as React from 'react';
import { cn } from '../primitives/cn';
import { AuthStickyFooter } from '../primitives/AuthCard';
import { signInDomProps, useSignInParts, type SignInScreenProps } from './SignInScreen';

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
export const SignInScreenV2 = React.forwardRef<HTMLDivElement, SignInScreenV2Props>(
  function SignInScreenV2(props, ref) {
    const parts = useSignInParts(props);

    return (
      <div
        ref={ref}
        className={cn('flex min-h-full flex-col bg-primary-50', props.className)}
        {...signInDomProps(props)}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Full-bleed hero: the tint reaches the top and both edges; only the
              copy is inset. */}
          <div className="flex flex-col gap-lg bg-primary-50 px-xl pb-2xl pt-2xl">
            {parts.brand}
            {parts.heading}
          </div>

          {/* The sheet, risen over the panel. `-mt-lg` is the overlap, in the
              same rhythm as everything else on the screen. */}
          <div className="-mt-lg flex flex-1 flex-col gap-lg rounded-t-[var(--xen-radius-lg)] bg-surface p-xl">
            {parts.alert}
            {parts.fields}
            {parts.providers}
            {parts.switchFooter}
          </div>
        </div>

        <AuthStickyFooter>{parts.cta}</AuthStickyFooter>
      </div>
    );
  }
);

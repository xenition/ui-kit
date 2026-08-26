import * as React from 'react';
import type { StatusMessageProps, StatusMessageState } from './StatusMessage';
export type { StatusMessageProps as StatusMessageV4Props, StatusMessageState };
/**
 * **V4 status message** — the web twin of the native `StatusMessageV4`, same
 * props as {@link StatusMessage}, a different design line.
 *
 * One component covering three of the states `design.md` §14 says every screen
 * owes the user. V4 treats them as three different jobs rather than three
 * colours of the same centred line of small grey text.
 *
 * ## `loading` — say only what is known
 *
 * `SpinnerV4` replaces the hand-rolled ring this component injected for itself,
 * so there is one spinner in the kit instead of two that drift. It stays
 * indeterminate: §36.7 forbids fabricating precision, and this component has a
 * message and nothing else — no fraction, no stages. A bar here would be
 * inventing a number.
 *
 * ## `empty` — an empty state that whispers is one the eye skips
 *
 * §15 is emphatic that an empty state must help the user progress: what belongs
 * here, why it matters, what to do next. The base rendered that copy in
 * `text-muted-text` at `text-sm` — the *quietest* type in the kit for the one screen
 * whose entire purpose is to be read. V4 promotes it to `text-on-surface` at
 * `text-base`. Nothing else changes, because nothing else can: **these props
 * carry no action.** When an empty state has a next step, `ResultV4` is the
 * component — it takes `actionLabel`, and §15 is really a demand for a button.
 *
 * ## `error` — a failure needs a body
 *
 * The base drew red text in the middle of a void. Red text alone reads as a
 * caption; §38 asks an error to help recovery and it cannot do that unnoticed.
 * V4 gives it the feedback line's tinted panel — the `danger` tone mixed into
 * `surface` at 10%, opaque so it holds its colour on any ground, behind the
 * neutral hairline that says "container" (the tint already says which kind).
 * The label is the compiler's contrast-safe `danger-text`, not the raw fill.
 */
export declare const StatusMessageV4: React.ForwardRefExoticComponent<StatusMessageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatusMessageV4.d.ts.map
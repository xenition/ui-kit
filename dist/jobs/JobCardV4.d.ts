import * as React from 'react';
import type { JobCardProps } from './JobCard';
export interface JobCardV4Props extends JobCardProps {
    /** Names the save control when the job is not saved. Default `'Save job'`. */
    saveLabel?: string;
    /** Names it when the job is saved. Default `'Saved — tap to remove'`. */
    savedLabel?: string;
    /** Render the posted age. Default `'3d ago'`, floored. */
    formatRelative?: (iso: string) => string;
    /** Render the collapsed skill count. Default `'+6'`. */
    overflowLabel?: (n: number) => string;
}
/**
 * **V4 job card** — same props as {@link JobCard} plus `saveLabel`,
 * `savedLabel`, `formatRelative` and `overflowLabel`.
 *
 * ## Six changes
 *
 * 1. **The save star works from the keyboard.** It was a `<button>` *inside* a
 *    `<div role="button">` that carried its own Enter/Space handler. The
 *    star's click was guarded with `stopPropagation`; its keydown was not — so
 *    the card caught the bubbled key, called `preventDefault()`, which cancels
 *    the star's own activation (Enter's default action on a button **is** that
 *    click, and Space fires on keyup, already cancelled), and opened the job
 *    detail instead. A keyboard user pressing Enter on "Save job" saved
 *    nothing and navigated away. The card is now a plain container, the
 *    activation is a real `<button>` around the logo and the title, and the
 *    star, the chips and the Apply CTA are its **siblings** — the whole class
 *    of bug goes away rather than being guarded against.
 * 2. **The card is one accessible name.** ARIA forbids naming a `generic`
 *    element, and it forbids interactive content inside `role="button"`; the
 *    base did both, so on Chrome and Firefox the card announced its children
 *    as a scatter of stops with the title's own label discarded. The
 *    activation now carries title, company, location, arrangement, pay,
 *    posted age and skills as one sentence.
 * 3. **`maxSkills={0}` no longer swallows the skills entirely.** Six skills
 *    with a cap of zero rendered no chips *and* no "+6", because the overflow
 *    chip was inside the `shown.length > 0` branch — so the cap that most
 *    obviously means "collapse them all" was the one case that lost the
 *    count.
 * 4. **Employment type stops spending a status colour.** `contract → warn` and
 *    `remote → success` said a contract role is a warning and a remote one is
 *    good news. They are two of four arrangements — identity — and the word
 *    already distinguishes them.
 * 5. **The posted age stops rounding up.** `formatRelative` rounded, so a job
 *    posted 25 days ago read "1mo ago" and one posted 90 minutes ago read "2h
 *    ago". Elapsed time has passed or it has not.
 * 6. **The skeleton and the press feedback stop inverting.** The placeholders
 *    were `bg-neutral-100`, a ramp step that mirrors under a dark seed into a
 *    near-white slab; press was `hover:opacity-95`, which fades the card's
 *    content — the signal M3 spends on *disabled*.
 */
export declare const JobCardV4: React.ForwardRefExoticComponent<JobCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobCardV4.d.ts.map
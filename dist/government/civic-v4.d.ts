/**
 * Civic status, position and reasons — **pure, and shared by both twins**, the
 * way `fieldservice/verdict-v4.ts` is. The native twin imports it as
 * `../../government/civic-v4`.
 *
 * Nothing here is exported from the package.
 */
/**
 * Where an application stands, as a sentence.
 *
 * ## The bug this replaces
 *
 * `PermitStatus` conveyed position **entirely by colour**. The base `Steps`
 * emits no `aria-current` and no position, and the active step differs from a
 * pending one only by border and text colour — both render a bare digit. The
 * one place the words "Under review" could still surface was gated on
 * `updatedDate`, an **optional** prop.
 *
 * So `<PermitStatus status="review" title="Building permit" />` produced a
 * card in which the status appeared **nowhere at all**. A blind applicant
 * heard the full happy path — "1 Submitted 2 Under review 3 Approved 4
 * Issued" — with no indication which stage was theirs.
 *
 * The status label is not optional any more, and the position is a sentence a
 * reader gets whether or not the caller passed a date.
 */
export declare function statusSentence(label: string, step: number | undefined, total: number | undefined, format?: (label: string, step: number, total: number) => string): string;
/**
 * Whether a state is one a person has to act on or appeal.
 *
 * Five components carry a rejection state — permit `denied`, form `rejected`
 * and `action-needed`, document `denied`, benefit `denied` and `suspended`,
 * appointment `no-show` — and **not one of the five prop interfaces has a
 * field for why**. `PermitStatus` hard-codes the consolation sentence "Review
 * the notice and re-apply or appeal" and offers no way to say what the notice
 * said.
 *
 * A component that returns true here must render its `reason` when it has one,
 * and must announce the state rather than only tinting a pill.
 */
export declare function isAdverse(status: string): boolean;
/**
 * Label an identifier so a reader does not hear a bare string of digits.
 *
 * Six components render a permit, form, request, ticket, case or queue number
 * with no visible or accessible label at all — a reader hears
 * "BLD-2026-0417" with no idea what it identifies.
 */
export declare function labelledId(label: string, value: string | undefined): string | undefined;
//# sourceMappingURL=civic-v4.d.ts.map
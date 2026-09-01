/**
 * `Center`, V4 (native) — **the base component, unchanged, under a V4 name.**
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5: *"Center — Structure only. Nothing to
 * fix. Do not add padding to it; that is `Inset`'s job."*
 *
 * The native twin sets `alignItems: 'center'`, `justifyContent: 'center'` and
 * `flex: 1` when `fill` is set. Two alignment enums and a flex factor: no
 * colour, no border, no radius, no type size, no spacing — nothing in the file
 * that could fail the no-literals rule, and nothing a design line owns.
 *
 * The change worth naming is the one the brief refuses: a `padding` prop.
 * Padding is `Inset`'s single job, and a primitive that centres *and* pads
 * forces every later caller to remember which of the two components pads —
 * exactly the ambiguity this module exists to remove. Compose `Inset` with
 * `Center` instead.
 *
 * So this is an alias, with the reasoning recorded. Prop parity with the web
 * twin holds for free: both sides alias a pair already at parity on `fill`.
 */
export { Center as CenterV4 } from './Center';
export type { CenterProps as CenterV4Props } from './Center';
//# sourceMappingURL=CenterV4.d.ts.map
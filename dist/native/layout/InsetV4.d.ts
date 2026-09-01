/**
 * `Inset`, V4 (native) — **the base component, unchanged, under a V4 name.**
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5: *"Inset — Structure only. Token-pure on
 * both twins. Nothing to fix."*
 *
 * The native twin sets `paddingHorizontal` / `paddingVertical` from
 * `tokens.spacing[…]`, chosen by `space` / `horizontal` / `vertical` with the
 * same `md` default as the web twin. Every value already traces to the
 * compiled spacing scale; there is no colour, border, radius or type in it.
 *
 * The one thing that looks like a V4 decision — the default padding — is
 * settled the other way by §4.1, which assigns a token per role (page gutter
 * `lg`, card padding `lg`, row padding `md`, chip gap `sm`). The rhythm is
 * therefore the caller's choice at the call site, not a default this primitive
 * can guess, and moving the default would move existing callers' padding,
 * which the additive-only rule forbids.
 *
 * So this is an alias, deliberately, with the reasoning written down.
 */
export { Inset as InsetV4 } from './Inset';
export type { InsetProps as InsetV4Props } from './Inset';
//# sourceMappingURL=InsetV4.d.ts.map
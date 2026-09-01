"use strict";
/**
 * `Inset`, V4 — **the base component, unchanged, under a V4 name.**
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5: *"Inset — Structure only. Token-pure on
 * both twins. Nothing to fix."*
 *
 * `Inset` emits exactly two classes, `px-[var(--xen-space-*)]` and
 * `py-[var(--xen-space-*)]`, chosen by `space` / `horizontal` / `vertical`.
 * Every value traces to a `--xen-space-*` token already, there is no colour,
 * border, radius or type in the file, and the web and native twins take the
 * same three props with the same `md` default.
 *
 * The one thing that *looks* like a V4 decision here — "what should the
 * default padding be?" — is settled the other way by §4.1. That table assigns
 * a token per role (page gutter `lg`, card padding `lg`, row padding `md`,
 * chip gap `sm`), which means the rhythm is the **caller's** choice at the
 * call site, not a default this primitive can guess. Changing `space`'s
 * default from `md` would also be subtractive: it would move the padding of
 * every existing caller, which rule 4 forbids.
 *
 * So this file is an alias, deliberately, with the reasoning written down.
 * Same precedent, same argument as `primitives/StackV4.tsx`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsetV4 = void 0;
var Inset_1 = require("./Inset");
Object.defineProperty(exports, "InsetV4", { enumerable: true, get: function () { return Inset_1.Inset; } });
//# sourceMappingURL=InsetV4.js.map
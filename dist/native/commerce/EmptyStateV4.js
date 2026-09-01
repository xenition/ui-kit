"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMERCE_EMPTY_PRESETS = void 0;
exports.EmptyStateV4 = EmptyStateV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const empty_v4_1 = require("../../commerce/internal/empty-v4");
Object.defineProperty(exports, "COMMERCE_EMPTY_PRESETS", { enumerable: true, get: function () { return empty_v4_1.COMMERCE_EMPTY_PRESETS; } });
/**
 * **V4 commerce empty state (native)** — same props as the web
 * `EmptyStateV4`, including defaults. Composes `EmptyStateV4` from
 * `native/primitives` rather than re-drawing it, and adds the one thing a
 * domain module can usefully add: the words.
 *
 * ## Why it composes rather than redraws
 *
 * The base `native/commerce/EmptyState` predates `EmptyStateV4` and is a
 * re-export of an older primitive, so a store built on it gets the dashed
 * placeholder rectangle §11 and §8 both argue against, an icon that outranks
 * the action, and a headline at body size. All three are already fixed, once,
 * in `native/primitives/EmptyStateV4`. Redrawing any of it here would be a
 * second empty state to keep in step with the first.
 *
 * So this file owns exactly two decisions, and no layout at all.
 *
 * ## 1. The copy
 *
 * §15's argument is that an empty state is made of its three sentences — what
 * belongs here, why it matters, what to do next — and the third is the only
 * one that changes anything. A kit that ships the layout and leaves the
 * sentences to the caller ships `title="No data"`, which is the failure mode
 * §15 names. `kind` names the five empty screens a store actually has and
 * supplies all three, from the table both twins read, so an empty cart says
 * the same thing on a phone and on the web.
 *
 * ## 2. The glyph
 *
 * A **categorical** leading mark — it names *a kind of thing* — which §4.7
 * says is a soft tinted circular badge. `IconV4 badge="soft"` already owns the
 * wash, the circle and the glyph's measured contrast against that wash. A
 * caller's own `icon` is passed straight through untouched: a store's
 * illustration is the store's to colour.
 *
 * **Renders nothing when there is no headline** — no `title`, no `kind`. §4.5:
 * a component with nothing to say is not a box with nothing in it.
 */
function EmptyStateV4({ kind, icon, title, description, action, style, }) {
    const preset = kind ? empty_v4_1.COMMERCE_EMPTY_PRESETS[kind] : undefined;
    const resolvedTitle = title ?? preset?.title;
    if (resolvedTitle === undefined || resolvedTitle === null || resolvedTitle === '')
        return null;
    const resolvedIcon = icon ?? (preset ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: preset.icon, badge: "soft", color: "primary" }) : undefined);
    return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: resolvedIcon, title: resolvedTitle, description: description ?? preset?.description, action: action, style: style }));
}
//# sourceMappingURL=EmptyStateV4.js.map
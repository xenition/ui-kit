"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TextV4_1 = require("../primitives/TextV4");
const _tokens_1 = require("./_tokens");
/**
 * **V4 section** — the web twin of the native `SectionV4`, the base `Section`'s
 * props plus one, a different design line.
 *
 * ## What V4 changes
 *
 * 1. **The header is on the type ramp, and it is the same ramp on both twins.**
 *    The base sets `text-lg font-semibold` here and `lg` / `600` on native — the
 *    same intent, expressed twice, free to drift. V4 sets both through `TextV4`:
 *    title `size="xl" weight="bold"`, subtitle `size="base" tone="mutedText"`.
 *    Louder and with more air than the base, because §3 asks for one loud thing
 *    per block and a section heading is it.
 * 2. **`mutedText`, not `muted`.** The base subtitle uses the `muted` slot,
 *    which is a *fill* and carries no contrast promise. `mutedText` is the same
 *    quietness walked until it clears AA. This is the exact bug the shadcn pass
 *    closed elsewhere in the kit.
 * 3. **`action` exists.** See the prop.
 *
 * What V4 does **not** do is own the space *between* sections. §4.1 puts that at
 * `spacing.xl` (32) and it stays the caller's decision — a `Column gap="xl"`
 * around the sections — because a component that pushed its own siblings apart
 * would double up wherever a caller already had a rhythm.
 *
 * The header collapses entirely when there is no `title`, no `subtitle` and no
 * `action`: §4.5 asks that every component survive its empty case, and an empty
 * header row would leave a `gap` where two lines would be. With no children
 * either, this renders an empty `<section>` and paints nothing.
 *
 * ### Platform divergence
 *
 * None. The `<h2>`/`<p>` elements here are the web's semantics for a heading and
 * its supporting line; the native twin reaches the same place with
 * `accessibilityRole="header"`. Same props, same defaults, same type ramp.
 */
exports.SectionV4 = React.forwardRef(function SectionV4({ title, subtitle, spacing = 'md', action, className, children, ...rest }, ref) {
    const hasText = Boolean(title || subtitle);
    const hasHeader = hasText || Boolean(action);
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, "data-xen-v4-section": "", className: (0, cn_1.cn)('flex flex-col', _tokens_1.SPACE_GAP[spacing], className), ...rest, children: [hasHeader ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-section-header": "", className: (0, cn_1.cn)('flex flex-row items-start justify-between', _tokens_1.SPACE_GAP.md), children: [hasText ? (
                    // `flex-1` and `min-w-0` are geometric: the text column takes the
                    // free space and is allowed to shrink, so a long title truncates
                    // instead of shoving the action off the end.
                    (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col flex-1 min-w-0', _tokens_1.SPACE_GAP.xs), children: [title ? (
                            // `m-0` kills the user-agent heading margin, which would
                            // otherwise sit inside the gap and widen it.
                            (0, jsx_runtime_1.jsx)("h2", { className: "m-0", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: "onSurface", children: title }) })) : null, subtitle ? ((0, jsx_runtime_1.jsx)("p", { className: "m-0", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", children: subtitle }) })) : null] })) : null, action ? (
                    // `shrink-0` so a "See all" never compresses to fit a long title.
                    (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-section-action": "", className: "shrink-0", children: action })) : null] })) : null, children] }));
});
//# sourceMappingURL=SectionV4.js.map
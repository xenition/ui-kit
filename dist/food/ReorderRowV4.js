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
exports.ReorderRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const menu_v4_1 = require("./internal/menu-v4");
const THUMB_CLASS = 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] shrink-0';
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 reorder row** — the web twin of the native `ReorderRowV4`, with exactly
 * the same props as {@link ReorderRow}.
 *
 * ## Four changes
 *
 * 1. **Enter on Reorder reorders.** The Reorder button sat *inside* a
 *    `role="button"` row — invalid ARIA, and a live keyboard bug: the row's
 *    `onKeyDown` caught the keydown bubbling out of the button and ran
 *    `e.preventDefault(); onClick()`. Enter's default action on a `<button>`
 *    **is** the click that was just cancelled, and Space's click fires on
 *    keyup, cancelled too — so a keyboard user pressed Enter on Reorder and
 *    opened the past order instead of reordering it. The fix is structural:
 *    the row's activation is a real `<button>` around the thumbnail and the
 *    text, and Reorder is its **sibling**. No `stopPropagation`, no key guard,
 *    nothing left to double-fire.
 * 2. **The items summary is spoken.** `aria-label` was the title and the meta
 *    line on a children-presentational root, so "2× Pad Thai, 1× Spring rolls"
 *    — the one line that says what the order actually was — never reached the
 *    reader. It is the whole point of a reorder row.
 * 3. **`disabled` means disabled.** The base set `aria-disabled` on the row
 *    and passed `onClick` through unguarded, so a row it had just announced as
 *    unavailable still opened.
 * 4. **Dimming and hover stop fighting.** `opacity-60` and `hover:opacity-90`
 *    shared a node, so a disabled row got *brighter* under the pointer. M3
 *    disables content at 0.38 and draws press as a state layer; both live in
 *    `v4-state` and neither is a guess.
 */
exports.ReorderRowV4 = React.forwardRef(function ReorderRowV4({ title, itemsSummary, dateText, totalCents, currency = 'USD', imageUrl, onReorder, reorderLabel = 'Reorder', onClick, disabled = false, formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!title)
        return null;
    const totalText = typeof totalCents === 'number' ? formatMoney(totalCents, currency) : undefined;
    const meta = (0, tone_v4_1.metaLine)([dateText, totalText]);
    const spoken = (0, menu_v4_1.spokenLine)([title, itemsSummary, dateText, totalText]);
    const thumb = ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('relative block overflow-hidden rounded-[var(--xen-radius-md)]', THUMB_CLASS), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('absolute inset-0', menu_v4_1.PLACEHOLDER_CLASS) }), imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", loading: "lazy", className: "relative h-full w-full object-cover" })) : null] }));
    const text = ((0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-semibold text-on-card", children: title }), itemsSummary ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: itemsSummary })) : null, meta !== '' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', menu_v4_1.TABULAR_CLASS), children: meta })) : null] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-on-card', className), ...rest, children: [interactive ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: disabled, "aria-label": spoken, onClick: onClick, "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS), children: [thumb, text] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: [thumb, text] })), onReorder ? ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled, "aria-label": (0, menu_v4_1.spokenLine)([reorderLabel, title]), onClick: onReorder, "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('inline-flex items-center justify-center px-md', chrome_v4_1.MIN_TAP_CLASS, 'rounded-[var(--xen-radius-md)] border border-border text-sm font-semibold text-on-card', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS), children: reorderLabel }) })) : null] }));
});
//# sourceMappingURL=ReorderRowV4.js.map
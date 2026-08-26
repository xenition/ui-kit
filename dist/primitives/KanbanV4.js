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
exports.KanbanV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const chrome_v4_1 = require("./internal/chrome-v4");
const nav_v4_1 = require("./internal/nav-v4");
/**
 * `Kanban`, V4 — the same props, and the board stops being boxes inside boxes.
 *
 * ## The nesting problem, and what fixes it
 *
 * The base gives the column a `border` and a `surface` fill, then fills every
 * card inside it with `surface` and gives it a `border` too. Two nested
 * rectangles on identical grounds, separated only by a hairline each — which is
 * §8's "cards inside cards inside cards" almost exactly, and it makes a busy
 * board read as a grid of empty frames before it reads as work.
 *
 * V4 splits the two levels apart by **ground** rather than by outline. The
 * column becomes a recessed tray — one 4% step towards `on-surface`, the same
 * step the V4 tables band with — and loses its border entirely. The cards keep
 * `surface` and their hairline, so they now sit *on* something instead of
 * inside something. One level of depth, said once, and the outline that was
 * doing the work goes away (§9 — spacing and ground as structure).
 *
 * Neither level gets a shadow. A card on a board is not a layer; it is an item
 * in a list that happens to be laid out in columns.
 *
 * ## The count chip
 *
 * It shared a bug with several other chips in the kit: `bg-muted` with
 * `text-surface`. `muted` is a decorative slot with no contrast promise and
 * `surface` is a *page* colour, so the pair was never measured against
 * anything — and both move independently per scheme. V4 uses the same recipe
 * the V4 navigation badges use: an opaque mix of `on-surface` into `surface`,
 * carrying `on-surface` as its ink, which is a compiler-guaranteed pair.
 *
 * ## Feedback
 *
 * Cards hover and press with the M3 state layer over `surface`, replacing
 * `hover:bg-neutral-50` — a light-oriented ramp step, so the base's hover is a
 * near-white slab on a dark board. Focus is `--xen-ring`, the one ring the kit
 * shares, replacing `ring-primary-300`, which is a ramp step and inverts the
 * same way.
 *
 * Still non-drag: `onCardPress` is the whole interaction, and a DnD layer is
 * the caller's. Saying so is better than implying reordering the board cannot
 * do.
 */
exports.KanbanV4 = React.forwardRef(function KanbanV4({ className, columns, onCardPress, columnWidth = 260, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(chrome_v4_1.CHROME_V4_STYLE_ID, chrome_v4_1.CHROME_V4_CSS);
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex gap-md overflow-x-auto', className), ...rest, children: columns.map((column) => ((0, jsx_runtime_1.jsxs)("section", { "data-xen-v4-kanban-column": "", "data-xen-v4-tray": "", style: { width: columnWidth, minWidth: columnWidth }, 
            // No border: the ground is what separates the tray from the page.
            className: "flex shrink-0 flex-col gap-sm rounded-[var(--xen-radius-md)] p-sm", children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex items-center justify-between gap-sm px-xs pb-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate font-heading text-sm font-semibold text-on-surface", children: column.title }), (0, jsx_runtime_1.jsx)("span", { "data-xen-v4-nav-badge": "", className: "inline-flex min-w-[var(--xen-space-lg)] shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] px-xs font-body text-xs font-semibold", children: column.cards.length })] }), column.cards.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-lg text-center font-body text-xs text-muted-text", children: "No cards" })) : (column.cards.map((card) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-v4-chrome": "on-surface", onClick: () => onCardPress?.(card, column), className: (0, cn_1.cn)('flex flex-col gap-xs rounded-[var(--xen-radius-sm)] border border-border', 'bg-surface p-sm text-left focus-visible:outline-none'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 font-body text-sm font-semibold text-on-surface", children: card.title }), card.trailing != null ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: card.trailing }) : null] }), card.description != null ? ((0, jsx_runtime_1.jsx)("span", { className: "font-body text-xs leading-relaxed text-muted-text", children: card.description })) : null] }, card.id))))] }, column.key))) }));
});
//# sourceMappingURL=KanbanV4.js.map
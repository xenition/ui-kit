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
exports.StickerRewardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("./internal/tone-v4");
/** How many placeholder cells a loading board draws. */
const SKELETON_CELLS = 8;
/**
 * **V4 sticker reward** — same props as {@link StickerReward} plus
 * `formatCount`, `earnedLabel` and `lockedLabel`.
 *
 * ## Six changes
 *
 * 1. **`columns={4}` renders four columns.** It rendered three. The cells were
 *    `width: 100/cols%` in a `flex-wrap` container with a gap, so four 25%
 *    cells plus three gaps exceeded the line and the fourth wrapped — on both
 *    twins. The board is a CSS grid of `repeat(n, minmax(0, 1fr))` now, where
 *    the gap is subtracted from the tracks rather than added to them, so the
 *    prop means what it says at any column count.
 * 2. **A locked sticker is locked, not disabled.** It was drawn at
 *    `opacity-45` — inside M3's *disabled* band — so an unearned sticker and a
 *    dead control looked identical. Locked is now a glyph and a word, at full
 *    strength, which is also the only form a colour-blind child can read.
 * 3. **Every cell clears 44.** A sticker is the most-tapped thing on the
 *    screen, by the youngest users in the product.
 * 4. **The summary is a string a caller owns.** `3/8` was assembled inline, as
 *    were "earned" and "locked" in every cell's accessible name.
 * 5. **The grid is a list.** Each cell was a bare `div` carrying an
 *    `aria-label`, which browsers ignore outright — so the earned/locked state
 *    of every sticker on a read-only board was silent. Cells are list items now
 *    and their state is real text.
 * 6. **Tokens and press.** The skeleton was `bg-neutral-200`, a ramp step that
 *    inverts under `[data-theme="dark"]`; the earned ring is `accent`, matching
 *    the native twin; press is the M3 state layer rather than
 *    `hover:opacity-70`, which is the band M3 spends on unavailable.
 */
exports.StickerRewardV4 = React.forwardRef(function StickerRewardV4({ stickers, title = 'Sticker rewards', columns = 4, loading = false, emptyLabel = 'No stickers yet', formatCount, earnedLabel = 'earned', lockedLabel = 'locked', onCollect, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const cols = Math.max(1, Math.floor(Number.isFinite(columns) ? columns : 1));
    // The gap comes out of the tracks, not off the end of the line — which is
    // the whole reason the base lost a column.
    const gridStyle = {
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    };
    const shell = (0, cn_1.cn)('flex flex-col gap-md', tone_v4_1.KIDS_CARD_CLASS, tone_v4_1.KIDS_CARD_GROUND_CLASS, className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-sticker-reward": "", role: "status", "aria-live": "polite", "aria-label": title, className: shell, children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-2/5" }), (0, jsx_runtime_1.jsx)("div", { className: "grid gap-sm", style: gridStyle, children: Array.from({ length: SKELETON_CELLS }).map((_, index) => ((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: (0, cn_1.cn)(tone_v4_1.GLYPH_SLOT_CLASS, 'rounded-full') }, index))) })] }));
    }
    const list = Array.isArray(stickers) ? stickers : [];
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ...rest, ref: ref, "data-xen-sticker-reward": "", className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\u2728" }), title: title, description: emptyLabel }));
    }
    const earnedCount = list.filter((sticker) => sticker.earned).length;
    const summary = (formatCount ?? ((earned, total) => `${earned} of ${total} earned`))(earnedCount, list.length);
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-sticker-reward": "", className: shell, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted-text", children: summary })] }), (0, jsx_runtime_1.jsx)("ul", { className: "grid gap-sm", style: gridStyle, "aria-label": summary, children: list.map((sticker, index) => {
                    const earned = sticker.earned ?? false;
                    const stateWord = earned ? earnedLabel : lockedLabel;
                    const name = (0, tone_v4_1.spokenLine)([sticker.label, stateWord]);
                    const face = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)(tone_v4_1.GLYPH_SLOT_CLASS, 'rounded-full border text-xl leading-none', earned ? 'border-accent' : 'border-border'), children: earned ? sticker.glyph : '🔒' }), sticker.label ? ((0, jsx_runtime_1.jsx)("span", { className: "block max-w-full truncate text-xs text-muted-text", children: sticker.label })) : null] }));
                    return ((0, jsx_runtime_1.jsx)("li", { className: "flex", children: onCollect ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onCollect(index), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex w-full flex-col items-center gap-xs rounded-[var(--xen-radius-md)]', 'bg-transparent py-sm', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: face })) : ((0, jsx_runtime_1.jsxs)("span", { className: "flex w-full flex-col items-center gap-xs py-sm", children: [face, (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: name })] })) }, sticker.id ?? index));
                }) })] }));
});
//# sourceMappingURL=StickerRewardV4.js.map
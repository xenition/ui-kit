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
exports.StickerReward = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A sticker-collection reward board: a grid of earned + locked stickers with an
 * earned/total summary. Locked stickers are dimmed and marked with a lock glyph
 * (state, not color alone). Tapping a sticker fires `onCollect(index)`. Renders
 * the shared {@link EmptyState} when there are none. Token-bound throughout — no
 * literal colors.
 */
exports.StickerReward = React.forwardRef(function StickerReward({ stickers, title = 'Sticker rewards', columns = 4, loading = false, emptyLabel = 'No stickers yet', onCollect, className, ...rest }, ref) {
    const cols = Math.max(1, Math.floor(columns));
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-sticker-reward": "", "aria-label": "Loading stickers", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-12 w-full animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200" })] }) }));
    }
    if (stickers.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "data-xen-sticker-reward": "", "aria-label": emptyLabel, className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\u2728" }), title: title, description: emptyLabel, ...rest }));
    }
    const earnedCount = stickers.filter((s) => s.earned).length;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-sticker-reward": "", className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-muted", children: [earnedCount, "/", stickers.length] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3 flex flex-wrap gap-2", children: stickers.map((sticker, i) => {
                    const earned = sticker.earned ?? false;
                    const a11y = `${sticker.label ?? 'Sticker'}, ${earned ? 'earned' : 'locked'}`;
                    const cell = ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col items-center gap-0.5 py-2", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full border', earned ? 'border-primary opacity-100' : 'border-border opacity-45'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: earned ? sticker.glyph : '🔒', size: "xl" }) }), sticker.label ? ((0, jsx_runtime_1.jsx)("span", { className: "block max-w-full truncate text-xs text-muted", children: sticker.label })) : null] }));
                    const cellStyle = { width: `${100 / cols}%` };
                    if (!onCollect) {
                        return ((0, jsx_runtime_1.jsx)("div", { "aria-label": a11y, style: cellStyle, children: cell }, sticker.id ?? i));
                    }
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": a11y, onClick: () => onCollect(i), style: cellStyle, className: "transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: cell }, sticker.id ?? i));
                }) })] }));
});
//# sourceMappingURL=StickerReward.js.map
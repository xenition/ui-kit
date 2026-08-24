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
exports.PublicNoticeCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const tint_1 = require("./internal/tint");
const pressable_1 = require("./internal/pressable");
const CATEGORY = {
    hearing: { label: 'Public hearing', glyph: '⚖️', tone: 'primary' },
    // Native `accent` folds to `primary` on web (no `accent` BadgeTone).
    meeting: { label: 'Meeting', glyph: '📋', tone: 'primary' },
    roadwork: { label: 'Roadwork', glyph: '🚧', tone: 'warn' },
    election: { label: 'Election', glyph: '🗳️', tone: 'primary' },
    ordinance: { label: 'Ordinance', glyph: '📜', tone: 'neutral' },
    bid: { label: 'Bid / RFP', glyph: '📑', tone: 'primary' },
    general: { label: 'Notice', glyph: '📢', tone: 'neutral' },
};
/**
 * A public-notice / civic-announcement card for a notices feed. The `category`
 * selects a tinted leading glyph and a labelled badge (text + glyph + color,
 * never color alone), with optional agency / date / location metadata and a
 * "New" flag. Becomes a keyboard-operable button only when `onClick` is
 * supplied. Token-bound throughout — no literal colors. Web parity of the native
 * `PublicNoticeCard`.
 */
exports.PublicNoticeCard = React.forwardRef(function PublicNoticeCard({ category, title, body, agency, date, location, isNew = false, onClick, className, ...rest }, ref) {
    const cat = CATEGORY[category] ?? CATEGORY.general;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const meta = [agency, location, date].filter((v) => v != null && v !== '').join(' · ');
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "aria-label": interactive ? `${cat.label}: ${title}` : undefined, className: (0, cn_1.cn)(interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', tint_1.TONE_TINT[cat.tone]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: cat.glyph, "aria-label": cat.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-wrap items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: cat.tone, children: cat.label }), isNew ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: "danger", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u25CF" }), " New"] })) : null] })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-sm)] text-base font-bold text-on-surface", children: title }), body != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 line-clamp-3 text-sm text-on-surface", children: body })) : null, meta !== '' ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-sm)] text-xs text-muted", children: meta })) : null] }));
});
//# sourceMappingURL=PublicNoticeCard.js.map
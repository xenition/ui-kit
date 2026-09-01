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
exports.DonorRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
const TIER = {
    bronze: { tone: 'warn', label: 'Bronze', glyph: '🥉' },
    silver: { tone: 'neutral', label: 'Silver', glyph: '🥈' },
    gold: { tone: 'warn', label: 'Gold', glyph: '🥇' },
    platinum: { tone: 'primary', label: 'Platinum', glyph: '💎' },
};
/**
 * DonorRow — **V4** "rally" design (web parity of the native V4). An elevated,
 * rounded donor / leaderboard row on a clean surface (no gradient): a leading
 * avatar in a soft-primary well, an optional rank, a bold donor name with a
 * glyph + labelled recognition-tier {@link Badge} (never color alone), an
 * optional gift-count chip, and a trailing bold lifetime-giving total (integer
 * cents → `formatMoney`). Anonymous donors show a generic label + placeholder
 * avatar. When `onClick` is set the whole row is a keyboard-activatable
 * `role="button"`. Identical props/behavior to {@link DonorRowProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
exports.DonorRowV4 = React.forwardRef(function DonorRowV4({ name, avatarUrl, totalCents, currency = 'USD', giftCount, tier, rank, anonymous = false, onClick, className, ...rest }, ref) {
    const displayName = anonymous ? 'Anonymous donor' : name;
    const tierMeta = tier ? TIER[tier] : null;
    const label = `${displayName}, ${(0, internal_1.formatMoney)(totalCents, currency)} donated${tierMeta ? `, ${tierMeta.label}` : ''}`;
    const container = 'flex items-center gap-md rounded-lg border border-border bg-surface text-on-surface shadow-md px-md py-sm';
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [typeof rank === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-lg text-center text-base font-extrabold text-muted", children: rank })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: anonymous ? undefined : name, src: anonymous ? undefined : avatarUrl, size: "sm" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: displayName }), tierMeta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: tierMeta.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: tierMeta.glyph, size: "xs", "aria-hidden": true }), tierMeta.label] })) : null] }), typeof giftCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex w-fit items-center gap-xs rounded-full bg-primary/10 px-sm py-px text-sm text-primary", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF81", size: "xs", "aria-hidden": true }), `${giftCount} gifts`] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, internal_1.formatMoney)(totalCents, currency) })] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": label, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: (0, cn_1.cn)(container, 'cursor-pointer text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": label, className: (0, cn_1.cn)(container, className), ...rest, children: inner }));
});
//# sourceMappingURL=DonorRowV4.js.map
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
exports.DonorRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
const TIER = {
    bronze: { tone: 'warn', label: 'Bronze' },
    silver: { tone: 'neutral', label: 'Silver' },
    gold: { tone: 'warn', label: 'Gold' },
    platinum: { tone: 'primary', label: 'Platinum' },
};
/**
 * Web parity of the native `DonorRow`: a donor list / leaderboard row —
 * optional rank, avatar, name, an optional recognition-tier badge, lifetime
 * giving (integer cents → `formatMoney`), and a gift count. Anonymous donors
 * show a generic label and a placeholder avatar. When `onClick` is set the row
 * is a `role="button"` target with keyboard activation. All colors come from the
 * `--xen-*` token classes — no literal colors.
 */
exports.DonorRow = React.forwardRef(function DonorRow({ name, avatarUrl, totalCents, currency = 'USD', giftCount, tier, rank, anonymous = false, onClick, className, ...rest }, ref) {
    const displayName = anonymous ? 'Anonymous donor' : name;
    const tierMeta = tier ? TIER[tier] : null;
    const label = `${displayName}, ${(0, internal_1.formatMoney)(totalCents, currency)} donated`;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [typeof rank === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-lg text-center text-base font-extrabold text-muted", children: rank })) : null, (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: anonymous ? undefined : name, src: anonymous ? undefined : avatarUrl, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: displayName }), tierMeta ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: tierMeta.tone, children: tierMeta.label }) : null] }), typeof giftCount === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF81", size: "xs", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `${giftCount} gifts` })] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, internal_1.formatMoney)(totalCents, currency) })] }));
    const rowClass = 'flex items-center gap-md rounded-md bg-surface px-md py-sm';
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": label, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: (0, cn_1.cn)(rowClass, 'cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": label, className: (0, cn_1.cn)(rowClass, className), ...rest, children: inner }));
});
//# sourceMappingURL=DonorRow.js.map
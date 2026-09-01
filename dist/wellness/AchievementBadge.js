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
exports.AchievementBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * AchievementBadge (web parity) — a medallion on a calm, clean surface card. When
 * earned, the medallion is a vivid brand gradient with the achievement glyph
 * (`color="onPrimary"`); when locked it falls back to a muted `bg-neutral-100`
 * disc with a lock (`text-muted`) and an optional progress caption. The
 * earned/locked state is carried by the label and the glyph, not by color alone.
 * Token-only colors — the reward gradient earns its saturation only once the
 * badge is unlocked.
 */
exports.AchievementBadge = React.forwardRef(function AchievementBadge({ title, description, glyph = '🏅', earned = false, progress, className, ...rest }, ref) {
    const pctLabel = progress != null ? `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%` : null;
    const a11y = `${title}, ${earned ? 'earned' : 'locked'}${!earned && pctLabel ? ', ' + pctLabel + ' complete' : ''}${description ? '. ' + description : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": a11y, "data-xen-achievement-badge": "", className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5', className), ...rest, children: [earned ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "2xl", color: "onPrimary" }) })) : ((0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "flex h-[72px] w-[72px] flex-col items-center justify-center gap-0.5 rounded-full bg-neutral-100", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD12", size: "xl", color: "muted" }), pctLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-muted", children: pctLabel }) : null] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-center text-base font-bold', earned ? 'text-on-surface' : 'text-muted'), children: title }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm text-muted", children: description }) : null] })] }));
});
//# sourceMappingURL=AchievementBadge.js.map
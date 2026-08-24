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
/** Token `border-*` class per tier. */
const TIER_CLASS = {
    bronze: 'border-warn',
    silver: 'border-muted',
    gold: 'border-accent',
    platinum: 'border-primary',
};
const SIZE_DIAMETER = { sm: 48, md: 64, lg: 84 };
/**
 * A gamification achievement badge: a tier-toned medallion with an icon, plus a
 * title / description. Locked achievements dim the medallion and overlay a lock
 * glyph (state is spoken, not color-only). Interactive badges are a
 * `role="button"` element with Enter/Space activation. Token-only colors
 * (`--xen-*`).
 */
exports.AchievementBadge = React.forwardRef(function AchievementBadge({ title, glyph = '🏆', tier = 'gold', unlocked = true, description, size = 'md', hideLabel = false, onSelect, className, ...rest }, ref) {
    const diameter = SIZE_DIAMETER[size];
    const a11y = `${title} achievement, ${tier} tier, ${unlocked ? 'unlocked' : 'locked'}`;
    const interactive = !!onSelect;
    const handleKeyDown = (e) => {
        if (!interactive)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? onSelect : undefined, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex flex-col items-center gap-1', interactive && 'cursor-pointer self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { width: diameter, height: diameter, fontSize: diameter * 0.42 }, className: (0, cn_1.cn)('flex items-center justify-center rounded-full border-[3px] bg-surface', unlocked ? TIER_CLASS[tier] : 'border-border opacity-50'), children: unlocked ? glyph : '🔒' }), !hideLabel ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm font-bold', unlocked ? 'text-on-surface' : 'text-muted'), children: title }), description ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-center text-xs text-muted", children: description }) : null] })) : null] }));
});
//# sourceMappingURL=AchievementBadge.js.map
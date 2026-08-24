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
exports.SpeakerCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
/**
 * SpeakerCard — **compact directory row** alternate design (web / React DOM).
 *
 * A small avatar beside a tight two-line name / role, with the rating and (at
 * most two) topic tags folded onto the trailing edge. No bio, no banner — the
 * densest speaker treatment, sized for long scrolling lists. Uses a minimal
 * hairline-bottom rule rather than a full card border. Same props as
 * {@link SpeakerCard} — a drop-in swap. Token-pure.
 */
exports.SpeakerCardV3 = React.forwardRef(function SpeakerCardV3({ name, role, company, avatarUrl, rating, tags = [], bio: _bio, variant: _variant, onClick, onKeyDown, className, ...rest }, ref) {
    const clickable = typeof onClick === 'function';
    const roleLine = [role, company].filter(Boolean).join(' · ');
    const shownTags = tags.slice(0, 2);
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-row items-center gap-md border-b border-border bg-surface px-md py-sm text-on-surface', clickable && 'cursor-pointer transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? name : undefined, ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), roleLine ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: roleLine }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end gap-xs", children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm" }) : null, shownTags.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-row gap-xs", children: shownTags.map((t, i) => ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", size: "sm", children: t }, `${t}-${i}`))) })) : null] })] }));
});
//# sourceMappingURL=SpeakerCardV3.js.map
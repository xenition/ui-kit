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
exports.SpeakerCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
/**
 * SpeakerCard — **centered profile hero** alternate design (web / React DOM).
 *
 * A soft primary-tinted top band with a large ringed `xl` avatar straddling it,
 * then the name, role, rating, bio and topic tags all centered beneath — an
 * elevated card built for a "meet the speaker" spotlight rather than a list row.
 * Ignores `variant` (always the hero form) so it stays visually one thing. Same
 * props as {@link SpeakerCard} — a drop-in swap. Token-pure.
 */
exports.SpeakerCardV2 = React.forwardRef(function SpeakerCardV2({ name, role, company, avatarUrl, bio, rating, tags = [], variant: _variant, onClick, onKeyDown, className, ...rest }, ref) {
    const clickable = typeof onClick === 'function';
    const roleLine = [role, company].filter(Boolean).join(' · ');
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface text-on-surface shadow-md', clickable &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? name : undefined, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 bg-primary/10" }), (0, jsx_runtime_1.jsxs)("div", { className: "-mt-9 flex flex-col items-center gap-sm px-lg pb-lg text-center", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "xl", ring: true }), (0, jsx_runtime_1.jsx)("p", { className: "font-heading text-xl font-extrabold text-on-surface", children: name }), roleLine ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-primary", children: roleLine }) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, bio ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-4 text-sm text-muted", children: bio }) : null, tags.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs flex flex-row flex-wrap justify-center gap-xs", children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: t }, `${t}-${i}`))) })) : null] })] }));
});
//# sourceMappingURL=SpeakerCardV2.js.map
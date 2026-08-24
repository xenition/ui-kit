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
exports.SpeakerCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
/**
 * Speaker profile card built on the `Avatar` and `Rating` primitives. `row`
 * lays the avatar beside the details for lists; `stacked` centers a larger
 * avatar for a profile header. Role and company collapse gracefully when
 * absent. Passing `onClick` makes the whole card an accessible button. Colors
 * come from the `--xen-*` tokens; no literal colors.
 */
exports.SpeakerCard = React.forwardRef(function SpeakerCard({ name, role, company, avatarUrl, bio, rating, tags = [], variant = 'row', onClick, onKeyDown, className, ...rest }, ref) {
    const stacked = variant === 'stacked';
    const clickable = typeof onClick === 'function';
    const roleLine = [role, company].filter(Boolean).join(' · ');
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('rounded-lg border border-border bg-surface text-on-surface', clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? name : undefined, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex gap-md p-lg', stacked ? 'flex-col items-center' : 'flex-row items-start'), children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: stacked ? 'lg' : 'md' }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-xs', stacked ? 'items-center text-center' : 'flex-1 items-start text-left'), children: [(0, jsx_runtime_1.jsx)("p", { className: "font-heading text-lg font-bold text-on-surface", children: name }), roleLine ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: roleLine }) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, bio ? (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm text-on-surface', stacked ? 'line-clamp-3' : 'line-clamp-2'), children: bio }) : null, tags.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-row flex-wrap gap-xs', stacked ? 'justify-center' : 'justify-start'), children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: t }, `${t}-${i}`))) })) : null] })] }) }));
});
//# sourceMappingURL=SpeakerCard.js.map
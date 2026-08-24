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
exports.ChildProfileCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const MOOD_META = {
    happy: { glyph: '😊', label: 'Happy' },
    excited: { glyph: '🤩', label: 'Excited' },
    calm: { glyph: '😌', label: 'Calm' },
    sad: { glyph: '😢', label: 'Sad' },
    tired: { glyph: '😴', label: 'Tired' },
    sick: { glyph: '🤒', label: 'Not well' },
};
/**
 * Header card for a single child: avatar/photo, name, an age·grade line, an
 * optional mood chip, and a wrapped strip of interest chips. When `onClick` is
 * set the card is an accessible `role="button"` with keyboard activation;
 * renders a muted skeleton while `loading`. Token-bound throughout — no literal
 * colors.
 */
exports.ChildProfileCard = React.forwardRef(function ChildProfileCard({ name, photoUrl, age, grade, birthday, mood, interests, loading = false, onClick, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-child-profile-card": "", "aria-label": "Loading child profile", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 w-14 shrink-0 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" })] })] }) }));
    }
    const moodMeta = mood ? MOOD_META[mood] : undefined;
    const subParts = [age, grade].filter((s) => !!s);
    const interactive = typeof onClick === 'function';
    const a11y = `${name}${age ? `, ${age}` : ''}${grade ? `, ${grade}` : ''}${moodMeta ? `, mood ${moodMeta.label}` : ''}`;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-child-profile-card": "", className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-xl font-bold text-on-surface", children: name }), subParts.length > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: subParts.join(' · ') })) : null, birthday ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["\uD83C\uDF82 ", birthday] }) : null] }), moodMeta ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: moodMeta.glyph, size: "xl" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: moodMeta.label })] })) : null] }), interests && interests.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-3 flex flex-wrap gap-1.5", children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: interest }, `${interest}-${i}`))) })) : null] }));
});
//# sourceMappingURL=ChildProfileCard.js.map
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
exports.ChildProfileCardV2 = void 0;
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
 * ChildProfileCard, redesigned (v2): a **banner hero card**. A primary-tinted
 * cover band carries a large centered avatar straddling its edge, with the name,
 * age·grade line, mood, and interest chips centered beneath. Elevated. Distinct
 * from v1's compact left-aligned row. Same props, token-only.
 */
exports.ChildProfileCardV2 = React.forwardRef(function ChildProfileCardV2({ name, photoUrl, age, grade, birthday, mood, interests, loading = false, onClick, className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-child-profile-card": "", "aria-label": "Loading child profile", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-16 bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2 p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "-mt-12 h-20 w-20 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 animate-pulse rounded-sm bg-neutral-200" })] })] }));
    }
    const moodMeta = mood ? MOOD_META[mood] : undefined;
    const subParts = [age, grade].filter((s) => !!s);
    const a11y = `${name}${age ? `, ${age}` : ''}${grade ? `, ${grade}` : ''}${moodMeta ? `, mood ${moodMeta.label}` : ''}`;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-child-profile-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface text-center shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-16 bg-primary/20" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 px-md pb-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "-mt-12 rounded-full border-4 border-surface", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xl font-bold text-on-surface", children: name }), subParts.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: subParts.join(' · ') }) : null, birthday ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["\uD83C\uDF82 ", birthday] }) : null, moodMeta ? ((0, jsx_runtime_1.jsxs)("span", { className: "mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-on-surface", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: moodMeta.glyph, size: "sm" }), " ", moodMeta.label] })) : null, interests && interests.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-2 flex flex-wrap justify-center gap-1.5", children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: interest }, `${interest}-${i}`))) })) : null] })] }));
});
//# sourceMappingURL=ChildProfileCardV2.js.map
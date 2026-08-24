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
exports.DoctorCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const AVAIL = {
    available: { glyph: '🟢', label: 'Available', tone: 'success' },
    busy: { glyph: '🟠', label: 'Busy', tone: 'warn' },
    off: { glyph: '⚪', label: 'Off', tone: 'neutral' },
};
/**
 * DoctorCard, redesigned (v2): a **banner profile card**. A primary-tinted cover
 * carries a large avatar straddling its edge; the name, specialty, rating,
 * credentials, and an availability badge center beneath, with a full-width Book
 * CTA. Elevated. Distinct from v1's compact row. Same props, token-only.
 */
exports.DoctorCardV2 = React.forwardRef(function DoctorCardV2({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel, className, ...rest }, ref) {
    const av = availability ? AVAIL[availability] : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-doctor-card": "", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface text-center shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 bg-primary/20" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 px-md pb-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "-mt-10 rounded-full border-4 border-surface", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-primary", children: specialty }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), typeof reviewCount === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["(", reviewCount, ")"] }) : null] })) : null, credentials ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: credentials }) : null, av ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: av.tone, children: `${av.glyph} ${av.label}` }) : null, onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "mt-1 w-full", disabled: availability === 'off', onClick: onBook, children: bookLabel ?? 'Book' })) : null] })] }));
});
//# sourceMappingURL=DoctorCardV2.js.map
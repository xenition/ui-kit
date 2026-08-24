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
exports.DoctorCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Rating_1 = require("../primitives/Rating");
const AVAIL_META = {
    available: { label: 'Available today', tone: 'success', glyph: '●' },
    busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
    off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};
/**
 * A clinician profile card for a provider directory — the web mirror of the
 * native `DoctorCard`. Shows the avatar, name, specialty, a star rating with
 * review count, an optional credential line, an availability badge (glyph +
 * label + tone), and a "Book" CTA. Composes `Card`, `Avatar`, `Rating`,
 * `Badge`, and `Button`; token-only colors. Informational UI only — not a
 * medical device.
 */
exports.DoctorCard = React.forwardRef(function DoctorCard({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel = 'Book', className, ...rest }, ref) {
    const meta = availability ? AVAIL_META[availability] : undefined;
    const a11y = `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-doctor-card": "", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatar, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: specialty }), credentials ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: credentials }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })) : null] }), rating != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating }), reviewCount != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [rating.toFixed(1), " (", reviewCount, ")"] })) : null] })) : null, onBook ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onClick: () => onBook(), children: bookLabel })) : null] }));
});
//# sourceMappingURL=DoctorCard.js.map
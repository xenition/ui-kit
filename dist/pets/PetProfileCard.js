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
exports.PetProfileCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const SPECIES_META = {
    dog: { glyph: '🐕', label: 'Dog' },
    cat: { glyph: '🐈', label: 'Cat' },
    bird: { glyph: '🐦', label: 'Bird' },
    rabbit: { glyph: '🐇', label: 'Rabbit' },
    reptile: { glyph: '🦎', label: 'Reptile' },
    fish: { glyph: '🐠', label: 'Fish' },
    other: { glyph: '🐾', label: 'Pet' },
};
const SEX_GLYPH = { male: '♂', female: '♀', unknown: '•' };
/**
 * Header card for a single pet: avatar/photo, name, species + breed, and a strip
 * of key stats (age, sex, weight) plus optional spay/neuter and microchip chips.
 * Becomes an activatable `role="button"` when `onClick` is set. Renders a muted
 * skeleton while `loading`. Every color traces to a `--xen-*` token — no literals.
 */
exports.PetProfileCard = React.forwardRef(function PetProfileCard({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onClick, className }, ref) {
    const meta = SPECIES_META[species];
    const base = 'flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading pet profile", "aria-busy": "true", className: (0, cn_1.cn)(base, className), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 w-14 rounded-full bg-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-1/2 rounded-[var(--xen-radius-sm)] bg-border" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 rounded-[var(--xen-radius-sm)] bg-border" })] })] }) }));
    }
    const stats = [];
    if (age)
        stats.push({ label: 'Age', value: age });
    if (sex)
        stats.push({ label: 'Sex', value: `${SEX_GLYPH[sex]} ${sex}` });
    if (weight)
        stats.push({ label: 'Weight', value: weight });
    const a11y = `${name}, ${breed ?? meta.label}${age ? `, ${age}` : ''}`;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)(base, interactive && 'cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-xl font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: [meta.glyph, " ", breed ?? meta.label] })] })] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-[var(--xen-space-xl)]", children: stats.map((s) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: s.label }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-on-surface", children: s.value })] }, s.label))) })) : null, fixed || microchipId ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: [fixed ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "\u2713 Spayed / neutered" }) : null, microchipId ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: `Chip …${microchipId.slice(-6)}` }) : null] })) : null] }));
});
//# sourceMappingURL=PetProfileCard.js.map
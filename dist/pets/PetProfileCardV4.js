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
exports.PetProfileCardV4 = void 0;
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
/** Frosted glass surface shared by the stat tiles and status chips. */
const FROST = 'border border-primary-50/30 bg-primary-50/15 text-primary-50';
/**
 * PetProfileCard — **V4** "companion" profile hero (web parity of the native
 * V4). This is the pets line's ONE reserved gradient moment: the pet header sits
 * on the brand gradient ground (`from-primary-500 to-primary-700`) with near-white
 * `primary-50`/`primary-100` ink, a frosted-ring avatar, an age/sex/weight strip
 * rendered as frosted glass tiles, and spay/microchip facts as frosted chips
 * (never color alone — each carries a glyph + label). Same props/behavior as
 * {@link PetProfileCardProps}; `species` drives the glyph + fallback label.
 * `loading` renders a frosted skeleton on the gradient. All colors from `--xen-*`
 * token classes (no literals); the whole card is a keyboard-activatable button
 * when `onClick` is set.
 */
exports.PetProfileCardV4 = React.forwardRef(function PetProfileCardV4({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onClick, className }, ref) {
    const meta = SPECIES_META[species];
    const base = 'flex flex-col gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50 shadow-md';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading pet profile", "aria-busy": "true", className: (0, cn_1.cn)(base, className), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 w-14 rounded-full bg-primary-50/20" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-1/2 rounded-[var(--xen-radius-sm)] bg-primary-50/20" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 rounded-[var(--xen-radius-sm)] bg-primary-50/15" })] })] }) }));
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)(base, interactive &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex shrink-0 rounded-full ring-2 ring-primary-50/40", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "truncate text-xl font-bold text-primary-50", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-primary-100", children: [meta.glyph, " ", breed ?? meta.label] })] })] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: stats.map((s) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-[64px] flex-col gap-[2px] rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', FROST), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: s.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-primary-50", children: s.value })] }, s.label))) })) : null, fixed || microchipId ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: [fixed ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-1 text-xs font-semibold', FROST), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2713" }), "Spayed / neutered"] })) : null, microchipId ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-1 text-xs font-semibold', FROST), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDD16" }), `Chip …${microchipId.slice(-6)}`] })) : null] })) : null] }));
});
//# sourceMappingURL=PetProfileCardV4.js.map
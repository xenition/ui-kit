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
exports.PetProfileCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const SPECIES_GLYPH = {
    dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐇', reptile: '🦎', fish: '🐟', other: '🐾',
};
/**
 * PetProfileCard, redesigned (v2): a **banner profile card**. A primary-tinted
 * cover carries a large avatar straddling its edge; the name (+ species glyph),
 * breed·age·sex·weight chips, a spayed/neutered success chip, and the microchip
 * id center beneath. Elevated. Distinct from v1's compact row. Same props,
 * token-only.
 */
exports.PetProfileCardV2 = React.forwardRef(function PetProfileCardV2({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onClick, className }, ref) {
    const interactive = typeof onClick === 'function';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-pet-profile-card": "", "aria-label": "Loading pet profile", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface shadow-md', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2 p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "-mt-10 h-20 w-20 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 animate-pulse rounded-sm bg-neutral-200" })] })] }));
    }
    const chips = [breed, age, sex, weight].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-pet-profile-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}, ${species}`, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface text-center shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 bg-primary/20" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 px-md pb-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "-mt-10 rounded-full border-4 border-surface", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsxs)("p", { className: "text-lg font-bold text-on-surface", children: [name, " ", (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: SPECIES_GLYPH[species] })] }), chips.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex flex-wrap justify-center gap-1.5", children: chips.map((c, i) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: c }, i))) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex flex-wrap justify-center gap-1.5", children: [fixed ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "Fixed" }) : null, microchipId ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDD16 ", microchipId.slice(0, 8)] }) : null] })] })] }));
});
//# sourceMappingURL=PetProfileCardV2.js.map
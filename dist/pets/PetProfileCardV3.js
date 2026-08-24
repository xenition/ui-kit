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
exports.PetProfileCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const SPECIES_GLYPH = {
    dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐇', reptile: '🦎', fish: '🐟', other: '🐾',
};
/**
 * PetProfileCard, redesigned (v3): a **compact profile row**. A small avatar, the
 * name (+ species glyph) over a breed·age·sex·weight summary, and a fixed chip on
 * the trailing edge — hairline-bordered for a pets list. The opposite of v2's
 * banner. Same props, token-only.
 */
exports.PetProfileCardV3 = React.forwardRef(function PetProfileCardV3({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onClick, className }, ref) {
    void microchipId;
    const interactive = typeof onClick === 'function';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-pet-profile-card": "", "aria-label": "Loading pet profile", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "h-9 w-9 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-200" })] }));
    }
    const summary = [breed, age, sex, weight].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-pet-profile-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}, ${species}`, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [name, " ", (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: SPECIES_GLYPH[species] })] }), summary.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: summary.join(' · ') }) : null] }), fixed ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "Fixed" }) : null] }));
});
//# sourceMappingURL=PetProfileCardV3.js.map
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
exports.LeagueBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TILE_SIZE = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-11 w-11 text-base',
};
const LABEL_SIZE = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};
function initials(name) {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    const joined = parts.map((w) => w[0]?.toUpperCase() ?? '').join('');
    return joined || '?';
}
/**
 * A league / competition crest — a small token-styled emblem (crest glyph or
 * derived initials) with an optional name label. Purely presentational and
 * dependency-free; the crest tile is a styled `div`, never an image fetch.
 * `variant` recolors from the primary slot / ramp tints; all colors resolve
 * from `--xen-*` token classes — no literals.
 */
exports.LeagueBadge = React.forwardRef(function LeagueBadge({ name, crest, label, size = 'md', variant = 'soft', className, ...rest }, ref) {
    const text = label === undefined ? name : label;
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const tileTone = solid
        ? 'bg-primary text-on-primary'
        : outline
            ? 'bg-surface text-primary border border-primary'
            : 'bg-primary-100 text-primary';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `${name} badge`, className: (0, cn_1.cn)('inline-flex items-center gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-md font-bold leading-none', TILE_SIZE[size], tileTone), children: crest ?? initials(name) }), text ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate font-semibold text-on-surface', LABEL_SIZE[size]), children: text })) : null] }));
});
//# sourceMappingURL=LeagueBadge.js.map
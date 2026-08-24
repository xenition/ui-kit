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
exports.SkillTag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** [background, foreground] token classes per variant — no literal colors. */
const VARIANT_CLASS = {
    default: 'bg-neutral-100 text-on-surface',
    matched: 'bg-success text-on-success',
    missing: 'bg-danger text-on-danger',
};
/**
 * A non-color signal so variant is not conveyed by color alone — a leading glyph
 * marker that survives for color-blind users and in monochrome.
 */
const MARKER = {
    default: '',
    matched: '✓ ',
    missing: '! ',
};
/**
 * A skill / keyword chip for job cards and résumé matching. Mirrors the
 * primitive `Tag` shape but adds a jobs-specific `variant` axis (`matched` /
 * `missing`) that pairs a token color with a leading glyph marker. Optionally
 * pressable (`onClick`) and removable (`onRemove`). Token-only.
 */
exports.SkillTag = React.forwardRef(function SkillTag({ label, variant = 'default', selected = false, onClick, onRemove, className, ...rest }, ref) {
    const chipClass = (0, cn_1.cn)('inline-flex items-center gap-xs self-start rounded-sm px-sm py-[3px] text-xs font-medium', VARIANT_CLASS[variant], selected && 'ring-2 ring-primary', className);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { children: [MARKER[variant], label] }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${label}`, onClick: (e) => {
                    e.stopPropagation();
                    onRemove();
                }, className: "ml-0.5 font-semibold opacity-70 transition-opacity hover:opacity-100", children: "\u00D7" })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, "data-xen-skill-tag": "", className: chipClass, ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "data-xen-skill-tag": "", "aria-label": label, "aria-pressed": selected, onClick: onClick, className: (0, cn_1.cn)(chipClass, 'transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'), ...rest, children: inner }));
});
//# sourceMappingURL=SkillTag.js.map
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
exports.WinLossBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const crm_v4_1 = require("./internal/crm-v4");
const internal_1 = require("./internal");
/**
 * **V4 win/loss badge** — the web twin of the native `WinLossBadgeV4`, same
 * props as {@link WinLossBadge} plus `outcomeLabels`.
 *
 * ## Four changes
 *
 * 1. **`size` is honoured.** It was destructured, read only in the `inline`
 *    branch and never forwarded to `Badge`, so `DealCard` passing `size="sm"`
 *    got an `sm` badge on native and an `md` one on web — from one prop, on
 *    one call.
 * 2. **The pill is the same pill on both twins.** Web took `Badge`'s `solid`
 *    default while native passed `variant="soft"`, so a won deal was a
 *    saturated green pill on one platform and a tinted chip on the other. This
 *    is the module's most repeated element; {@link BADGE_V4} decides it once.
 * 3. **The ink is the contrast-corrected slot.** The `inline` variant coloured
 *    its glyph and word with `text-${tone}` — a **fill** token spent as ink,
 *    which the theme makes no contrast promise about at all.
 * 4. **The four words are overridable.** `Won` / `Lost` / `Open` / `Pending`
 *    shipped as English inside the component.
 *
 * The outcome is still carried by a glyph **and** a word, so it survives
 * greyscale and colour blindness — that part of the base was right.
 */
exports.WinLossBadgeV4 = React.forwardRef(function WinLossBadgeV4({ outcome, variant = 'badge', size = 'md', hideLabel = false, outcomeLabels, className, ...rest }, ref) {
    const meta = internal_1.OUTCOME_META[outcome];
    // An outcome the table does not know is a frame around nothing.
    if (!meta)
        return null;
    const word = outcomeLabels?.[outcome] ?? meta.label;
    const label = `${word} deal`;
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": label, className: (0, cn_1.cn)('inline-flex items-center gap-xs', (0, crm_v4_1.toneInkClass)(meta.tone), size === 'sm' ? 'text-xs' : 'text-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), hideLabel ? null : (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: word })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { ref: ref, ...crm_v4_1.BADGE_V4, size: size, tone: meta.tone, role: "img", "aria-label": label, className: (0, cn_1.cn)('align-middle', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), hideLabel ? null : (0, jsx_runtime_1.jsx)("span", { children: word })] }));
});
//# sourceMappingURL=WinLossBadgeV4.js.map
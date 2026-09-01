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
exports.ListSeparatorV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * The leading inset: `44 + spacing.md`.
 *
 * 44 is the row's leading slot — the HIG tap-target floor and the house §8
 * badge size (BRIEF §4.3) — and it is one of the two bare numbers §1 allows
 * here; the other is the `1` of the hairline, which `h-px` supplies.
 * `spacing.md` is the row's leading-slot-to-text gap, so the sum is the row
 * title's leading edge, composed rather than measured.
 *
 * Written out in full, not built from a template, so the Tailwind scanner
 * picks it up from the library source — the `_tokens.ts` convention.
 */
const LEADING_ML = 'ml-[calc(44px+var(--xen-space-md))]';
/** Every spacing-token leading inset, one literal class each (same reason). */
const SPACE_ML = {
    xs: 'ml-[var(--xen-space-xs)]',
    sm: 'ml-[var(--xen-space-sm)]',
    md: 'ml-[var(--xen-space-md)]',
    lg: 'ml-[var(--xen-space-lg)]',
    xl: 'ml-[var(--xen-space-xl)]',
    '2xl': 'ml-[var(--xen-space-2xl)]',
};
/**
 * **V4 list separator** — the web twin the row family needed. `ListSeparator`
 * was native-only; BRIEF §4.4 and §5 add this one so a settings list and a
 * people list can be built the same way on both platforms.
 *
 * It is a hairline: `1px` of `colors.border` and nothing else (§4.4). It is
 * **not** a second `Divider` — it exists so `SettingsSection`, `SectionCard
 * divided` and any list of `ListRow`s stop hand-rolling
 * `<div className="h-px bg-border" />`, which both twins do today and which is
 * how the leading inset went missing in the first place.
 *
 * `inset="leading"` starts the rule at `44 + spacing.md`, clearing the row's
 * leading slot so the line aligns with the titles above and below it. Rows
 * with no leading slot take the flush rule (no `inset`).
 *
 * Decorative by construction: the rows either side already carry the list's
 * structure, so the rule is `aria-hidden` rather than a second `separator`
 * announced between every pair of items. That matches the native base, which
 * renders `accessible={false}`. When a rule genuinely *is* the boundary
 * between two regions, that is `DividerV4` and its `<hr>`.
 */
exports.ListSeparatorV4 = React.forwardRef(function ListSeparatorV4({ inset, className, ...rest }, ref) {
    const insetClass = inset === 'leading' ? LEADING_ML : inset !== undefined ? SPACE_ML[inset] : undefined;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-hidden": "true", className: (0, cn_1.cn)('h-px bg-border', insetClass, className), ...rest }));
});
//# sourceMappingURL=ListSeparatorV4.js.map
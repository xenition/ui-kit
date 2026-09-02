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
exports.BeneficiaryRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const coverage_v4_1 = require("./coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 beneficiary row** — same props as {@link BeneficiaryRow} plus
 * `allocationTotal`.
 *
 * ## Five changes
 *
 * 1. **Three rows at 50% no longer render three confident figures.** Each row
 *    clamped its own percentage to 0–100 and knew nothing about the others, so
 *    a set adding to 150% — or to 80% — printed as three (or two) perfectly
 *    calm numbers and the policyholder had no way to see that the estate would
 *    not distribute. Pass `allocationTotal` and every row in the set says so,
 *    in words, with the shortfall or the excess.
 * 2. **The row announces the allocation and the relationship.** `aria-label`
 *    sat on the element that also rendered the percentage, so ARIA replaced it
 *    — the row announced "Dana Reyes, Primary beneficiary, 40%" while the
 *    relationship, the one field that says *who this person is*, was never
 *    spoken at all. Both are folded into the name.
 * 3. **It is a real `<button>`, joined to the row family.** `pressableProps`
 *    made it a `div` with `role="button"` and a hand-written Enter/Space
 *    handler; the row now takes the shared height, the shared 44 leading slot
 *    and the shared state layer, so a beneficiary list and a claims list are
 *    the same object.
 * 4. **Press is a state layer, not `hover:opacity-80`** — dimming is M3's
 *    *disabled* signal — and focus is `ring-ring`, not the `ring-primary-300`
 *    ramp step.
 * 5. **The percentage is inked with an ink slot.** It was `text-primary`, the
 *    brand **fill**; the compiler guarantees contrast for `on-primary` against
 *    it, not for it against a card.
 */
exports.BeneficiaryRowV4 = React.forwardRef(function BeneficiaryRowV4({ name, relationship, allocationPct, kind = 'primary', avatarUrl, allocationTotal, formatUnbalanced, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    if (!name)
        return null;
    // The row's own share goes through the shared reader; the set's total is
    // summed by whatever renders the list (with the same helper) and handed down,
    // because a row cannot see its siblings.
    const share = (0, coverage_v4_1.allocationParts)([allocationPct]).shares[0] ?? 0;
    const kindLabel = tone_v4_1.BENEFICIARY_KIND_LABEL[kind];
    const interactive = onClick != null;
    const total = allocationTotal != null && Number.isFinite(allocationTotal)
        ? Math.round(allocationTotal)
        : undefined;
    const remainder = total != null ? total - 100 : 0;
    const wordImbalance = formatUnbalanced ??
        ((over, sum) => over > 0
            ? `Allocations total ${(0, tone_v4_1.percentText)(sum)} — ${(0, tone_v4_1.percentText)(over)} over`
            : `Allocations total ${(0, tone_v4_1.percentText)(sum)} — ${(0, tone_v4_1.percentText)(-over)} unallocated`);
    const imbalance = total == null || remainder === 0 ? undefined : wordImbalance(remainder, total);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "md", alt: "" }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: name }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted-text", children: [kindLabel, relationship != null && relationship !== '' ? ` · ${relationship}` : ''] })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: (0, tone_v4_1.percentText)(share) }), imbalance != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-warn-text", children: imbalance })) : null] })] }));
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true), (0, row_v4_1.rowGroundClass)(false));
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-row": "", className: (0, cn_1.cn)(rowClass, className), ...rest, children: content }));
    }
    // The activation is the row; the row's own element stays a plain `div`, so a
    // control added here later is its sibling rather than a button inside a
    // button.
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                name,
                relationship,
                `${kindLabel} beneficiary`,
                `${(0, tone_v4_1.percentText)(share)} allocation`,
                imbalance,
            ]), onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(rowClass, 'rounded-[var(--xen-radius-md)]', tone_v4_1.FOCUS_RING_CLASS), children: content }) }));
});
//# sourceMappingURL=BeneficiaryRowV4.js.map
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
exports.LeadRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const money_1 = require("../commerce/money");
const crm_v4_1 = require("./internal/crm-v4");
const internal_1 = require("./internal");
/**
 * **V4 lead row** — the web twin of the native `LeadRowV4`, same props as
 * {@link LeadRow} plus `scoreLabel` and `formatScore`.
 *
 * ## Six changes
 *
 * 1. **The score badge stops being coloured by temperature.** It took its tone
 *    from `TEMPERATURE_META`, so a lead scored **5** rendered a `danger` badge
 *    purely because the lead was `hot` — the colour said nothing whatever about
 *    the number inside it, and it spent a status tone on an identity. The badge
 *    is neutral; temperature keeps its own glyph and its own word.
 * 2. **The score carries a unit.** `72` on its own is not a quantity of
 *    anything; the reader hears "Score 72".
 * 3. **`selected` is announced and drawn as more than a border colour.** A 1px
 *    accent edge is exactly the colour-alone signal the line forbids, and
 *    nothing reached assistive tech at all.
 * 4. **The row is a `button` only when it is interactive.** Native announced a
 *    plain row as a **disabled button**, because the role was unconditional and
 *    `disabled` was tied to the missing handler.
 * 5. **The temperature label fits.** "Warm" at 12px does not fit a 28px column
 *    and nothing truncated it, so it spilled. The column is the 44 target
 *    width and the label is allowed to sit in it.
 * 6. **One accessible name, money is tabular, and a press is a state layer.**
 */
exports.LeadRowV4 = React.forwardRef(function LeadRowV4({ name, company, temperature, valueCents, currency = 'USD', score, avatarUrl, selected = false, scoreLabel = 'Score', formatScore, onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!name)
        return null;
    const meta = internal_1.TEMPERATURE_META[temperature];
    const clamped = (0, crm_v4_1.clampPercent)(score);
    const points = clamped != null ? Math.round(clamped) : undefined;
    const scoreText = points != null ? (formatScore ?? String)(points) : undefined;
    const money = valueCents != null ? (0, money_1.formatMoney)(valueCents, currency) : undefined;
    const label = (0, crm_v4_1.spokenLine)([
        meta.label,
        name,
        company,
        money,
        scoreText != null ? `${scoreLabel} ${scoreText}` : undefined,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 flex-col items-center', (0, crm_v4_1.toneInkClass)(meta.tone)), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold", children: meta.label })] }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", name: name, src: avatarUrl, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: name }), company ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: company }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 flex-col items-end gap-xs", children: [money ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold text-on-surface', crm_v4_1.TABULAR_CLASS), children: money })) : null, scoreText != null ? (
                    // Neutral: the badge prints a number, and the number's own colour has
                    // to mean nothing.
                    (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: "neutral", "aria-hidden": "true", children: scoreText })) : null] })] }));
    const ground = selected ? 'bg-selected text-on-selected border-primary' : 'bg-surface border-border';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full', className), ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, "aria-selected": selected, onClick: onClick, "data-xen-v4-state": "", style: 
            // The opaque pair the row actually wears, selected or not.
            (0, v4_state_1.stateGroundVars)(selected ? 'var(--xen-selected)' : 'var(--xen-surface)', selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] border px-sm py-sm text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS, ground), children: body })) : ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] border px-sm py-sm', ground), children: [body, scoreText != null ? ((0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: `${scoreLabel} ${scoreText}` })) : null] })) }));
});
//# sourceMappingURL=LeadRowV4.js.map
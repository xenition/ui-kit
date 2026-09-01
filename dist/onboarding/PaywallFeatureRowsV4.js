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
exports.PaywallFeatureRowsV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const icon_names_1 = require("../primitives/icon-names");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * Below this many rows the connecting rail is off by default: two badges
 * joined by a line read as a diagram of something, and there is nothing to
 * diagram. At three or more the rail is what makes the rows read as one list
 * rather than three fragments (spec §8).
 */
const RAIL_MIN_ROWS = 3;
/**
 * **V4 feature rows** — the web twin of the native `PaywallFeatureRowsV4`,
 * same props as {@link PaywallFeatureRows} plus `accent` and `numbered`.
 *
 * The §8 anatomy, and the component the reference welcome-offer screen is
 * mostly made of: a circular tinted badge, a semibold title, a muted
 * description, and a hairline rail joining the badges into one list.
 *
 * ## Four changes
 *
 * 1. **The tint is mixed, not ramped.** `bg-primary-50` carries the light
 *    orientation in both schemes, so the base's badge was a near-white circle
 *    on a dark page.
 * 2. **The rail is `aria-hidden`.** It is decoration between two badges and it
 *    was reaching the accessibility tree as an empty element in each row.
 * 3. **`numbered`** — the same rows as an ordered list.
 * 4. **Descriptions take `muted-text`.** `muted` carries no contrast promise,
 *    and this is the copy carrying the value proposition.
 *
 * **Renders nothing for an empty `rows`** (§4.5) — a heading with no list under
 * it is worse than no section.
 */
exports.PaywallFeatureRowsV4 = React.forwardRef(function PaywallFeatureRowsV4({ rows, heading, rail, dense = false, accent = 'primary', numbered = false, className, style, ...rest }, ref) {
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0)
        return null;
    const showRail = rail ?? list.length >= RAIL_MIN_ROWS;
    const pad = dense ? 'pb-sm' : 'pb-md';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: { ...(0, flow_v4_1.flowGroundVars)('plain', accent), ...style }, className: (0, cn_1.cn)('flex w-full flex-col gap-sm', className), ...rest, children: [heading ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", children: heading })) : null, (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col", children: list.map((row, i) => {
                    const last = i === list.length - 1;
                    const glyph = row.icon;
                    return ((0, jsx_runtime_1.jsxs)("li", { className: (0, cn_1.cn)('flex items-stretch', !last && pad), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-[var(--flow-badge)] text-[var(--flow-ink)]", children: (0, jsx_runtime_1.jsx)(BadgeMark, { glyph: glyph, index: i, numbered: numbered, title: row.title }) }), showRail && !last ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, "data-testid": "xen-paywall-rail", className: "mt-xs w-px flex-1 bg-border" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs pl-md", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: row.title }), row.description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: row.description })) : null] })] }, row.id ?? row.title));
                }) })] }));
});
/**
 * The badge's contents: the row's 1-based index when `numbered`, the named
 * icon when the glyph is one of the kit's names, and the raw glyph otherwise.
 *
 * Split out because the three-way choice inside the list's JSX was the one
 * place this component stopped being readable.
 */
function BadgeMark({ glyph, index, numbered, title, }) {
    if (numbered) {
        return ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold [font-variant-numeric:tabular-nums]", children: index + 1 }));
    }
    if (glyph && (0, icon_names_1.isIconName)(glyph))
        return (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: glyph, size: "lg" });
    return (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph ?? '✦', size: "lg", "aria-label": glyph ? undefined : title });
}
//# sourceMappingURL=PaywallFeatureRowsV4.js.map
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
exports.HarvestLogV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const EmptyStateV4_1 = require("../commerce/EmptyStateV4");
const farm_v4_1 = require("./internal/farm-v4");
/**
 * **V4 harvest log** — the web twin of the native `HarvestLogV4`, same props as
 * {@link HarvestLog} plus `totalLabel` and `formatRemaining`.
 *
 * ## Four changes
 *
 * 1. **The total is labelled.** The base rendered it as a bare figure in the
 *    header, so the most important number on the card had nothing saying what
 *    it counted.
 * 2. **Quantities are tabular**, which is the only way a log of harvests reads
 *    as a column rather than as ragged text — with proportional figures `40`
 *    and `1,180` have no shared edge.
 * 3. **The rows are a real `<ul>`**, so a screen reader announces "list, 6
 *    items" instead of walking six anonymous divs.
 * 4. **Captions take `muted-text`**, and the empty state is `EmptyStateV4`.
 *
 * A `maxRows` cap still truncates the list and says how many were hidden.
 */
exports.HarvestLogV4 = React.forwardRef(function HarvestLogV4({ entries, title = 'Harvest log', total, totalLabel = 'Total', maxRows, emptyTitle = 'No harvests logged', emptyDescription = 'Recorded harvests will appear here.', formatRemaining, className, ...rest }, ref) {
    const list = Array.isArray(entries) ? entries : [];
    const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
    const remaining = list.length - visible.length;
    const more = formatRemaining ?? ((n) => `+${n} more`);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-harvest-log": "", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83E\uDDFA", size: "base" }), (0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 text-base font-semibold text-on-card", children: title }), total != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: totalLabel }), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]", children: total })] })) : null] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDF3E", size: "2xl" }), title: emptyTitle, description: emptyDescription })) : ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("ul", { children: visible.map((entry, i) => {
                            const last = i === visible.length - 1 && remaining <= 0;
                            return ((0, jsx_runtime_1.jsxs)("li", { className: (0, cn_1.cn)('flex items-center gap-sm py-sm', !last && 'border-b border-border'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-card", children: entry.crop }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted-text", children: (0, farm_v4_1.metaLine)([entry.field, entry.date]) })] }), entry.grade != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "outline", size: "sm", children: entry.grade })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-sm font-bold text-on-card [font-variant-numeric:tabular-nums]", children: String(entry.quantity) }), entry.unit != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: entry.unit })) : null] })] }, entry.id ?? `harvest-${i}`));
                        }) }), remaining > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-xs text-xs text-muted-text", children: more(remaining) })) : null] }))] }));
});
//# sourceMappingURL=HarvestLogV4.js.map
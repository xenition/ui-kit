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
exports.ClaimTimelineV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const format_1 = require("./internal/format");
const coverage_v4_1 = require("./coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
const KIND_META = {
    filed: { label: 'Filed', glyph: '📄' },
    note: { label: 'Adjuster note', glyph: '📝' },
    document: { label: 'Document request', glyph: '📎' },
    payment: { label: 'Payment', glyph: '💰' },
    decision: { label: 'Decision', glyph: '⚖️' },
};
/** How many placeholder entries a loading timeline draws by default. */
const SKELETON_ROWS = 3;
/**
 * **V4 claim timeline** — dated claim activity: filings, adjuster notes,
 * document requests, payments and decisions. New in V4; there is no base. The
 * web twin of the native `ClaimTimelineV4`, whose prop shape is canonical.
 *
 * ## Why it exists, and the four things it does that the module did not
 *
 * `ClaimStatusTracker` is the whole of what this module could say about a
 * claim in progress: four fixed stages and one `updated` string. So the answer
 * to "why is this taking three weeks" was a numeral in a circle, and the
 * answer to "why was it denied" was a sentence the component **made up** —
 * *"Reviewed after filing. Contact your agent to appeal."* — because there was
 * nowhere for a real reason to live. This is that place.
 *
 * 1. **A reason belongs to the event that produced it.** A denial is a dated
 *    decision with a body and an author, not a status flag; a payment is a
 *    dated amount; a document request is a dated ask. All three are the same
 *    shape and the tracker had room for none of them. `date` is required for
 *    the same reason the reason is: an undated claim event tells the claimant
 *    nothing about whether anyone is still working on it.
 * 2. **Every entry is one accessible name.** The rest of the module names a
 *    row and then renders the money inside it, so ARIA drops the money. Here
 *    the kind, the date, the actor, the title, the amount and the body are
 *    folded into one name, joined with commas.
 * 3. **The kind is a glyph, not a colour.** A note, a payment and a filing are
 *    categories; spending `success` on a payment would say a payment is good
 *    news, which — on a claim that settled for a third of the estimate — it is
 *    not. Only an adverse `outcome` takes a status colour, and it takes it
 *    because it is a status.
 * 4. **Empty and loading are real.** An empty timeline says so and says what
 *    happens next; loading draws the entries it is about to show rather than a
 *    spinner that collapses the page and then jumps.
 */
exports.ClaimTimelineV4 = React.forwardRef(function ClaimTimelineV4({ items, title = 'Claim activity', currency = 'USD', loadingLabel = 'Loading claim activity', emptyLabel = 'No claim activity yet', emptyDescription, formatMoney: format = format_1.formatMoney, loading = false, skeletonRows = SKELETON_ROWS, kindLabels, testID, className, ...rest }, ref) {
    // An entry with no date or no title is not an event, and rendering the
    // half of it that survived is how a timeline starts asserting things.
    const list = (Array.isArray(items) ? items : []).filter((entry) => entry?.date != null && entry?.title != null);
    if (loading) {
        const rows = Math.max(1, Math.floor(Number.isFinite(skeletonRows) ? skeletonRows : 1));
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-testid": testID, role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: Array.from({ length: rows }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(tone_v4_1.SKELETON_CLASS, 'h-xl w-xl shrink-0 rounded-full') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(tone_v4_1.SKELETON_CLASS, 'h-3 w-1/4') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(tone_v4_1.SKELETON_CLASS, 'h-4 w-2/3') })] })] }, index))) }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-testid": testID, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-testid": testID, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("ol", { "aria-label": title, className: "flex flex-col gap-md", children: list.map((entry, index) => {
                const kind = entry.kind ?? 'note';
                const meta = KIND_META[kind] ?? KIND_META.note;
                const kindLabel = kindLabels?.[kind] ?? meta.label;
                const adverse = entry.outcome != null && (0, coverage_v4_1.isAdverse)(entry.outcome);
                const tone = adverse ? 'danger' : 'neutral';
                const amount = (0, tone_v4_1.moneyParts)(entry.amountCents, currency, format);
                return (
                // One name for the whole entry: ARIA drops the children of a
                // named element, and the children here are the entry.
                (0, jsx_runtime_1.jsxs)("li", { "aria-label": (0, tone_v4_1.spokenLine)([
                        kindLabel,
                        entry.date,
                        entry.title,
                        entry.actor,
                        entry.outcome,
                        amount?.text,
                        entry.detail,
                    ]), className: "flex items-start gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] text-sm', (0, tone_v4_1.toneInkClass)(tone)), style: (0, tone_v4_1.toneGroundStyle)(tone), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', tone_v4_1.TABULAR_CLASS), children: (0, tone_v4_1.metaLine)([entry.date, kindLabel, entry.actor]) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-card", children: entry.title }), entry.detail != null && entry.detail !== '' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', adverse ? 'text-danger-text' : 'text-muted-text'), children: entry.detail })) : null] }), amount ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-sm font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: amount.text })) : null] }, entry.id ?? `${entry.date}-${index}`));
            }) }) }));
});
//# sourceMappingURL=ClaimTimelineV4.js.map
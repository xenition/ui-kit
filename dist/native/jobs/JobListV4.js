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
exports.JobListV4 = JobListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** An empty list still owes the reader a next step. */
const EMPTY_DESCRIPTION = 'Try removing a filter or widening your search.';
/**
 * **V4 job list** — a new component. There is no base to extend, so the props
 * are plain `JobListV4Props`.
 *
 * ## Why it exists
 *
 * Every component in this module is written as one item out of a list, and the
 * module never had the list. So the three things a results screen owes its
 * user had nowhere to live:
 *
 * 1. **An empty state that says something.** A job search that matches nothing
 *    is the most common outcome of a filter, and it currently renders a blank
 *    region — indistinguishable from a request that failed. `JobFilterBarV4`
 *    can announce `resultCount={0}`, but a count in a corner is not an answer;
 *    the space where the jobs would be is where the reader is looking.
 * 2. **A loading state in the shape it is about to be.** Placeholder cards the
 *    size of the real ones, opaque and mixed against the card's own ground —
 *    never a centred spinner that collapses the layout and then jumps when the
 *    jobs arrive. `JobCardV4` has its own skeleton for a single card; this is
 *    the set of them, so the page does not reflow twice.
 * 3. **The count, drawn once and said once.** It is drawn beside the heading
 *    for the sighted reader and hidden from the screen reader there, because
 *    the list below already carries it as its accessible name.
 *
 * The rows are children rather than a `data`/`renderItem` pair on purpose: the
 * kit is presentational, and a list that owned its own virtualisation would be
 * making a data decision for the app.
 */
function JobListV4({ title, children, loading = false, skeletonRows = 3, formatCount, emptyLabel = 'No jobs found', emptyDescription = EMPTY_DESCRIPTION, loadingLabel = 'Loading jobs', testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const rows = React.Children.toArray(children).filter(Boolean);
    const countText = (formatCount ?? ((n) => `${n} job${n === 1 ? '' : 's'}`))(rows.length);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    // A count over skeletons is a guess, and an empty list's own state already
    // says there is nothing there.
    const showCount = !loading && rows.length > 0;
    const header = title ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "header", style: { flexShrink: 1 }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: title }) }), showCount ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: countText }) })) : null] })) : null;
    if (loading) {
        const placeholders = Math.max(1, Math.floor(Number.isFinite(skeletonRows) ? skeletonRows : 3));
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, accessibilityLiveRegion: "polite", style: { gap: tokens.spacing.sm }, children: Array.from({ length: placeholders }, (_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tone_v4_1.cardSurfaceStyle)(theme), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, { width: tap, height: tap, round: true }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, {
                                                    width: '70%',
                                                    height: tokens.typography.scale.base,
                                                }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, {
                                                    width: '45%',
                                                    height: tokens.typography.scale.sm,
                                                }) })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, { width: '30%', height: tokens.spacing.lg }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, { width: '25%', height: tokens.spacing.lg }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBarStyle)(theme, {
                                    width: '55%',
                                    height: tokens.typography.scale.sm,
                                }) })] }, i))) })] }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [header, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: countText, style: { gap: tokens.spacing.sm }, children: rows })] }));
}
//# sourceMappingURL=JobListV4.js.map
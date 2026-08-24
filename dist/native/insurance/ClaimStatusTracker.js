"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimStatusTracker = ClaimStatusTracker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/** Happy-path stages, in order. `denied` branches off `review`. */
const HAPPY_PATH = [
    { title: 'Filed' },
    { title: 'In review' },
    { title: 'Approved' },
    { title: 'Paid' },
];
/**
 * A stage tracker for a single claim. The happy path (Filed → In review →
 * Approved → Paid) reuses the `Steps` primitive, with `current` derived from the
 * status descriptor (`paid` marks every stage done). A `denied` claim branches
 * off the review stage and renders a distinct `danger`-toned banner conveyed by
 * **glyph + text + color** — never color alone. Token-bound throughout.
 */
function ClaimStatusTracker({ status, updated, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.claimStatus)(status);
    if (status === 'denied') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Claim denied", style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.sm,
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: colors.danger,
                        backgroundColor: (0, format_1.withAlpha)(colors.danger, 0.1),
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                    }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, color: "danger", accessibilityLabel: "Denied" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Claim denied" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Reviewed after filing. Contact your agent to appeal." })] })] }), updated != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Updated ", updated] })) : null] }));
    }
    // `paid` (step 3) marks the final stage done too → current past the last index.
    const current = status === 'paid' ? HAPPY_PATH.length : sd.step;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(primitives_2.Steps, { steps: HAPPY_PATH, current: current }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLabel: `Claim status: ${sd.label}`, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: [sd.glyph, " ", sd.label, updated != null ? ` · Updated ${updated}` : ''] })] }));
}
//# sourceMappingURL=ClaimStatusTracker.js.map
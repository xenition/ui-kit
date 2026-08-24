"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractClause = ContractClause;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A single contract clause: section number, heading, and (when expanded) body,
 * with negotiation-status and risk pills (each a glyph + word so state never
 * rests on color alone). A flagged / high-risk clause gets a token-tinted left
 * rail for scannability. Tapping toggles the body via `onToggle`. All colors are
 * theme tokens — no literals.
 */
function ContractClause({ number, title, body, status, risk, expanded = false, variant = 'default', onToggle, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    // Risk/flag drives a token-tinted accent rail; default rail is the border.
    const railTone = risk === 'high' || status === 'flagged'
        ? 'danger'
        : risk === 'medium' || status === 'negotiate'
            ? 'warn'
            : status === 'agreed'
                ? 'success'
                : 'neutral';
    const railColor = (0, internal_1.toneColor)(colors, railTone);
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: railTone === 'neutral' ? colors.surface : (0, color_1.withAlpha)(railColor, 0.06),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 3, borderRadius: tokens.radius.full, backgroundColor: railColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [number ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: number })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact && !expanded ? 1 : undefined, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title })] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CLAUSE_STATUS_META[status], size: "sm" }) : null] }), risk ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CLAUSE_RISK_META[risk], variant: "inline", size: "sm" }) : null, expanded && body ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, lineHeight: tokens.typography.scale.xs * 1.5 }, children: body })) : null] })] }));
    if (onToggle && body) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded }, accessibilityLabel: `${expanded ? 'Collapse' : 'Expand'} clause ${title}`, onPress: () => onToggle(!expanded), testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=ContractClause.js.map
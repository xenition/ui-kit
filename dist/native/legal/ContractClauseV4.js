"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractClauseV4 = ContractClauseV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * ContractClause — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow and a token-tinted left rail that keys
 * off risk / flag state, a section-number eyebrow over the heading, negotiation
 * and risk pills (each a glyph + word so state never rests on color alone), and —
 * when expanded — the body. When `onToggle` + `body` are set the clause is a
 * tappable `role="button"` with expand/collapse. Reuses the base `variant`
 * (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
function ContractClauseV4({ number, title, body, status, risk, expanded = false, variant = 'default', onToggle, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const railTone = risk === 'high' || status === 'flagged'
        ? 'danger'
        : risk === 'medium' || status === 'negotiate'
            ? 'warn'
            : status === 'agreed'
                ? 'success'
                : 'neutral';
    const railColor = railTone === 'neutral' ? colors.border : (0, internal_1.toneColor)(colors, railTone);
    const interactive = Boolean(onToggle) && Boolean(body);
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        flexDirection: 'row',
        gap: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, alignSelf: 'stretch', borderRadius: tokens.radius.full, backgroundColor: railColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [number ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: number }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact && !expanded ? 1 : undefined, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title })] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CLAUSE_STATUS_META[status], variant: "soft", size: "sm" }) : null] }), risk ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CLAUSE_RISK_META[risk], variant: "inline", size: "sm" }) : null, expanded && body ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, lineHeight: tokens.typography.scale.xs * 1.5 }, children: body }) : null] })] }));
    if (interactive) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded }, accessibilityLabel: `${expanded ? 'Collapse' : 'Expand'} clause ${title}`, onPress: () => onToggle?.(!expanded), testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, style], children: content });
}
//# sourceMappingURL=ContractClauseV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProofRowV4 = ClientProofRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Badge_1 = require("../primitives/Badge");
const color_1 = require("../primitives/internal/color");
const DECISION = {
    pending: { label: 'Pending', tone: 'neutral', glyph: '⏳' },
    approved: { label: 'Approved', tone: 'success', glyph: '✅' },
    rejected: { label: 'Rejected', tone: 'danger', glyph: '⛔' },
};
/**
 * ClientProofRow — **V4** "studio" design (native parity of the web V4). The
 * matted proofing row: an elevated clean-surface row whose thumbnail floats
 * inside a thin neutral **mat** (a soft-primary selection ring when picked for a
 * batch), a bold filename, and a labelled decision `Badge` carrying glyph + token
 * tone + label (never color alone). While `pending` the base's approve/reject
 * actions render as trailing `Button`s. The row body is a keyboard/press
 * `checkbox` when `onToggleSelect` is provided (selection carries an
 * accessibility `checked` state, never color alone). Identical props/behavior to
 * {@link ClientProofRowProps}; token-only colors via `useXenitionTheme()`.
 */
function ClientProofRowV4({ filename, thumbUrl, decision = 'pending', selected = false, onToggleSelect, onApprove, onReject, approveLabel = 'Approve', rejectLabel = 'Reject', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = DECISION[decision];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    backgroundColor: tokens.ramps.neutral[100],
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected ? colors.accent : colors.border,
                }, children: thumbUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbUrl }, accessible: false, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDDBC" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: filename }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })] })] }));
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const actions = decision === 'pending' && (onApprove || onReject) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [onReject ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", tone: "danger", onPress: onReject, children: rejectLabel })) : null, onApprove ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", tone: "success", onPress: onApprove, children: approveLabel })) : null] })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: rowStyle, children: [onToggleSelect ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: selected }, accessibilityLabel: `${filename}, ${meta.label}`, onPress: onToggleSelect, style: ({ pressed }) => [
                    {
                        flex: 1,
                        borderRadius: tokens.radius.md,
                        backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.1) : 'transparent',
                    },
                ], children: body })) : (body), actions] }));
}
//# sourceMappingURL=ClientProofRowV4.js.map
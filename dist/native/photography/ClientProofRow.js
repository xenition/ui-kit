"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProofRow = ClientProofRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Badge_1 = require("../primitives/Badge");
const DECISION = {
    pending: { label: 'Pending', tone: 'neutral' },
    approved: { label: 'Approved', tone: 'success' },
    rejected: { label: 'Rejected', tone: 'danger' },
};
/**
 * A client-proofing row — thumbnail, filename, and a decision `Badge`, with
 * approve/reject actions while the proof is `pending`. The row body is a
 * `checkbox` when `onToggleSelect` is provided (selection carries an
 * accessibility `checked` state, never color alone). Composes `Button` and
 * `Badge`. Token-only colors.
 */
function ClientProofRow({ filename, thumbUrl, decision = 'pending', selected = false, onToggleSelect, onApprove, onReject, approveLabel = 'Approve', rejectLabel = 'Reject', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = DECISION[decision];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.sm,
                    overflow: 'hidden',
                    backgroundColor: tokens.ramps.neutral[100],
                    borderWidth: selected ? 2 : 0,
                    borderColor: selected ? colors.accent : 'transparent',
                }, children: thumbUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbUrl }, accessible: false, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: filename }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] })] }));
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    const actions = decision === 'pending' && (onApprove || onReject) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [onReject ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", tone: "danger", onPress: onReject, children: rejectLabel })) : null, onApprove ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", tone: "success", onPress: onApprove, children: approveLabel })) : null] })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: rowStyle, children: [onToggleSelect ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: selected }, accessibilityLabel: `${filename}, ${meta.label}`, onPress: onToggleSelect, style: ({ pressed }) => [{ flex: 1, opacity: pressed ? 0.9 : 1 }], children: body })) : (body), actions] }));
}
//# sourceMappingURL=ClientProofRow.js.map
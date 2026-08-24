"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitStatusV3 = PermitStatusV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * PermitStatus, alternate design **V3** — a compact status pill row. The permit
 * title / number ride the left of a single line, and the current status reads
 * as one glyph + text + color pill on the right (a `denied` permit shows the
 * danger-toned pill; `role="alert"` is preserved). An optional updated-date sits
 * below. Dense enough for a permits list. Same `PermitStatusProps`; drops in for
 * `PermitStatus`. Token-pure.
 */
function PermitStatusV3({ status, permitNumber, title, updatedDate, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.permitStatus)(status);
    const denied = status === 'denied';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: "Loading permit status", style: [
                { height: 44, borderRadius: tokens.radius.md, backgroundColor: (0, format_1.withAlpha)(colors.muted, 0.14) },
                style,
            ] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ paddingVertical: tokens.spacing.sm, gap: 2 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [title != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title })) : null, permitNumber != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: permitNumber })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { ...(denied ? { accessibilityRole: 'alert' } : {}), children: (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }) })] }), updatedDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Updated ", updatedDate] })) : null] }));
}
//# sourceMappingURL=PermitStatusV3.js.map
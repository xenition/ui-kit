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
exports.PolicyAcknowledge = PolicyAcknowledge;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A policy-acknowledgement card: title, version, effective date and a summary,
 * with a consent checkbox and an acknowledge action. Status is a glyph + word
 * pill (acknowledged → success, overdue → danger, never color alone). Once
 * acknowledged the control collapses to a confirmation line with the date. The
 * acknowledge button stays disabled until consent is checked. `compact` drops
 * the summary. All colors are theme tokens — no literals.
 */
function PolicyAcknowledge({ title, version, effectiveDate, summary, status, acknowledged = false, acknowledgedDate, consentLabel = 'I have read and agree to this policy', variant = 'default', onToggle, onAcknowledge, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const derivedStatus = status ?? (acknowledged ? 'acknowledged' : 'pending');
    const [consented, setConsented] = React.useState(false);
    const meta = [version, effectiveDate ? `Effective ${effectiveDate}` : null].filter(Boolean).join('  ·  ');
    const handleToggle = (next) => {
        setConsented(next);
        onToggle?.(next);
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], testID: testID, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.POLICY_STATUS_META[derivedStatus], size: "sm" })] }), !compact && summary ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 4, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: summary })) : null, acknowledged ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\u2713 Acknowledged", acknowledgedDate ? ` on ${acknowledgedDate}` : ''] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: consented, onCheckedChange: handleToggle, accessibilityLabel: consentLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: consentLabel })] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", disabled: !consented, onPress: onAcknowledge, children: "Acknowledge" })] }))] }));
}
//# sourceMappingURL=PolicyAcknowledge.js.map
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
exports.ReportListing = ReportListing;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * A report-a-listing form — a single-select list of reasons plus a details
 * field that becomes required when the chosen reason sets `requiresDetails`.
 * Reasons render as radios (selection carried by an accent ring, a filled dot,
 * and the a11y `selected` state — not color alone); submit is disabled until a
 * valid reason (and any required details) is present, and an empty `reasons`
 * list degrades to a token-styled empty note. Presentational: a valid submit
 * calls `onSubmit(reasonId, details?)`. Reuses `Input`/`Button`; token-only
 * colors with a token-derived alpha tint.
 */
function ReportListing({ reasons, title = 'Report this listing', submitLabel = 'Submit report', loading = false, onSubmit, onCancel, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const [selectedId, setSelectedId] = React.useState(null);
    const [details, setDetails] = React.useState('');
    const selected = reasons.find((r) => r.id === selectedId) ?? null;
    const detailsRequired = selected?.requiresDetails === true;
    const detailsOk = !detailsRequired || details.trim().length > 0;
    const valid = selected != null && detailsOk;
    const submit = () => {
        if (!valid || loading)
            return;
        onSubmit?.(selected.id, details.trim() ? details.trim() : undefined);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), reasons.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No report reasons available" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: reasons.map((reason) => {
                    const isSel = reason.id === selectedId;
                    const dot = 18;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: isSel }, accessibilityLabel: reason.label, onPress: () => setSelectedId(reason.id), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: isSel ? colors.primary : colors.border,
                            backgroundColor: isSel ? (0, internal_1.withAlpha)(colors.primary, 0.08) : colors.surface,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            opacity: pressed ? 0.9 : 1,
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: dot,
                                    height: dot,
                                    borderRadius: dot / 2,
                                    borderWidth: 2,
                                    borderColor: isSel ? colors.primary : colors.border,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: isSel ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: dot / 2, height: dot / 2, borderRadius: dot / 4, backgroundColor: colors.primary } })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: reason.label })] }, reason.id));
                }) })), selected ? ((0, jsx_runtime_1.jsx)(primitives_1.Input, { testID: "xen-mkt-report-details", label: detailsRequired ? 'Details (required)' : 'Details (optional)', placeholder: "Add any specifics", value: details, onChangeText: setDetails, invalid: detailsRequired && !detailsOk && details.length > 0, multiline: true })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onPress: onCancel, style: { flex: 1 }, children: "Cancel" })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: "danger", onPress: submit, disabled: !valid, loading: loading, style: { flex: 1 }, children: submitLabel })] })] }));
}
//# sourceMappingURL=ReportListing.js.map
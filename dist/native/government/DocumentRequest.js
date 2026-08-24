"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRequest = DocumentRequest;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const DOC_TYPE = {
    'birth-certificate': { label: 'Birth certificate', glyph: '👶' },
    'marriage-certificate': { label: 'Marriage certificate', glyph: '💍' },
    'death-certificate': { label: 'Death certificate', glyph: '🕊️' },
    'property-deed': { label: 'Property deed', glyph: '🏠' },
    'court-record': { label: 'Court record', glyph: '⚖️' },
    transcript: { label: 'Transcript', glyph: '🎓' },
    other: { label: 'Document', glyph: '📄' },
};
const STATUS = {
    requested: { label: 'Requested', glyph: '📨', tone: 'primary' },
    processing: { label: 'Processing', glyph: '⋯', tone: 'warn' },
    ready: { label: 'Ready', glyph: '✓', tone: 'success' },
    mailed: { label: 'Mailed', glyph: '📮', tone: 'accent' },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
};
/**
 * A request for a public / vital record: a tinted document glyph, a status pill
 * conveyed by **text + glyph + color** (never color alone), an optional
 * integer-cents fee funnelled through `formatMoney`, and context-gated Pay /
 * Download actions. Every color traces to a `SemanticColors` slot or a
 * token-derived tint — no literals.
 */
function DocumentRequest({ docType, title, requestNumber, status = 'requested', feeCents, paid = false, currency = 'USD', formatMoney: format = format_1.formatMoney, date, onPay, onDownload, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const dt = DOC_TYPE[docType] ?? DOC_TYPE.other;
    const sd = STATUS[status] ?? STATUS.requested;
    const fee = feeCents != null ? Math.max(0, Math.trunc(feeCents)) : undefined;
    const showPay = onPay != null && !paid && fee != null && fee > 0;
    const showDownload = onDownload != null && status === 'ready';
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: dt.glyph, size: "xl", accessibilityLabel: dt.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title ?? dt.label }), requestNumber != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: requestNumber })) : null] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }), fee != null || date != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.sm,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [fee != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Fee: ", fee === 0 ? 'Free' : format(fee, currency), paid && fee > 0 ? ' · paid' : ''] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), date != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: date })) : null] })) : null, showPay || showDownload ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    justifyContent: 'flex-end',
                }, children: [showPay ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", variant: "outline", onPress: onPay, children: "Pay fee" })) : null, showDownload ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", onPress: onDownload, children: "Download" })) : null] })) : null] }));
}
//# sourceMappingURL=DocumentRequest.js.map
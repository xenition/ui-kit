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
exports.DocumentRequestV4 = DocumentRequestV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const civic_v4_1 = require("./internal/civic-v4");
const format_1 = require("./internal/format");
/** What the request number identifies. */
const REQUEST_LABEL = 'Request';
const TYPE_V4 = {
    'birth-certificate': { label: 'Birth certificate', glyph: '👶' },
    'marriage-certificate': { label: 'Marriage certificate', glyph: '💍' },
    'death-certificate': { label: 'Death certificate', glyph: '🕊️' },
    'property-deed': { label: 'Property deed', glyph: '🏠' },
    'court-record': { label: 'Court record', glyph: '⚖️' },
    transcript: { label: 'Transcript', glyph: '🎓' },
    other: { label: 'Document', glyph: '📄' },
};
const STATUS_V4 = {
    requested: { label: 'Requested', glyph: '📨', tone: civic_v4_1.IDENTITY_TONE },
    processing: { label: 'Processing', glyph: '⋯', tone: 'warn' },
    ready: { label: 'Ready', glyph: '✓', tone: 'success' },
    mailed: { label: 'Mailed', glyph: '📮', tone: civic_v4_1.IDENTITY_TONE },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
};
/**
 * **V4 document request** — same props as {@link DocumentRequest} plus
 * `reason`, `typeLabels`, `statusLabels` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **A denied request says why.** A refused death certificate said "Denied"
 *    and offered no field for the reason, on a card whose whole purpose is to
 *    report what happened to the request. `isAdverse()` gates the `reason`,
 *    and the line is an assertive live region.
 * 2. **Paying takes a confirming press.** "Pay fee" was one tap on a ~34pt
 *    target, with no confirm and no way back; the first press arms the button
 *    and shows `confirmPayLabel`, the second pays.
 * 3. **The request number is labelled** — it rendered as a bare "DOC-9931" —
 *    and the card is one announced object carrying the type, the status, the
 *    fee and the date rather than seven loose text nodes.
 * 4. **Both actions clear 44**, where `size="sm"` renders about 34 and neither
 *    `Button` primitive sets a floor, and the document disc's tint is
 *    composited opaquely instead of washed over whatever is behind it — a
 *    translucent tint is a different colour on every surface it lands on.
 * 5. **A stage in the queue is not an outcome.** `requested` was `primary` and
 *    `mailed` was `accent`, and the document type disc was `primary` too — a
 *    brand colour describing what kind of certificate it is. All three are
 *    `IDENTITY_TONE`, leaving `ready` and `denied` as the only two tones on
 *    the card that mean anything happened.
 */
function DocumentRequestV4({ docType, title, requestNumber, status = 'requested', feeCents, paid = false, currency = 'USD', formatMoney: format = format_1.formatMoney, date, reason, typeLabels, statusLabels, confirmPayLabel = 'Confirm payment', onPay, onDownload, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const [armed, setArmed] = React.useState(false);
    const dt = TYPE_V4[docType] ?? TYPE_V4.other;
    const typeWord = typeLabels?.[docType] ?? dt.label;
    const sd = STATUS_V4[status] ?? STATUS_V4.requested;
    const statusWord = statusLabels?.[status] ?? sd.label;
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const showReason = adverse && Boolean(reason);
    const idLine = (0, civic_v4_1.labelledId)(REQUEST_LABEL, requestNumber);
    const fee = feeCents != null ? Math.max(0, Math.trunc(feeCents)) : undefined;
    const showPay = onPay != null && !paid && fee != null && fee > 0;
    const showDownload = onDownload != null && status === 'ready';
    const feeLine = fee != null
        ? `Fee: ${fee === 0 ? 'Free' : format(fee, currency)}${paid && fee > 0 ? ' · paid' : ''}`
        : undefined;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const disc = tokens.spacing['2xl'];
    const spoken = (0, civic_v4_1.spokenLine)([
        title ?? typeWord,
        typeWord,
        idLine,
        statusWord,
        feeLine,
        date,
        showReason ? reason : null,
    ]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: {
                            flex: 1,
                            minWidth: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: disc,
                                    height: disc,
                                    borderRadius: tokens.radius.md,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, civic_v4_1.tintGround)(theme, civic_v4_1.IDENTITY_TONE),
                                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: dt.glyph, size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: title ?? typeWord }), idLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: idLine })) : null] })] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${statusWord}` })] }), showReason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", accessibilityLiveRegion: "assertive", style: { marginTop: tokens.spacing.sm, color: (0, civic_v4_1.tintInk)(theme, sd.tone) }, children: reason })) : null, feeLine != null || date ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.sm,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [feeLine != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: feeLine })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), date ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: date })) : null] })) : null, showPay || showDownload ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    justifyContent: 'flex-end',
                }, children: [showPay ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", accessibilityLabel: armed ? confirmPayLabel : 'Pay fee', onPress: () => {
                            // A payment is irreversible and the card offers no way back
                            // from a mis-tap on a ~34pt target.
                            if (!armed) {
                                setArmed(true);
                                return;
                            }
                            setArmed(false);
                            onPay?.();
                        }, style: { minHeight: tap }, children: armed ? confirmPayLabel : 'Pay fee' })) : null, showDownload ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", onPress: onDownload, style: { minHeight: tap }, children: "Download" })) : null] })) : null] }));
}
//# sourceMappingURL=DocumentRequestV4.js.map
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
exports.DocumentRequestV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const format_1 = require("./internal/format");
const civic_v4_1 = require("./internal/civic-v4");
const TYPE_V4 = {
    'birth-certificate': { label: 'Birth certificate', glyph: '👶' },
    'marriage-certificate': { label: 'Marriage certificate', glyph: '💍' },
    'death-certificate': { label: 'Death certificate', glyph: '🕊️' },
    'property-deed': { label: 'Property deed', glyph: '🏠' },
    'court-record': { label: 'Court record', glyph: '⚖️' },
    transcript: { label: 'Transcript', glyph: '🎓' },
    other: { label: 'Document', glyph: '📄' },
};
/**
 * Status → word, glyph and tone.
 *
 * `requested` and `mailed` are `neutral`: they are stages of a fulfilment, and
 * a brand-coloured pill beside a green Ready reads as a second outcome.
 */
const STATUS_V4 = {
    requested: { label: 'Requested', glyph: '📨', tone: civic_v4_1.IDENTITY_TONE },
    processing: { label: 'Processing', glyph: '⋯', tone: 'warn' },
    ready: { label: 'Ready', glyph: '✓', tone: 'success' },
    mailed: { label: 'Mailed', glyph: '📮', tone: civic_v4_1.IDENTITY_TONE },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
};
/**
 * **V4 document request** — the web twin of the native `DocumentRequestV4`,
 * same props as {@link DocumentRequest} plus `reason`, `typeLabels`,
 * `statusLabels` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **A denied request says why, and announces.** `denied` is one of the
 *    module's five rejection states and none of the five interfaces had a field
 *    for the reason. `reason` renders under the header when {@link isAdverse}
 *    is true and reaches a polite live region one commit after mount — a live
 *    region announces *changes*, so text present at first paint never speaks.
 * 2. **Paying a fee takes a confirming press.** "Pay fee" was one tap on a
 *    ~32px target, with no confirm, no pending state and no undo. It arms
 *    first, renames itself, and disarms on blur.
 * 3. **The request number is labelled**, so a reader hears what "DOC-9931"
 *    identifies rather than four digits, and the fee, the paid flag and the
 *    date read as one caption rather than two spans at opposite ends of a row.
 * 4. **A document type is identity.** The leading disc was `bg-primary-50`, a
 *    ramp step that mirrors under `[data-theme="dark"]` and paints a near-white
 *    plate on a dark card, with its glyph in the `primary` **fill** used as
 *    ink. It takes the neutral identity tint and the contrast-corrected ink.
 * 5. **Both actions clear 44.** `size="sm"` is about 32px, and neither `Button`
 *    primitive sets a minimum height — so every action in this module was under
 *    the tap floor.
 */
exports.DocumentRequestV4 = React.forwardRef(function DocumentRequestV4({ docType, title, requestNumber, status = 'requested', feeCents, paid = false, currency = 'USD', formatMoney: format = format_1.formatMoney, date, onPay, onDownload, reason, typeLabels, statusLabels, confirmPayLabel = 'Confirm payment', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [armed, setArmed] = React.useState(false);
    const dt = TYPE_V4[docType] ?? TYPE_V4.other;
    const typeWord = typeLabels?.[docType] ?? dt.label;
    const sd = STATUS_V4[status] ?? STATUS_V4.requested;
    const word = statusLabels?.[status] ?? sd.label;
    const reference = (0, civic_v4_1.labelledId)('Request', requestNumber);
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const why = adverse ? reason : undefined;
    const fee = feeCents != null ? Math.max(0, Math.trunc(feeCents)) : undefined;
    const feeText = fee != null
        ? `Fee: ${fee === 0 ? 'Free' : format(fee, currency)}${paid && fee > 0 ? ' · paid' : ''}`
        : undefined;
    const caption = (0, tone_v4_1.metaLine)([reference, feeText, date]);
    const showPay = onPay != null && !paid && fee != null && fee > 0;
    const showDownload = onDownload != null && status === 'ready';
    const payWord = armed ? confirmPayLabel : 'Pay fee';
    const announcement = (0, civic_v4_1.spokenLine)([title ?? typeWord, word, why]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
        setAnnounced(adverse ? announcement : '');
    }, [adverse, announcement]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: "sr-only", children: announced }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]", style: { background: (0, civic_v4_1.tintGround)(civic_v4_1.IDENTITY_TONE) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: dt.glyph, size: "xl", className: (0, civic_v4_1.tintInkClass)(civic_v4_1.IDENTITY_TONE) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title ?? typeWord }), caption !== '' ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${word}` })] }), why != null ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('mt-sm text-sm font-medium', (0, civic_v4_1.tintInkClass)(sd.tone)), children: why })) : null, showPay || showDownload ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex flex-wrap justify-end gap-sm", children: [showPay ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", onClick: () => {
                            // Money leaving an account has no undo, so the first press
                            // only arms.
                            if (!armed) {
                                setArmed(true);
                                return;
                            }
                            setArmed(false);
                            onPay?.();
                        }, 
                        // Walking away from an armed payment disarms it.
                        onBlur: () => setArmed(false), children: payWord })) : null, showDownload ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", "aria-label": (0, civic_v4_1.spokenLine)(['Download', title ?? typeWord]), onClick: onDownload, children: "Download" })) : null] })) : null] }));
});
//# sourceMappingURL=DocumentRequestV4.js.map
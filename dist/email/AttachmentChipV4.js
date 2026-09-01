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
exports.AttachmentChipV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const mail_v4_1 = require("./internal/mail-v4");
const KIND_GLYPH = {
    image: '🖼️',
    pdf: '📕',
    doc: '📄',
    sheet: '📊',
    audio: '🎵',
    video: '🎬',
    zip: '🗜️',
    file: '📎',
};
/** 44 on both axes for a glyph control, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/**
 * **V4 attachment chip** — same props as {@link AttachmentChip} plus
 * `onCancel`, `cancelLabel`, `downloadLabel` and `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **An upload in flight can be stopped.** The base suppressed *every*
 *    trailing action while `uploadProgress` was running, so the one moment a
 *    user needs an escape — they have just watched the wrong file start
 *    uploading — was the one moment the chip offered none. `onCancel` fills it;
 *    remove stays out of the way until the upload lands.
 * 2. **The progress is a progress bar.** It was a sentence, "Uploading… 40%",
 *    and nothing else: no role, no value, no drawn bar, so a reader had to
 *    re-read the line to learn whether anything had moved.
 * 3. **The download and remove controls are real targets.** Both were bare
 *    glyphs with no box — around 20px — and both dimmed on hover at M3's
 *    *disabled* band. They now clear 44 and answer with a state layer.
 * 4. **The icon well stops being a light-mode ramp step.** `bg-primary-50`
 *    painted a near-white tile on a dark page; the well is now the tone mixed
 *    into the card, which follows the scheme.
 */
exports.AttachmentChipV4 = React.forwardRef(function AttachmentChipV4({ name, kind = 'file', size, uploadProgress, onClick, onDownload, onRemove, onCancel, cancelLabel = 'Cancel upload', downloadLabel = 'Download', removeLabel = 'Remove', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.file;
    const uploading = uploadProgress != null && uploadProgress >= 0 && uploadProgress < 1;
    const pct = uploading ? ((0, tone_v4_1.clampPercent)((uploadProgress ?? 0) * 100) ?? 0) : null;
    const rounded = pct == null ? null : Math.round(pct);
    const actionStyle = (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)');
    const actionClass = (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', chrome_v4_1.MIN_TAP_CLASS, TAP_SQUARE, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring');
    const well = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { backgroundColor: (0, tone_v4_1.toneGround)('primary') }, className: (0, cn_1.cn)('inline-flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] text-base leading-none', mail_v4_1.TONE_INK.primary), children: glyph }));
    const meta = ((0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm font-semibold text-on-surface", children: name }), rounded != null ? (
            // The sentence stays — it is what a low-vision user reads — and the
            // value it was only ever describing is now exposed and drawn.
            (0, jsx_runtime_1.jsxs)("span", { role: "progressbar", "aria-label": name, "aria-valuenow": rounded, "aria-valuemin": 0, "aria-valuemax": 100, className: "block", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block truncate text-xs', mail_v4_1.TONE_INK.muted), children: `Uploading… ${rounded}%` }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "mt-xs block h-xs w-full overflow-hidden rounded-full bg-muted", children: (0, jsx_runtime_1.jsx)("span", { style: { width: `${rounded}%` }, className: "block h-full bg-primary" }) })] })) : size ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block truncate text-xs', mail_v4_1.TONE_INK.muted), children: size })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": uploading || undefined, className: (0, cn_1.cn)('inline-flex max-w-[calc(var(--xen-space-2xl)_*_5)] items-center gap-sm self-start', 'rounded-[var(--xen-radius-md)] border border-border bg-surface px-sm py-xs', className), children: [onClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": (0, mail_v4_1.spokenLine)([
                    `Attachment ${name}`,
                    size,
                    rounded != null ? `uploading ${rounded}%` : undefined,
                ]), onClick: onClick, "data-xen-v4-state": "", style: actionStyle, className: (0, cn_1.cn)('inline-flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-sm)] px-xs text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [well, meta] })) : (
            // No handler, so it is not announced as a button.
            (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex min-w-0 flex-1 items-center gap-sm", children: [well, meta] })), uploading && onCancel ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${cancelLabel}, ${name}`, onClick: onCancel, "data-xen-v4-state": "", style: actionStyle, className: actionClass, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base leading-none', mail_v4_1.TONE_INK.muted), children: "\u00D7" }) })) : null, !uploading && onDownload ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${downloadLabel} ${name}`, onClick: onDownload, "data-xen-v4-state": "", style: actionStyle, className: actionClass, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base leading-none', mail_v4_1.TONE_INK.muted), children: "\u2913" }) })) : null, !uploading && onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${removeLabel} ${name}`, onClick: onRemove, "data-xen-v4-state": "", style: actionStyle, className: actionClass, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base leading-none', mail_v4_1.TONE_INK.muted), children: "\u00D7" }) })) : null] }));
});
//# sourceMappingURL=AttachmentChipV4.js.map
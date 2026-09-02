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
exports.PolicyDocumentRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 policy document row** — same props as {@link PolicyDocumentRow} plus
 * `sizeBytes` and `formatSize`.
 *
 * ## Five changes
 *
 * 1. **Download is reachable from the keyboard.** This is the module's
 *    headline structural defect and this row is where it does the most damage.
 *    The Download `<Button>` sat *inside* a `div` carrying `role="button"`,
 *    `tabIndex` and a hand-written Enter/Space handler. Its click was guarded
 *    with `stopPropagation`; its keydown was not. Tab to Download, press
 *    Enter, and the row's handler catches the bubbled keydown, calls
 *    `preventDefault()` — which cancels the button's own activation, because
 *    Enter's default action on a button **is** that click — and fires the
 *    row's `onClick` instead. The document opens; nothing downloads; nothing
 *    says so. A mouse user never sees it. The row is now a plain container,
 *    the activation is a real `<button>` around the title and its meta line,
 *    and Download is its **sibling**. No guard, because there is nothing left
 *    to guard against.
 * 2. **Nesting a button inside `role="button"` was invalid ARIA anyway**, and
 *    it cost the row its own content: `aria-label="Auto declarations
 *    document"` replaced the subtree, so the kind, the size and the date were
 *    never announced. All three are folded into the name.
 * 3. **Download has a name that says what it downloads.** A documents list
 *    presents five identically-named "Download" buttons; a reader tabbing
 *    through them hears "Download, button" five times and cannot tell which
 *    file each one is.
 * 4. **The meta line has words.** It was built from
 *    `kind.replace('-', ' ')`, so every row read "id card" or "declaration" in
 *    lower case regardless of locale.
 * 5. **It joins the row family**, presses with a state layer rather than
 *    `hover:opacity-80`, clears 44 on both the row and the Download button,
 *    and focuses with `ring-ring` rather than the `ring-primary-300` ramp
 *    step.
 */
exports.PolicyDocumentRowV4 = React.forwardRef(function PolicyDocumentRowV4({ title, kind = 'policy', size, sizeBytes, date, downloadLabel = 'Download', formatSize = tone_v4_1.formatBytes, onClick, onDownload, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    if (!title)
        return null;
    const kd = tone_v4_1.DOCUMENT_KIND_META_V4[kind] ?? tone_v4_1.DOCUMENT_KIND_META_V4.policy;
    const sizeText = sizeBytes != null ? formatSize(sizeBytes) : size;
    const meta = (0, tone_v4_1.metaLine)([kd.label, sizeText, date]);
    const interactive = onClick != null;
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-full w-full items-center justify-center rounded-[var(--xen-radius-md)] text-base", style: (0, tone_v4_1.toneGroundStyle)('primary'), children: kd.glyph }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: title }), meta !== '' ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: meta }) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(meta !== ''), (0, row_v4_1.rowGroundClass)(false), className), ...rest, children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([title, kd.label, sizeText, date]), onClick: onClick, "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: content })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: content })), onDownload != null ? ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", size: "sm", "aria-label": `${downloadLabel} ${title}`, onClick: onDownload, className: tone_v4_1.MIN_TAP_CLASS, children: downloadLabel }) })) : null] }));
});
//# sourceMappingURL=PolicyDocumentRowV4.js.map
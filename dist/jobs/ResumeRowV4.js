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
exports.ResumeRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const cn_1 = require("../primitives/cn");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 résumé row** — same props as {@link ResumeRow} plus `defaultLabel`,
 * `setDefaultLabel`, `downloadLabel` and `formatRelative`.
 *
 * ## Five changes
 *
 * 1. **Download and Set default work from the keyboard.** Both were controls
 *    inside a `<div role="button">` carrying its own Enter/Space handler:
 *    their clicks were guarded with `stopPropagation`, their keydowns were
 *    not, so the row caught the bubbled key, called `preventDefault()` —
 *    which cancels the button's own activation — and opened the preview
 *    instead. Tab to Download, press Enter, download nothing. The row is a
 *    plain container now and both actions are **siblings** of the activation.
 * 2. **The row is announced.** The base's `aria-label` sat on a `generic`
 *    element, which ARIA forbids naming, so neither the file name nor the
 *    "default résumé" state reached a reader on Chrome or Firefox — and the
 *    updated age and file size were never in the label at all.
 * 3. **"Default" stops spending a status colour.** `<Badge tone="success">`
 *    said that one of three files being the default is *good news*. Which
 *    résumé is default is identity: a neutral chip says it, and the reader is
 *    not taught to ignore green.
 * 4. **The glyph controls are real tap targets.** ⬇ was a bare character —
 *    roughly 18 CSS pixels — in a row whose whole point is picking between
 *    files.
 * 5. **The tile and the meta line stop using tokens as something they are
 *    not.** The file tile was `bg-neutral-100`, a ramp step that inverts under
 *    a dark seed, and the meta line was `text-muted`, a fill slot with no
 *    contrast promise; press was `hover:opacity-95`, which is M3's *disabled*
 *    signal rather than a state layer.
 */
exports.ResumeRowV4 = React.forwardRef(function ResumeRowV4({ resume, onClick, onDownload, onSetDefault, defaultLabel = 'Default', setDefaultLabel = 'Set default', downloadLabel, formatRelative, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const updated = (0, tone_v4_1.relativeLabel)(resume.updatedAt, formatRelative);
    const meta = (0, tone_v4_1.metaLine)([updated, resume.sizeLabel]);
    const isDefault = !!resume.isDefault;
    const name = (0, tone_v4_1.spokenLine)([
        resume.name,
        isDefault ? defaultLabel : undefined,
        updated,
        resume.sizeLabel,
    ]);
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-xl w-xl shrink-0 items-center justify-center', 'rounded-[var(--xen-radius-sm)] border border-border bg-card text-lg'), children: "\uD83D\uDCC4" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-sm font-semibold text-on-card", children: resume.name }), isDefault ? (
                            // Identity, not status: which of three files is default is not
                            // good news, it is a fact about the file.
                            (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", size: "sm", children: defaultLabel })) : null] }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: meta }) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-resume-row": "", className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-md)] border border-border', 'bg-card p-md text-on-card', className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(resume), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: summary })), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 items-center gap-xs", children: [!isDefault && onSetDefault ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", size: "sm", onClick: () => onSetDefault(resume), "aria-label": (0, tone_v4_1.spokenLine)([setDefaultLabel, resume.name]), className: tone_v4_1.MIN_TAP_CLASS, children: setDefaultLabel })) : null, onDownload ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": downloadLabel ?? `Download ${resume.name}`, onClick: () => onDownload(resume), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-full)]', 'text-lg leading-none text-primary-text', tone_v4_1.MIN_TAP_SQUARE_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2B07" }) })) : null] })] }));
});
//# sourceMappingURL=ResumeRowV4.js.map
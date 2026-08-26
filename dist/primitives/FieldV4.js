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
exports.FieldV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const LabelV4_1 = require("./LabelV4");
const icon_names_1 = require("./icon-names");
/**
 * `muted` is `neutral[600]` and carries no contrast promise against `surface`,
 * so the hint's colour has to be computed per scheme rather than named — which
 * means a custom property and a `[data-theme="dark"]` switch.
 */
const FIELD_V4_CSS = `
[data-xen-v4-field-hint] { color: var(--xen-muted-text); }
`;
/**
 * **V4 field** — the web twin of the native `FieldV4`, same props as
 * {@link Field}, a different design line.
 *
 * A field is three things stacked in a column, which makes it look like the
 * least interesting component in the kit and hides the fact that it is the one
 * carrying a form's entire error story.
 *
 * 1. **The message reaches the control.** The base field rendered its error in
 *    a sibling `<p>` and left it there: no `aria-describedby`, no
 *    `aria-invalid`, so a screen-reader user landing on the input heard the
 *    label and nothing about what was wrong with it, and the field did not
 *    report itself as invalid at all. V4 gives the message a real id and wires
 *    the control to it. It only fills in what the caller left blank — an
 *    explicit `aria-describedby` or `aria-invalid` on the child is theirs and
 *    wins (§23 — preserve unrelated work).
 * 2. **An error is not only red.** A red line under a field is invisible to a
 *    red-green viewer and to anyone reading in bright sun. V4 leads the error
 *    with the kit's `error` glyph, so the state has a shape as well as a hue
 *    (§46) — and `role="alert"` still announces it when it appears.
 * 3. **Both messages are measured.** The error took `text-danger`, the FILL
 *    slot, whose guarantee is about `on-danger` and not about itself as ink;
 *    the hint took `text-muted-text`, which is `neutral[600]` with no promise
 *    either. The error moves to `text-danger-text`, and the hint is computed
 *    per scheme with `ensureContrast`. Helper text is the smallest thing on a
 *    form and the first thing an unmeasured colour makes unreadable.
 *
 * The gap is `spacing.xs` on both twins — the web field was on Tailwind's
 * `gap-1.5` (6px) against native's 4px, so the same field was two different
 * heights. No card, no fill, no gradient: §10 and §11 both say a label, a
 * control and a line of helper text are a group because of spacing, not
 * because of a container.
 */
exports.FieldV4 = React.forwardRef(function FieldV4({ className, style, label, required = false, error, hint, htmlFor, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-field-styles', FIELD_V4_CSS);
    const reactId = React.useId();
    const messageId = `${reactId}-message`;
    const invalid = error != null && error !== '';
    const hasMessage = invalid || (hint != null && hint !== '');
    // Wire the control to the message. Only where the caller left a gap.
    const described = React.Children.map(children, (child) => {
        if (!React.isValidElement(child) || !hasMessage)
            return child;
        const props = child.props;
        return React.cloneElement(child, {
            'aria-describedby': props['aria-describedby'] ?? messageId,
            'aria-invalid': props['aria-invalid'] ?? (invalid ? true : undefined),
        });
    });
    const vars = {};
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-field": "", className: (0, cn_1.cn)('flex flex-col gap-xs', className), style: { ...vars, ...style }, ...rest, children: [label != null ? ((0, jsx_runtime_1.jsx)(LabelV4_1.LabelV4, { htmlFor: htmlFor, required: required, children: label })) : null, described, invalid ? ((0, jsx_runtime_1.jsxs)("p", { id: messageId, role: "alert", className: "flex items-center gap-xs font-body text-sm text-danger-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: (0, icon_names_1.resolveIconGlyph)('error') }), error] })) : hint ? ((0, jsx_runtime_1.jsx)("p", { id: messageId, "data-xen-v4-field-hint": "", className: "font-body text-sm", children: hint })) : null] }));
});
//# sourceMappingURL=FieldV4.js.map
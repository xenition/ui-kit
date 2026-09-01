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
exports.InterestPickerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * **V4 interest picker** — the web twin of the native `InterestPickerV4`: the
 * base's props plus `fullScreen`, `formatSelectionCount` and the line's
 * `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The cap explains itself.** A live counter under the chips, and the
 *    blocked chips carry `aria-disabled` with the counter as their description.
 * 2. **Chips have hover and press states**, through the shared chrome layers.
 * 3. **Unselected chips sit on `card`.** On `surface` they were the page colour
 *    with a hairline around them, so a dark page read as a field of outlines.
 * 4. **Selected chips answer in the configured accent.**
 * 5. **`fullScreen`** — the shared shell, which is where the scroll, the pinned
 *    CTA and the inset come from.
 *
 * An empty `options` renders `emptyMessage`, never a bare gap. Selection stays
 * fully controlled.
 */
exports.InterestPickerV4 = React.forwardRef(function InterestPickerV4({ options, selectedIds, onChange, title, helper, maxSelections, groupLabel = 'Interests', subtitle, illustration, logoGlyph, progress, onBack, onDismiss, error, ctaLabel = 'Continue', onContinue, loading = false, secondaryLabel, onSecondary, emptyMessage = 'No topics to choose from.', fullScreen = false, formatSelectionCount, ground = 'plain', accent = 'primary', className, style, ...rest }, ref) {
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const atCap = maxSelections != null && selectedSet.size >= maxSelections;
    const toggle = (id) => {
        const next = new Set(selectedSet);
        if (next.has(id))
            next.delete(id);
        else {
            if (atCap)
                return;
            next.add(id);
        }
        onChange(Array.from(next));
    };
    const subhead = subtitle ?? helper;
    // `helper` keeps its own slot only when it is not already doing the
    // subhead's job, so the two never print the same sentence twice.
    const caption = subtitle != null ? helper : undefined;
    const showHero = illustration != null || logoGlyph != null;
    const counter = maxSelections != null
        ? (formatSelectionCount ?? ((n, max) => `${n} of ${max} selected`))(selectedSet.size, maxSelections)
        : '';
    const counterId = React.useId();
    const chips = options.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center p-lg", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: "center", children: emptyMessage }) })) : ((0, jsx_runtime_1.jsx)("div", { role: "group", "aria-label": `${groupLabel}, ${selectedSet.size} selected`, 
        // §7 — wrap, never scroll. A user cannot choose what they cannot see.
        className: "flex flex-wrap justify-center gap-sm", children: options.map((opt) => {
            const selected = selectedSet.has(opt.id);
            const blocked = !selected && atCap;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "checkbox", "aria-checked": selected, "aria-disabled": blocked || undefined, "aria-describedby": blocked && counter ? counterId : undefined, disabled: blocked, onClick: () => toggle(opt.id), "data-xen-v4-chrome": selected ? 'filled-primary' : 'on-surface', className: (0, cn_1.cn)('flex items-center justify-center gap-xs rounded-full border px-md py-sm text-sm font-semibold', chrome_v4_1.MIN_TAP_CLASS, selected
                    ? 'border-[var(--flow-fill)] bg-[var(--flow-fill)] text-[var(--flow-on-fill)]'
                    : 'border-border bg-card text-on-card'), children: [selected ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm" })) : opt.icon ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: opt.icon, size: "sm" })) : null, opt.label] }, opt.id));
        }) }));
    const messages = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [counter ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { id: counterId, size: "sm", tone: "mutedText", align: "center", "aria-live": "polite", children: counter })) : null, error ? ((0, jsx_runtime_1.jsxs)("p", { role: "alert", className: "flex items-center justify-center gap-xs text-sm text-danger-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "error", size: "sm" }), error] })) : null] }));
    const header = (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: progress });
    const footer = onContinue ? ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { secondaryLabel: onSecondary ? secondaryLabel : undefined, onSecondary: onSecondary, safeArea: fullScreen, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: ctaLabel, loading: loading, onClick: onContinue }) })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showHero ? (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: illustration, logoGlyph: logoGlyph }) : null, (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title ?? '', subtitle: subhead }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: caption })) : null, chips, messages] }));
    if (fullScreen) {
        return ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowScreenV4, { ref: ref, ...rest, ground: ground, accent: accent, center: false, className: className, style: style, header: header, footer: footer, children: body }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: { ...(0, flow_v4_1.flowGroundVars)(ground, accent), ...style }, className: (0, cn_1.cn)('flex flex-col gap-lg', className), ...rest, children: [onBack != null || onDismiss != null || progress != null ? header : null, body, footer ? (0, jsx_runtime_1.jsx)("div", { className: "mt-auto w-full", children: footer }) : null] }));
});
//# sourceMappingURL=InterestPickerV4.js.map
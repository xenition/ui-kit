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
exports.InterestPickerV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — the 44px minimum tap target a chip must clear. */
const TAP_TARGET_CLASS = 'min-h-11';
/**
 * Interest chips — V3, the compact line. No hero panel at all: a small badge
 * sits beside the headline on one row, the copy is left-aligned, and the chip
 * field is denser (tighter padding, no leading glyphs) so the whole step fits a
 * sheet or a short screen without scrolling.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero, and silently squeezing one in is how a "compact" screen stops being
 * compact. `logoGlyph` still drives the small leading badge.
 *
 * §7 survives the density: the chips still **wrap** and are never clipped. A
 * denser row is not a licence to hide the last option.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
exports.InterestPickerV3 = React.forwardRef(function InterestPickerV3({ options, selectedIds, onChange, title, helper, maxSelections, groupLabel = 'Interests', subtitle, illustration: _illustration, logoGlyph, progress, onBack, onDismiss, error, ctaLabel = 'Continue', onContinue, loading = false, secondaryLabel, onSecondary, emptyMessage = 'No topics to choose from.', className, ...rest }, ref) {
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
    const caption = subtitle != null ? helper : undefined;
    const showHeader = onBack != null || onDismiss != null || progress != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [showHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : null] })) : null, title != null || subhead != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph ?? '✦', size: "lg", color: "primary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [title ? ((0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 2, className: "block", children: title }) })) : null, subhead ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", numberOfLines: 2, children: subhead })) : null] })] })) : null, caption ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: caption })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: emptyMessage })) : ((0, jsx_runtime_1.jsx)("div", { role: "group", "aria-label": `${groupLabel}, ${selectedSet.size} selected`, 
                // §7 — wrap, never clip, density or no density.
                className: "flex flex-wrap gap-sm", children: options.map((opt) => {
                    const selected = selectedSet.has(opt.id);
                    const disabled = !selected && atCap;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "checkbox", "aria-checked": selected, "aria-label": opt.label, disabled: disabled, onClick: () => toggle(opt.id), className: (0, cn_1.cn)('inline-flex items-center gap-xs rounded-full border px-sm py-xs text-sm font-semibold transition-colors', TAP_TARGET_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:pointer-events-none disabled:opacity-45', selected
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-border bg-surface text-on-surface'), children: [selected ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "xs", color: "onPrimary" }) : null, opt.label] }, opt.id));
                }) })), error ? ((0, jsx_runtime_1.jsxs)("p", { role: "alert", className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)("p", { "aria-live": "polite", className: "sr-only", children: [selectedSet.size, " selected"] }), onContinue ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-auto flex flex-col gap-xs border-t border-border bg-surface pb-lg pt-sm", children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: ctaLabel, loading: loading, onClick: onContinue }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": secondaryLabel, onClick: onSecondary, className: (0, cn_1.cn)('flex items-center justify-center text-center', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "medium", tone: "muted", children: secondaryLabel }) })) : null] })) : null] }));
});
//# sourceMappingURL=InterestPickerV3.js.map
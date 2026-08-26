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
exports.ProfileSetup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const GetStartedButton_1 = require("./GetStartedButton");
/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 56 — the height every field stands at (§6), Tailwind's `h-14` — and
  44, the minimum tap target for a header control or a text link (§7),
  `h-11`/`min-h-11`. Every colour, radius, gap and font size here is a token
  class.
*/
const FIELD_HEIGHT_CLASS = 'h-14';
const TAP_TARGET_CLASS = 'min-h-11';
const INPUT_MODE = {
    default: 'text',
    'email-address': 'email',
    'phone-pad': 'tel',
};
/**
 * Profile setup step — the "What should we call you?" screen, rebuilt to the
 * anatomy in `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress ·
 * dismiss), the avatar editor sitting in the hero panel, a centred headline
 * block, the §6 field stack, and the sticky CTA footer.
 *
 * The old screen was a bare 40px box under a small left-aligned label with a
 * short flat button floating mid-page. Per §6 each field is now **56 tall**
 * (`h-14`) with `radius.lg`, a 1px `border` that rises to `primary` on focus and
 * to `danger` on error, and a leading icon; per §5 the save action is a
 * full-width button in a footer band with a hairline divider above it and a
 * muted "skip" link beneath — never beside — it.
 *
 * Fully controlled: the host owns `values` and gets `(id, text)` callbacks.
 * Field access is guarded through the `values` map so a missing key renders
 * empty, never crashes, and an empty `fields` array renders the screen without
 * a form rather than a broken one. Every new prop is optional. No literal
 * colors.
 */
exports.ProfileSetup = React.forwardRef(function ProfileSetup({ name, avatarUri, onEditAvatar, fields = [], values = {}, onChangeField, title = 'Set up your profile', saveLabel = 'Save profile', onSave, loading = false, skipLabel, onSkip, subtitle, illustration, avatarActionLabel = 'Add photo', progress, onBack, onDismiss, error, className, ...rest }, ref) {
    const showHeader = onBack != null || onDismiss != null || progress != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-lg', className), ...rest, children: [showHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "h-11 w-11" })), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 justify-center", children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "h-11 w-11" }))] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex aspect-[4/3] max-h-[38vh] items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50 p-lg", children: illustration ?? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Change profile photo", onClick: onEditAvatar, className: "flex flex-col items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUri, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "camera", size: "sm", color: "primary" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "primary", children: avatarActionLabel })] })] })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, className: "block", children: title }) }), subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, children: subtitle })) : null] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-md", children: fields.map((field) => {
                    const invalid = field.error != null && field.error !== '';
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: `profile-${field.id}`, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "onSurface", children: field.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-sm rounded-[var(--xen-radius-lg)] border bg-surface px-md', FIELD_HEIGHT_CLASS, 
                                // Focus raises the border to primary; an error holds it at
                                // danger even while focused, because a field being fixed
                                // is still wrong until it is not.
                                invalid ? 'border-danger' : 'border-border focus-within:border-primary'), children: [field.icon ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: field.icon, size: "base", color: "muted" }) : null, (0, jsx_runtime_1.jsx)("input", { id: `profile-${field.id}`, "aria-label": field.label, "aria-invalid": invalid || undefined, "aria-describedby": invalid ? `profile-${field.id}-error` : undefined, placeholder: field.placeholder, inputMode: INPUT_MODE[field.keyboard ?? 'default'], value: values[field.id] ?? '', onChange: (e) => onChangeField?.(field.id, e.target.value), className: "h-full flex-1 bg-transparent text-base text-on-surface outline-none placeholder:text-muted" })] }), invalid ? ((0, jsx_runtime_1.jsxs)("p", { id: `profile-${field.id}-error`, className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", children: field.error })] })) : null] }, field.id));
                }) })) : null, error ? ((0, jsx_runtime_1.jsxs)("p", { role: "alert", className: "flex items-center justify-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-auto flex flex-col gap-sm border-t border-border bg-surface pb-lg pt-md", children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: saveLabel, trailingArrow: false, loading: loading, onClick: onSave }), skipLabel && onSkip ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": skipLabel, onClick: onSkip, className: (0, cn_1.cn)('flex items-center justify-center text-center', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "medium", tone: "muted", children: skipLabel }) })) : null] })] }));
});
//# sourceMappingURL=ProfileSetup.js.map
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
exports.ProfileSetupV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — 56 (`h-14`) is the field height, 44 the tap target. */
const FIELD_HEIGHT_CLASS = 'h-14';
const TAP_TARGET_CLASS = 'min-h-11';
const INPUT_MODE = {
    default: 'text',
    'email-address': 'email',
    'phone-pad': 'tel',
};
/**
 * Profile setup — V3, the compact line. No hero panel: a small badge sits beside
 * a left-aligned headline, and the avatar drops to an inline row — thumbnail,
 * name, camera glyph — the way an account settings row reads. The fields keep
 * their §6 geometry (56, `radius.lg`, leading icon, error border **and**
 * message) because shrinking a text field is how you get a form nobody can tap;
 * what gets denser is the space between things, not the things themselves.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Same props as {@link ProfileSetup}. Token-pure.
 */
exports.ProfileSetupV3 = React.forwardRef(function ProfileSetupV3({ name, avatarUri, onEditAvatar, fields = [], values = {}, onChangeField, title = 'Set up your profile', saveLabel = 'Save profile', onSave, loading = false, skipLabel, onSkip, subtitle, illustration: _illustration, avatarActionLabel = 'Add photo', progress, onBack, onDismiss, error, className, ...rest }, ref) {
    const showHeader = onBack != null || onDismiss != null || progress != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [showHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : null] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "user", size: "lg", color: "primary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 2, className: "block", children: title }) }), subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", numberOfLines: 2, children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Change profile photo", onClick: onEditAvatar, className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-sm text-left', TAP_TARGET_CLASS), children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUri, name: name, size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate", children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "semibold", tone: "onSurface", children: name ?? avatarActionLabel }) }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "camera", size: "base", color: "primary" })] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: fields.map((field) => {
                    const invalid = field.error != null && field.error !== '';
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-sm rounded-[var(--xen-radius-lg)] border bg-surface px-md', FIELD_HEIGHT_CLASS, invalid ? 'border-danger' : 'border-border focus-within:border-primary'), children: [field.icon ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: field.icon, size: "base", color: "muted" }) : null, (0, jsx_runtime_1.jsx)("input", { id: `profile-v3-${field.id}`, "aria-label": field.label, "aria-invalid": invalid || undefined, "aria-describedby": invalid ? `profile-v3-${field.id}-error` : undefined, placeholder: field.placeholder ?? field.label, inputMode: INPUT_MODE[field.keyboard ?? 'default'], value: values[field.id] ?? '', onChange: (e) => onChangeField?.(field.id, e.target.value), className: "h-full flex-1 bg-transparent text-base text-on-surface outline-none placeholder:text-muted" })] }), invalid ? ((0, jsx_runtime_1.jsxs)("p", { id: `profile-v3-${field.id}-error`, className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", children: field.error })] })) : null] }, field.id));
                }) })) : null, error ? ((0, jsx_runtime_1.jsxs)("p", { role: "alert", className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-auto flex flex-col gap-xs border-t border-border bg-surface pb-lg pt-sm", children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: saveLabel, trailingArrow: false, loading: loading, onClick: onSave }), skipLabel && onSkip ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": skipLabel, onClick: onSkip, className: (0, cn_1.cn)('flex items-center justify-center text-center', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "medium", tone: "muted", children: skipLabel }) })) : null] })] }));
});
//# sourceMappingURL=ProfileSetupV3.js.map
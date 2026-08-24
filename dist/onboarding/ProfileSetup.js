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
const GetStartedButton_1 = require("./GetStartedButton");
const INPUT_MODE = {
    default: 'text',
    'email-address': 'email',
    'phone-pad': 'tel',
};
/**
 * Profile setup step — an editable avatar plus a token-styled field stack and a
 * save action, with an optional "skip for now" so onboarding never hard-blocks
 * on it (design.md §41). Fully controlled: the host owns `values` and gets
 * `(id, text)` callbacks. Field access is guarded through the `values` map so a
 * missing key renders empty, never crashes. No literal colors.
 */
exports.ProfileSetup = React.forwardRef(function ProfileSetup({ name, avatarUri, onEditAvatar, fields = [], values = {}, onChangeField, title = 'Set up your profile', saveLabel = 'Save profile', onSave, loading = false, skipLabel, onSkip, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-6', className), ...rest, children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-center text-xl font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Change profile photo", onClick: onEditAvatar, className: "flex flex-col items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUri, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCF7", size: "sm", color: "primary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary", children: "Add photo" })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-4", children: fields.map((field) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: `profile-${field.id}`, className: "text-sm font-semibold text-on-surface", children: field.label }), (0, jsx_runtime_1.jsx)("input", { id: `profile-${field.id}`, "aria-label": field.label, placeholder: field.placeholder, inputMode: INPUT_MODE[field.keyboard ?? 'default'], value: values[field.id] ?? '', onChange: (e) => onChangeField?.(field.id, e.target.value), className: "rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2 text-base text-on-surface outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary" })] }, field.id))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: saveLabel, loading: loading, onClick: onSave }), skipLabel && onSkip ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": skipLabel, onClick: onSkip, className: "py-1 text-center text-base font-medium text-muted", children: skipLabel })) : null] })] }));
});
//# sourceMappingURL=ProfileSetup.js.map
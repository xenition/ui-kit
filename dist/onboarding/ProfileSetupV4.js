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
exports.ProfileSetupV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AuthFieldV4_1 = require("../primitives/AuthFieldV4");
const AvatarV4_1 = require("../primitives/AvatarV4");
const IconV4_1 = require("../primitives/IconV4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * A `ProfileField.keyboard` as an `<input type>`.
 *
 * The prop is named for the native keyboard it asks for, which is the right
 * name on the platform this module was written for; on the web the same three
 * intents are input types, and mapping them is what makes a phone field bring
 * up a phone keypad in a browser too.
 */
const INPUT_TYPE = {
    default: 'text',
    'email-address': 'email',
    'phone-pad': 'tel',
};
/**
 * **V4 profile setup** — the web twin of the native `ProfileSetupV4`: the
 * base's props plus `fullScreen`, `avatarAccessibilityLabel` and the line's
 * `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The fields are `AuthFieldV4`.** The base hand-rolled an `<input>` with
 *    its own border, focus colour and height, so the sign-in screen's fields
 *    and this screen's fields were two different controls in one funnel — the
 *    exact drift the design-spec Addendum settled. §10.5: use the primitive.
 * 2. **An error is a message, not a red edge.** `AuthFieldV4` renders
 *    `ProfileField.error` as text under the field.
 * 3. **`keyboard` reaches the browser** (see {@link INPUT_TYPE}). The base
 *    accepted the prop and dropped it on this twin, so a phone field on the
 *    web brought up a full keyboard.
 * 4. **The avatar action takes a contrast-corrected tone** and an accessible
 *    name that is a prop rather than a hard-coded English string.
 * 5. **`fullScreen`** — the shared shell.
 *
 * The avatar editor is still this screen's own artwork in the §3 hero slot, and
 * `illustration` still replaces it.
 */
exports.ProfileSetupV4 = React.forwardRef(function ProfileSetupV4({ name, avatarUri, onEditAvatar, fields = [], values = {}, onChangeField, title = 'Set up your profile', saveLabel = 'Save profile', onSave, loading = false, skipLabel, onSkip, subtitle, illustration, avatarActionLabel = 'Add photo', avatarAccessibilityLabel = 'Change profile photo', progress, onBack, onDismiss, error, fullScreen = false, ground = 'plain', accent = 'primary', className, style, ...rest }, ref) {
    const avatarEditor = ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": avatarAccessibilityLabel, onClick: onEditAvatar, "data-xen-v4-chrome": "on-surface", className: "flex flex-col items-center gap-sm rounded-[var(--xen-radius-lg)] p-sm", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUri, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs text-sm font-semibold text-[var(--flow-ink)]", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "camera", size: "sm" }), avatarActionLabel] })] }));
    const form = fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-col gap-md", children: fields.map((field) => ((0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: field.label, icon: field.icon, placeholder: field.placeholder, inputType: INPUT_TYPE[field.keyboard ?? 'default'], error: field.error, value: values[field.id] ?? '', onChangeText: (text) => onChangeField?.(field.id, text) }, field.id))) })) : null;
    const formError = error ? ((0, jsx_runtime_1.jsxs)("p", { role: "alert", className: "flex items-center justify-center gap-xs text-sm text-danger-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "error", size: "sm" }), error] })) : null;
    const header = (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: progress });
    const footer = ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { secondaryLabel: onSkip ? skipLabel : undefined, onSecondary: onSkip, safeArea: fullScreen, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: saveLabel, trailingArrow: false, loading: loading, onClick: onSave }) }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: illustration ?? avatarEditor }), (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: subtitle }), form, formError] }));
    if (fullScreen) {
        return ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowScreenV4, { ref: ref, ...rest, ground: ground, accent: accent, center: false, className: className, style: style, header: header, footer: footer, children: body }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: { ...(0, flow_v4_1.flowGroundVars)(ground, accent), ...style }, className: (0, cn_1.cn)('flex flex-col gap-lg', className), ...rest, children: [onBack != null || onDismiss != null || progress != null ? header : null, body, (0, jsx_runtime_1.jsx)("div", { className: "mt-auto w-full", children: footer })] }));
});
//# sourceMappingURL=ProfileSetupV4.js.map
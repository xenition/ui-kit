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
exports.SignupForm = SignupForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const AuthCard_1 = require("./AuthCard");
const Form_1 = require("./Form");
const Field_1 = require("./Field");
const Input_1 = require("./Input");
const Button_1 = require("./Button");
const Alert_1 = require("./Alert");
const useForm_1 = require("./useForm");
/** Drop-in sign-up form — composed, themed, validated. Wire `onSubmit` to `@xenition/sdk` auth. */
function SignupForm({ onSubmit, onLoginClick, title = 'Create account', minPasswordLength = 8, }) {
    const [submitError, setSubmitError] = React.useState(null);
    const form = (0, useForm_1.useForm)({
        initialValues: { name: '', email: '', password: '' },
        validate: (v) => {
            const e = {};
            if (!v.name)
                e.name = 'Name is required';
            if (!v.email)
                e.email = 'Email is required';
            if (!v.password || v.password.length < minPasswordLength)
                e.password = `Password must be at least ${minPasswordLength} characters`;
            return e;
        },
        onSubmit: async (v) => {
            setSubmitError(null);
            try {
                await onSubmit(v);
            }
            catch (err) {
                setSubmitError(err instanceof Error ? err.message : 'Sign up failed');
            }
        },
    });
    return ((0, jsx_runtime_1.jsx)(AuthCard_1.AuthCard, { title: title, children: (0, jsx_runtime_1.jsxs)(Form_1.Form, { onSubmit: form.handleSubmit, children: [submitError && (0, jsx_runtime_1.jsx)(Alert_1.Alert, { tone: "danger", children: submitError }), (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Name", error: form.errors.name, children: (0, jsx_runtime_1.jsx)(Input_1.Input, { autoComplete: "name", value: form.values.name, onChange: (e) => form.setValue('name', e.target.value) }) }), (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Email", error: form.errors.email, children: (0, jsx_runtime_1.jsx)(Input_1.Input, { type: "email", autoComplete: "email", value: form.values.email, onChange: (e) => form.setValue('email', e.target.value), placeholder: "you@example.com" }) }), (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Password", error: form.errors.password, children: (0, jsx_runtime_1.jsx)(Input_1.Input, { type: "password", autoComplete: "new-password", value: form.values.password, onChange: (e) => form.setValue('password', e.target.value) }) }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", disabled: form.submitting, children: form.submitting ? 'Creating…' : 'Sign up' }), onLoginClick && ((0, jsx_runtime_1.jsxs)("p", { className: "text-center text-sm text-muted", children: ["Have an account?", ' ', (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onLoginClick, className: "text-primary", children: "Sign in" })] }))] }) }));
}
//# sourceMappingURL=SignupForm.js.map
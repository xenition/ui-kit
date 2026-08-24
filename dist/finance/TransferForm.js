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
exports.TransferForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Field_1 = require("../primitives/Field");
const Select_1 = require("../primitives/Select");
const Input_1 = require("../primitives/Input");
const CurrencyInput_1 = require("../primitives/CurrencyInput");
/**
 * A controlled money-transfer form: from/to account {@link Select}s, a
 * {@link CurrencyInput} amount (major units on screen, integer **cents** in the
 * value bag — converted with a single round, no float drift), and an optional
 * note. Every edit emits the full {@link TransferValues} via `onChange`; submit
 * is blocked (and the button disabled) until both accounts differ and the
 * amount is positive. A `danger`-toned validation line appears when the same
 * account is picked twice. Token-bound throughout. Web parity of the native
 * `TransferForm`.
 */
exports.TransferForm = React.forwardRef(function TransferForm({ accounts, fromAccountId = '', toAccountId = '', amountCents = 0, note = '', currencySymbol = '$', onChange, onSubmit, submitLabel = 'Transfer', loading = false, className, ...rest }, ref) {
    const emit = (patch) => {
        onChange?.({ fromAccountId, toAccountId, amountCents, note, ...patch });
    };
    const sameAccount = fromAccountId !== '' && fromAccountId === toAccountId;
    const canSubmit = fromAccountId !== '' && toAccountId !== '' && !sameAccount && amountCents > 0;
    return ((0, jsx_runtime_1.jsxs)("form", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), onSubmit: (event) => {
            event.preventDefault();
            if (canSubmit && !loading)
                onSubmit?.({ fromAccountId, toAccountId, amountCents, note });
        }, ...rest, children: [(0, jsx_runtime_1.jsx)(Field_1.Field, { label: "From", children: (0, jsx_runtime_1.jsxs)(Select_1.Select, { value: fromAccountId, onChange: (event) => emit({ fromAccountId: event.target.value }), "aria-label": "From account", children: [(0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: "Select account" }), accounts.map((account) => ((0, jsx_runtime_1.jsx)("option", { value: account.id, children: account.label }, account.id)))] }) }), (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "To", children: (0, jsx_runtime_1.jsxs)(Select_1.Select, { value: toAccountId, invalid: sameAccount, onChange: (event) => emit({ toAccountId: event.target.value }), "aria-label": "To account", children: [(0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: "Select account" }), accounts.map((account) => ((0, jsx_runtime_1.jsx)("option", { value: account.id, children: account.label }, account.id)))] }) }), sameAccount ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-danger", role: "alert", children: "Choose two different accounts." })) : null, (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Amount", children: (0, jsx_runtime_1.jsx)(CurrencyInput_1.CurrencyInput, { value: amountCents === 0 ? null : amountCents / 100, symbol: currencySymbol, onChange: (value) => emit({ amountCents: value == null ? 0 : Math.round(value * 100) }), accessibilityLabel: "Transfer amount" }) }), (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Note", children: (0, jsx_runtime_1.jsx)(Input_1.Input, { value: note, placeholder: "What's this for?", onChange: (event) => emit({ note: event.target.value }), "aria-label": "Transfer note" }) }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", disabled: !canSubmit || loading, children: submitLabel })] }));
});
//# sourceMappingURL=TransferForm.js.map
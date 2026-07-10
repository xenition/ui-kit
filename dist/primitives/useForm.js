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
exports.useForm = useForm;
const React = __importStar(require("react"));
/**
 * Headless controlled-form helper: tracks values/errors/submitting, validates on
 * submit, and drives the async `onSubmit`. Pairs with `Field` + `Form` and the
 * composed auth forms. No dependency on `@xenition/sdk` — pass your own submit.
 */
function useForm(options) {
    const [values, setValues] = React.useState(options.initialValues);
    const [errors, setErrors] = React.useState({});
    const [submitting, setSubmitting] = React.useState(false);
    const setValue = React.useCallback((key, value) => {
        setValues((s) => ({ ...s, [key]: value }));
    }, []);
    const handleSubmit = React.useCallback(async (e) => {
        e?.preventDefault();
        const errs = options.validate ? options.validate(values) : {};
        setErrors(errs);
        if (Object.keys(errs).length > 0)
            return;
        setSubmitting(true);
        try {
            await options.onSubmit(values);
        }
        finally {
            setSubmitting(false);
        }
    }, [options, values]);
    return { values, errors, submitting, setValue, setValues, setErrors, handleSubmit };
}
//# sourceMappingURL=useForm.js.map
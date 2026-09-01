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
exports.YesNoToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * YesNoToggle — **V4** "clean form / focus" binary segmented control. Two big
 * (≥44px) side-by-side buttons on a calm neutral surface: the selected side
 * fills with the single signature accent — solid `primary` with `on-primary`
 * text — while the other stays `surface` + `border`. No gradients. Exposed as a
 * `radiogroup` of two `radio`s so the choice is announced. Controlled via
 * `value` + `onChange`. All colors come from `--xen-*` token classes.
 */
exports.YesNoToggle = React.forwardRef(function YesNoToggle({ value, onChange, yesLabel = 'Yes', noLabel = 'No', 'aria-label': ariaLabel = 'Yes or no', disabled = false, className, }, ref) {
    const options = [
        { label: yesLabel, answer: true },
        { label: noLabel, answer: false },
    ];
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "radiogroup", "aria-label": ariaLabel, className: (0, cn_1.cn)('flex gap-sm', disabled && 'opacity-50', className), children: options.map(({ label, answer }) => {
            const selected = value === answer;
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": label, disabled: disabled, onClick: () => onChange(answer), className: (0, cn_1.cn)('flex h-14 flex-1 items-center justify-center rounded-[var(--xen-radius-lg)] border text-lg font-extrabold transition-colors', 'disabled:pointer-events-none', selected
                    ? 'border-2 border-primary bg-primary text-on-primary'
                    : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: label }, label));
        }) }));
});
//# sourceMappingURL=YesNoToggle.js.map
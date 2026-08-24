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
exports.ApplyButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
/**
 * The apply / applied / withdrawn call-to-action for a job. A thin, stateful
 * wrapper over the primitive `Button`:
 * - `apply` → primary "Apply", presses call `onApply`.
 * - `applied` → secondary "Applied ✓", presses call `onWithdraw` (undo).
 * - `withdrawn` → ghost "Re-apply", presses call `onApply` again.
 * The accessible label always names the state so it is not conveyed by variant
 * color alone. Colors come from the `Button` primitive's tokens.
 */
exports.ApplyButton = React.forwardRef(function ApplyButton({ state = 'apply', onApply, onWithdraw, loading = false, disabled = false, size = 'md', block = false, className }, ref) {
    const config = {
        apply: { label: 'Apply', variant: 'primary', onClick: onApply, a11y: 'Apply to this job' },
        applied: {
            label: 'Applied ✓',
            variant: 'secondary',
            onClick: onWithdraw,
            a11y: 'Applied — press to withdraw',
        },
        withdrawn: {
            label: 'Re-apply',
            variant: 'ghost',
            onClick: onApply,
            a11y: 'Application withdrawn — press to re-apply',
        },
    }[state];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Button, { ref: ref, variant: config.variant, size: size, disabled: disabled || loading, "aria-busy": loading || undefined, onClick: config.onClick, "aria-label": config.a11y, className: (0, cn_1.cn)(block && 'w-full', className), children: [loading ? (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm", className: "mr-2" }) : null, config.label] }));
});
//# sourceMappingURL=ApplyButton.js.map
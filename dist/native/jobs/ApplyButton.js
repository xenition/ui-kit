"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyButton = ApplyButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const primitives_1 = require("../primitives");
/**
 * The apply / applied / withdrawn call-to-action for a job. A thin, stateful
 * wrapper over the primitive `Button`:
 * - `apply` → primary "Apply", presses call `onApply`.
 * - `applied` → secondary "Applied ✓", presses call `onWithdraw` (undo).
 * - `withdrawn` → ghost "Re-apply", presses call `onApply` again.
 * The accessible label always names the state so it is not conveyed by variant
 * color alone. Colors come from the `Button` primitive's tokens.
 */
function ApplyButton({ state = 'apply', onApply, onWithdraw, loading = false, disabled = false, size = 'md', block = false, style, }) {
    const config = {
        apply: { label: 'Apply', variant: 'primary', onPress: onApply, a11y: 'Apply to this job' },
        applied: {
            label: 'Applied ✓',
            variant: 'secondary',
            onPress: onWithdraw,
            a11y: 'Applied — press to withdraw',
        },
        withdrawn: {
            label: 'Re-apply',
            variant: 'ghost',
            onPress: onApply,
            a11y: 'Application withdrawn — press to re-apply',
        },
    }[state];
    return ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: config.variant, size: size, loading: loading, disabled: disabled, onPress: config.onPress, accessibilityLabel: config.a11y, style: [block ? { alignSelf: 'stretch' } : null, style], children: config.label }));
}
//# sourceMappingURL=ApplyButton.js.map
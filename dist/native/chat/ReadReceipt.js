"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadReceipt = ReadReceipt;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GLYPH = {
    sending: '🕓',
    sent: '✓',
    delivered: '✓✓',
    read: '✓✓',
    failed: '⚠︎',
};
const LABEL = {
    sending: 'Sending',
    sent: 'Sent',
    delivered: 'Delivered',
    read: 'Read',
    failed: 'Failed to send',
};
/**
 * Delivery-state indicator shown beneath an outgoing message. `read` tints the
 * double-check with the primary token; `failed` uses the danger token. Announced
 * to screen readers via its status label. No literal colors.
 */
function ReadReceipt({ status = 'sent', size, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fontSize = size ?? tokens.typography.scale.xs;
    const color = status === 'read' ? colors.primaryText : status === 'failed' ? colors.dangerText : colors.muted;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: LABEL[status], style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize, lineHeight: fontSize * 1.2, color }, children: GLYPH[status] }) }));
}
//# sourceMappingURL=ReadReceipt.js.map
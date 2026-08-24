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
exports.ReadReceipt = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
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
const COLOR_CLASS = {
    sending: 'text-muted',
    sent: 'text-muted',
    delivered: 'text-muted',
    read: 'text-primary',
    failed: 'text-danger',
};
/**
 * Delivery-state indicator shown beneath an outgoing message. `read` tints the
 * double-check with the primary token; `failed` uses the danger token. Announced
 * to screen readers via its status label (state is not color-alone — the glyph
 * carries it too). No literal colors.
 */
exports.ReadReceipt = React.forwardRef(function ReadReceipt({ status = 'sent', size, className, style, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: "img", "aria-label": LABEL[status], className: (0, cn_1.cn)('inline-flex leading-none', !size && 'text-xs', COLOR_CLASS[status], className), style: size ? { fontSize: size, ...style } : style, ...rest, children: GLYPH[status] }));
});
//# sourceMappingURL=ReadReceipt.js.map
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
exports.PresenceDot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Maps a presence state to its semantic background token class. */
const TONE_CLASS = {
    online: 'bg-success',
    away: 'bg-warn',
    busy: 'bg-danger',
    offline: 'bg-muted',
};
const DEFAULT_LABEL = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline',
};
/**
 * Small presence indicator for avatars and headers. Online pulses (reusing the
 * primitive `StatusDot` echo); the other states render a solid token-colored
 * dot. A `ring` in the surface color separates it from a busy avatar. No literal
 * colors — every color traces to a semantic token.
 */
exports.PresenceDot = React.forwardRef(function PresenceDot({ status = 'offline', size = 10, ring = true, label, className, style, ...rest }, ref) {
    const a11yLabel = label ?? DEFAULT_LABEL[status];
    const decorative = a11yLabel === '';
    const ringPad = ring ? 2 : 0;
    const outer = size + ringPad * 2;
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: decorative ? undefined : 'img', "aria-label": decorative ? undefined : a11yLabel, "aria-hidden": decorative || undefined, className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-full', ring && 'bg-surface', className), style: { width: outer, height: outer, ...style }, ...rest, children: status === 'online' ? ((0, jsx_runtime_1.jsx)(primitives_1.StatusDot, { tone: "success", pulse: true })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('rounded-full', TONE_CLASS[status]), style: { width: size, height: size } })) }));
});
//# sourceMappingURL=PresenceDot.js.map
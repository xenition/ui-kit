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
exports.PresenceDotV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const thread_v4_1 = require("./internal/thread-v4");
/**
 * **V4 presence dot** — the web twin of the native `PresenceDotV4`, same props
 * as {@link PresenceDot} plus `scale` and `showLabel`.
 *
 * ## Three changes
 *
 * 1. **It can carry its word.**
 * 2. **It always has a name.** The base announced nothing unless the caller
 *    passed `label`, so the default rendering was a decorative circle.
 * 3. **`away` stops borrowing `warn`.**
 */
exports.PresenceDotV4 = React.forwardRef(function PresenceDotV4({ status = 'offline', size, scale = 'sm', ring = false, label, showLabel = false, className, style, ...rest }, ref) {
    const meta = thread_v4_1.PRESENCE_META[status];
    const word = label ?? meta.label;
    const dot = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('inline-block shrink-0 rounded-full', size == null && thread_v4_1.CHAT_SIZE[scale], thread_v4_1.TONE_BG[meta.tone], ring && 'ring-2 ring-surface'), style: size != null ? { width: size, height: size } : undefined }));
    if (!showLabel) {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: "img", "aria-label": word, "data-xen-presence": status, className: (0, cn_1.cn)('inline-flex', className), style: style, ...rest, children: dot }));
    }
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": word, "data-xen-presence": status, className: (0, cn_1.cn)('inline-flex items-center gap-xs', className), style: style, ...rest, children: [dot, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', meta.tone === 'success' ? thread_v4_1.TONE_INK.success : 'text-muted-text'), children: word })] }));
});
//# sourceMappingURL=PresenceDotV4.js.map
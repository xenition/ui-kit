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
exports.SceneCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * SceneCard, redesigned (v2): a **bold scene tile**. A large icon in an accent
 * disc, the name and description centered, and a device-count footer; the active
 * scene fills with an accent ring + tint. Tapping runs the scene. Distinct from
 * v1's row. Same props, token-only.
 */
exports.SceneCardV2 = React.forwardRef(function SceneCardV2({ name, icon = '🎬', description, deviceCount, active = false, onActivate, className, style }, ref) {
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-scene-card": "", "aria-pressed": active, "aria-label": `Run scene ${name}${active ? ', active' : ''}`, onClick: onActivate, style: style, className: (0, cn_1.cn)('flex flex-col items-center gap-2 rounded-lg bg-surface p-4 text-center shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0', active && 'bg-accent/10 ring-2 ring-accent', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl", children: icon }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-surface", children: name }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: description }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5 text-xs text-muted", children: [typeof deviceCount === 'number' ? (0, jsx_runtime_1.jsxs)("span", { children: [deviceCount, " devices"] }) : null, active ? (0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-accent", children: "\u00B7 Active" }) : null] })] }));
});
//# sourceMappingURL=SceneCardV2.js.map
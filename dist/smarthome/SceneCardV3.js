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
exports.SceneCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * SceneCard, redesigned (v3): a **compact scene row**. A leading icon, the name
 * over a description·device-count line, and an "Active" dot + word on the trailing
 * edge — hairline-bordered for a scenes list. Tapping runs the scene. The
 * opposite of v2's tile. Same props, token-only.
 */
exports.SceneCardV3 = React.forwardRef(function SceneCardV3({ name, icon = '🎬', description, deviceCount, active = false, onActivate, className, style }, ref) {
    const sub = [description, typeof deviceCount === 'number' ? `${deviceCount} devices` : null].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-scene-card": "", "aria-pressed": active, "aria-label": `Run scene ${name}${active ? ', active' : ''}`, onClick: onActivate, style: style, className: (0, cn_1.cn)('flex w-full items-center gap-3 border-b border-border py-2.5 text-left transition-colors hover:bg-neutral-50', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg leading-none", children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), active ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1 text-xs font-semibold text-accent", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-block h-2 w-2 rounded-full bg-accent", "aria-hidden": true }), " Active"] })) : null] }));
});
//# sourceMappingURL=SceneCardV3.js.map
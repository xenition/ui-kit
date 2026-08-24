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
exports.FloorPlanView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Web parity of the native `FloorPlanView`: a schematic floor plan — a STATIC,
 * dependency-free styled placeholder built from plain `div` rectangles positioned
 * as fractions of the frame. No image, SVG, or map dependency; it renders
 * anywhere. Rooms in, nothing fetches; an empty `rooms` array shows a labelled
 * placeholder. All colors come from the `--xen-*` tokens — no literal colors
 * (rooms tinted with the `border` fill and `on-surface` labels).
 */
exports.FloorPlanView = React.forwardRef(function FloorPlanView({ title = 'Floor plan', rooms = [], height = 200, onClick, className, ...rest }, ref) {
    const interactive = (0, internal_1.clickableProps)(onClick, `${title}${rooms.length ? `, ${rooms.length} rooms` : ', schematic'}`);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, onClick: onClick, className: (0, cn_1.cn)('flex flex-col gap-2', onClick && 'cursor-pointer', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("div", { style: { height }, className: "relative overflow-hidden border border-border bg-surface rounded-[var(--xen-radius-lg)]", children: rooms.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Floor plan unavailable" }) })) : (rooms.map((room, i) => ((0, jsx_runtime_1.jsx)("div", { className: "absolute flex items-center justify-center border border-primary bg-border p-1", style: {
                        left: `${(0, internal_1.clamp01)(room.x) * 100}%`,
                        top: `${(0, internal_1.clamp01)(room.y) * 100}%`,
                        width: `${(0, internal_1.clamp01)(room.w) * 100}%`,
                        height: `${(0, internal_1.clamp01)(room.h) * 100}%`,
                    }, children: (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-medium text-on-surface", children: room.label }) }, `${room.label}-${i}`)))) })] }));
});
//# sourceMappingURL=FloorPlanView.js.map
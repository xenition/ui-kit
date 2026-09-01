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
exports.FloorPlanViewV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * FloorPlanView — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the schematic plan: a rounded elevated frame
 * with a soft-primary gradient "ground", the `title` shown as an active level tab,
 * rooms drawn as soft-primary tinted token rectangles, and a room-count area
 * caption. STATIC and dependency-free — no image, SVG, or map dep; it renders
 * anywhere. Same props/behavior as {@link FloorPlanViewProps}; an empty `rooms`
 * array shows a labelled placeholder. All colors come from the `--xen-*` tokens
 * (no literals). When `onClick` is set the frame is keyboard-activatable.
 */
exports.FloorPlanViewV4 = React.forwardRef(function FloorPlanViewV4({ title = 'Floor plan', rooms = [], height = 200, onClick, className, ...rest }, ref) {
    const interactive = (0, internal_1.clickableProps)(onClick, `${title}${rooms.length ? `, ${rooms.length} rooms` : ', schematic'}`);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, onClick: onClick, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 shadow-md', onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-1 px-1 pt-1", children: (0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-on-surface", children: title }) }), (0, jsx_runtime_1.jsx)("div", { style: { height }, className: "relative overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-gradient-to-br from-primary/10 to-surface", children: rooms.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Floor plan unavailable" }) })) : (rooms.map((room, i) => ((0, jsx_runtime_1.jsx)("div", { className: "absolute flex items-center justify-center rounded-[var(--xen-radius-sm)] border border-primary bg-primary/10 p-1", style: {
                        left: `${(0, internal_1.clamp01)(room.x) * 100}%`,
                        top: `${(0, internal_1.clamp01)(room.y) * 100}%`,
                        width: `${(0, internal_1.clamp01)(room.w) * 100}%`,
                        height: `${(0, internal_1.clamp01)(room.h) * 100}%`,
                    }, children: (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-medium text-on-surface", children: room.label }) }, `${room.label}-${i}`)))) }), (0, jsx_runtime_1.jsx)("span", { className: "px-1 pb-1 text-xs text-muted", children: rooms.length ? `${rooms.length} rooms` : 'Schematic' })] }));
});
//# sourceMappingURL=FloorPlanViewV4.js.map
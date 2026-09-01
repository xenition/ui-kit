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
exports.RoomHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * RoomHeader — a room **hero** for the smart-home module (web parity of the
 * native twin). A brand-gradient ground carries an optional frosted glyph disc,
 * a big near-white room name, climate + devices-on frosted tiles, and an
 * all-off / all-on control. When `lightsOn` is set it picks the more useful
 * single control (on → "All off", off → "All on"); otherwise both provided
 * controls render. Every color derives from the brand ramp — gradient
 * `from-primary-500 to-primary-700`, ink `text-primary-50/100`, frosted tiles
 * `bg-primary-50/15` + `border-primary-50/30` — token-only, no literals, light +
 * dark. Presentational: shaped data + callbacks, nothing fetches.
 */
exports.RoomHeader = React.forwardRef(function RoomHeader({ roomName, glyph, temperature, humidity, devicesOn, deviceCount, onAllOff, onAllOn, lightsOn, className, ...rest }, ref) {
    const tiles = [];
    if (temperature != null)
        tiles.push({ label: 'Temperature', value: temperature });
    if (humidity != null)
        tiles.push({ label: 'Humidity', value: humidity });
    if (devicesOn != null) {
        tiles.push({
            label: 'Devices on',
            value: deviceCount != null ? `${devicesOn} / ${deviceCount}` : String(devicesOn),
        });
    }
    // Which controls to render — respect `lightsOn` to emphasise the useful one.
    const showAllOff = onAllOff != null && (lightsOn === undefined || lightsOn === true);
    const showAllOn = onAllOn != null && (lightsOn === undefined || lightsOn === false);
    const controlClass = 'inline-flex min-h-[44px] flex-1 items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { role: "img", "aria-hidden": true, className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", "aria-hidden": true }) })) : null, (0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate text-3xl font-extrabold tracking-tight text-primary-50", children: roomName })] }), tiles.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-lg)] flex flex-wrap gap-[var(--xen-space-sm)]", children: tiles.map((t) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[104px] flex-1 flex-col justify-center rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-primary-50", children: t.value }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-primary-100", children: t.label })] }, t.label))) })) : null, showAllOff || showAllOn ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex gap-[var(--xen-space-sm)]", children: [showAllOff ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Turn all off", onClick: onAllOff, className: controlClass, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23FB", size: "sm", "aria-hidden": true }), "All off"] })) : null, showAllOn ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Turn all on", onClick: onAllOn, className: controlClass, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA1", size: "sm", "aria-hidden": true }), "All on"] })) : null] })) : null] }));
});
//# sourceMappingURL=RoomHeader.js.map
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
exports.RoomGroupV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
const EmptyState_1 = require("../commerce/EmptyState");
const DeviceToggleRow_1 = require("./DeviceToggleRow");
/**
 * RoomGroup — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a room card: when **any** device is on, the whole card
 * takes a soft `primary`-tinted wash, a primary border, and a glowing icon disc
 * so an active room reads at a glance. A **bold numeral** summarizes how many
 * devices are on, and a group all-on/off {@link Switch} keeps parity with the
 * base header. Idle rooms stay calm and muted; status is carried by icon + a
 * text summary (never color alone). Same props/behavior as
 * {@link RoomGroupProps}; all colors from `--xen-*` token classes (no literals).
 */
exports.RoomGroupV4 = React.forwardRef(function RoomGroupV4({ name, icon = '🛋️', devices, onDeviceToggle, onToggleAll, emptyTitle = 'No devices in this room', children, className, style }, ref) {
    const list = Array.isArray(devices) ? devices : [];
    const reachable = list.filter((d) => !d.offline);
    const onCount = reachable.filter((d) => d.on).length;
    const allOn = reachable.length > 0 && onCount === reachable.length;
    const anyOn = onCount > 0;
    const offlineCount = list.length - reachable.length;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, style: style, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border', anyOn ? 'border-primary/50 bg-primary/[0.08] shadow-md' : 'border-border bg-surface shadow-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border', anyOn ? 'border-primary/40 bg-primary/15' : 'border-border bg-on-surface/5'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: anyOn ? 'primary' : 'muted', size: "xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: list.length === 0 ? ('No devices') : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold text-on-surface", children: onCount }), ` of ${reachable.length} on${offlineCount > 0 ? ` · ${offlineCount} offline` : ''}`] })) })] }), reachable.length > 0 ? ((0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: allOn, onCheckedChange: onToggleAll, "aria-label": `Toggle all devices in ${name}` })) : null] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)]", children: (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD0C", color: "muted", size: "2xl" }), title: emptyTitle, description: "Add a device to control it from here." }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)]", children: list.map((d, i) => ((0, jsx_runtime_1.jsx)(DeviceToggleRow_1.DeviceToggleRow, { label: d.label, icon: d.icon, subtitle: d.subtitle, checked: !!d.on, offline: !!d.offline, last: i === list.length - 1, onCheckedChange: (next) => onDeviceToggle?.(d.id, next) }, d.id))) })), children != null ? (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)]", children: children }) : null] }));
});
//# sourceMappingURL=RoomGroupV4.js.map
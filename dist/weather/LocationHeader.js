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
exports.LocationHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * LocationHeader — a gradient rounded header card (web parity of the native
 * `LocationHeader`). A `📍` pin + the `location` in bold `on-primary`, an
 * optional `date` beneath in the softer `primary-100`, and — when `onMenu` is
 * set — a round trailing button on a lighter ramp step. The ground is a
 * `primary` gradient; every color comes from `--xen-*` Tailwind classes, no
 * literals.
 */
exports.LocationHeader = React.forwardRef(function LocationHeader({ location, date, onMenu, menuGlyph = '☰', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-4 flex flex-row items-center justify-between', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-row items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCCD", size: "lg", "aria-hidden": true, color: "onPrimary" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-bold text-on-primary", children: location }), date ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-primary-100", children: date }) : null] })] }), onMenu ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onMenu, className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary-500", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: menuGlyph, size: "lg", "aria-hidden": true, color: "onPrimary" }) })) : null] }));
});
//# sourceMappingURL=LocationHeader.js.map
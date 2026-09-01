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
exports.TimezoneRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const grid_v4_1 = require("./internal/grid-v4");
/** The zone's current short offset, from `Intl`. `undefined` if it cannot say. */
function defaultOffset(timezone) {
    try {
        const parts = new Intl.DateTimeFormat(undefined, {
            timeZone: timezone,
            timeZoneName: 'shortOffset',
        }).formatToParts(new Date());
        return parts.find((p) => p.type === 'timeZoneName')?.value;
    }
    catch {
        // An unknown IANA name is a host bug, not a reason to take the screen down.
        return undefined;
    }
}
/**
 * **V4 timezone row** — the web twin of the native `TimezoneRowV4`, same props
 * as {@link TimezoneRow} plus `formatOffset`.
 *
 * ## Three changes
 *
 * 1. **The offset is derived when it is not given.**
 * 2. **It is a row from the shared row line**, with the shared hover layer.
 * 3. **An unknown zone degrades rather than throwing.**
 *
 * **Renders nothing without a `timezone`** (§4.5).
 */
exports.TimezoneRowV4 = React.forwardRef(function TimezoneRowV4({ timezone, label, offsetLabel, title, variant = 'row', formatOffset, onPress, className, ...rest }, ref) {
    if (!timezone)
        return null;
    const offset = offsetLabel ?? (formatOffset ?? defaultOffset)(timezone);
    const caption = (0, grid_v4_1.metaLine)([label ?? timezone, offset]);
    const name = (0, grid_v4_1.metaLine)([title, caption]);
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": name, className: (0, cn_1.cn)('flex items-center gap-xs text-xs text-muted-text', className), ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "globe", size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: caption })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-timezone-row": "", "data-xen-v4-chrome": onPress ? 'on-surface' : undefined, role: onPress ? 'button' : undefined, onClick: onPress, "aria-label": name, className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(Boolean(title)), className), ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "globe", size: "lg", className: "text-muted-text" }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [title ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: title })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate', title ? 'text-xs text-muted-text' : 'text-base text-on-card'), children: caption })] }), onPress ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chevron-right", size: "lg", className: "text-muted-text" }) : null] }));
});
//# sourceMappingURL=TimezoneRowV4.js.map
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
exports.Stagger = exports.StaggerIndexContext = exports.StaggerConfigContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
/** Provided by `Stagger`; consumed by `Reveal` to offset its delay. */
exports.StaggerConfigContext = React.createContext(null);
/** Position of a child inside the nearest `Stagger`. */
exports.StaggerIndexContext = React.createContext(0);
/**
 * Applies incremental transition delays to child `Reveal`s so lists cascade
 * in. Non-`Reveal` children render untouched (they still advance the index,
 * keeping visual order stable when items are mixed).
 */
exports.Stagger = React.forwardRef(function Stagger({ interval = 100, delay = 0, children, ...rest }, ref) {
    const config = React.useMemo(() => ({ interval, delay }), [interval, delay]);
    const items = React.Children.toArray(children);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-stagger": "", ...rest, children: (0, jsx_runtime_1.jsx)(exports.StaggerConfigContext.Provider, { value: config, children: items.map((child, index) => ((0, jsx_runtime_1.jsx)(exports.StaggerIndexContext.Provider, { value: index, children: child }, index))) }) }));
});
//# sourceMappingURL=Stagger.js.map
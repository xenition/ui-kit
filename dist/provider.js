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
exports.isCompiledTheme = isCompiledTheme;
exports.XenitionUIProvider = XenitionUIProvider;
exports.useXenitionCompiledTheme = useXenitionCompiledTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const compile_1 = require("./theme/compile");
const outputs_1 = require("./theme/outputs");
/** Narrow a `ThemeSeed | CompiledTheme` union to the compiled form. */
function isCompiledTheme(theme) {
    return (typeof theme === 'object' && theme !== null && 'ramps' in theme && 'light' in theme);
}
const XenitionThemeContext = React.createContext(null);
/**
 * Root theme provider for web apps.
 *
 * Compiles the seed (if needed), injects the `--xen-*` CSS custom properties
 * via a `<style>` tag, and stamps `data-theme` on a wrapper so the
 * `[data-theme="dark"]` overrides apply. Place once at the app root, above
 * any `@xenition/ui` component.
 */
function XenitionUIProvider({ theme, mode, children, }) {
    const compiled = React.useMemo(() => (isCompiledTheme(theme) ? theme : (0, compile_1.compileTheme)(theme)), [theme]);
    const css = React.useMemo(() => (0, outputs_1.toCssVars)(compiled), [compiled]);
    const resolvedMode = mode ?? (compiled.seed.mode === 'dark' ? 'dark' : 'light');
    return ((0, jsx_runtime_1.jsxs)(XenitionThemeContext.Provider, { value: compiled, children: [(0, jsx_runtime_1.jsx)("style", { "data-xenition-theme": "", dangerouslySetInnerHTML: { __html: css } }), (0, jsx_runtime_1.jsx)("div", { "data-theme": resolvedMode, style: { display: 'contents' }, children: children })] }));
}
/** Access the compiled theme from anywhere below `XenitionUIProvider`. */
function useXenitionCompiledTheme() {
    const compiled = React.useContext(XenitionThemeContext);
    if (compiled === null) {
        throw new Error('useXenitionCompiledTheme must be used inside <XenitionUIProvider theme={...}>.');
    }
    return compiled;
}
//# sourceMappingURL=provider.js.map
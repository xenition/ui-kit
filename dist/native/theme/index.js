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
exports.useDesignLine = exports.resolveDesign = exports.designed = exports.DesignLineProvider = void 0;
exports.XenitionNativeThemeProvider = XenitionNativeThemeProvider;
exports.useXenitionTheme = useXenitionTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * `@xenition/ui/native/theme` — React Native theme tokens (v0: tokens only,
 * no RN components yet).
 *
 * React Native cannot read CSS custom properties, so the provider exposes
 * the fully-resolved {@link NativeThemeTokens} (hex strings, px numbers)
 * through React context for use in `StyleSheet.create` / inline styles.
 * No `react-native` import is needed for this layer — it is pure React.
 */
const React = __importStar(require("react"));
const compile_1 = require("../../theme/compile");
const outputs_1 = require("../../theme/outputs");
var design_line_1 = require("./design-line");
Object.defineProperty(exports, "DesignLineProvider", { enumerable: true, get: function () { return design_line_1.DesignLineProvider; } });
Object.defineProperty(exports, "designed", { enumerable: true, get: function () { return design_line_1.designed; } });
Object.defineProperty(exports, "resolveDesign", { enumerable: true, get: function () { return design_line_1.resolveDesign; } });
Object.defineProperty(exports, "useDesignLine", { enumerable: true, get: function () { return design_line_1.useDesignLine; } });
function isCompiledTheme(theme) {
    return typeof theme === 'object' && theme !== null && 'ramps' in theme && 'light' in theme;
}
const XenitionNativeThemeContext = React.createContext(null);
/** Root theme provider for React Native apps. */
function XenitionNativeThemeProvider({ theme, scheme, children, }) {
    const value = React.useMemo(() => {
        const compiled = isCompiledTheme(theme) ? theme : (0, compile_1.compileTheme)(theme);
        const tokens = (0, outputs_1.toNativeTokens)(compiled);
        const resolvedScheme = scheme ?? (compiled.seed.mode === 'dark' ? 'dark' : 'light');
        return {
            tokens,
            scheme: resolvedScheme,
            colors: tokens.colors[resolvedScheme],
            gradient: tokens.gradient[resolvedScheme],
            glass: tokens.glass[resolvedScheme],
            elevation: tokens.elevation[resolvedScheme],
            depth: tokens.depth,
            state: tokens.state,
            motion: tokens.motion,
            ringGeometry: tokens.ring,
        };
    }, [theme, scheme]);
    return ((0, jsx_runtime_1.jsx)(XenitionNativeThemeContext.Provider, { value: value, children: children }));
}
/**
 * Read the resolved theme tokens.
 *
 * ```tsx
 * const { colors, tokens } = useXenitionTheme();
 * const styles = StyleSheet.create({
 *   button: {
 *     backgroundColor: colors.primary,
 *     borderRadius: tokens.radius.md,
 *     padding: tokens.spacing.md,
 *   },
 * });
 * ```
 */
function useXenitionTheme() {
    const value = React.useContext(XenitionNativeThemeContext);
    if (value === null) {
        throw new Error('useXenitionTheme must be used inside <XenitionNativeThemeProvider theme={...}>.');
    }
    return value;
}
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenitionUIProvider = XenitionUIProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const theme_1 = require("../theme");
/**
 * Root provider for React Native apps. Compiles the seed (or accepts an
 * already-compiled theme) and exposes the resolved tokens via context. Place
 * once at the app root, above any `@xenition/ui/native/*` component.
 *
 * ```tsx
 * <XenitionUIProvider theme={seed}>
 *   <Button onPress={buy}>Buy</Button>
 * </XenitionUIProvider>
 * ```
 */
function XenitionUIProvider({ theme, scheme, design = 'base', children, }) {
    return ((0, jsx_runtime_1.jsx)(theme_1.XenitionNativeThemeProvider, { theme: theme, scheme: scheme, children: (0, jsx_runtime_1.jsx)(theme_1.DesignLineProvider, { design: design, children: children }) }));
}
//# sourceMappingURL=XenitionUIProvider.js.map
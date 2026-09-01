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
exports.AuthStickyFooterV4 = AuthStickyFooterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const AuthSwitchFooterV4_1 = require("./AuthSwitchFooterV4");
/**
 * **V4 auth sticky footer** — the native twin of the web `AuthStickyFooterV4`,
 * the base's props plus the §5 secondary action and safe-area handling.
 *
 * §5's anatomy exactly: a hairline `border` divider on top and an opaque
 * `surface` behind it, pinned under the scrolling content so the page passes
 * **under** the action rather than colliding with it.
 *
 * ## What V4 changes
 *
 * **It clears the home indicator.** §5 says "above the safe-area inset" and the
 * base read no inset at all, so on a notched phone the CTA sat under the home
 * indicator — the one bug that tells a user this screen was not built for their
 * device. The band pays `spacing.lg` *plus* `insets.bottom`, via
 * `useSafeAreaInsets()`, which is how every other edge-anchored V4 component
 * here does it (`BottomNavV4`, `BottomSheetV4`, `FloatButtonV4`). Needs a
 * `SafeAreaProvider` above it, which Expo mounts by default.
 *
 * **The secondary action has a place.** §5: a secondary action goes below the
 * CTA as a centred muted text link, "never beside it competing for the same
 * weight". The base exposed only `children`, so where the "No thanks" landed
 * was up to whoever assembled the screen. `secondaryLabel` puts it under the
 * CTA by construction, drawn by `AuthSwitchFooterV4` at `tone="muted"` rather
 * than hand-rolled here (§10.5) — the two footer lines are one anatomy at two
 * volumes, so the tap target, the press layer and the disabled opacity are the
 * same object in both.
 *
 * **No shadow.** A bottom bar that floats gets `elevation.sheet` — this one
 * does not, because §5 asks for a hairline and because the CTA inside it
 * already carries `elevation.action`. Two stacked shadows read as a UI element
 * that has come loose from the screen, not as depth.
 *
 * **Nothing renders when there is nothing to pin** (§10.6/§12). An empty band
 * is a hairline and a strip of surface across the bottom of the screen with no
 * explanation.
 */
function AuthStickyFooterV4({ children, secondaryLabel, onSecondaryPress, secondaryDisabled = false, safeArea = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    // `toArray` drops `null`, `undefined` and booleans, so a CTA behind a false
    // conditional counts as absent rather than as a child.
    const hasChildren = React.Children.toArray(children).length > 0;
    if (!hasChildren && !secondaryLabel)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.lg,
                paddingTop: tokens.spacing.lg,
                paddingBottom: tokens.spacing.lg + (safeArea ? insets.bottom : 0),
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [children, secondaryLabel ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { tone: "muted", label: secondaryLabel, onPress: onSecondaryPress, disabled: secondaryDisabled })) : null] }));
}
//# sourceMappingURL=AuthStickyFooterV4.js.map